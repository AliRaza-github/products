const BookTour = require('../models/bookTourModel');

const getTabs = async (req, res) => {
    try {
        const userRole = req.user.role;
        let tabsData = {
            analytics: [],
            booking: [],
            notifications: []
        };

        // Fetch all booking data
        const bookingData = await BookTour.find({});

        // Define tabs based on user role
        if (userRole === 'admin') {
            tabsData.booking = {
                title: "Booking Data",
                data: bookingData
            };
            // Add analytics and notifications data if required
            // Example:
            // tabsData.analytics = {
            //     title: "Analytics Data",
            //     data: analyticsData
            // };
            // tabsData.notifications = {
            //     title: "Notifications",
            //     data: notificationsData
            // };
        } else if (userRole === 'endUser') {
            // End user only gets notifications tab, but no booking data
            tabsData.notifications = {
                title: "Notifications",
                data: [] // Add actual notifications data here if needed
            };
        } else {
            return res.status(403).json({ error: "Forbidden: Invalid role", message: "You do not have access to the requested data." });
        }

        // Construct the response based on accessible tabs
        const response = {
            error: null,
            title: 'Tabs data',
            data: tabsData,
            message: "Tabs data."
        };

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({ error: error.message, data: null, message: "Internal server error. Failed to retrieve tabs data." });
    }
};

module.exports = {
    getTabs
};
