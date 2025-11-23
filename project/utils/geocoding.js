// utils/geocoding.js
const { geocoding, config } = require("@maptiler/client");

// Configure MapTiler key once
config.apiKey = process.env.MAP_TOKEN;

async function forwardGeocode(location) {
    try {
        const response = await geocoding.forward(location, {
            limit: 1,   // ensure only 1 result is returned
        });

        if (!response || !response.features || response.features.length === 0) {
            throw new Error("No geocoding result found");
        }

        const [lng, lat] = response.features[0].center;

        return {
            type: "Point",
            coordinates: [lng, lat]
        };
    } catch (err) {
        console.error("Geocoding Error:", err.message);
        throw err;
    }
}

module.exports = forwardGeocode;
