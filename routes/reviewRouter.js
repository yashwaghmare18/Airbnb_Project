const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isAuthor, validateReview } = require("../middleware.js");
const reviewController = require("../controllers/reviewController.js");

router
  .route("/")
  .get(wrapAsync(reviewController.reviewGet))
  .post(validateReview, isLoggedIn, wrapAsync(reviewController.reviewPost));

router.delete(
  "/:reviewID",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.reviewDelete)
);

module.exports = router;
