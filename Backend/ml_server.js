const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const joblib = require("joblib");
const { check, validationResult } = require("express-validator");

// **Load Environment Variables**
dotenv.config();

// **Initialize Express App**
const app = express();
app.use(cors({ origin: "*" })); // Update to specific origin in production
app.use(express.json());

// **Connect to MongoDB**
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// **User Schema**
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, default: "" },
  emergencyContacts: [{ type: String }],
  isNeurodivergent: { type: Boolean, default: false },
  isHelper: { type: Boolean, default: false },
});

// **Create User Model**
const User = mongoose.model("User", userSchema);

// **Load ML Models and Artifacts**
let model1, model2, features1, features2, defaults1, preprocessor2;
try {
  model1 = joblib.load("delivery_eta_clean.pkl");
  features1 = joblib.load("features_clean.pkl");
  defaults1 = joblib.load("defaults_clean.pkl");
  model2 = joblib.load("model2.pkl");
  features2 = joblib.load("features.pkl");
  preprocessor2 = joblib.load("preprocessor.pkl");
  console.log("✅ ML Models and artifacts loaded successfully");
} catch (err) {
  console.error("❌ Error loading ML models or artifacts:", err.message);
}

// **Authenticate Token Middleware**
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("Authorization Header:", token); // Debug log
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error("Token Verification Error:", err.message);
    res.status(400).json({ message: "Invalid Token" });
  }
};

// **Signup Route**
app.post(
  "/signup",
  [
    check("fullName").notEmpty().withMessage("Full name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { fullName, email, password } = req.body;
      console.log("Signup Request:", { fullName, email });

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ fullName, email, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, fullName: newUser.fullName, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
      console.error("Signup Error:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// **Login Route**
app.post(
  "/login",
  [
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      console.log("Login Request:", { email });

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user._id, fullName: user.fullName, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      console.error("Login Error:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// **Prediction Endpoint for Model 1 (train1prep.py)**
app.post(
  "/predict/delivery-time1",
  authenticateToken,
  [
    check("weather").isString().optional(),
    check("traffic_level").isString().optional(),
    check("time_of_day").isString().optional(),
    check("preparation_time_min").isFloat({ min: 0 }).optional(),
    check("queue_length").isInt({ min: 0 }).optional(),
    check("distance_km").isFloat({ min: 0 }).optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const input = req.body;
      console.log("Model 1 Prediction Input:", input);

      // Prepare input data with defaults
      const inputData = {};
      features1.forEach((feature) => {
        if (feature in input && input[feature] !== null && input[feature] !== "") {
          inputData[feature] = input[feature];
        } else {
          inputData[feature] =
            defaults1.numeric[feature] || defaults1.categorical[feature];
        }
      });

      // Create DataFrame-like structure
      const inputArray = [inputData];
      const prediction = model1.predict(inputArray)[0];

      res.status(200).json({
        message: "Prediction successful",
        predicted_delivery_time_min: prediction.toFixed(2),
      });
    } catch (err) {
      console.error("Model 1 Prediction Error:", err.message);
      res.status(500).json({ message: "Prediction error", error: err.message });
    }
  }
);

// **Prediction Endpoint for Model 2 (train2delivery.py)**
app.post(
  "/predict/delivery-time2",
  authenticateToken,
  [
    check("distance_km").isFloat({ min: 0 }).optional(),
    check("Delivery_person_Ratings").isFloat({ min: 0, max: 5 }).optional(),
    check("Order_picked_hour").isInt({ min: 0, max: 23 }).optional(),
    check("Road_traffic_density").isString().optional(),
    check("Type_of_vehicle").isString().optional(),
    check("multiple_deliveries").isInt({ min: 0 }).optional(),
    check("City").isString().optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const input = req.body;
      console.log("Model 2 Prediction Input:", input);

      // Prepare input data with defaults
      const defaultValues = {
        distance_km: 5.0,
        Delivery_person_Ratings: 4.0,
        Order_picked_hour: 12,
        Road_traffic_density: "Medium",
        Type_of_vehicle: "motorcycle",
        multiple_deliveries: 1,
        City: "Urban",
      };

      const inputData = {};
      features2.forEach((feature) => {
        inputData[feature] =
          feature in input && input[feature] !== null && input[feature] !== ""
            ? input[feature]
            : defaultValues[feature];
      });

      // Create DataFrame-like structure
      const inputArray = [inputData];
      const prediction = model2.predict(inputArray)[0];

      res.status(200).json({
        message: "Prediction successful",
        predicted_delivery_time_min: prediction.toFixed(2),
      });
    } catch (err) {
      console.error("Model 2 Prediction Error:", err.message);
      res.status(500).json({ message: "Prediction error", error: err.message });
    }
  }
);

// **Profile Routes (unchanged from original server.js)**
app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error("Profile Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.put(
  "/profile",
  authenticateToken,
  [
    check("contactNumber").isString().optional(),
    check("emergencyContact").isString().optional(),
    check("emergencyContact2").isString().optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { contactNumber, emergencyContact, emergencyContact2 } = req.body;
      console.log("Update Profile Request:", {
        contactNumber,
        emergencyContact,
        emergencyContact2,
      });

      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.contactNumber = contactNumber || user.contactNumber;
      user.emergencyContacts = [
        emergencyContact || user.emergencyContacts[0] || "",
        emergencyContact2 || user.emergencyContacts[1] || "",
      ].filter(Boolean);

      await user.save();
      res.status(200).json({ message: "Profile updated successfully", user });
    } catch (err) {
      console.error("Update Profile Error:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// **Start Server**
const PORT = process.env.PORT || 5001; // Different port to avoid conflict
const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => console.log(`🚀 ML Server running on http://${HOST}:${PORT}`));