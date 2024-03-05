const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/google/auth").post(authController.googleAuth);
router.route("/auth/check-auth").get(authController.checkAuth);

router.route("/forgot/password").post(authController.forgotPassword);

router.route("/reset/password/:resetToken").patch(authController.resetPassword);

router
  .route("/update/password")
  .patch(authController.protect, authController.updatePassword);

router
  .route("/update-my-data")
  .patch(authController.protect, userController.updateMyData);

router
  .route("/delete/account")
  .post(authController.protect, userController.deleteMyAccount);

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  )
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    userController.createUser
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getUser
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUser
  );

module.exports = router;
