import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    
    // ✅ 2. Check if JWT token exists in cookies
    const token = req.cookies?.["connect.sid"] || req.cookies?.token; // ✅ Handle both session & JWT token
    console.log("Token Received:", token);

    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized: No token found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded._id, email: decoded.email }; // ✅ Attach user to request
        next(); // ✅ Allow access
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
