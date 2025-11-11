const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");


// Index Route - Display all listings
router.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

// New Route - Render form to create a new listing
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route - Show details of a specific listing
router.get("/:id", wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id)
  .populate({path: "reviews", 
    populate: {
      path: "author",
    },
  })
  .populate("owner");
  res.render("listings/show.ejs", { listing });
}));

// Edit Route - Render form to edit an existing listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Listing doesn't exist!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
}));

// Create Route - Add a new listing to the database
router.post("/", validateListing, isLoggedIn, wrapAsync(async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect(`/listings`);
}));

// Update Route - Update a specific listing
router.put("/:id", validateListing, isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
  req.flash("success", "Listing Updated!")
  res.redirect(`/listings/${updatedListing._id}`);
}));

// Delete Route - Delete a specific listing
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing Deleted!")
  res.redirect("/listings");
}));

module.exports = router;