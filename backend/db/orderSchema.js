const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
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
        ],
   delivery_add:{
       type:String,
       required:true
   },
   order_total:{
    type:Number,
       required:true
   },
    isdelivered:
    {
        type:Boolean,
        default:false
    },
    order_date:{
        type:Date,
        default:Date.now    
    }    
});
module.exports = mongoose.model("order", orderSchema);
