const Listing = require("../models/listing.js");
const forwardGeocode = require("../utils/geocoding.js");

// Show all listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// Render new form
module.exports.new = (req, res) => {
  res.render("listings/new.ejs");
};

// Show single listing
module.exports.show = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  res.render("listings/show.ejs", { listing });
};

// Render edit form
module.exports.edit = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Listing doesn't exist!");
    return res.redirect("/listings");
  }

  const originalImageUrl = listing.image.url.replace("/upload", "/upload/h_200,w_250/");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// Create listing
module.exports.create = async (req, res) => {
  const geometry = await forwardGeocode(req.body.listing.location);

  const newListing = new Listing({ ...req.body.listing });
  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  newListing.geometry = geometry;
  await newListing.save();

  req.flash("success", "New Listing Created!");
  res.redirect(`/listings`);
};

// Update listing
module.exports.update = async (req, res) => {
  const { id } = req.params;

  const updatedListing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  if (req.file) {
    updatedListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await updatedListing.save();
  }

  if (req.body.listing.location) {
    updatedListing.geometry = await forwardGeocode(req.body.listing.location);
    await updatedListing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${updatedListing._id}`);
};

// Delete listing
module.exports.delete = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
