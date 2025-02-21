import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"

const verifyUser = async (req, res, next) => {
  try {

    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    console.log(token);
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedInfo = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedInfo._id);
      
    const user = await User.findById(decodedInfo?._id || decodedInfo?.id);
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    return next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unautherized access token" });
  }
};


export {verifyUser}