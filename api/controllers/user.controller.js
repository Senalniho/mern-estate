const express = require("express");
const test = (req, res) => {
  res.json({ message: "All good in here" });
};

module.exports = { test };
