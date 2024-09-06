const Plan = require("../models/planModel");

exports.createPlan = async (req, res) => {
    try {
        const plan = new Plan(req.body);
        await plan.save();
        return res.status(200).json({ error: null, data: plan, message: "Plan save successfully." });

    } catch (error) {
        return res.status(500).json({ error: error || error.message, data: null, message: "Error in saving plan." });
    }
}

exports.getAllPlan = async (req, res) => {
    try {
        const plan = await Plan.find();
        return res.status(200).json({ error: null, data: plan, message: "Plans retrive successfully" });
    } catch (error) {
        return res.status(500).json({ error: error || error.message, data: null, message: "Error in retriving  plans list." });
    }
}

exports.getSinglePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await Plan.findById(id);
        return res.status(200).json({ error: null, data: plan, message: "Plan retrive successfully" });
    } catch (error) {
        return res.status(500).json({ error: error || error.message, data: null, message: "Error in retriving plan." });
    }
}

exports.updatePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const plan = await Plan.findByIdAndUpdate(id, updatedData, { new: true });

        if (!plan) {
            return res.status(404).json({ error: null, data: null, message: "Plan not found." });
        }

        return res.status(200).json({ error: null, data: plan, message: "Plan updated successfully." });
    } catch (error) {
        return res.status(500).json({ error: error.message, data: null, message: "Error in updating plan." });
    }
}


exports.deletePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await Plan.findByIdAndDelete(id);
        return res.status(200).json({ error: null, data: plan, message: "Plan delete successfully" });
    } catch (error) {
        return res.status(500).json({ error: error || error.message, data: null, message: "Error in removing plan." });
    }
}