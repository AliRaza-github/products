// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Route to send a message
router.post('/message', chatController.sendMessage);

// Route to get all messages
router.get('/messages', chatController.getMessages);

module.exports = router;
