// ✅ AUTH CONTROLLER (SIGNUP, LOGIN, GOOGLE OAUTH)
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { z } from "zod";

export const registerUser = async (req, res) => {
    try {
        const userSchema = z.object({
            name: z.object({
                firstName: z.string().min(1, "First name is required"),
                lastName: z.string().optional(),
            }),
            email: z.string().email("Invalid email format"),
            password: z
                .string()
                .min(8, "Password must be at least 8 characters")
                .regex(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                ),
        });
        const validatedData = userSchema.parse(req.body);
        const { name, email, password } = validatedData;

        let user = await User.findOne({ email });
        if (user)
            return res.status(401).send("User already exists, please login");

        user = new User({
            name: { firstName: name.firstName, lastName: name.lastName || "" },
            email,
            password: await User.hashPassword(password),
        });

        await user.save();
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        return res
            .status(400)
            .json({ message: "Validation failed", error: error.errors });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.isPasswordCorrect(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            user,
            token,
            message: "User logged in successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const logout = (req, res) => {
    req.logout(() => {
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    });
};
