import Order from "../models/Order.js";
import Attempt from "../models/DeliveryAttempt.js";

function generateSlots() {
  const now = new Date();
  return Array.from({ length: 3 }).map((_, i) => {
    const start = new Date(now.getTime() + (i + 1) * 60 * 60 * 1000);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    return { start, end };
  });
}

export const failedAttempt = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { driverId, reason } = req.body;

    const order = await Order.findById(orderId).populate("recipient");
    if (!order) return res.status(404).json({ error: "Order not found" });

    await Attempt.create({ order: order._id, driverId, time: new Date(), reason });

    const slots = generateSlots();

    if (order.recipient.autoRescheduleOptIn) {
      order.reschedule = { suggestion: slots[0], autoConfirmed: true, createdAt: new Date() };
      order.status = "rescheduled";
      await order.save();
      return res.json({ autoConfirmed: true, newSlot: slots[0] });
    } else {
      order.reschedule = { suggestion: slots[0], autoConfirmed: false, createdAt: new Date() };
      await order.save();
      return res.json({ autoConfirmed: false, suggestions: slots });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const confirmReschedule = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { selectedSlot } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.scheduledSlot = selectedSlot;
    order.status = "rescheduled";
    await order.save();

    res.json({ message: "Reschedule confirmed", slot: selectedSlot });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSuggestions = async (req, res) => {
  const slots = generateSlots();
  res.json({ suggestions: slots });
};
