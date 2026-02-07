import jwt from "jsonwebtoken";

export const auth = (req,res,next)=>{
  try{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).send("No token");

    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  }catch{
    res.status(401).send("Invalid token");
  }
};

export const role = (r)=>(req,res,next)=>{
  if(req.user.role !== r) return res.status(403).send("Forbidden");
  next();
};
