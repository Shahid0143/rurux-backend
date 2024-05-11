const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  stream: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stream",
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  marks: Number,
});

module.exports = mongoose.model("Marks", marksSchema);
