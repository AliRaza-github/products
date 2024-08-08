const express = require("express");
const router = express.Router();
const { registration, login  ,activeUser} = require("../controllers/userController");
router.post("/register", registration);
router.post("/login", login);
 router.get("/verify-email/:id/:token", activeUser)


module.exports = router;
