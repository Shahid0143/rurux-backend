
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: String,
  streams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stream",
    },
  ],
});

module.exports = mongoose.model("Subject", subjectSchema);