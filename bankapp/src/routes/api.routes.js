var express = require("express");
var router = express.Router();

var bankController = require("../controllers/bank.controller");

router.get("/:ifsc", bankController.getSingleBranch);
router.get("/banks/:bankname/:cityname", bankController.getBranches);

module.exports = router;
