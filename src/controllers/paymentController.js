import razor from "../config/razorpay.js";
import crypto from "crypto";
import Booking from "../models/Booking.js";
import QRCode from "qrcode";


// 🔹 Create Razorpay Order
export const createOrder = async (req,res)=>{
  const {amount, booking_id} = req.body;

  const order = await razor.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: booking_id
  });

  res.json(order);
};


// 🔹 Verify Payment + Generate Ticket
export const verifyPayment = async (req,res)=>{
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    booking_id
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if(expected !== razorpay_signature)
    return res.status(400).send("Payment invalid");

  const booking = await Booking.findById(booking_id);

  if(!booking) return res.send("Booking not found");

  booking.payment_status = "paid";

  const qr = await QRCode.toDataURL(booking.ticket_no);
  booking.qr = qr;

  await booking.save();

  res.send("Payment success ✅");
};
