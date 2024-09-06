// const BookTour = require('../models/bookTourModel');
// const Notification = require('../models/notificationModel');
// const seatBooking = require('../models/seatBookingModel');

// // Assign the data to a variable
// const graphData = [
//     { "month": "Jan", "value": 400 },
//     { "month": "Feb", "value": 300 },
//     { "month": "Mar", "value": 500 }
// ];

// const getTabs = async (req, res) => {
//     try {
//         const userRole = req.user.role;
//         let tabsData = {};

//         // Fetch all booking data
//         const bookingData = await BookTour.find({});

//         // Fetch all notification data
//         const notificationData = await Notification.find({});


//         // fetch the booking data of up comming bookings    
//         const [allBookingsCount, upcomingBookingsCount] = await Promise.all([
//             BookTour.countDocuments({}),
//             BookTour.countDocuments({ status: 'Upcoming' })
//         ]);

//         // fetch the memberships
//         const [allSeatBookingsCount] = await Promise.all([
//             seatBooking.countDocuments({}),

//         ]);


//         if (userRole === 'admin') {
//             tabsData.dashboard = {
//                 title: "Dashboard",
//                 data: {
//                     summaries: [
//                         {
//                             title: "Upcomming Bookings",
//                             value: upcomingBookingsCount
//                         },
//                         {
//                             title: "Total Members",
//                             value: allSeatBookingsCount
//                         },

//                     ],
//                     Graph: {
//                         title: "Graph Data",
//                         value: graphData
//                     }
//                 }
//             }
//         }

//         // Define tabs based on user role
//         if (userRole === 'admin') {
//             tabsData.booking = {
//                 title: "Booking Data",
//                 data: bookingData
//             };
//             tabsData.notifications = {
//                 title: "Notifications Data",
//                 data: notificationData
//             };

//         } else if (userRole === 'endUser') {
//             // End user only gets notifications tab
//             tabsData.notifications = {
//                 title: "Notifications",
//                 data: notificationData
//             };
//         } else {
//             return res.status(403).json({ error: "Forbidden: Invalid role", message: "You do not have access to the requested data." });
//         }

//         // Construct the response based on accessible tabs
//         const response = {
//             error: null,
//             title: 'Tabs data',
//             data: tabsData,
//             message: "Tabs data."
//         };

//         return res.status(200).json(response);

//     } catch (error) {
//         return res.status(500).json({ error: error.message, data: null, message: "Internal server error. Failed to retrieve tabs data." });
//     }
// };

// module.exports = {
//     getTabs
// };

// // const BookTour = require('../models/bookTourModel');
// // const Notification = require('../models/notificationModel');

// // const getTabs = async (req, res) => {
// //     try {
// //         const userRole = req.user.role;
// //         let tabsData = {};

// //         // Fetch all booking data
// //         const bookingData = await BookTour.find({});

// //         // Fetch all notification data
// //         const notificationData = await Notification.find({});

// //         // Define tabs based on user role
// //         if (userRole === 'admin') {
// //             tabsData.booking = {
// //                 title: "Booking Data",
// //                 data: bookingData
// //             };
// //             tabsData.notifications = {
// //                 title: "Notifications Data",
// //                 data: notificationData
// //             };
// //             // Optionally add analytics data here if needed
// //             // tabsData.analytics = {
// //             //     title: "Analytics Data",
// //             //     data: analyticsData
// //             // };
// //         } else if (userRole === 'endUser') {
// //             tabsData.notifications = {
// //                 title: "Notifications",
// //                 data: notificationData
// //             };
// //         } else {
// //             return res.status(403).json({ error: "Forbidden: Invalid role", message: "You do not have access to the requested data." });
// //         }

// //         // Construct the response based on accessible tabs
// //         const response = {
// //             error: null,
// //             title: 'Tabs data',
// //             data: tabsData,
// //             message: "Tabs data."
// //         };

// //         return res.status(200).json(response);

// //     } catch (error) {
// //         return res.status(500).json({ error: error.message, data: null, message: "Internal server error. Failed to retrieve tabs data." });
// //     }
// // };

// // module.exports = {
// //     getTabs
// // };


const BookTour = require('../models/bookTourModel');
const Notification = require('../models/notificationModel');
const seatBooking = require('../models/seatBookingModel');

// Assign the data to a variable
const graphData = [
    { "month": "Jan", "value": 400 },
    { "month": "Feb", "value": 300 },
    { "month": "Mar", "value": 500 }
];

const getTabs = async (req, res) => {
    try {
        const userRole = req.user.role;
        let tabsData = [];

        // Fetch all booking data
        const bookingData = await BookTour.find({});

        // Fetch all notification data
        const notificationData = await Notification.find({});

        // Fetch the booking data of upcoming bookings
        const [allBookingsCount, upcomingBookingsCount] = await Promise.all([
            BookTour.countDocuments({}),
            BookTour.countDocuments({ status: 'Upcoming' })
        ]);

        // Fetch the memberships
        const [allSeatBookingsCount] = await Promise.all([
            seatBooking.countDocuments({}),
        ]);

        if (userRole === 'admin') {
            tabsData.push({
                title: "Dashboard",
                data: {
                    summaries: [
                        {
                            title: "Upcoming Bookings",
                            value: upcomingBookingsCount
                        },
                        {
                            title: "Total Members",
                            value: allSeatBookingsCount
                        }
                    ],
                    Graphs: [
                        {
                            title: "Occupancy rate",
                            value: graphData
                        }
                    ]
                }
            });
        }

        if (userRole === 'admin'){
            tabsData.push ({
                title:'Plans',
                data:{
                    
                }
            })
        }

        // Define tabs based on user role
        if (userRole === 'admin') {
            const cubicleBookings = bookingData.filter(booking => booking.type === 'Cubicle');
            const tourBookings = bookingData.filter(booking => booking.type === 'Tour');

            tabsData.push({
                title: "Bookings",
                data: [
                    {
                        title: "Cubicle Bookings",
                        date: cubicleBookings.map(booking => ({
                            ...booking.toObject(),
                            status: booking.status // or transform status as needed
                        }))
                    },
                    {
                        title: "Tour Bookings",
                        date: tourBookings.map(booking => ({
                            ...booking.toObject(),
                            status: booking.status // or transform status as needed
                        }))
                    }
                ]
            });

            tabsData.push({
                title: "Notifications",
                data: notificationData
            });
        } else if (userRole === 'endUser') {
            tabsData.push({
                title: "Notifications",
                data: notificationData
            });
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

