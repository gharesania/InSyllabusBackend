const Program = require("../models/Program");

const createProgram = async (req, res) => {
  try {
    const { universityId, name } = req.body;

    const program = await Program.create({
      universityId,
      name,
    });

    res.status(201).json({
      success: true,
      message: "Program created successfully",
      data: program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create program",
      error: error.message,
    });
  }
};

const getAllPrograms = async (req, res) => {
  try {
    const filter = {};

    if (req.query.universityId) {
      filter.universityId = req.query.universityId;
    }

    const programs = await Program.find(filter)
      .populate("universityId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Programs fetched successfully",
      data: programs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch programs",
      error: error.message,
    });
  }
};

const getProgramById = async (req, res) => {
  try {
    const id = req.params.id.trim();

    const program = await Program.findById(id).populate(
      "universityId",
      "name"
    );

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Program fetched successfully",
      data: program,
    });
  } catch (error) {
    console.log("getProgramById", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch program",
      error: error.message,
    });
  }
};

const updateProgram = async (req, res) => {
  try {
    const id = req.params.id.trim(); 

    const program = await Program.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Program updated successfully",
      data: program,
    });
  } catch (error) {
    console.log("updateProgram", error);
    res.status(500).json({
      success: false,
      message: "Failed to update program",
      error: error.message,
    });
  }
};

const deleteProgram = async (req, res) => {
  try {
    const id = req.params.id.trim(); 

    const program = await Program.findByIdAndDelete(id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Program deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete program",
      error: error.message,
    });
  }
};

module.exports = {createProgram, getAllPrograms, getProgramById, updateProgram, deleteProgram}