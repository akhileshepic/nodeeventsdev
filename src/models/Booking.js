import mongoose from "mongoose";

export default mongoose.model("Booking", new mongoose.Schema({
  event_id: { type:mongoose.Schema.Types.ObjectId, ref:"Event" },
  user_id: { type:mongoose.Schema.Types.ObjectId, ref:"User" },
  ticket_no: String,
  price: Number,
  payment_status: String,
  qr: String,
  used: { type:Boolean, default:false }
},{timestamps:true}));
