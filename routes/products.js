const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const DBproduct = require("../models/product");
const DBcategory = require("../models/category");
const router = express.Router();

router.get("/", async (req, res) => {
  let categories = await DBproduct.find({})
    .populate("category")
    .exec();
  res.send(categories);
});

//create product ,then add it to categories.profucts array
//inputs: category(id) , title(string) , price(number)
router.post("/", async (req, res) => {
  try {
    var itscategory = await DBcategory.findById(req.body.category);
  } catch (error) {
    return res.status(500).send("category not found");
  }

  let product = await DBproduct.create({
    title: req.body.title,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category
  });
  product.save();
  itscategory.products.push(product._id);
  itscategory.save();
  res.send(product);
});

//change title,price,image of product
//inouts product(id) , title,price ,image
router.put("/update", async (req, res) => {
  if (!req.body._id) return res.status(500).send("Not Given ID");

  let product = await DBproduct.findById(req.body._id);
  var title = req.body.title;
  var image = req.body.image;
  var price = req.body.price;
  var category = req.body.category;

  if (!req.body.title) var title = product.title;
  if (!req.body.price) var price = product.price;
  if (!req.body.image) var image = product.image;
  if (!req.body.category) var category = product.category;

  let updated = await DBproduct.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        title: title,
        price: price,
        image: image,
        category: category
      }
    },
    { new: true, useFindAndModify: false, upsert: true }
  );
  try {
    res.send(updated);
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete product & remove it from categories
//inputs id
//for
router.delete("/", [auth, admin], async (req, res) => {
  let products = await DBproduct.findByIdAndDelete(req.body._id);
  console.log(req.user);
  if (!products) return res.status(400).send("this product is not available");
  let categories = await DBcategory.findById(products.category);
  if (categories) {
    let index = categories.products.indexOf(req.body._id);
    categories.products.splice(index, 1);
    categories.save();

    return res.send({
      productRemoved: true,
      categoryRemoved: true,
      product: products,
      category: categories
    });
  }
  res.send({
    productRemoved: true,
    categoryRemoved: false,
    product: products,
    category: "NOT found"
  });
});

module.exports = router;
