const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", `Welcome to WanderLust, ${registeredUser.username}!`);
            return res.redirect("/listings");
        });
        // Note: passport.authenticate() middleware invokes req.login() automatically.
        // This function is primarily used when users sign up, during which req.login() can be invoked to
        // automatically log in the newly registered user.

    } catch (err) {
        req.flash("error", err.message); // show the error message (e.g., "Username already exists")
        res.redirect("/user/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/user/login",
        failureFlash: true,
    }),
    wrapAsync(async (req, res) => {
        req.flash("success", "Welcome back to WanderLust!");
        // If the redirect URL points to /reviews, replace it with the show page
        let redirectUrl = res.locals.redirectUrl || "/listings";
        if (redirectUrl.includes("/reviews")) {
            const id = redirectUrl.split("/")[2]; // extract :id from '/listings/:id/reviews'
            redirectUrl = `/listings/${id}`;
        }
        res.redirect(redirectUrl);
    })
);

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You’ve been logged out successfully. Come back soon!");
        return res.redirect("/listings");
    })
});

module.exports = router;