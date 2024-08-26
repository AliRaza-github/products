const getTabs = (req, res) => {
    // all tabs
    const allTabs = {
        analytics: { data: 'Analytics data' },
        booking: { data: 'Booking data' },
        settings: { data: 'Settings data' }
    };

    // Filter tabs based on user role
    const userRole = req.user.role;
    let accessibleTabs = {};

    if (userRole === 'admin') {
        accessibleTabs = allTabs; // Admin sees all tabs
    } else if (userRole === 'endUser') {
        accessibleTabs = {
            settings: allTabs.settings // End user only sees settings tab
        };
    } else {
        return res.status(403).json({ message: 'Forbidden: Invalid role' });
    }

    res.json(accessibleTabs);
};

module.exports = {
    getTabs
};
