const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    courseName: {
      type: String,
      required: true, // for faster UI rendering
    },

    price: {
      type: Number,
      required: true, // ₹999
    },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      unique: true, // one cart per user
    },

    items: [cartItemSchema],

    pricing: {
      totalAmount: {
        type: Number,
        default: 0, // 2997
      },

      discountPercent: {
        type: Number,
        default: 0, // 25
      },

      discountAmount: {
        type: Number,
        default: 0, // 749
      },

      payableAmount: {
        type: Number,
        default: 0, // 2245
      },
    },

    status: {
      type: String,
      enum: ["ACTIVE", "CHECKED_OUT"],
      default: "ACTIVE",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cart", cartSchema);
