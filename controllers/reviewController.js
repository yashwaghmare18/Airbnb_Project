const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.reviewGet = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/reviewForm.ejs", { listing });
  }

module.exports.reviewPost = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
  }

module.exports.reviewDelete = async (req, res) => {
    let { id, reviewID } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });
    await Review.findById(reviewID);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  }