const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routeHandlers/todoHandler");
const userHandler = require("./routeHandlers/userHandler");
const app = express();
dotenv.config();
app.use(express.json());

mongoose
  .connect("mongodb://localhost/todos")
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/todo", todoHandler);
app.use("/user", userHandler);

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
