const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(authController.protect, productController.getAllProducts);

module.exports = router;
