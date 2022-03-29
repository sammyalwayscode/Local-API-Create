const mongoose = require("mongoose");
const foodSchema = mongoose.Schema({
  foodname: {
    type: String,
    required: true,
  },
  foodtype: {
    type: String,
    required: true,
  },
  fooddiet: {
    type: String,
    required: true,
  },
  fooddiscription: {
    type: String,
    required: true,
  },
  foodimage: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const foodModel = mongoose.model("FoodAPI", foodSchema);
module.exports = foodModel;
