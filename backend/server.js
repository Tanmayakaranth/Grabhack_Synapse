/*import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

app.use("/api/v1/orders", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));*/

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import ordersRouter from './routes/orders.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Replace <username> and <password> with your MongoDB credentials
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected ✅'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(ordersRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

