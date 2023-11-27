const express = require("express");
const app = express();
const port = 8080;
const connect = require("./db");
const UserModel = require("./models/User");
const FoodItemModel = require("./models/FoodItems");
const FoodCategoryModel = require("./models/FoodCategory");

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getusers", (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .then((data) => console.log(data))
    .catch((err) => res.json(err));
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.listen(port, async (req, res) => {
  try {
    await connect;
    FoodItemModel.find().then((food_items) => {
      global.food_items = food_items;
    });

    FoodCategoryModel.find().then((food_categories) => {
      global.food_categories = food_categories;
    });
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error connecting to Database");
    console.log(error);
  }
  console.log(`App is live at port ${port}`);
});
