const mongoose = require("mongoose");

const { Schema } = mongoose;

const FoodItemsSchema = new Schema({});

module.exports = mongoose.model("food_items", FoodItemsSchema);
