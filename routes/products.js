const express = require("express");
const DBproduct = require("../models/product");
const router = express.Router();
// THE WILL BE ERROR IF I DELETED A CATEGORY THAT IS INSIDE A PRODUCTs
router.get("/", async (req, res) => {
  let categories = await DBproduct.find({})
    .populate("category")
    .exec();
  res.send(categories);
});

router.post("/", (req, res) => {
  DBproduct.create({
    title: req.body.title,
    price: 10,
    category: req.body.category
  })
    .then(d => res.send(d))
    .catch(e => res.status(500).send(e));
});

//change title of product
//inouts _id , title
router.put("/title", async (req, res) => {
  let updated = await DBproduct.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { title: req.body.title } },
    { new: true, useFindAndModify: false }
  );
  try {
    res.send(updated);
  } catch (error) {
    res.status(500).send(error);
  }
});

//change cagegory id
//inouts _id , category
router.put("/category", async (req, res) => {
  let updated = await DBproduct.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { category: req.body.category } },
    { new: true, useFindAndModify: false }
  );
  try {
    res.send(updated);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/", (req, res) => {
  DBproduct.deleteOne({ _id: req.body._id })
    .then(r => res.send(r))
    .catch(e => res.status(500).send(e));
});

module.exports = router;
