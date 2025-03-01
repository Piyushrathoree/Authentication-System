import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
        }
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        minlength: 8,
        validate: {
            validator: function(password) {
                // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
                const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                return strongPasswordRegex.test(password);
            },
            message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character'
        },
        required: true
    },

})


const User = mongoose.model('User', userSchema);