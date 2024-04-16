const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Each payment must be linked to a specify user"],
      ref: "User",
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    email: {
      type: String,
      required: [
        true,
        "Each payment must have an email address associated to a user",
      ],
    },
    paymentReferenceId: {
      type: String,
      required: [true, "Each payment must have a reference id"],
    },
    currency: {
      type: String,
      required: [true, "Each payment must have a currency"],
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
