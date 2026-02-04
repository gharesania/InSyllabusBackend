const Semester = require("../models/Semester");

const createSemester = async (req, res) => {
  try {
    const { branchId, number } = req.body;

    const semester = await Semester.create({
      branchId,
      number,
    });

    res.status(201).json({
      success: true,
      message: "Semester created successfully",
      data: semester,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create semester",
      error: error.message,
    });
  }
};

const getAllSemesters = async (req, res) => {
  try {
    const filter = {};
    if (req.query.branchId) filter.branchId = req.query.branchId;

    const semesters = await Semester.find(filter)
      .populate("branchId", "name")
      .sort({ number: 1 });

    res.status(200).json({
      success: true,
      message: "Semesters fetched successfully",
      data: semesters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch semesters",
      error: error.message,
    });
  }
};

const getSemesterById = async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id).populate(
      "branchId",
      "name"
    );

    if (!semester) {
      return res.status(404).json({
        success: false,
        message: "Semester not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Semester fetched successfully",
      data: semester,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch semester",
      error: error.message,
    });
  }
};

const updateSemester = async (req, res) => {
  try {
    const semester = await Semester.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!semester) {
      return res.status(404).json({
        success: false,
        message: "Semester not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Semester updated successfully",
      data: semester,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update semester",
      error: error.message,
    });
  }
};

const deleteSemester = async (req, res) => {
  try {
    const semester = await Semester.findByIdAndDelete(req.params.id);

    if (!semester) {
      return res.status(404).json({
        success: false,
        message: "Semester not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Semester deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete semester",
      error: error.message,
    });
  }
};

module.exports = {createSemester, getAllSemesters, getSemesterById, updateSemester, deleteSemester};