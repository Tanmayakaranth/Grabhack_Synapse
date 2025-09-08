import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PreferredWindowSchema = new Schema({
  dayOfWeek: Number,
  startHour: Number,
  endHour: Number,
}, { _id: false });

const UserSchema = new Schema({
  name: String,
  phone: String,
  autoRescheduleOptIn: { type: Boolean, default: false },
  preferredWindows: [PreferredWindowSchema],
});

export default mongoose.model("User", UserSchema);
