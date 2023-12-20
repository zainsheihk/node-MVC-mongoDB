const express = require("express");
const employeeController = require("../../controller/employeeController.js");
const router = express.Router();

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);

module.exports = router;
