const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

// Add course to cart
router.post("/add", protect, addToCart);

// Get logged-in user's cart
router.get("/", protect, getCart);

// Remove course from cart
router.delete("/remove/:courseId", protect, removeFromCart);

// Clear cart (after payment)
router.delete("/clear", protect, clearCart);

module.exports = router;
