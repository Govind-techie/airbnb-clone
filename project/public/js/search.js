 const searchInput = document.querySelector("input[name='location']");
const cards = document.querySelectorAll(".card-link");

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    cards.forEach(card => {
        const cardLocation = card.dataset.location.toLowerCase();

        if (cardLocation.includes(query) || query === "") {
            card.style.display = ""; // keep original layout
        } else {
            card.style.display = "none";
        }
    });
});
