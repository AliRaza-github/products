const express = require('express');
const router = express.Router();
const { verifyRole } = require('../middlewares/authMiddleware');
const { getAllNotification, markAsRead } = require('../controllers/notificationController');

router.get('/notification', verifyRole(['admin']), getAllNotification);
router.put('/notification/:id', verifyRole(['admin']), markAsRead);

module.exports = router;
