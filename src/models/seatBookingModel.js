const mongoose = require("mongoose");
const moment = require('moment'); // Add moment for date formatting

const seatBookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
        unique: true
    },
    plan: {
        type: String,
        enum: ['FlexSpace', 'ProSpace', 'SuperiorSpace'],
        default: 'FlexSpace'
    },
    booking_date: {
        type: Date,
        default: Date.now // Set default to the current date and time
    }
}, { timestamps: true });

module.exports = mongoose.model("SeatBooking", seatBookingSchema);
