import express from "express";
import {bookTicket,verifyTicket} from "../controllers/bookingController.js";
import {auth} from "../middleware/auth.js";

const r = express.Router();

r.post("/",auth,bookTicket);
r.post("/verify",verifyTicket);

export default r;
