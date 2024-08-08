const express = require("express");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashedPassword });
  await newUser
    .save()
    .then((user) => {
      res.status(200).json("User created successfully");
    })
    .catch((err) => {
      res.status(500).json("Error creating User!!!");
    });
};

module.exports = { signup };
