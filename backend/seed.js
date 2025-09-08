import dotenv from "dotenv";
import mongoose from "mongoose";
import Order from "./models/Order.js";
import User from "./models/User.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // 1. Create a test user
    const user = await User.create({
      name: "Test User",
      phone: "+911234567890",
      autoRescheduleOptIn: false, // change to true if you want auto-reschedule
      preferredWindows: [
        { dayOfWeek: 1, startHour: 9, endHour: 12 }, // Mondays 9AM-12PM
        { dayOfWeek: 3, startHour: 14, endHour: 18 } // Wednesdays 2PM-6PM
      ]
    });

    console.log("👤 User created:", user);

    // 2. Create a test order linked to that user
    const order = await Order.create({
      orderNumber: "ORDER123",
      recipient: user._id,
      address: { lat: 12.9716, lng: 77.5946 }, // sample coords
      status: "pending",
      scheduledSlot: {
        start: new Date(Date.now() + 60 * 60 * 1000),
        end: new Date(Date.now() + 2 * 60 * 60 * 1000),
      }
    });

    console.log("📦 Order created:", order);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seed();
