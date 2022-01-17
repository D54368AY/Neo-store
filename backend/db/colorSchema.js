const mongoose = require("mongoose");
const colorSchema = new mongoose.Schema({
  color_name: {
    type: String,
    required: true,
  },
  color_code: {
    type: String,
    required: true,
  },
  created_at: {
    type:Date,
    default:Date.now
  }
});
module.exports = mongoose.model("color", colorSchema);
