const path = require("path");
const express = require("express");
const userRouter = require("./routers/userRoutes");

const app = express();

app.use("/api/v1/users", userRouter);

const __dirname = path.resolve();

if(process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, "/client/dist")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...")
  })
}

module.exports = app;
