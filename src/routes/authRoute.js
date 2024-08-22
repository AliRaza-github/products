const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controllers/authController");
// const authMiddleware = require('../middleware/authMiddleware');

// router.use(authMiddleware.verifyAdmin);

router.post('/login', adminLogin);

module.exports = router;
