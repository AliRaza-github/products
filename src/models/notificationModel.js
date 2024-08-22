const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    is_read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', notificationSchema);
