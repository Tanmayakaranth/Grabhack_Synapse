import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AttemptSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: "Order" },
  driverId: String,
  time: Date,
  reason: String
});

export default mongoose.model("DeliveryAttempt", AttemptSchema);
