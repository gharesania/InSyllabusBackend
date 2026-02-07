const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const { protect } = require("../middlewares/authMiddleware");

// Add subject
router.post("/add", protect, addToCart);

// Get cart
router.get("/", protect, getCart);

// Remove subject
router.delete("/remove/:subjectId", protect, removeFromCart);

// Clear cart
router.delete("/clear", protect, clearCart);

module.exports = router;
