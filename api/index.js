const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("../api/routes/user.route.js");
const authRouter = require("../api/routes/auth.route.js");
const listingRouter = require("../api/routes/listing.route.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// const { signup, signin } = require("./routes/auth.route.js");
const errorHandlerMiddleware = require("../api/utilities/error.js");
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
app.use(cookieParser());

app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.log(err);
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// app.use((err, req, res, next) => {
//   res.status(500).json({ error: err.message });
// });

app.listen(4000, () => {
  console.log("Server is running on port 4000!!!");
});
