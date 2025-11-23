if (process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

console.log(process.env.SECRET)

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js")
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


app.get("/", (req, res) => {
    res.redirect("/listings");
});

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.engine("ejs", ejsMate);
app.use(methodOverride("_method"))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));

const dbUrl = process.env.ATLAS_DB_URL

async function main() {
    await mongoose.connect(dbUrl);
};

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });



const store = MongoStore.create({
  mongoUrl: dbUrl,
  collectionName: "sessions",
  ttl: 14 * 24 * 60 * 60
});

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user; // Store user whose session is currently active.
    next();
});

// Routing
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/user", userRouter);

app.get("/demouser", async (req, res) => {
    let user = new User({
        email: "user123@gmail.com",
        username: "user1",
    });

    let registeredUser = await User.register(user, "user123");
    res.send(registeredUser);
});

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    let { status = 500, message = "something went wrong!" } = err;
    res.status(status).render("error.ejs", { err });
});

app.listen(port, () => {
    console.log(`listening at port ${8080}`);
});