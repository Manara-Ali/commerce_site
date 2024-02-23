const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Each user must have a name"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [40, "Name cannot exceed 40 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Each user must have an email"],
      unique: [
        true,
        "This email already exist on our servers. Try again with a different email address.",
      ],
      validate: {
        validator: validator.isEmail,
        message:
          "Invalid email address. Please provide a valid email address and try again.",
      },
      select: false,
    },
    photo: {
      type: String,
      trim: true,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
    },
    role: {
      type: String,
      trim: true,
      default: "user",
      select: false,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is a required field"],
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [40, "Password cannot exceed 40 characters"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      trim: true,
      required: [true, "Both password and confirm password are required"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message:
          "Both password and confirm password fields must match. Try again",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create a pre save middleware to encrypt user password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 14);

  this.passwordConfirm = undefined;

  next();
});

// Create a function to compare passwords for login
userSchema.methods.comparePassword = async function (
  plainPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
