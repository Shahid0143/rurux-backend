const Admin = require("../models/adminModel");
const Student = require("../models/studentModel");

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
exports.studentLogin = async (req, res) => {
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

// Admin login (static login with hardcoded credentials)
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "admin123";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      res
        .status(200)
        .json({ success: true, message: "Admin authenticated successfully" });
    } else {
      res
        .status(401)
        .json({ success: false, error: "Invalid admin credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
