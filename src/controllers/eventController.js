import Event from "../models/Event.js";

export const createEvent = async (req,res)=>{
  res.json(await Event.create(req.body));
};

export const listEvents = async (req,res)=>{
  res.json(await Event.find());
};
