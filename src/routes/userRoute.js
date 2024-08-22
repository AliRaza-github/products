const express = require("express");
const router = express.Router();
const { registerValidator, loginValidator } = require("../validater/validater")
const { register, login } = require("../controllers/userController")

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);

module.exports = router;
