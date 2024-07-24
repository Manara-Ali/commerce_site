const mongoose = require("mongoose");
const slugify = require("slugify");

const mealSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Each meal must be created by an admin user"],
      ref: "User",
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Every meal must have a name"],
      // unique: [true, "Each meal must have a unique name"],
      minlength: [3, "Meal's name must be at least 3 characters long"],
      maxlength: [40, "Meal's name should not exceed 40 characters"],
    },
    slug: {
      type: String,
      default: function () {
        return slugify(this.name, { lower: true, trim: true });
      },
    },
    price: {
      type: Number,
      required: [true, "Each meal must have a price"],
    },
    discount: {
      type: Number,
      default: 0,
      // validate: {
      //   validator: function (value) {
      //       return value < this.price;
      //   },
      //   message: "Discount price ({VALUE}) must be less than regular price",
      // },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "Each meal must have a brief summary"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Each meal must have a description section"],
    },
    spiceLevel: {
      type: Number,
      required: [true, "Each meal must specify its spice level."],
    },
    serving: {
      type: Number,
      required: [true, "Each meal must specify how many people it can serve"],
    },
    size: {
      type: Number,
      // default: 16,
      enum: {
        values: [10, 12, 16],
        message: "Drinks and Snacks sizes can only have a value of '16oz', '12oz', or '10oz'! Try again."
      }
    },
    category: {
      type: String,
      required: [true, "Each item on the menu must have a category! Try again."],
      enum: {
        values: ["food", "snacks", "drinks"],
        message: "Item can only have a category equal to 'food', 'snacks', or 'drinks'."
      }
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      set: function (value) {
        return Math.round(value * 10) / 10;
      },
    },
    coverImage: {
      type: String,
      trim: true,
      required: [true, "Each meal must have a cover image"],
    },
    images: {
      type: [String],
      trim: true,
    },
    secretMeal: {
      type: Boolean,
      default: false,
      select: false,
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

mealSchema.index({slug: 1});

mealSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "mealId",
})

/// Create a document middleware to update slug
mealSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();

  this.slug = slugify(this.name, { lower: true, trim: true });

  return next();
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
