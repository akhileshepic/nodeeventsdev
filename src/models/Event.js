import mongoose from "mongoose";

export default mongoose.model("Event", new mongoose.Schema({
  title: String,
  category: String, // school/college/society
  date: Date,
  location: String,
  ticket_mode: { type:String, enum:["free","paid","mixed"] },
  price: Number,
  total_seats: Number,
  booked: { type:Number, default:0 }
},{timestamps:true}));
