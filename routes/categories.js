const express = require("express");
const DBcategories = require("../models/category");

const router = express.Router();

router.get("/", async (req, res) => {
  let categories = await DBcategories.find({});
  res.send(categories);
});

router.post("/", (req, res) => {
  DBcategories.create({
    title: req.body.title
  })
    .then(d => res.send(d))
    .catch(e => res.status(500).send(e));
});

router.put("/", async (req, res) => {
  let updated = await DBcategories.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { title: req.body.title } },
    { new: true, useFindAndModify: false }
  );
  try {
    res.send(updated);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/", (req, res) => {
  DBcategories.deleteOne({ _id: req.body._id })
    .then(r => res.send(r))
    .catch(e => res.status(500).send(e));
});

module.exports = router;
