const Pusher = require('pusher');
const Message = require('../models/messageModel');
require('dotenv').config();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
};

exports.sendMessage = async (req, res) => {
  const data = req.user;
  
  const {  message } = req.body;

  try {
    const newMessage = new Message({
      
      role:data.role, message 
    });
    const savedMessage = await newMessage.save();

    pusher.trigger('chat-channel', 'new-message', {
      role: savedMessage.role,
      message: savedMessage.message,
      timestamp: savedMessage.timestamp,
    });

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
};
