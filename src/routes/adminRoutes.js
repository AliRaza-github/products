const express = require('express');
const router = express.Router();
const { verifyRole } = require('../middlewares/authMiddleware');
const { approveUser } = require('../controllers/adminController');

router.put('/approve-user/:id', verifyRole(['admin']), approveUser);


module.exports = router;
