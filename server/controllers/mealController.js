const Meal = require("../models/mealModel");
const catchAsyncFn = require("../utils/catchAsyncFn");
const ApplicationError = require("../utils/applicationError");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllMeals = catchAsyncFn(async (req, res) => {
  let apiFeatures = new APIFeatures(Meal.find(), req.query);

  apiFeatures = apiFeatures.filter().sort().fieldLimit().paginate();

  let meals = await apiFeatures.query
    .find(req.showMeals)
    .select("+secretMeal");

  meals = meals.filter((element, index, arr) => {
    return arr.findIndex((item) => {
      return (element._id === item._id) && (element.size ? element.size === 16 : element);
    }) === index;
  });

  meals.forEach((element) => {
    console.log(element.name, element.size);
  });

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

exports.countDocuments = catchAsyncFn(async (req, res, next) => {
  const count = await Meal.countDocuments();

  res.status(200).json({
    status: "success",
    data: {
      count,
    },
  });
});

exports.getMeal = catchAsyncFn(async (req, res, next) => {
  let meal;

  let { slug } = req.params;

  let { size } = req.query;

  const isSecretMeal = req.showMeals;

  if (isSecretMeal.isSecretMeal) {
    slug = "undefined";
    size = "undefined";
  }

  if (size) {
    meal = await Meal.findOne({ slug, size }).select("+secretMeal").populate({
      path: "reviews",
    });
  } else {
    meal = await Meal.findOne({ slug }).select("+secretMeal").populate({
      path: "reviews",
    });
  }

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
  let meal;
  const { slug } = req.params;
  const { size } = req.query;

  if (size) {
    meal = await Meal.findOne({ slug, size });
  } else {
    meal = await Meal.findOne({ slug });
  }

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
  let meal;
  const { slug } = req.params;
  const { size } = req.query;

  if (size) {
    meal = await Meal.findOne({ slug, size });
  } else {
    meal = await Meal.findOne({ slug });
  }

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
