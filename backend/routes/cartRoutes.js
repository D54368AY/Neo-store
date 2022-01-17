const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdas887";
const productModal = require("../db/productSchema");
const cartModal = require("../db/cartSchema");
const orderModal = require("../db/orderSchema");
const catModal = require("../db/categorySchema");
const colorModal = require("../db/colorSchema");
const userModel=require('../db/userSchema')
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { getMaxListeners } = require("process");

async function main(data,email){
  console.log(data.total);
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
      subject:'ORDER CONFIRMATION',
      html:`
      <!DOCTYPE html>
<html>

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
        body,
        table,
        td,
        a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        table {
            border-collapse: collapse !important;
        }

        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        @media screen and (max-width: 480px) {
            .mobile-hide {
                display: none !important;
            }

            .mobile-center {
                text-align: center !important;
            }
        }

        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }
    </style>

<body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them.
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                    <tr>
                        <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#F44336">
                            <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                    <tr>
                                        <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                      <h1>  <b style={{color:'white'}}>
                                        Neo<font color="#cc0000">STORE</font>
                                      </b> </h1>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                    <tr>
                                        <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                            <table cellspacing="0" cellpadding="0" border="0" align="right">
                                                <tr>
                                                    <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                        <p style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;"><a href="#" target="_blank" style="color: #ffffff; text-decoration: none;">Shop &nbsp;</a></p>
                                                    </td>
                                                    <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;"> <a href="#" target="_blank" style="color: #ffffff; text-decoration: none;"><img src="https://img.icons8.com/color/48/000000/small-business.png" width="27" height="23" style="display: block; border: 0px;" /></a> </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                <tr>
                                    <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                                        <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;"> Thank You For Your Order! </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                        <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;"> Your Order is Been Placed. You are Our Valuable Customer ,And We Do Care About Our Customer.... We Provide Free Of Cost Shipping for Your Orders. </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-top: 20px;">
                                        <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> Order Confirmation # </td>
                                                <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> 2345678 </td>
                                            </tr>
                                            <tr>
                                                <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"> Purchased Item Price </td>
                                                <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"> Rs. ${data.total} </td>
                                            </tr>
                                            <tr>
                                                <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Shipping + Handling </td>
                                                <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Free of Cost </td>
                                            </tr>
                                            <tr>
                                                <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Sales Tax </td>
                                                <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> 5% GST </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-top: 20px;">
                                        <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> TOTAL </td>
                                                <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">Rs. ${data.total}  </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
                                <tr>
                                    <td align="center" valign="top" style="font-size:0;">
                                        <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                                <tr>
                                                    <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                        <p style="font-weight: 800;">Delivery Address</p>
                                                        <p>675 ${data.address}</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                                <tr>
                                                    <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                        <p style="font-weight: 800;">Estimated Delivery Date</p>
                                                        <p>January 21st, 2022</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style=" padding: 35px; background-color: #ff7361;" bgcolor="#1b9ba3">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                <tr>
                                    <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                        <h2 style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;"> Get 30% off your next order. </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 25px 0 15px 0;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7"> <a href="#" target="_blank" style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #F44336; padding: 15px 30px; border: 1px solid #F44336; display: block;">Shop Again</a> </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                <tr>
                                    <td align="center"> <img src="logo-footer.png" width="37" height="37" style="display: block; border: 0px;" /> </td>
                                </tr>
                                <tr>
                                    <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
                                        <p style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;"> 675 NeoSTORE<br> Mumbai, MH 02232 </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                        <p style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;"> If you didn't create an account using this email address, please ignore this email or <a href="#" target="_blank" style="color: #777777;">unsusbscribe</a>. </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
      `
  }
  transpoter.sendMail(mailOptions, (err, data) => {
      if (err) {
          return console.log("Error while sending mail");
      }
      return console.log('Email sent!!!');
  });
}


router.post("/addtocart", (req, res) => {
  cartModal.find({ user_id: req.body.userid }, (err, data) => {
    if (data[0]) {
       var userdata=data[0];
      cartModal.find({ 'products.product_id':req.body.productid }, (err, data) => {
        if (data[0]){
        cartModal.updateOne({'products.product_id':req.body.productid },{ $inc:{ 'products.$.product_count': 1 } },
          (err) => {
            if (err) {
              console.log(err)
              res.json({ err: 1, msg: "Product Not Added To Cart" });
            } else {
              res.json({ err: 0, msg: "Product Count Increased Succesfully" });
            }
          }
        )
      }
      else{
        let a = { product_id: req.body.productid, product_count: 1 };
        console.log(userdata.products)
        userdata.products.push(a);
        console.log(userdata.products)
        
        cartModal.updateOne({ user_id: req.body.userid },{$set:{products:userdata.products}},(err)=>{
          if(err){
            res.json({ err: 1, msg: "Product Not Added To Cart" });
          }
          else{
            res.json({ err: 0, msg: "Product Successfully Added to Cart" });
          }
        })
      }
    })
     } else {
        let a = { product_id: req.body.productid, product_count: 1 };

        let ins=new cartModal({user_id:req.body.userid,products:a});
        console.log(ins)
        ins.save((err)=>{
            if(err){
                console.log(err);
              res.json({ err: 1, msg: "Product Not Added To Cart" });
            }
            else {
                res.json({ err: 0, msg: "Product Successfully Added to Cart" });
              }
            })
    } 
  });
});

router.post('/getcart',(req,res)=>{
  cartModal.find({user_id:req.body.userid})
    .populate("products.product_id")
    .then((product) => {
       console.log(product)
      res.json({err: 0 ,'cartdata' :product })
    
    }) 

})


router.post('/removecart',(req,res)=>{

  cartModal.updateOne({ user_id:req.body.userid},{$pull:{products:{product_id:req.body.productid}}},(err)=>{
    if(err){
        console.log(err);
        res.json({err:1,msg:'Product Not Removed from cart'})
    }
    else{
      res.json({err:0,msg:'Product Removed from cart'})
      
        }
    
})

})

//inc count

router.post('/inc',(req,res)=>{

  cartModal.updateOne({'products.product_id':req.body.productid },{ $inc:{ 'products.$.product_count': 1 }},(err)=>{
    if(err){
        console.log(err);
        res.json({err:1,msg:'Not Increase The Count of Cart Product'})
    }
    else{
      res.json({err:0,msg:'Increase The Count of Cart Product'})
      
        }  
})
})

//dec count

router.post('/dec',(req,res)=>{

  cartModal.updateOne({'products.product_id':req.body.productid },{ $inc:{ 'products.$.product_count': -1 }},(err)=>{
    if(err){
        console.log(err);
        res.json({err:1,msg:'Count Not decreased from cart'})
    }
    else{
      res.json({err:0,msg:'Count decreased from cart'})
      
        }  
})

})




router.post('/placeorder',(req,res)=>{
  
  let ins=new orderModal({user_id:req.body.userid,products:req.body.product_data,order_total:req.body.total ,delivery_add:req.body.address});
  console.log(ins)
  ins.save((err)=>{
      if(err)
      {
        res.json({err:1,msg:'Data Not inserted in Order Table'})
      }
      else{
        res.json({err:0,msg:'Your Order Successfully Placed'})
      }
    })

         console.log(req.body.email);
        const email=req.body.email;
     main(req.body,email);   
})


router.post('/clearcart',(req,res)=>{
  cartModal.deleteOne({ user_id:req.body.userid},(err)=>{
    if(err){
        console.log(err);
        res.json({err:1,msg:'Cart Is Not Cleared'})
    }
    else{
      res.json({err:0,msg:'Cart Is Cleared'})
        }
    
})

})

router.post('/getorders',(req,res)=>{
  orderModal.find({ user_id:req.body.userid})
      .populate("products.product_id")
      .then((product) => {
        if(product){
          res.json({err:0,orderData:product})
        }
        else{
          res.json({err:1,msg:'Cannot Get Order Data Due To Some Issue'})
    
        }
       })

})

router.post('/getsingleorder',(req,res)=>{
  orderModal.find({ _id:req.body.orderid})
      .populate("products.product_id")
      .then((product) => {
        if(product){
          res.json({err:0,orderData:product})
        }
        else{
          res.json({err:1,msg:'Cannot Get Order Data due To Some issue'})
    
        }
       })

})



module.exports = router;
