const express = require("express");
const router = express.Router();
const bookTour = require("../controllers/bookTourController");

router.post("/booking", bookTour.createBooking);
router.get("/booking", bookTour.getAllBooking);
router.get("/booking/:id", bookTour.getSingleBooking);

module.exports = router;
