const express = require("express");
const userRouter = require("./routers/userRoutes");

const app = express();

app.use("/api/v1/users", userRouter);

module.exports = app;
