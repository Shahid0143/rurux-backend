// controllers/adminController.js
const Stream = require("../models/streamModel");
const Subject = require("../models/subjectModel");
const Marks = require("../models/marksModel");
const Student = require("../models/studentModel");

// Get all subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new subject
exports.createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    const subject = await Subject.create({ name });
    res.status(201).json(subject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update an existing subject
exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).json(updatedSubject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete an existing subject
exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    await Subject.findByIdAndDelete(id);
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update an existing stream
exports.updateStream = async (req, res) => {
  try {
    const { streamId, newName } = req.body;
    const updatedStream = await Stream.findByIdAndUpdate(
      streamId,
      { name: newName },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedStream });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Delete an existing stream
exports.deleteStream = async (req, res) => {
  try {
    const { streamId } = req.body;
    // Delete stream
    await Stream.findByIdAndDelete(streamId);
    // Delete subjects associated with this stream
    await Subject.deleteMany({ streams: streamId });
    // Delete marks associated with this stream
    await Marks.deleteMany({ stream: streamId });
    res
      .status(200)
      .json({ success: true, message: "Stream deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Add a new subject to a stream
exports.addSubjectToStream = async (req, res) => {
  try {
    const { streamId, subjectName } = req.body;
    const subject = await Subject.create({
      name: subjectName,
      streams: [streamId],
    });
    res.status(201).json({ success: true, data: subject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Update existing subjects list in streams
exports.updateSubjects = async (req, res) => {
  try {
    const { streamId, subjects } = req.body;
    await Subject.deleteMany({ streams: streamId });
    const updatedSubjects = await Subject.insertMany(subjects);
    res.status(200).json({ success: true, data: updatedSubjects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Delete subjects list in streams
exports.deleteSubjects = async (req, res) => {
  try {
    const { streamId } = req.body;
    await Subject.deleteMany({ streams: streamId });
    res
      .status(200)
      .json({ success: true, message: "Subjects deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Add marks for a particular subject
exports.addMarks = async (req, res) => {
  try {
    const { studentId, streamId, subjectId, marks } = req.body;
    const marksData = await Marks.create({
      student: studentId,
      stream: streamId,
      subject: subjectId,
      marks,
    });
    res.status(201).json({ success: true, data: marksData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Update marks for a particular subject
exports.updateMarks = async (req, res) => {
  try {
    const { marksId, marks } = req.body;
    const updatedMarks = await Marks.findByIdAndUpdate(
      marksId,
      { marks },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedMarks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Delete marks for a particular subject
exports.deleteMarks = async (req, res) => {
  try {
    const { marksId } = req.body;
    await Marks.findByIdAndDelete(marksId);
    res
      .status(200)
      .json({ success: true, message: "Marks deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get data of all enrolled students
exports.getStudentList = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ success: true, data: students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
