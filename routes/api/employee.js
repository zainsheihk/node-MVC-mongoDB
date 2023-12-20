const express = require("express");
const router = express.Router();
const path = require("path");
const data = {};
data.employee = require("../../data/employees.json");

router.get("/", (req, res) => {
  res.json(data.employee);
});

module.exports = router;
