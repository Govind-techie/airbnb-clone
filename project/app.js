const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.engine("ejs", ejsMate);
app.use(methodOverride("_method"))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'
async function main() {
    await mongoose.connect(MONGO_URL);
};

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "Villa (Goa Beach)",
//         description: "Goa villa beach resort on tropical Island",
//         price: 5000,
//         location: "Goa",
//         country: "India",
//     });

//     await sampleListing.save()
//     console.log("sample saved");
//     res.send("successful testing");
// });

app.get("/", (req, res) => {
    res.send("HomePage");
});

// Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

// New Route (placed before dynamic :id to avoid cast errors for "new")
app.get("/listings/new", async (req, res) => {
    res.render("listings/new.ejs")
});

// Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// Create Route
app.post("/listings", async (req, res) => {
    let { title, description, price, location, country } = req.body;
    await Listing.create({ title, description, price, location, country });
    res.redirect("/listings");
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let { title, description, price, image, location, country } = req.body;

    const update = { title, description, price, location, country };
    if (image && image.trim() !== "") {
        update.image = image.trim();
    }

    await Listing.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

app.listen(port, () => {
    console.log(`listening at port ${8080}`);
});

