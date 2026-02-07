import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import QRCode from "qrcode";

export const bookTicket = async (req,res)=>{
  const event = await Event.findById(req.body.event_id);
  if(!event) return res.send("Event not found");

  if(event.booked >= event.total_seats)
    return res.send("Seats full");

  let price = 0;

  if(event.ticket_mode === "paid")
    price = event.price;

  if(event.ticket_mode === "mixed"){
    price = event.booked < process.env.FREE_LIMIT ? 0 : event.price;
  }

  const ticket_no = "EVT"+Date.now();

  const qr = await QRCode.toDataURL(ticket_no);

  const booking = await Booking.create({
    event_id:event._id,
    user_id:req.user.id,
    ticket_no,
    price,
    payment_status: price>0 ? "pending" : "free",
    qr
  });

  event.booked++;
  await event.save();

  res.json(booking);
};
 
export const verifyTicket = async (req,res)=>{
  const b = await Booking.findOne({ticket_no:req.body.ticket_no});
  if(!b) return res.send("Invalid");

  if(b.used) return res.send("Already used");

  b.used = true;
  await b.save();

  res.send("Entry allowed ✅");
};
