// // const serverless = require('serverless-http');
// const mongoose = require("mongoose");
// const express = require("express");
// const cors = require('cors');
// const authRoutes = require("./routes/authRoute");
// const dashboardTabs = require("./routes/dashboardTabsRoute");
// const chatRoutes = require('./routes/chatRoute');
// const notification = require("./routes/notificationRoute");
// const admin = require("./routes/adminRoutes");
// const bookTour = require("./routes/bookingTourRoute");

// require("dotenv").config();
// const mongoUri = process.env.MONGO_URI;

// const app = express();
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/dashboard", dashboardTabs);
// app.use("/api", notification);
// app.use("/api/admin", admin);
// app.use('/api/chat', chatRoutes);
// app.use('/api/tour', bookTour);

// app.get('/home', (req, res) => {
//   res.status(200).send('home vercel');
// });
// //
// mongoose.connect(mongoUri).then(() => {
//   console.log("DB is connected")
//   app.listen(3000, () => {
//     console.log("app is Running at port 3000 ");
//   })
// }).catch((error) => {
//   console.log("DB connection Error..", error);
// })


const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const mongoUri = process.env.MONGO_URI;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3001', // Update to match your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
});

app.use(cors({
  origin: 'http://localhost:3001', // Update to match your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('A user connected with ID:', socket.id);

  // Handle user authentication
  socket.on('authenticate', ({ token }) => {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      socket.role = decoded.role; // Save the role in socket object
      socket.userId = decoded.id; // Save the user ID in socket object
      console.log('User authenticated:', socket.role);

      // Join rooms based on role
      if (socket.role === 'admin') {
        socket.join('admins');
      } else if (socket.role === 'endUser') {
        socket.join('users');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      socket.disconnect();
    }
  });

  // Handle messages
  socket.on('message', ({ toRole, message }) => {
    if (toRole === 'admin') {
      io.to('admins').emit('message', { from: socket.role, message });
    } else if (toRole === 'user') {
      io.to('users').emit('message', { from: socket.role, message });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected with ID:', socket.id);
  });
});

mongoose.connect(mongoUri).then(() => {
  console.log("DB is connected");
  server.listen(3000, () => {
    console.log("App is running at port 3000");
  });
}).catch((error) => {
  console.log("DB connection Error:", error);
});
