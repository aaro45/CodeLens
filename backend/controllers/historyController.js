const Comparison = require("../models/Comparison");

const getHistory = async (req, res) => {
    try {
        const history = await Comparison.find({
            user:req.user.id
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            history,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch history",
        });
    }
};

module.exports = {
    getHistory,
};