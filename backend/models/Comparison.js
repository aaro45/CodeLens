const mongoose = require("mongoose");

const comparisonSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
    language: {
      type: String,
      required: true,
    },
    originalCode: {
      type: String,
      required: true,
    },
    modifiedCode: {
      type: String,
      required: true,
    },
    aiResponse: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comparison", comparisonSchema);