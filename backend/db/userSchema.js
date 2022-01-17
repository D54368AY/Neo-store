const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  phone_no: {
    type: Number,
  },
  is_social: {
    type: Boolean,
    default: false,
  },
  profile_pic:{
    type: String,
  },
  address: 
        [
          { 
            addr: { type: String } 
          }
        ]
});
module.exports = mongoose.model("userdata", userSchema);
