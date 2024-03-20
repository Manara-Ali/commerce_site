const Meal = require("../models/mealModel");
const catchAsyncFn = require("../utils/catchAsyncFn");
const ApplicationError = require("../utils/applicationError");

exports.getAllMeals = catchAsyncFn(async (req, res) => {
  
  const meals = await Meal.find(req.showMeals).select("+secretMeal");

  res.status(200).json({
    status: "success",
    results: meals.length,
    data: {
      meals,
    },
  });
});

exports.createMeal = catchAsyncFn(async (req, res, next) => {
  // Add user to request body
  req.body.userId = req.user._id;

  const meal = await Meal.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      meal,
    },
  });
});

exports.getMeal = catchAsyncFn(async (req, res, next) => {
  let { slug } = req.params;
  const isSecretMeal = req.showMeals;

  if (isSecretMeal.isSecretMeal) {
    slug = "undefined";
  }

  const meal = await Meal.findOne({ slug }).select("+secretMeal");

  if (!meal) {
    const applicationError = new ApplicationError(
      `No meal was found with the given name: '${slug}'. Try again.`,
      404
    );

    return next(applicationError);
  }

  res.status(200).json({
    status: "success",
    data: {
      meal,
    },
  });
});

exports.updateMeal = catchAsyncFn(async (req, res, next) => {
  const { slug } = req.params;

  let meal = await Meal.findOne({ slug });

  if (!meal) {
    const applicationError = new ApplicationError(
      `No meal was found with the given name: '${slug}'. Try again.`,
      404
    );

    return next(applicationError);
  }

  // meal.name = req.body.name;
  if (req.body.name) {
    meal.name = req.body.name;

    await meal.save();
  }

  const updatedMeal = await Meal.findByIdAndUpdate(meal._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updatedMeal,
    },
  });
});

exports.deleteMeal = catchAsyncFn(async (req, res, next) => {
  const { slug } = req.params;

  const meal = await Meal.findOne({ slug });

  if (!meal) {
    const applicationError = new ApplicationError(
      `No meal was found with the given name: '${slug}'. Try again.`,
      404
    );

    return next(applicationError);
  }

  await Meal.findByIdAndDelete(meal._id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
