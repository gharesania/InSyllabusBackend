const express = require("express");
//const router = express.Router();

const {
  createUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
} = require("../controllers/universityController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

const router = express.Router();
// Create
router.post(
  "/",
  protect,
  authorizeRoles("Admin", "Employee"),
  createUniversity,
);

// Read
router.get("/", getAllUniversities);

router.get("/:id", getUniversityById);

// Update
router.put(
  "/:id",
  protect,
  authorizeRoles("Admin", "Employee"),
  updateUniversity,
);

// Delete
router.delete(
  "/:id",
  protect,
  authorizeRoles("Admin", "Employee"),
  deleteUniversity,
);

module.exports = router;
