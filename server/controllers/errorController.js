const sendDevError = (res, error) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error: error,
    stack: error.stack,
  });
};

const sendProdError = (res, error) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  error.message = error.message || "Something went wrong...";

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

exports.globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendDevError(res, err);
  } else if (process.env.NODE_ENV === "production") {
    sendProdError(res, err);
  }
};
