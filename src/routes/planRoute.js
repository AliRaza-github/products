const express = require("express");
const router = express.Router();
const { createPlan, getAllPlan, getSinglePlan, deletePlan, updatePlan } = require("../controllers/planController");
const { verifyRole } = require("../middlewares/authMiddleware");

router.post('/create', verifyRole(['admin']), createPlan);
router.get('/get-all', getAllPlan);
router.get('/get/:id', getSinglePlan);
router.put('/update/:id', verifyRole(['admin']), updatePlan);
router.delete('/delete/:id', verifyRole(['admin']), deletePlan);

module.exports = router;
