const { string, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = Schema({
    email: {
        type: String,
        required: true,
    },
});


// Adds authentication support: automatically manages username, password hashing, and salting using Passport-Local-Mongoose.
userSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model("User", userSchema);
