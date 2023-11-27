const mongoose = require("mongoose");

const { Schema } = mongoose;

const FoodCategorySchema = new Schema({
  CategoryName: String,
});

module.exports = mongoose.model("food_category", FoodCategorySchema);
