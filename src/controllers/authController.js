import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);
  const u = await User.create({...req.body,password:hash});
  res.json(u);
};

export const login = async (req,res)=>{
  const u = await User.findOne({email:req.body.email});
  if(!u) return res.send("User not found");

  const ok = await bcrypt.compare(req.body.password,u.password);
  if(!ok) return res.send("Wrong password");

  const token = jwt.sign(
    {id:u._id, role:u.role},
    process.env.JWT_SECRET
  );

  res.json({token});
};
