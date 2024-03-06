const Meal = require("../models/mealModel");
const catchAsyncFn = require("../utils/catchAsyncFn");

exports.getAllProducts = catchAsyncFn(async (req, res) => {
  const meals = await Meal.find();

  res.status(200).json({
    status: "success",
    results: meals.length,
    data: {
      meals,
    },
  });
});
