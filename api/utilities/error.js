const express = require("express");

// const errorHandler = (statusCode, message) => {
//   const error = new Error();
//   error.statusCode = statusCode;
//   error.message = message;
//   return error;
// };

// const errorHandlerMiddleware = (err, req, res, next) => {
//   const error = errorHandler(err.statusCode, err.message);
//   res.status(error.status).json({
//     error: {
//       message: error.message,
//       statusCode: error.status,
//     },
//   });
// };

const errorHandlingMiddleware = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
module.exports = { errorHandlingMiddleware };
