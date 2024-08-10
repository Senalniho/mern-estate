const express = require("express");
const { test } = require("../controllers/user.controller.js");
const router = express.Router();

router.get("/user", test);

module.exports = router;
