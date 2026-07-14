const Comparison = require("../models/Comparison");

const getHistory = async (req, res) => {
  try {
    const history = await Comparison.find({
      user: req.user.id,
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

const deleteHistory = async (req, res) => {
  try {
    const comparison = await Comparison.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!comparison) {
      return res.status(404).json({
        success: false,
        message: "Comparison not found",
      });
    }

    await comparison.deleteOne();

    res.json({
      success: true,
      message: "Comparison deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete comparison",
    });
  }
};

module.exports = {
  getHistory,
  deleteHistory,
};
