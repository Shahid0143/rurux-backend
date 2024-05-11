
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  stream: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stream",
  },
});

module.exports = mongoose.model("Student", studentSchema);