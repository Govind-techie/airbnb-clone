const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateReview , isReviewAuthor} = require("../middleware.js");
const { saveRedirectUrl } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Create Route (Review)
router.post("/", validateReview, saveRedirectUrl, isLoggedIn, wrapAsync(reviewController.create));

// Delete Route (Review)
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.delete));

module.exports = router;