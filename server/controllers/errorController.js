// IMPORT APPLICATION ERROR
const ApplicationError = require("../utils/applicationError");

const sendDevError = function (err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err: err,
  });
};

const sendProdError = function (err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong. Try again!",
    });
  }
};

// 1. CASTERROR
const handleCastError = (error) => {
  // Create an instance of an application error
  const applicationError = new ApplicationError(
    `Invalid ID: '${error.value}'. Try again!`,
    400
  );

  return applicationError;
};

// 2. DUPLICATE ERROR
const handleDuplicateError = (error) => {
  const errorValue = error.keyValue && error.keyValue.name;
  let applicationError;

  if (!error.keyValue.name) {
    // Create an instance of an application error
    applicationError = new ApplicationError(
      `Duplicate Value Error: This data already exist on our servers. Try again!`,
      400
    );
  } else {
    // Create an instance of an application error
    applicationError = new ApplicationError(
      `Duplicate Value Error: "${errorValue}" already exist. Try again!`,
      400
    );
  }


  return applicationError;
};

// 3. VALIDATION ERROR
const handleValidationError = (error) => {
  const errorArr = Object.values(error.errors);

  const errorMsgArr = errorArr?.map((element) => {
    return element.message;
  });

  const errorMsg = errorMsgArr.join(". ");

  const applicationError = new ApplicationError(
    `Validation Error: ${errorMsg}`,
    400
  );

  return applicationError;
};

// 4. JsonWebTokenError
const handleJsonWebTokenError = () => {
  const applicationError = new ApplicationError(
    "Invalid token. Log back in and try again",
    401
  );

  return applicationError;
};

// 5. TokenExpiredError
const handleTokenExpiredError = () => {
  const applicationError = new ApplicationError(
    "Expired token. Log back in and try again",
    401
  );

  return applicationError;
};

exports.globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Something went wrong. Try again later."

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let mongooseError;

    // 1. CASTERROR
    if (err.name === "CastError") {
      mongooseError = { ...err };
      mongooseError = handleCastError(mongooseError);
      sendProdError(mongooseError, res);
    }

    // 2. DUPLICATE ERROR
    if (err.code === 11000) {
      mongooseError = { ...err };
      mongooseError = handleDuplicateError(mongooseError);
      sendProdError(mongooseError, res);
    }

    // 3. VALIDATION ERROR
    if (err.name === "ValidationError") {
      mongooseError = { ...err };
      mongooseError = handleValidationError(mongooseError);
      sendProdError(mongooseError, res);
    }

    // 4. JsonWebTokenError
    if (err.name === "JsonWebTokenError") {
      mongooseError = { ...err };
      mongooseError = handleJsonWebTokenError();
      sendProdError(mongooseError, res);
    }

    // 5. TokenExpiredError
    if (err.name === "TokenExpiredError") {
      mongooseError = { ...err };
      mongooseError = handleTokenExpiredError();
      sendProdError(mongooseError, res);
    }

    if (!mongooseError) {
      sendProdError(err, res);
    }
  }
};
