exports.getAllProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "All Products",
    },
  });
};
