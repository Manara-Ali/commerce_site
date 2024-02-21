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
