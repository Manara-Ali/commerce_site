const path = require("path");
const express = require("express");
const userRouter = require("./routers/userRoutes");
const errorController = require("./controllers/errorController");
const ApplicationError = require("./utils/applicationError");

const app = express();

app.use("/api/v1/users", userRouter);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
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
