import express from "express";
import {createEvent,listEvents} from "../controllers/eventController.js";
import {auth,role} from "../middleware/auth.js";

const r = express.Router();

r.post("/",auth,role("admin"),createEvent);
r.get("/",listEvents);

export default r;
