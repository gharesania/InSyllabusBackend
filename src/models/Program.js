const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate program under same university
programSchema.index({ universityId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Program", programSchema);
