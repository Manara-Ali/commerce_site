const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Each order must be from a specific user"],
      ref: "User",
    },
    orders: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        mealId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Meal",
        },
      },
    ],
    shippingAddress: {
      city: {
        type: String,
        required: [true, "Each address must have a city"],
      },
      zipCode: {
        type: String,
        required: [true, "Each address must have a zip code"],
      },
      country: {
        type: String,
        required: [true, "Each address must have a country"],
        default: "USA",
      },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      update_time: {
        type: String,
      },
      email_address: {
        type: String,
      },
    },
    ordersPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
