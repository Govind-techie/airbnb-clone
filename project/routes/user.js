const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");


router.route("/signup")
    .get(userController.signupForm)
    .post(wrapAsync(userController.signupSubmission));


router.route("/login")
    .get(userController.loginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/user/login",
            failureFlash: true,
        }),
        wrapAsync(userController.loginSubmission)
    );

router.get("/logout", userController.logout);

module.exports = router;