import { mongo, mongoose, Schema } from "mongoose";


const userSchema = new Schema({
    displayName: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        // minlength: [8, "minimum length is 8"],
        // select: false
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    emailVerified: {
        type: Date,
    },
    resetPasswordToken: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "seller", "admin", "editor"],
        lowercase: true,
        default:"user"
    },
    address: [
        { street: String }, { postalCode: String }, { district: String }, { country: String }
    ]
}, {
    timestamps: true
})


export const User = mongoose.model("User", userSchema);
