import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 8,
        validate: {
            validator: function (password) {
                // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
                const strongPasswordRegex =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                return strongPasswordRegex.test(password);
            },
            message:
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
        },
        required: true,
    },
});
userSchema.static.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    return token;
};

userSchema.methods.isPasswordCorrect = async function (password) {
    const password = await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
