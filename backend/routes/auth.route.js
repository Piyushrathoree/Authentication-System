import { Router } from "express";
import {
    registerUser,
    loginUser,
    logout,
} from "../controllers/auth.controller.js";
import { getUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = Router();

// ✅ Normal Authentication Routes
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/getUser", isAuthenticated, getUser);

export default router;
