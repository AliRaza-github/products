const BookTour = require("../models/bookTourModel");

function formatPhoneNumber(phoneNumber) {
    // Remove any non-digit characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    // Check if the cleaned phone number starts with '92' and has 10 digits
    if (cleaned.startsWith('92') && cleaned.length === 12) {
        // Format phone number as '+92 XXX XXX XXXX'
        return `+92 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    }
    return phoneNumber; // Return unformatted if invalid
}


exports.createBooking = async (req, res) => {
    try {

        req.body.phone_number = formatPhoneNumber(req.body.phone_number);

        const newBooking = new BookTour(req.body);
        const bookingData = await newBooking.save();
        return res.status(200).json({
            error: null,title:"Booking data", data: bookingData, message: "Booking created successfully"
        })
    } catch (error) {
        return res.status(500).json({ error: error || error.message, data: null, message: 'Failed to create booking', })
    }
}

exports.getAllBooking = async (req, res) => {
    try {

        const bookingData = await BookTour.find();
        return res.status(200).json({
            error: null,title:"Booking data", data: bookingData, message: "Booking data retrive successfully"
        })


    } catch (error) {
        return res.status(500).json({ error: error || error.message, data: null, message: 'Failed to retrive booking list' })
    }
}

exports.getSingleBooking = async (req, res) => {

    const { id } = req.params;

    try {
        const bookingData = await BookTour.findById(id);
        if (!bookingData) {
            return res.status(404).json({ error: null, data: null, message: 'Booking not found' });
        }
        return res.status(200).json({ error: null,title:"Booking data", data: bookingData, message: "Booking data retrive successfully" });
    } catch (error) {
        return res.status(500).json({ error: error || error.message, data: null, message: 'Failed to retrive booking data' })
    }

}

exports.removeAllBooking = async (req, res) => {

    try {
        const bookingData = await BookTour.deleteMany({});
        return 
        
    } catch (error) {
        return res.status(500).json({ error: error || error.message, data: null, message: 'Failed delete booking data' })  
    }

}