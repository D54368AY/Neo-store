const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdas887";
const productModal = require("../db/productSchema");
const catModal = require("../db/categorySchema");
const colorModal = require("../db/colorSchema");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { getMaxListeners } = require("process");

router.get("/getAllProducts", (req, res) => {
  let catdata;
  let colordata;
  catModal.find({}, (err, data) => {
    catdata = data;
  });
  colorModal.find({}, (err, data) => {
    colordata = data;
  });

  productModal
    .find()
    .populate(["category_id", "color_id"])
    .then((product) => {
      /* console.log(product+"/n"+catdata+"/n"+colordata);  */
      console.log(product.length);
      res.json({
        err: 0,
        allproducts: product,
        categories: catdata,
        colors: colordata,
      });
    });
});

router.get("/getSortUp", (req, res) => {
  productModal
    .find()
    .sort({ product_cost: 1 })
    .populate(["category_id", "color_id"])
    .then((product) => {
      console.log(product);
      res.json({ err: 0, sorted: product });
    });
});

router.get("/getSortDown", (req, res) => {
  productModal
    .find()
    .sort({ product_cost: -1 })
    .populate(["category_id", "color_id"])
    .then((product) => {
      console.log(product);
      res.json({ err: 0, sorted: product });
    });
});

router.post("/rating", (req, res) => {
  productModal.updateOne(
    { _id: req.body.id },
    { $set: { product_rating: req.body.rate } },
    (err) => {
      if (err) {
        res.json({ err: 1, msg: "not rated" });
      } else {
        productModal.find({ _id: req.body.id }, (err, data) => {
          if (data[0]) {
            console.log(data);
            res.json({ err: 0, msg: "Successfully Rated" });
            console.log("rated");
          }
        });
      }
    }
  );
});
module.exports = router;
