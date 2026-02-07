import express from "express";
import {createOrder,verifyPayment} from "../controllers/paymentController.js";
import {auth} from "../middleware/auth.js";

const r = express.Router();

r.post("/create-order", auth, createOrder);
r.post("/verify", verifyPayment);

export default r;
