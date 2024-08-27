const Notification = require("../models/notificationModel");

const getAllNotification = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json({
            error: null,
            data: notifications,
            message: "notification date retrive successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error || error.message,
            data: null,
            message: "An error occurred while retrieving notifications."
        });
    }
};

const markAsRead = async (req, res) => {
    const { id } = req.params; // Extract notification ID from route parameters

    try {
        // Find the notification by ID and update 'is_read' to true
        const updatedNotification = await Notification.findByIdAndUpdate(id, 
            { is_read: true }, 
            {
                new: true, // Return the updated document
                runValidators: true // Ensure validators are run
            }
        );

        if (!updatedNotification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedNotification
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the notification."
        });
    }
};


module.exports = { getAllNotification, markAsRead };
