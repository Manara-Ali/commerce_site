const mongoose = require("mongoose");

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
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;