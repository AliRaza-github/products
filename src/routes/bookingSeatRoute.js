const express = require("express");
const router = express.Router();
const bookSeat = require("../controllers/seatBookingModel");
const { verifyRole } = require("../middlewares/authMiddleware");

router.post("/booking", verifyRole(['endUser']), bookSeat.bookSeat);

module.exports = router;
