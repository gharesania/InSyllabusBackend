const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getProfile,
  refreshToken,
} = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);

router.get("/profile", authMiddleware, getProfile);
router.post("/logout", authMiddleware, logout);

module.exports = router;
