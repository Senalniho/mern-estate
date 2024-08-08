const express = require("express");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json("User created successfully");
  } catch (error) {
    res.status(500).json({ message: "Error creating User" });
  }
};

module.exports = { signup };
