const User = require("../models/userModel");

const approveUser = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!['admin', 'accountant', 'manager', 'endUser'].includes(role)) {
        return res.status(400).json({
            error: "Invalid role",
            data: null,
            message: "The provided role is not valid"
        });
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(id,
            { role, is_approved: true }, { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                error: "User not found",
                data: null,
                message: "No user found with the provided ID"
            });
        }

        return res.status(500).json({ error: null, data: updatedUser, message: 'User approved successfully' });
    } catch (error) {
        return res.status(500).json({ error: error || error.message, data: null, message: "An error occurred while updating the user role." });
    }
}

module.exports = { approveUser };