const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    number: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
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

// Prevent duplicate semester number under same branch
semesterSchema.index(
  { branchId: 1, number: 1 },
  { unique: true }
);

module.exports = mongoose.model("Semester", semesterSchema);
