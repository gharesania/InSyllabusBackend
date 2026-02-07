const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    subjectName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
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
      unique: true,
    },

    items: [cartItemSchema],

    pricing: {
      totalAmount: {
        type: Number,
        default: 0,
      },
      discountPercent: {
        type: Number,
        default: 0,
      },
      discountAmount: {
        type: Number,
        default: 0,
      },
      payableAmount: {
        type: Number,
        default: 0,
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
