const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path as needed

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected with ID:', socket.id);

    // Handle user authentication
    socket.on('authenticate', async ({ token }) => {
      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        socket.role = decoded.role; // Save the role in socket object
        console.log('User authenticated:', socket.role);
        socket.emit('authenticated', { role: socket.role });
        // Join room based on role
        if (socket.role === 'admin') {
          socket.join('admins');
        } else if (socket.role === 'user') {
          socket.join('users');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        socket.disconnect();
      }
    });

    // Handle incoming messages
    socket.on('message', ({ toRole, message }) => {
      if (toRole === 'admin') {
        io.to('admins').emit('message', message); // Broadcast to admins
      } else if (toRole === 'user') {
        io.to('users').emit('message', message); // Broadcast to users
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected with ID:', socket.id);
    });
  });
};
