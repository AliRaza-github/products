// const getTabs = (req, res) => {
//     // all tabs
//     const allTabs = {
//         analytics: { data: 'Analytics data' },
//         booking: { data: 'Booking data' },
//         settings: { data: 'Settings data' }
//     };

//     // Filter tabs based on user role
//     const userRole = req.user.role;
//     let accessibleTabs = {};

//     if (userRole === 'admin') {
//         accessibleTabs = allTabs; // Admin sees all tabs
//     } else if (userRole === 'endUser') {
//         accessibleTabs = {
//             settings: allTabs.settings // End user only sees settings tab
//         };
//     } else {
//         return res.status(403).json({ message: 'Forbidden: Invalid role' });
//     }

//     res.json(accessibleTabs);
// };

// module.exports = {
//     getTabs
// };

const tabsData = {
    analytics: {
        title: "analytics",
        data: {
            occupancyRate: "75%",
            newBookings: "120",
            cancelBookings: "10",
            tourRequests: {
                numericValue: 50,
                table: {
                    upcoming: 20,
                    today: 15,
                    ended: 15
                }
            }
        }
    },
    booking: {
        title: "booking",
        data: {
            newBookings: "15",
            cancelBookings: "2",
            bookingsRequestList: [
                { id: 1, client: "John Doe", date: "2024-08-25", status: "Pending" },
                { id: 2, client: "Jane Smith", date: "2024-08-26", status: "Approved" }
            ],
            eventBooking: [
                { id: 1, event: "Annual Conference", date: "2024-09-10" },
                { id: 2, event: "Product Launch", date: "2024-09-20" }
            ],
            meetingRoomBooking: [
                { id: 1, room: "Conference Room A", date: "2024-08-27", time: "10:00 AM - 12:00 PM" },
                { id: 2, room: "Meeting Room B", date: "2024-08-28", time: "2:00 PM - 3:00 PM" }
            ]
        }
    },
    notifications: {
        title: "notifications",
        data: [
            { id: 1, type: "Reminder", message: "Don’t forget the team meeting at 3 PM today.", timestamp: "2024-08-27T10:00:00Z" },
            { id: 2, type: "Alert", message: "Server maintenance scheduled for midnight.", timestamp: "2024-08-27T12:00:00Z" }
        ]
    },
    settings: {
        title: "settings",
        data: {
            theme: "Light",
            notificationsEnabled: true,
            language: "English",
            userPreferences: {
                dateFormat: "DD/MM/YYYY",
                timeZone: "GMT"
            }
        }
    }
};

const getTabs = (req, res) => {
    const userRole = req.user.role;
    let accessibleTabs = [];

    if (userRole === 'admin') {
        accessibleTabs = Object.values(tabsData); // Admin sees all tabs
    } else if (userRole === 'endUser') {
        accessibleTabs = [tabsData.settings]; // End user only sees settings tab
    } else {
        return res.status(403).json({ message: 'Forbidden: Invalid role' });
    }

    res.json(accessibleTabs);
};

module.exports = {
    getTabs
};
