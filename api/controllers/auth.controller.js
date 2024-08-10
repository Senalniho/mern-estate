const express = require("express");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const {
  errorHandlingMiddleware,
  errorHandler,
} = require("../utilities/error.js");
const jwt = require("jsonwebtoken");
// const { jwtSecret } = require("../config/config.js");

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      //   return res.status(400).json({ message: "Username already exists" });
      errorHandlingMiddleware(400, "Username already exists");
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      //   return res.status(400).json({ message: "Email already exists" });
      errorHandlingMiddleware(400, "Email already exists");
    }

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandlingMiddleware(400, "Invalid email or password"));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(errorHandlingMiddleware(400, "Invalid email or password"));
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);

    // If the user is valid, you may want to return a success response or a token
    // For example:
    // res.json({ message: "Login successful" });
  } catch (error) {
    return next(errorHandlingMiddleware(500, error.message));
  }
};

module.exports = { signup, signin };
