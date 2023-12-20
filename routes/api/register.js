const express = require("express");
const registerController = require("../../controller/registerController.js");
const router = express.Router();

router.post("/", registerController.createNewUser);

module.exports = router;
