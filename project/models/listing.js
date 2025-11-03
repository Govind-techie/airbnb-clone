const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: "https://media.istockphoto.com/id/1453462931/photo/maldives-hotel-beach-resort-on-tropical-island-with-aerial-drone-view.jpg?s=1024x1024&w=is&k=20&c=OWxWTv4Pf0oUwDdhuOrfjcyceotLLlpHqFwmsBjQIyw=",
        set: (v) => v === "" ? "https://media.istockphoto.com/id/1453462931/photo/maldives-hotel-beach-resort-on-tropical-island-with-aerial-drone-view.jpg?s=1024x1024&w=is&k=20&c=OWxWTv4Pf0oUwDdhuOrfjcyceotLLlpHqFwmsBjQIyw=" : v,
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {

    },
});

const Listing = Model("Listing", listingSchema);
module.exports = Listing;