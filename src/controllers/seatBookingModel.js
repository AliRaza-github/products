const SeatBooking = require('../models/seatBookingModel');
const User = require('../models/userModel');

const bookSeat = async (req, res) => {
    try {
        const userData = req.user;        
        const { plan } = req.body;

        // Find the user by ID
        const user = await User.findById(userData.id);         

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const existingBooking = await SeatBooking.findOne({ id:user._id });

        if (existingBooking) {
            return res.status(400).json({ error: "User already has an existing booking" });
        }

        // Create a new seat booking
        const newBooking = new SeatBooking({
            user: user._id,
            plan
        });

        // Save the seat booking
        await newBooking.save();

        // Respond with success
        res.status(201).json({
            error:null,         
            data: newBooking,
            message: "Seat booked successfully",
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Internal server error. Failed to book seat."
        });
    }
};

module.exports = {
    bookSeat
};
