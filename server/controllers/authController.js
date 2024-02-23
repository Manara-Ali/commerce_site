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
    const {email, password} = req.body;

    // 2. Verify that both data was provided
    if(!email || !password) {
        // Create a new instance of an application error
        const applicationError = new ApplicationError("Email and password are required. Try again", 400);

        return next(applicationError);
    }

    // 3. Find current user
    const user = await User.findOne({email}).select("+password");

    // 4. Assuming no user was found with the given email
    if(!user || !(await(user.comparePassword(password, user.password)))) {
        const applicationError = new ApplicationError("Invalid email or password. Try again.");

        return next(applicationError);
    }

    // Remove email and password
    user.email = undefined;
    user.password = undefined;

    // Send response
    createAndSendToken(res, 200, user);
});