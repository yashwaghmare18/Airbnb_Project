const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controllers/userController.js");

router
  .route("/signup")
  .get(userController.signupGet)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.loginGet)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;
