const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getProfile,
  refreshToken,
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);

router.get("/profile", protect, getProfile);
router.post("/logout", protect, logout);

module.exports = router;
