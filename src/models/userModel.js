const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    is_approved: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'accountant', 'manager', 'endUser'],
        default: 'endUser'
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)

