maptilersdk.config.apiKey = MAP_TOKEN;

const map = new maptilersdk.Map({
    container: "map",
    style: maptilersdk.MapStyle.STREETS,
    center: coordinates,
    zoom: 12,
});

const marker = new maptilersdk.Marker({ color: "red" })
    .setLngLat(coordinates)
    .setPopup(new maptilersdk.Popup({ offset: 25 })
        .setHTML(
            `<p>This listing’s location is verified and the exact location will be provided after booking.</p>`
        ))
    .addTo(map);
