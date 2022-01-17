const express=require('express');
const router=express.Router();
 const jwt=require("jsonwebtoken")
const jwtSecret="asd889asdas5656asdas887"
const userModel=require('../db/userSchema')
const nodemailer = require("nodemailer");
const multer=require('multer')
const path=require('path')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { getMaxListeners } = require("process");
//otp generate
const generateOTP = () => {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
} 

async function main(otp,email){
    console.log(otp);
    console.log(email);
    let transpoter=nodemailer.createTransport({
        service:'gmail',
        secure:false,
        auth:{
            user:'saurabhdubey788@gmail.com',
            pass:'Saurabh7841058258'
        }
       
    })
    let mailOptions={
        from:'saurabhdubey788@gmail.com',
        to:email,
        subject:'OTP',
        html:`
        <div style='background-color:pink;border:3 px solid red;text-align:center'>
        <br />
        <h3 style="color:blue;">Please find the one time password and use it while verification</h3> <br />
        <h2 style='background-color:yellow'>OTP :  ${otp} </h2>
    <br />
        <p>PS : Don't share your secret OTP with anyone else </p> 
        <br />
        </div>
        `
    }
    transpoter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log("Error while sending mail");
        }
        return console.log('Email sent!!!');
    });
}

//storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:/Users/Neosoft/OneDrive/Desktop/E-COMMERCE/ecommerce-final/public/images/profile_pic')
    },
    filename: (req, file, cb) => {
        const filename = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, filename)
    }
})

//upload
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            req.fileValidationError = "Forbidden extension"
            cb(null, false, req.fileValidationError);
        }
    }
});

//jwt authentication
function autenticateToken(req, res, next) {
       console.log(req.headers);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (token == null) {
        console.log("token null");
      res.json({ err: 2, msg: "Token Does Not Match" });
    } else {
      jwt.verify(token, jwtSecret, (err, data) => {
        if (err) {
            console.log("token expired");
          res.json({ err: 2, msg: "Token Expired ....Please Login Again" });
        } else {
          console.log("Match");
          next();
        }
      });
    }
  }

router.post('/adduser',(req,res)=>{

    let firstname1=req.body.fname;
    let lastname1=req.body.lname;
    let email1=req.body.email;
    let password1=req.body.password;
    const hash=bcrypt.hashSync(password1,saltRounds);
    let p_no=req.body.phone;
    console.log('Hello');
    let ins=new userModel({firstname:firstname1,lastname:lastname1,email:email1,password:hash,phone_no:p_no});
    console.log(ins)
    ins.save((err)=>{
        if(err)
        {
            res.json({err:1,msg:'Not  registered due to Some internal issue'})
        }
        else{
            res.json({err:0,msg:`${firstname1}  is successfully registered`})
        }
    })

})
 router.post('/loginuser',(req,res)=>{
    let Email=req.body.email;
    let Password=req.body.password;
    userModel.find({ email:Email},(err,data)=>{
        if(!data[0]){
            res.json({err:1,"msg":"Entered Email Does Not Exist"})
        }
        else{
            if(bcrypt.compareSync(Password,data[0].password))
            {
            console.log(data);
            let payload={uid:data}
            const token=jwt.sign(payload,jwtSecret,{expiresIn:6000})
            console.log(token);
            res.json({"err":0,"msg":"User Login Successfully","token":token})
            }
            else{
                res.json({err:1,"msg":"Password is Incorrect...Please Try Again"})
            }
        }
    })
}) 

router.post('/loginsocial',(req,res)=>{
    let Email=req.body.email;
    let Firstname=req.body.fname;
    let Lastname=req.body.lname;
    userModel.find({ email:Email,is_social:true },(err,data)=>{
        if(!data[0]){
            let ins=new userModel({firstname:Firstname,lastname:Lastname,email:Email,address:[],phone_no:'00',is_social:true,profile_pic:''});
    console.log(ins)
    ins.save((err)=>{
        if(err) 
        {
            res.json({err:1,msg:'Cannot login with your social details'})
        }
        else{
            let a={firstname:Firstname,lastname:Lastname,email:Email,is_social:true,address:[],phone_no:'00',profile_pic:''}
            let b=[];
            b.push(a);
            console.log(b);
            let payload={uid:b}
            const token=jwt.sign(payload,jwtSecret,{expiresIn:6000})
            res.json({err:0,msg:`${Firstname}  is registered and logged in `,"token":token})
        }

        })
    }
        else{
            let payload={uid:data}
            const token=jwt.sign(payload,jwtSecret,{expiresIn:6000})
            res.json({"err":0,"msg":"Login Success","token":token})
        }
    })
}) 



router.post('/sendotp',(req,res)=>{
     console.log(req.body.email);
    userModel.find({ email:req.body.email},(err,data)=>{
        if(data[0]==null){
           res.json({err:1,"msg":"Email does not Exist"})
        }
        else {
            const otp=generateOTP();
            const mailid=req.body.email;
              main(otp,mailid);  
            
            res.json({otp1:otp})
        }
    })
    
     
})

router.post('/changepass',(req,res)=>{
 
    const hash=bcrypt.hashSync(req.body.password,saltRounds);
    userModel.updateOne({ email:req.body.email},{$set:{password:hash}},(err)=>{
        if(err){
            res.json({err:1,"msg":"Does not update"})
            console.log(" Not updated");
        }
        else{
            console.log("updated");
           res.json({err:0,"msg":"Password Changed Successfully"})
        }
    })
    
})


router.post('/updateprof',autenticateToken,(req,res)=>{

    let firstname1=req.body.fname;
    let lastname1=req.body.lname;
    let email1=req.body.email;
    let p_no=req.body.phone;
    console.log(req.body);
    userModel.updateOne({ email:email1},{$set:{firstname:firstname1,lastname:lastname1,phone_no:p_no}},(err)=>{
        if(err)
        {
             console.log(err);
            res.json({err:1,msg:'Details Not Updated'})
        }
        else{
            userModel.find({email:email1},(err,data)=>{
                if(!data[0]){ 
                    console.log(err);
                    res.json({err:1,msg:'Not Found'})
                }
                else{
                console.log(data);
                let payload={uid:data}
                const token=jwt.sign(payload,jwtSecret,{expiresIn:6000})
                res.json({err:0,msg:'User Details Updated','token':token})
                console.log("updated");
                }
            })
           
        }
    })

})

router.post('/updatepassword',autenticateToken,(req,res)=>{
    let Password=req.body.oldpassword;
    const hash=bcrypt.hashSync(req.body.newpassword,saltRounds);
    console.log(req.body);

   userModel.find({ email:req.body.email},(err,data)=>{
        if(data[0]){
            console.log(data[0].password);
            console.log(bcrypt.compareSync(req.body.oldpassword,data[0].password));
            if(bcrypt.compareSync(req.body.oldpassword,data[0].password))
            {
                userModel.updateOne({ email:req.body.email},{$set:{password:hash}},(err)=>{
                    if(err)
                    { 
                        console.log(err);
                        res.json({err:1,msg:'Password cannot change'})
                    }
                    else{
                        let payload={uid:data}
                        const token=jwt.sign(payload,jwtSecret,{expiresIn:6000})
                        res.json({err:0,msg:'Password Changed Successfully','token':token})
                    }
                })
            }
            else{
                res.json({err:1,msg:'your old Password is not Correct.... please try using corect Existing password'})
                 console.log('your old password is not correct');
            }
        }
        else{
       console.log(err);
        }
        })
})

router.post('/newaddress',autenticateToken,(req,res)=>{
    userModel.find({ email:req.body.email},(err,data)=>{
        if(data[0]){ 
            console.log(data[0]);
            let a={addr:req.body.address}
            data[0].address.push(a);
            
             console.log(data[0].address);
              userModel.updateOne({ email:req.body.email},{$set:{address:data[0].address}},(err)=>{
                if(err){
                    console.log(err);
                    res.json({err:1,msg:'Cannot Add the address'})
                }
                else{
                    
                    let payload={uid:data}
                        const token=jwt.sign(payload,jwtSecret,{expiresIn:6000})
                        res.json({err:0,msg:'New Address added successfully' ,'token':token})
                }
            }) 
            
        }

        else{
            res.json({err:1,msg:'email does not found '})
        }
    })
})


router.post('/deladdress',autenticateToken,(req,res)=>{

    userModel.updateOne({ email:req.body.email},{$pull:{address:{_id:req.body.id}}},(err)=>{
        if(err){
            console.log(err);
            res.json({err:1,msg:'address not deleted'})
        }
        else{
            userModel.find({ email:req.body.email},(err,data)=>{
                if(data[0]){ 
            let payload={uid:data}
            const token=jwt.sign(payload,jwtSecret,{expiresIn:6000})
            res.json({err:0,msg:'Address Deleted Successfully','token':token})
                }
            })
        }
    })
})


router.post('/addpicture',autenticateToken,upload.single('file'),(req,res)=>{
    console.log(req.file.email);
    console.log(req.file.filename);
    userModel.updateOne({ email:req.body.email},{$set:{profile_pic:req.file.filename}},(err)=>{
        if(err){
            console.log(err);
            res.json({err:1,msg:'Picture not uploaded'})
        }
        else{
            userModel.find({ email:req.body.email},(err,data)=>{
                if(data[0]){ 
            let payload={uid:data}
            const token=jwt.sign(payload,jwtSecret,{expiresIn:6000})
            res.json({err:0,msg:'Picture uploaded Successfully','token':token})
                }
            })
        }
    })

})
module.exports=router