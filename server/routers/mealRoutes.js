const express = require("express");
const mealController = require("../controllers/mealController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(mealController.getAllMeals)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    mealController.createMeal
  );

router
  .route("/:slug")
  .get(mealController.getMeal)
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

module.exports = router;
