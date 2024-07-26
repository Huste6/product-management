const mongoose = require("mongoose")

const forgotPasswordSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: Date,
            expires: 3000
        }
    },
    {
        timestamps: true
    }
);

const forgotPassword = mongoose.model("forgotPassword", forgotPasswordSchema, "forgot-password");

module.exports = forgotPassword;