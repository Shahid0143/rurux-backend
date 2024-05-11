
const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Stream", streamSchema);