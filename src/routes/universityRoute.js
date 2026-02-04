const express = require("express");
const router = express.Router();

const universityController = require("../controllers/universityController");

// Create
router.post("/", universityController.createUniversity);

// Read
router.get("/", universityController.getAllUniversities);
router.get("/:id", universityController.getUniversityById);

// Update
router.put("/:id", universityController.updateUniversity);

// Delete
router.delete("/:id", universityController.deleteUniversity);

module.exports = router;
