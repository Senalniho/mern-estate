const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route.js");
require("dotenv").config();
const signup = require("./routes/auth.route.js");

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
app.use("/auth", signup);

app.listen(4000, () => {
  console.log("Server is running on port 4000!!!");
});
