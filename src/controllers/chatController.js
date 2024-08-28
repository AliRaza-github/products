// controllers/chatController.js
const Message = require('../models/messageModel');
const pusher = require('../utils/pusher');

// Handle sending a new message
exports.sendMessage = async (req, res) => {
  const { text, sender } = req.body;

  try {
    // Save message to MongoDB
    const message = new Message({ text, sender });
    await message.save();

    // Trigger Pusher event
    pusher.trigger('chat-channel', 'message', {
      text,
      sender
    });

    res.status(201).json({ message: 'Message sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Handle fetching all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
