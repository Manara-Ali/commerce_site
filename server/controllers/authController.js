// IMPORT UTIL
const util = require("util");

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
    "+passwordChangedAt"
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
