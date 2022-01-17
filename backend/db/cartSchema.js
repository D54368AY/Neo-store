const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  user_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"userdata"
  },
  products: 
        [
          { 
            product_id: {  type:mongoose.Schema.Types.ObjectId, ref:"product" } ,
            product_count : { type : Number }
          }
        ]
});
module.exports = mongoose.model("cart", cartSchema);
