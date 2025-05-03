const Listing = require("../models/listing.js");

module.exports.search = async (req, res) => {
    const name = req.query?.country.name;
    const searchTerm = name.trim();

    if (!searchTerm) {
      req.flash("error", "Country or location name is required");
      return res.redirect("/listings");
    }

    const query = {
      $or: [
        { country: { $regex: new RegExp(searchTerm, "i") } },
        { location: { $regex: new RegExp(searchTerm, "i") } },
      ],
    };

    const allListings = await Listing.find(query);

    if (allListings.length === 0) {
      req.flash(
        "error",
        "No listings found for the given country or location!"
      );
      return res.redirect("/listings");
    }

    res.render("listings/searchListing.ejs", { allListings });
  }