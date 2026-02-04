const Branch = require("../models/Branch");

const createBranch = async (req, res) => {
  try {
    const { universityId, programId, name } = req.body;

    const branch = await Branch.create({
      universityId,
      programId,
      name,
    });

    res.status(201).json({
      success: true,
      message: "Branch created successfully",
      data: branch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create branch",
      error: error.message,
    });
  }
};

const getAllBranches = async (req, res) => {
  try {
    const filter = {};

    if (req.query.universityId) filter.universityId = req.query.universityId;
    if (req.query.programId) filter.programId = req.query.programId;

    const branches = await Branch.find(filter)
      .populate("universityId", "name")
      .populate("programId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Branches fetched successfully",
      data: branches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch branches",
      error: error.message,
    });
  }
};

const getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id)
      .populate("universityId", "name")
      .populate("programId", "name");

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Branch fetched successfully",
      data: branch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch branch",
      error: error.message,
    });
  }
};

const updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Branch updated successfully",
      data: branch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update branch",
      error: error.message,
    });
  }
};

const deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Branch deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete branch",
      error: error.message,
    });
  }
};

module.exports = {createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch}