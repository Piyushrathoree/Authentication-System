import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const isAuthenticated = async(req, res, next) => {
    
   const token = req.cookies.token;

    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized: No token found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.find({ id: decoded._id, email: decoded.email })
        req.user = user; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
