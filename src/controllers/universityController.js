const University = require("../models/University");

const createUniversity = async (req, res) => {
  try {
    const { name } = req.body;

    const existingUniversity = await University.findOne({ name });
    if (existingUniversity) {
      return res.status(400).json({
        success: false,
        message: "University already exists",
      });
    }

    const university = await University.create({ name });

    res.status(201).json({
      success: true,
      message: "University created successfully",
      data: university,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create university",
      error: error.message,
    });
  }
};

const getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Universities fetched successfully",
      data: universities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch universities",
      error: error.message,
    });
  }
};

const getUniversityById = async (req, res) => {
  try {
    const { id } = req.params;

    const university = await University.findById(id);
    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "University fetched successfully",
      data: university,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch university",
      error: error.message,
    });
  }
};

const updateUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const university = await University.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "University updated successfully",
      data: university,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update university",
      error: error.message,
    });
  }
};

const deleteUniversity = async (req, res) => {
  try {
    const { id } = req.params;

    const university = await University.findByIdAndDelete(id);
    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "University deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete university",
      error: error.message,
    });
  }
};

module.exports = {createUniversity, getAllUniversities, getUniversityById, updateUniversity, deleteUniversity}