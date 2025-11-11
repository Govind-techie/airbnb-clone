const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;
const Review = require("./review.js")

const listingSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    image: {
        type: String,
        default: "https://media.istockphoto.com/id/1453462931/photo/maldives-hotel-beach-resort-on-tropical-island-with-aerial-drone-view.jpg?s=1024x1024&w=is&k=20&c=OWxWTv4Pf0oUwDdhuOrfjcyceotLLlpHqFwmsBjQIyw=",
        set: (v) => v === "" ? "https://media.istockphoto.com/id/1453462931/photo/maldives-hotel-beach-resort-on-tropical-island-with-aerial-drone-view.jpg?s=1024x1024&w=is&k=20&c=OWxWTv4Pf0oUwDdhuOrfjcyceotLLlpHqFwmsBjQIyw=" : v,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
    },
    country: {
        type: String,
        required: [true, "Country is required"],
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if (listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
}); 

const Listing = Model("Listing", listingSchema);
module.exports = Listing;