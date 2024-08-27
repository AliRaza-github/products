const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    user_id: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    is_read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', notificationSchema);
