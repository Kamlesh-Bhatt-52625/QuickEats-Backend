const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://quickeats:quickeats@cluster0.o8r5zi1.mongodb.net/quickeatsMERN?retryWrites=true&w=majority";
const connect = mongoose.connect(mongoURL);

module.exports = connect;
