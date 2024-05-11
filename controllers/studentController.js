const Student = require("../models/studentModel");
const Marks = require("../models/marksModel");

// Student registration
exports.register = async (req, res) => {
  try {
    const { name, email, stream } = req.body;
    const student = await Student.create({ name, email, stream });
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Student login
exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, error: "Student not found" });
    }
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get student profile by ID
exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, error: "Student not found" });
    }
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get student performance by ID
exports.getPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    const performance = await Marks.find({ student: id }).populate("subject");
    res.status(200).json({ success: true, data: performance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
