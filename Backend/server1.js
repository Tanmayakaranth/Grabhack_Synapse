// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 5000;
// const host = 'localhost'; // Explicitly bind to localhost

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Atlas connection
// const MONGO_URI = process.env.MONGO_URI;
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB Atlas'))
// .catch(err => console.error('MongoDB connection error:', err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   fullName: String,
//   email: { type: String, unique: true },
//   password: String,
// });
// const User = mongoose.model('User', userSchema);

// // JWT Secret
// const JWT_SECRET = process.env.JWT_SECRET;

// // Signup Endpoint
// app.post('/signup', async (req, res) => {
//   try {
//     const { fullName, email, password } = req.body;
//     if (!fullName || !email || !password) {
//       return res.status(400).json({ message: 'Please fill all fields' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ fullName, email, password: hashedPassword });
//     await user.save();

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
//     res.status(201).json({ token });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// });

// // Login Endpoint
// app.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Please enter both email and password' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// });

// // Add to server.js
// const authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid token' });
//     req.user = user;
//     next();
//   });
// };

// app.get('/protected', authenticateToken, (req, res) => {
//   res.json({ message: 'This is a protected route', userId: req.user.userId });
// });

// // Start Server
// app.listen(port, host, () => {
//   console.log(`Server running on http://${host}:${port}`);
// });


// **Import Dependencies**
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

// **Load Environment Variables**
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debug log

// **Initialize Express App**
const app = express();
app.use(cors({ origin: "*" })); // Allow all origins (update to specific origin in production)
app.use(express.json());

// **Connect to MongoDB**
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// **Define User Schema**
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, default: "" },
  emergencyContacts: [{ type: String }], // Array to store multiple emergency contacts
  isNeurodivergent: { type: Boolean, default: false }, 
  isHelper: { type: Boolean, default: false }, 
});

// **Create User Model**
const User = mongoose.model("User", userSchema);

// **Signup Route**
app.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log("Signup Request:", { fullName, email }); // Debug log

    // **Validate Input**
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // **Check for Existing User**
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // **Hash Password**
    const hashedPassword = await bcrypt.hash(password, 10);

    // **Create New User**
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    // **Generate JWT Token**
    const token = jwt.sign(
      { id: newUser._id, fullName: newUser.fullName, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // **Send Success Response**
    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    // **Handle Errors**
    console.error("Signup Error:", err.message); // Debug log
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// **Login Route**
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Request:", { email }); // Debug log

    // **Find User by Email**
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // **Validate Password**
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // **Generate JWT Token**
    const token = jwt.sign(
      { id: user._id, fullName: user.fullName, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // **Send Success Response**
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    // **Handle Errors**
    console.error("Login Error:", err.message); // Debug log
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// **Authenticate Token Middleware**
const authenticateToken = (req, res, next) => {
  // **Extract Token from Header**
  const token = req.header("Authorization");
  console.log("Authorization Header:", token); // Debug log

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    // **Verify Token**
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    // **Handle Invalid Token**
    console.error("Token Verification Error:", err.message); // Debug log
    res.status(400).json({ message: "Invalid Token" });
  }
};

// **Get User Profile Route**
app.get("/profile", authenticateToken, async (req, res) => {
  try {
    // **Fetch User Data**
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // **Send User Data**
    res.status(200).json(user);
  } catch (err) {
    // **Handle Errors**
    console.error("Profile Error:", err.message); // Debug log
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// **Update User Profile Route**
app.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { contactNumber, emergencyContact, emergencyContact2 } = req.body;
    console.log("Update Profile Request:", { contactNumber, emergencyContact, emergencyContact2 }); // Debug log

    // **Find User by ID**
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // **Update User Fields**
    user.contactNumber = contactNumber || user.contactNumber;
    user.emergencyContacts = [
      emergencyContact || user.emergencyContacts[0] || "",
      emergencyContact2 || user.emergencyContacts[1] || "",
    ].filter(Boolean); // Remove empty values

    // **Save Updated User**
    await user.save();

    // **Send Success Response**
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    // **Handle Errors**
    console.error("Update Profile Error:", err.message); // Debug log
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// **Start Server**
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0"; // Allow connections from any IP
app.listen(PORT, HOST, () => console.log(`🚀 Server running on http://${HOST}:${PORT}`));
