import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env before anything else
import express, { json } from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/auth.route.js";

const app = express();

// ✅ CORS setup to allow frontend to send cookies
app.use(
    cors({
        origin: "http://localhost:3000", // ✅ Update with frontend URL
        credentials: true, // ✅ Required for cookies
    })
);

// ✅ Session setup (for Google OAuth)

// ✅ Middleware
app.use(json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);

export default app;
