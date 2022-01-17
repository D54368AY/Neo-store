const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const PORT=8899;
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())
const db="mongodb://localhost:27017/ecommerce";
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true})
            console.log("MongoDB connected")
    }
    catch(err){
        console.log(err.message);
    }
}
connectDB();
//load routes
const userRoutes=require('./routes/userRoutes')
const productRoutes=require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`);
})