// const tabsData = [
//     {    
//         "title": "analytics",
//         "data": {
//             "summaries": [
//                 {
//                     "title": "occupancy rate",
//                     "value": "75%"
//                 },
//                 {
//                     "title": "new bookings",
//                     "value": "120"
//                 },
//                 {
//                     "title": "cancelled bookings",
//                     "value": "10"
//                 }
//             ],
//             "tour_requests": [
//                 {
//                     "id": 1,
//                     "client": "John Doe",
//                     "date": "2024-08-25",
//                     "status": "Pending",
//                     "request_timestamp": "2024-08-24T15:30:00Z"
//                 },
//                 {
//                     "id": 2,
//                     "client": "Jane Smith",
//                     "date": "2024-08-26",
//                     "status": "Approved",
//                     "request_timestamp": "2024-08-25T09:00:00Z"
//                 }
//             ],
//             "event_bookings": [
//                 {
//                     "id": 1,
//                     "event": "Annual Conference",
//                     "date": "2024-09-10",
//                     "event_type": "Conference"
//                 },
//                 {
//                     "id": 2,
//                     "event": "Product Launch",
//                     "date": "2024-09-20",
//                     "event_type": "Product Launch"
//                 }
//             ],
//             "meeting_room_bookings": [
//                 {
//                     "id": 1,
//                     "room": "Conference Room A",
//                     "date": "2024-08-27",
//                     "time": "10:00 - 12:00",
//                     "booking_status": "Confirmed"
//                 },
//                 {
//                     "id": 2,
//                     "room": "Meeting Room B",
//                     "date": "2024-08-28",
//                     "time": "14:00 - 15:00",
//                     "booking_status": "Pending"
//                 }
//             ]
//         }
//     },
//     {    
//         "title": "booking",
//         "data": {
//             "summaries": [
//                 {
//                     "title": "new bookings",
//                     "value": "15"
//                 },
//                 {
//                     "title": "cancelled bookings",
//                     "value": "2"
//                 }
//             ],
//             "tour_requests": [
//                 {
//                     "id": 1,
//                     "client": "John Doe",
//                     "date": "2024-08-25",
//                     "status": "Pending",
//                     "request_timestamp": "2024-08-24T15:30:00Z"
//                 },
//                 {
//                     "id": 2,
//                     "client": "Jane Smith",
//                     "date": "2024-08-26",
//                     "status": "Approved",
//                     "request_timestamp": "2024-08-25T09:00:00Z"
//                 }
//             ],
//             "event_bookings": [
//                 {
//                     "id": 1,
//                     "event": "Annual Conference",
//                     "date": "2024-09-10",
//                     "event_type": "Conference"
//                 },
//                 {
//                     "id": 2,
//                     "event": "Product Launch",
//                     "date": "2024-09-20",
//                     "event_type": "Product Launch"
//                 }
//             ],
//             "meeting_room_bookings": [
//                 {
//                     "id": 1,
//                     "room": "Conference Room A",
//                     "date": "2024-08-27",
//                     "time": "10:00 - 12:00",
//                     "booking_status": "Confirmed"
//                 },
//                 {
//                     "id": 2,
//                     "room": "Meeting Room B",
//                     "date": "2024-08-28",
//                     "time": "14:00 - 15:00",
//                     "booking_status": "Pending"
//                 }
//             ]
//         }
//     },
//     {    
//         "title": "notifications",
//         "data": [
//             {
//                 "id": 1,
//                 "type": "Reminder",
//                 "message": "Don’t forget the team meeting at 3 PM today.",
//                 "timestamp": "2024-08-27T10:00:00Z"
//             },
//             {
//                 "id": 2,
//                 "type": "Alert",
//                 "message": "Server maintenance scheduled for midnight.",
//                 "timestamp": "2024-08-27T12:00:00Z"
//             },
//             {
//                 "id": 3,
//                 "type": "Info",
//                 "message": "New software update available.",
//                 "timestamp": "2024-08-28T08:00:00Z"
//             }
//         ]
//     },
//     {    
//         "title": "settings",
//         "data": {
//             "theme": "Dark",
//             "notifications_enabled": false,
//             "language": "Spanish",
//             "user_preferences": {
//                 "date_format": "MM/DD/YYYY",
//                 "time_zone": "PST"
//             }
//         }
//     }
// ];

//

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
