const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  location: { type: String, required: true },
  dateRange: { type: String, required: true },
});

module.exports = mongoose.model("Location", LocationSchema);
