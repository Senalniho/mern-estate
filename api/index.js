const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route.js");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use("/", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000!!!");
});
