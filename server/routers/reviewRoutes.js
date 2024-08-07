const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");
const Review = require("../models/reviewModel");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(authController.restrictTo("user"), reviewController.createReview);

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(
    authController.compareId(Review, reviewController.compareUserId),
    reviewController.updateReview
  )
  .delete(
    authController.compareId(Review, reviewController.compareUserId),
    reviewController.deleteReview
  );

module.exports = router;
