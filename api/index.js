const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("../api/routes/user.route.js");
const authRouter = require("../api/routes/auth.route.js");
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

app.use("/", userRouter);

app.use("/api/auth", authRouter);

// Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.log(err);
//   const { statusCode = 500, message = "Internal Server Error" } = err;
//   return res.status(statusCode).json({
//     error: {
//       message,
//       statusCode,
//       success: false,
//     },
//   });
// });

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000!!!");
});
