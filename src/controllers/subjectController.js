const Subject = require("../models/Subject");

const createSubject = async (req, res) => {
  try {

    console.log("HEADERS:", req.headers["content-type"]);
    console.log("BODY:", req.body);

    // const { branchId } = req.body; // this will still fail

    const {
      branchId,
      semesterId,
      name,
      description,
      price,
      type,
    } = req.body;

    const subject = await Subject.create({
      branchId,
      semesterId,
      name,
      description,
      price,
      type,
    });

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: subject,
    });
  } catch (error) {
    console.log("createSubject Error: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to create subject",
      error: error.message,
    });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const filter = {};

    if (req.query.branchId) filter.branchId = req.query.branchId;
    if (req.query.semesterId) filter.semesterId = req.query.semesterId;
    if (req.query.type) filter.type = req.query.type;

    const subjects = await Subject.find(filter)
      .populate("branchId", "name")
      .populate("semesterId", "number")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subjects",
      error: error.message,
    });
  }
};

const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate("branchId", "name")
      .populate("semesterId", "number");

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject fetched successfully",
      data: subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subject",
      error: error.message,
    });
  }
};

const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      data: subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update subject",
      error: error.message,
    });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete subject",
      error: error.message,
    });
  }
};

module.exports = {createSubject, getAllSubjects, getSubjectById, updateSubject, deleteSubject}