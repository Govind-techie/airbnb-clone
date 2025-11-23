const User = require("../models/user.js");

module.exports.signupForm = (req, res) => {
    res.render("user/signup.ejs");
};

module.exports.signupSubmission = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        return req.login(registeredUser, (err) => {
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
};

module.exports.loginForm = (req, res) => {
    res.render("user/login.ejs");
};

module.exports.loginSubmission = async (req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    // If the redirect URL points to /reviews, replace it with the show page
    let redirectUrl = res.locals.redirectUrl || "/listings";
    if (redirectUrl.includes("/reviews")) {
        const id = redirectUrl.split("/")[2]; // extract :id from '/listings/:id/reviews'
        redirectUrl = `/listings/${id}`;
    }
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        req.flash("success", "You’ve been logged out successfully. Come back soon!");
        return res.redirect("/listings");
    })
    // if (err) return next(err);
    // The next parameter has been removed as per the requirement.
};