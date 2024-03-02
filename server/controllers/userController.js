const catchAsyncFn = require("../utils/catchAsyncFn");
const ApplicationError = require("../utils/applicationError");
const filterReqObj = require("../utils/fiterReqObj");
const User = require("../models/userModel");

exports.getAllUsers = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "List of all users",
    },
  });
};

exports.createUser = (req, res, next) => {
  res.status(201).json({
    status: "success",
    data: {
      message: "Please use the '/signup' to resgister to the application",
    },
  });
};

exports.getUser = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Single User",
    },
  });
};

exports.updateUser = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Updated user",
    },
  });
};

exports.deleteUser = (req, res, next) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};

exports.updateMyData = catchAsyncFn(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    const applicationError = new ApplicationError(
      "Use '/update-password' to update your password.",
      400
    );

    return next(applicationError);
  }

  const user = req.user;

  const allowedParams = filterReqObj(req.body, "name", "email", "photo");

  const updatedUser = await User.findByIdAndUpdate(user._id, allowedParams, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});

exports.deleteMyAccount = catchAsyncFn(async (req, res, next) => {
  // 1. Retrieve current password
  const { currentPassword } = req.body;

  if (!currentPassword) {
    const applicationError = new ApplicationError(
      "Your existing password is required to delete your account. Try again.",
      401
    );

    next(applicationError);

    return;
  }

  // 2. Compare provided password to password on file
  const user = await User.findOne({ _id: req.user._id }).select(
    "+password +active"
  );

  if (!user || !(await user.comparePassword(currentPassword, user.password))) {
    const applicationError = new ApplicationError(
      "The password you provided does not match the one we have on file. Try again.",
      401
    );

    next(applicationError);

    return;
  }

  await User.findByIdAndUpdate({ _id: user._id }, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});