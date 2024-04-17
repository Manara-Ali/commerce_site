const dotenv = require("dotenv");
const catchAsyncFn = require("../utils/catchAsyncFn");
const ApplicationError = require("../utils/applicationError");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Payment = require("../models/paymentModel");

dotenv.config({
  path: `${__dirname}/../config.env`,
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.checkoutPayment = catchAsyncFn(async (req, res, next) => {
  const user = req.user;

  const { itemsPrice, taxPrice, totalPrice, cartItems } = req.body;

  const orders = cartItems.map((element) => {
    return {
      name: element.name,
      qty: element.qty,
      image: element.coverImage,
      price: element.price,
      mealId: element._id,
    };
  });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(totalPrice) * 100,
      currency: "usd",
      metadata: {
        userId: user._id?.toString(),
        userEmail: user.email,
        orders: JSON.stringify(orders),
        itemsPrice,
        taxPrice,
        totalPrice,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentId: paymentIntent.id,
      metadata: paymentIntent.metadata,
    });
  } catch (error) {
    return next(error);
  }
});

exports.verifyPayment = catchAsyncFn(async (req, res, next) => {
  const { paymentId } = req.params;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    if (paymentIntent.status === "succeeded") {
      const {
        userId,
        userEmail,
        itemsPrice,
        taxPrice,
        totalPrice,
      } = paymentIntent.metadata;

      const orders = JSON.parse(paymentIntent.metadata.orders);

      const user = await User.findById(userId);

      if (!user) {
        const applicationError = new ApplicationError(
          `No user was found with id: ${userId}. Try again.`,
          404
        );

        return next(applicationError);
      }

      const amount = paymentIntent.amount / 100;
      const currency = paymentIntent.currency;
      const paymentId = paymentIntent.id;

      // Create order history
      const orderHistory = await Order.create({
        userId,
        email: userEmail,
        orders,
        ordersPrice: itemsPrice,
        taxPrice,
        totalPrice,
      });

      // Create Payment History
      if (orderHistory) {
        const payment = await Payment.create({
          userId: user._id,
          orderId: orderHistory._id,
          email: userEmail,
          paymentReferenceId: paymentId,
          currency,
          status: paymentIntent.status,
          amount,
        });

        return res.status(200).json({
          status: "success",
          message: "Payment verified",
          data: payment,
        });
      }

      const applicationError = new ApplicationError(
        "Failed to create an order history for this action. Try again later",
        500
      );

      return next(applicationError);
    }
  } catch (error) {
    return next(error);
  }
});
