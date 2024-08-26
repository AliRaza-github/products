const express = require('express');
const router = express.Router();
const { verifyRole } = require('../middlewares/authMiddleware');
const dashboardController = require('../controllers/dashboardTabs');

router.get('/tabs', verifyRole(['admin', 'endUser']), dashboardController.getTabs);

module.exports = router;
