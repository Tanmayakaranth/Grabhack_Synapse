/*import express from "express";
import { failedAttempt, confirmReschedule, getSuggestions } from "../controllers/orderController.js";

const router = express.Router();

router.post("/:orderId/attempt-failed", failedAttempt);
router.post("/:orderId/reschedule", confirmReschedule);
router.get("/:orderId/reschedule-suggestions", getSuggestions);
// routes/orderRoutes.js
router.get('/failed', async (req, res) => {
  try {
    const failedOrders = await Order.find({ status: 'Failed' });
    console.log("📦 Failed Orders Fetched:", failedOrders); // Debug here
    res.json(failedOrders);
  } catch (err) {
    console.error("❌ Error fetching failed orders:", err);
    res.status(500).json({ error: err.message });
  }
});




export default router;*/


import express from 'express';
import DeliveryAttempt from '../models/DeliveryAttempt.js';
import Order from '../models/order.js';

const router = express.Router();

// GET failed orders
router.get('/api/v1/orders/failed', async (req, res) => {
  try {
    // Find attempts with a failure reason
    const failedAttempts = await DeliveryAttempt.find({ reason: { $exists: true, $ne: '' } })
      .populate('order');

    // Extract unique orders
    const failedOrdersMap = new Map();
    failedAttempts.forEach(attempt => {
      if (attempt.order) failedOrdersMap.set(attempt.order._id.toString(), attempt.order);
    });

    res.json(Array.from(failedOrdersMap.values()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST reschedule
router.post('/api/v1/orders/:id/reschedule', async (req, res) => {
  try {
    const { start, end } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.reschedule = {
      suggestion: { start: new Date(start), end: new Date(end) },
      autoConfirmed: false,
      createdAt: new Date(),
    };

    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

