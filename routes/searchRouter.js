const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const searchController = require("../controllers/searchController.js");

router.route("/").get(isLoggedIn, wrapAsync(searchController.search));

module.exports = router;