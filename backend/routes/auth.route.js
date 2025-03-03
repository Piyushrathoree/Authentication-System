import { Router } from "express";
import {
    registerUser,
    loginUser,
    logout,
} from "../controllers/auth.controller.js";
import {
    googleAuthCallback,
    googleAuthRedirect,
} from "../controllers/googleAuth.controller.js";
import {isAuthenticated} from "../middlewares/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";
import passport from "../config/passport.js"; // Import initialized passport instance


const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/google", googleAuthRedirect);
router.get(
    "/google/callback",
    // Setting session: false because we're using JWT tokens for authentication
    // instead of traditional session-based auth. This prevents Passport from
    // creating and managing sessions, as we handle auth state via JWT tokens
    // stored in HTTP-only cookies
    passport.authenticate("google", { session: false }),
    googleAuthCallback
);
// This route is protected, so only authenticated users can access it
router.get("/protected", isAuthenticated, getUser);
export default router;
