// IMPORT UTIL
const util = require("util");

// IMPORT CRYPTO
const crypto = require("crypto");

// IMPORT JWT
const jwt = require("jsonwebtoken");

// IMPORT USER MODEL
const User = require("../models/userModel");

// IMPORT CATCH ASYNC
const catchAsyncFn = require("../utils/catchAsyncFn");

// IMPORT APPLICATION ERROR
const ApplicationError = require("../utils/applicationError");

// IMPORT FUNCTION TO CREATE TOKEN
const createAndSendToken = require("../utils/createAndSendToken");

// IMPORT FUNCTION TO SEND EMAIL
const sendEmail = require("../utils/sendEmail");

exports.signup = catchAsyncFn(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Remove password from response
  user.email = undefined;
  user.password = undefined;
  user.createdAt = undefined;
  user.__v = undefined;
  user.role = undefined;

  // Send response
  createAndSendToken(res, 201, user);
});

exports.login = catchAsyncFn(async (req, res, next) => {
  // 1. Retrieve email and password
  const { email, password } = req.body;

  // 2. Verify that both data was provided
  if (!email || !password) {
    // Create a new instance of an application error
    const applicationError = new ApplicationError(
      "Email and password are required. Try again",
      400
    );

    return next(applicationError);
  }

  // 3. Find current user
  const user = await User.findOne({ email }).select("+password");

  // 4. Assuming no user was found with the given email
  if (!user || !(await user.comparePassword(password, user.password))) {
    const applicationError = new ApplicationError(
      "Invalid email or password. Try again."
    );

    return next(applicationError);
  }

  // Remove email and password
  user.email = undefined;
  user.password = undefined;

  // Send response
  createAndSendToken(res, 200, user);
});

exports.protect = catchAsyncFn(async (req, res, next) => {
  // 1. Retrieve cookie
  let token;

  if (req.headers && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    const applicationError = new ApplicationError(
      "You are not logged in. Please login and try again",
      401
    );

    return next(applicationError);
  }

  // 2. Use cookie to find user (Verify token)
  const decodedPayload = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  const user = await User.findById(decodedPayload.id).select(
    "+role +passwordChangedAt"
  );

  // 3. Verify that the user was not deleted after token was sent
  if (!user) {
    const applicationError = new ApplicationError(
      "This user no longer exist in our application. Try again",
      401
    );

    return next(applicationError);
  }

  // 4. Verify that password was not changed after token was sent
  if (user.wasPasswordChanged(decodedPayload.iat)) {
    const applicationError = new ApplicationError(
      "Your password was recently changed. Please login back in using new password.",
      401
    );

    return next(applicationError);
  }

  // 6. Add user to the request object
  req.user = user;

  // 7. Call the next middleware in the stack
  next();
});

exports.checkAuth = catchAsyncFn(async (req, res, next) => {
  // 1. Retrieve cookie
  let token;

  if (req.headers && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      isAuthenticated: false,
      data: null,
    });
  }

  // 2. Use cookie to find user (Verify token)
  const decodedPayload = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  const user = await User.findById(decodedPayload.id).select(
    "+passwordChangedAt"
  );

  // 3. Verify that the user was not deleted after token was sent
  if (!user) {
    return res.status(401).json({
      status: "fail",
      isAuthenticated: false,
      data: null,
    });
  }

  // 4. Verify that password was not changed after token was sent
  if (user.wasPasswordChanged(decodedPayload.iat)) {
    return res.status(401).json({
      status: "fail",
      isAuthenticated: false,
      data: null,
    });
  }

  return res.status(200).json({
    status: "success",
    isAuthenticated: true,
    data: {
      user,
    },
  });
});

exports.restrictTo = (...args) => {
  return (req, res, next) => {
    if (!args.includes(req.user.role)) {
      const applicationError = new ApplicationError(
        "Your are not allowed to access this resource",
        403
      );

      return next(applicationError);
    }

    next();
  };
};

exports.forgotPassword = catchAsyncFn(async (req, res, next) => {
  // 1. Retrieve email from user
  const { email } = req.body;

  if (!email) {
    const applicationError = new ApplicationError(
      "Email is required to reset password. Try again.",
      400
    );

    return next(applicationError);
  }

  // 2. Find user thru the provided email
  const user = await User.findOne({ email }).select("+email");

  if (!user) {
    const applicationError = new ApplicationError(
      "No user was found with the provided email. Try again.",
      404
    );

    return next(applicationError);
  }

  // 3. Generate new password token
  const resetToken = user.generateResetToken();

  await user.save({ validateBeforeSave: false });

  // 4. Send new password token via email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/reset/password/${resetToken}`;

  const message = `
  <h2>Forgot Password?</h2>
     <p>Use the below link to reset your password:\n${resetURL}.\nIf you did not request for a password change, please disregard this message.</p>
     
     <p>Your team at ColdFusion Technology</p>
     <p>Best Regards!</p>
     `;

  try {
    await sendEmail(
      "Forgot password? (Token valid for 10 minutes)",
      message,
      user.email,
      process.env.EMAIL_USER,
      process.env.EMAIL_USER
    );

    res.status(200).json({
      status: "success",
      data: {
        message:
          "A password reset token was successfully sent to your email on file",
      },
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpirationDate = undefined;
    user.save({ validateBeforeSave: true });

    const applicationError = new ApplicationError(
      "An error occured while sending your password reset token. Try again later!",
      500
    );

    return next(applicationError);
  }

  // 5. Send response
});

exports.resetPassword = catchAsyncFn(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;

  if (!password || !passwordConfirm) {
    const applicationError = new ApplicationError(
      "Both password and confirm password fields are required to reset your password. Try again",
      400
    );

    return next(applicationError);
  }

  const resetToken = req.params.resetToken;

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpiresIn: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    const applicationError = new ApplicationError(
      "Invalid or expired token. Try again",
      400
    );

    return next(applicationError);
  }

  // 4. Update password
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiresIn = undefined;

  await user.save();

  user.password = undefined;
  user.passwordChangedAt = undefined;

  createAndSendToken(res, 200, user);
});

// Update current user password
exports.updatePassword = catchAsyncFn(async (req, res, next) => {
  // 1. Retrieve current password and new password
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  if (!currentPassword || !newPassword || !newPasswordConfirm) {
    const applicationError = new ApplicationError(
      "All fields are required to update your password. Try again!",
      401
    );

    return next(applicationError);
  }

  // 2. Find the current user
  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.comparePassword(currentPassword, user.password))) {
    const applicationError = new ApplicationError(
      "Your password does not match the one we have on file. Try again.",
      401
    );

    return next(applicationError);
  }

  // Updat password
  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;

  await user.save();

  createAndSendToken(res, 200, user);
});
