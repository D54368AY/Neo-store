const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
    unique:true,
  },
  created_at: {
    type:Date,
    default:Date.now
  }
});
module.exports = mongoose.model("category", categorySchema);
