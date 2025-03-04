import { Router } from "express";
import {
    registerUser,
    loginUser,
    logout,
} from "../controllers/auth.controller.js";

const router = Router();

// ✅ Normal Authentication Routes
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);


export default router;
