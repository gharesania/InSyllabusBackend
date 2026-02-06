const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },

    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
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

// Prevent duplicate branch under same university + program
branchSchema.index(
  { universityId: 1, programId: 1, name: 1 },
  { unique: true }
);

module.exports = mongoose.model("Branch", branchSchema);
