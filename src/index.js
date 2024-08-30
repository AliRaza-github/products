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

const authRoutes = require("./routes/authRoute");
const dashboardTabs = require("./routes/dashboardTabsRoute");
const chatRoutes = require('./routes/chatRoute');
const notification = require("./routes/notificationRoute");
const admin = require("./routes/adminRoutes");
const bookTour = require("./routes/bookingTourRoute");

require("dotenv").config();
const mongoUri = process.env.MONGO_URI;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3001', // Allow this origin for Socket.IO
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
});

app.use(cors({
  origin: 'http://localhost:3001', // Allow this origin for CORS
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardTabs);
app.use("/api", notification);
app.use("/api/admin", admin);
app.use('/api/chat', chatRoutes);
app.use('/api/tour', bookTour);

app.get('/home', (req, res) => {
  res.status(200).send('home vercel');
});

// Set up Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected with ID:', socket.id);

  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    io.emit('message', msg); // Broadcast message to all clients
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
