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
