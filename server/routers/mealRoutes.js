const express = require("express");
const mealController = require("../controllers/mealController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes")

const router = express.Router();

router
  .route("/")
  .get(
    authController.checkDisplayAuth,
    authController.displayTo("admin"),
    mealController.getAllMeals
  )
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    mealController.createMeal
  );

router
  .route("/:slug")
  .get(
    authController.checkDisplayAuth,
    authController.displayTo("admin"),
    mealController.getMeal
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    mealController.updateMeal
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    mealController.deleteMeal
  );

router.use("/:slug/reviews", reviewRouter);

module.exports = router;
