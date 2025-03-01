import User from "../models/user.model.js";
import { z } from "zod";
export const registerUser = async (req, res) => {
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

    try {
        const validatedData = userSchema.parse(req.body);
        // Continue with registration using validatedData...
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.errors.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            });
        }
    }

    const { name, email, password } = validatedData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(401).send("user already exists , please login");
    }

    const hashPass = await User.hashPassword(password);

    const newUser = new User({
        name: {
            firstName: name.firstName,
            lastName: name.lastName || "",
        },
        email,
        password: hashPass,
    });

    if (!newUser) {
        return res
            .status(400)
            .json({ message: "Something went wrong while signup" });
    }
    await newUser.save();
    res.status(200).json({ message: "user register successfully" });
};

