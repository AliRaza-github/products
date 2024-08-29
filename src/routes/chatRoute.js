const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { verifyRole } = require('../middlewares/authMiddleware');

router.get('/messages', verifyRole(['admin', 'endUser']), chatController.getMessages);
router.post('/messages', verifyRole(['admin', 'endUser']), chatController.sendMessage);


module.exports = router;
