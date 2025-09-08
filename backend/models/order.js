import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderNumber: String,
  recipient: { type: Schema.Types.ObjectId, ref: "User" },
  address: { lat: Number, lng: Number },
  status: { type: String, default: "pending" },
  scheduledSlot: { start: Date, end: Date },
  reschedule: {
    suggestion: { start: Date, end: Date },
    autoConfirmed: Boolean,
    createdAt: Date
  }
});

export default mongoose.model("Order", OrderSchema);
