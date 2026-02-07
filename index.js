import dotenv from "dotenv";
dotenv.config();   // ✅ SABSE UPAR

import express from "express";

import authRoutes from "./src/routes/authRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";

import dbConnection from "./src/config/dbConnection.js";

dbConnection();

const app = express();
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/events",eventRoutes);
app.use("/api/book",bookingRoutes);
app.use("/api/payment",paymentRoutes);

app.listen(process.env.PORT,()=>{
  console.log("Server running 🚀");
});
