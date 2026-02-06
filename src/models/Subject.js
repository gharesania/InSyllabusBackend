const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      default: 0,
    },

    type: {
      type: String,
      enum: ["Free", "Paid"],
      default: "Free",
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
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

// Prevent duplicate subject in same branch + semester
subjectSchema.index(
  { branchId: 1, semesterId: 1, name: 1 },
  { unique: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
