const Review = require("../models/reviewModel");
const Meal = require("../models/mealModel");
const catchAsyncFn = require("../utils/catchAsyncFn");
const ApplicationError = require("../utils/applicationError");

exports.getAllReviews = catchAsyncFn(async (req, res, next) => {

  let filter = {};

  if(req.params.slug) {
    const meal = await Meal.findOne({slug: req.params.slug});

    filter = {mealId: meal._id}
  }

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsyncFn(async (req, res, next) => {
  if (!req.body.mealId) {
    const meal = await Meal.findOne({ slug: req.params.slug });

    req.body.mealId = meal._id;
  }

  if (!req.body.userId) req.body.userId = req.user._id;

  const review = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.getReview = catchAsyncFn(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    const applicationError = new ApplicationError(
      `Invalid ID: ${req.params.id} is not a valid ID. Try again.`,
      404
    );

    next(applicationError);

    return;
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.updateReview = catchAsyncFn(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    const applicationError = new ApplicationError(
      `Invalid ID: ${req.params.id} is not a valid ID. Try again.`,
      404
    );

    next(applicationError);

    return;
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsyncFn(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    const applicationError = new ApplicationError(
      `Invalid ID: ${req.params.id} is not a valid ID. Try again.`,
      404
    );

    next(applicationError);

    return;
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.compareUserId = catchAsyncFn(async (req, res, next) => {

  const document = await req.Model.findById(req.params.id);

  if (!document) {
    const applicationError = new ApplicationError(
      `Invalid ID: ${req.params.id} is not a valid ID. Try again.`,
      404
    );

    next(applicationError);

    return;
  }

  if (req.user.id !== document.userId.id) {
    const applicationError = new ApplicationError(
      "You are not allowed to perform this action.",
      403
    );

    next(applicationError);

    return;
  }

  next();
});