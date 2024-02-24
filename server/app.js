const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const userRouter = require("./routers/userRoutes");
const productRouter = require("./routers/productRoutes");
const errorController = require("./controllers/errorController");
const ApplicationError = require("./utils/applicationError");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/products", productRouter);

// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use((req, res, next) => {
  const applicationError = new ApplicationError(
    `Cannot find ${req.originalUrl} on any of our servers...`,
    404
  );

  next(applicationError);
});

app.use(errorController.globalErrorHandler);

module.exports = app;
