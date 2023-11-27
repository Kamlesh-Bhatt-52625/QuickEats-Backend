const express = require("express");
const router = express.Router();
const FoodItemModel = require("../models/FoodItems");

// Still need to Fetch Food Category data from database

router.post("/foodData", (req, res) => {
  try {
    res.send([global.food_items, global.food_categories]);
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

module.exports = router;
