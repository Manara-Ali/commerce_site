const mongoose = require("mongoose");
const Meal = require("./mealModel");

const reviewSchema = new mongoose.Schema(
  {
    mealId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Meal",
      required: [true, "Each review must be about a specific meal"],
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Each review must come from a specific user"],
    },
    review: {
      type: String,
      trim: true,
      required: [true, "Each review must have a body content"],
    },
    rating: {
      type: Number,
      required: [true, "Each review must have a rating value"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ userId: 1, mealId: 1 }, { unique: true });

// Create a static method to calculate ratings on meals
reviewSchema.statics.calculateRatings = async function (mealId) {
  // 1. Use aggregation pipeline to find the matching book and calculate average
  const aggregation = await Review.aggregate([
    {
      $match: { mealId },
    },
    {
      $group: {
        _id: "$mealId",
        numRatings: { $count: {} },
        ratingAvg: { $avg: "$rating" },
      },
    },
  ]);

  // 2. Update the book using its id
  await Meal.findByIdAndUpdate(
    mealId,
    {
      ratingsAverage: aggregation[0]?.ratingAvg || 4.5,
      ratingsQuantity: aggregation[0]?.numRatings || 0,
    },
    { new: true, runValidators: true }
  );
};

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    select: "name photo",
  });
  next();
});

reviewSchema.post("save", function (doc) {
  this.constructor.calculateRatings(doc.mealId);
});

reviewSchema.post(/^findOneAnd/, function (doc) {
  // this.constructor.calculateRatings(tourId);
  if (doc) {
    doc.constructor.calculateRatings(doc.mealId);
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
