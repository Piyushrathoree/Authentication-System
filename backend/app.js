import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env before anything else
import express, { json } from "express";
import cookieParser from "cookie-parser";
import passport from "passport";

import session from "express-session";
import authRoutes from "./routes/auth.route.js";

const app = express();

// Middleware
app.use(json());
app.use(cookieParser());


// Routes
app.use("/api/auth", authRoutes);

export default app;
