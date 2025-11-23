const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })

// Index and Create Routes for Listings
router.route("/")
  // Display all listings
  .get(wrapAsync(listingController.index))
  // Add a new listing to the database
  .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.create));

// New Route - Render form to create a new listing
router.get("/new", isLoggedIn, (listingController.new));

// Routes for a specific listing
router.route("/:id")
  // Show Route - Show details of a specific listing
  .get(wrapAsync(listingController.show))
  // Update Route - Update a specific listing
  .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.update))
  // Delete Route - Delete a specific listing
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.delete));

// Edit Route - Render form to edit an existing listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.edit));



module.exports = router;