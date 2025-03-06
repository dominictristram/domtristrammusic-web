document.addEventListener("DOMContentLoaded", function () {
    const albumData = [
            {
            title: "All Is Calm",
            artist: "The Goodness Guild",
            cover: "images/discography/all_is_calm.png",
            description: "With everything currently going on close to the setting of the original Christmas story I thought I'd write something about another scared young mother trying to find somewhere to have her baby.",
            releaseDate: "1st December 2024",
            links: {
                Spotify: "https://open.spotify.com/album/41pzkSgn664xFkWb8iqQKe?si=jIyvOBBhTD6tiNbmqBYFVA",
                AppleMusic: "https://music.apple.com/gb/album/all-is-calm/1733135769?i=1733135771",
                Bandcamp: "https://goodnessguild.bandcamp.com/track/all-is-calm"
            }
        },
        {
            title: "Wild Women EP",
            artist: "The Goodness Guild",
            cover: "images/discography/wildwomen.png",
            description: "A collection of tracks exploring themes of independence and strength.",
            releaseDate: "31st October 2024",
            links: {
                Spotify: "https://open.spotify.com/album/13Zwf0wJTFqEAD3F8kBJmA?si=Grwptda2THOkLTEWVqVA9w",
                AppleMusic: "https://music.apple.com/gb/album/wild-women-ep/1775749944",
                Bandcamp: "https://goodnessguild.bandcamp.com/album/wild-women-ep"
            }
        }
    ];

    const grid = document.querySelector(".discography-grid");
    const modal = document.getElementById("album-modal");
    const closeModal = document.querySelector(".close");
    const modalCover = document.getElementById("album-cover");
    const modalTitle = document.getElementById("album-title");
    const modalArtist = document.getElementById("album-artist");
    const modalDescription = document.getElementById("album-description");
    const modalReleaseDate = document.getElementById("album-release-date");
    const modalStreaming = document.getElementById("album-streaming"); // Dropdown select element

    // Populate the album grid dynamically
    albumData.forEach((album, index) => {
        const img = document.createElement("img");
        img.src = album.cover;
        img.alt = album.title;
        img.classList.add("album-cover");
        img.dataset.index = index;

        img.addEventListener("click", () => {
            modalCover.src = album.cover;
            modalTitle.textContent = album.title;
            modalArtist.textContent = `by ${album.artist}`;
            modalDescription.textContent = album.description;
            modalReleaseDate.textContent = album.releaseDate;

            // Clear and populate dropdown options
            modalStreaming.innerHTML = '<option value="">Select an option...</option>';
            for (const [service, url] of Object.entries(album.links)) {
                const option = document.createElement("option");
                option.value = url;
                option.textContent = service;
                modalStreaming.appendChild(option);
            }

            modal.style.display = "flex"; // Show the modal
        });

        grid.appendChild(img);
    });

    // Close modal when clicking the close button
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

// Open the selected streaming link in a new tab
function openStreamingLink(select) {
    const selectedValue = select.value;
    if (selectedValue) {
        window.open(selectedValue, "_blank");
    }
}