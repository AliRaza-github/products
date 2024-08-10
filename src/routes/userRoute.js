const express = require("express");
const router = express.Router();
const { register, uploadImage, getAll } = require("../controllers/userController");

router.post("/register", register);
router.post("/upload", uploadImage);
router.get("/getAll", getAll);

// router.post("/login", login);
//  router.get("/verify-email/:id/:token", activeUser)

module.exports = router;
