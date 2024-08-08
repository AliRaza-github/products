const serverless = require('serverless-http');
require("dotenv").config();
const mongoUri=process.env.MONGO_URI;
const mongoose = require("mongoose");
const express = require("express");

const app = express();

const router = require("./routes/userRoute");
app.use(express.json());

app.use("/api/users", router);
//
app.get('/home', (req, res) => {
    res.status(200).send('home vercel');
  });
//
mongoose.connect(mongoUri).then(() => {
    // app.listen(3000, () => {
        console.log("app is Running at port 3000 ");
        console.log("DB is connected")
    // })
}).catch((error) => {
    console.log("DB connection Error..", error)
})
module.exports = app;
module.exports.handler = serverless(app);