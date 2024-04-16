const express = require("express");
const stripeController = require("../controllers/stripeController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/checkout")
  .post(authController.protect, stripeController.checkoutPayment);

router
  .route("/verify-payment/:paymentId")
  .post(authController.protect, stripeController.verifyPayment);

module.exports = router;
