document.addEventListener("DOMContentLoaded", function () {
    const albumData = [
        {
            title: "Motosierra",
            artist: "The Goodness Guild",
            cover: "images/discography/motosierra.png",
            description: "A song about Javier Milei, Argentina's populist president.",
            releaseDate: "23rd June 2025",
            releaseType: "Single",
            links: {
                Spotify: "",
                AppleMusic: "",
                Bandcamp: "https://goodnessguild.bandcamp.com/track/motosierra"
            }
        },
        {
            title: "All Is Calm",
            artist: "The Goodness Guild",
            cover: "images/discography/all_is_calm.png",
            description: "With everything currently going on close to the setting of the original Christmas story I thought I'd write something about another scared young mother trying to find somewhere to have her baby.",
            releaseDate: "1st December 2024",
            releaseType: "Single",
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
            releaseType: "EP",
            links: {
                Spotify: "https://open.spotify.com/album/13Zwf0wJTFqEAD3F8kBJmA?si=Grwptda2THOkLTEWVqVA9w",
                AppleMusic: "https://music.apple.com/gb/album/wild-women-ep/1775749944",
                Bandcamp: "https://goodnessguild.bandcamp.com/album/wild-women-ep"
            }
        },
        {
            title: "Time Runs Backwards",
            artist: "The Goodness Guild",
            cover: "images/discography/timerunsbackwards.png",
            description: "The super-wealthy have asset-stripped the country. Vote them out",
            releaseDate: "15th March 2024",
            releaseType: "Single",
            links: {
                Spotify: "https://open.spotify.com/track/0VVvTV7FqKMLgyS7YuX1aL",
                AppleMusic: "https://music.apple.com/gb/album/time-runs-backwards/1732738316",
                Bandcamp: "https://goodnessguild.bandcamp.com/track/time-runs-backwards-2"
            }
        },
        {
            title: "Electricity",
            artist: "The Goodness Guild",
            cover: "images/discography/electricity.png",
            description: "A song about love over distance",
            releaseDate: "1st February 2024",
            releaseType: "Single",
            links: {
                Spotify: "https://open.spotify.com/track/4hnJgIg3cBSqNZCmKT8r3L",
                AppleMusic: "https://music.apple.com/gb/album/electricity-single/1726056868"
            }
        },
        {
            title: "The Best Advice Ever Given To Me",
            artist: "The Goodness Guild",
            cover: "images/discography/thebestadvice.png",
            description: "An upbeat song about deciding to make a change to the world.",
            releaseDate: "1st January 2024",
            releaseType: "Single",
            links: {
                Spotify: "https://open.spotify.com/track/6KRa8AfEEkf5zH6ELD207q",
                AppleMusic: "https://music.apple.com/gb/album/the-best-advice-ever-given-to-me-single/1719874906",
                Bandcamp: "https://goodnessguild.bandcamp.com/track/the-best-advice-ever-given-to-me-3"
            }
        },
        {
            title: "Photograph",
            artist: "The Goodness Guild",
            cover: "images/discography/photograph.png",
            description: "A song about remembering a person of whom the physical evidence of existence is being slowly but inevitably lost.",
            releaseDate: "1st November 2023",
            releaseType: "Single",
            links: {
                Spotify: "https://open.spotify.com/track/6SnIE9gQjpWrg89HBGWIsH",
                AppleMusic: "https://music.apple.com/gb/album/photograph-single/1716400845",
                Bandcamp: "https://goodnessguild.bandcamp.com/track/photograph-3"
            }
        },
        {
            title: "Meant To Be",
            artist: "The Goodness Guild",
            cover: "images/discography/meant_to_be.png",
            description: "A song about a love that was destined to happen.",
            releaseDate: "2nd June 2023",
            releaseType: "Single",
            links: {
                Spotify: "https://open.spotify.com/track/5eVD9PnFhQVM2qaT8L5i8V",
                AppleMusic: "https://music.apple.com/gb/album/meant-to-be-single/1691232468",
                Bandcamp: "https://goodnessguild.bandcamp.com/track/meant-to-be"
            }
        },
        {
            title: "Love Is What You Want",
            artist: "The Goodness Guild",
            cover: "images/discography/loveiswhatyouwant.png",
            description: "An album of songs about love in all of its forms.",
            releaseDate: "14th February 2023",
            releaseType: "Album",
            links: {
                Spotify: "https://open.spotify.com/album/2hKLLWvX1ijQHvJf7reGwD",
                AppleMusic: "https://music.apple.com/gb/album/love-is-what-you-want/1667648985",
                Bandcamp: "https://goodnessguild.bandcamp.com/album/love-is-what-you-want"
            }
        },
        {
            title: "Another Christmas Song",
            artist: "The Goodness Guild",
            cover: "images/discography/christmassong.png",
            description: "A jolly, upbeat Christmas song",
            releaseDate: "13th November 2022",
            releaseType: "Single",
            links: {
                Spotify: "https://open.spotify.com/track/5tCdCuFJBn2chO0sryigVM",
                AppleMusic: "https://music.apple.com/gb/album/another-christmas-song-single/1655038560",
                Bandcamp: "https://goodnessguild.bandcamp.com/track/another-christmas-song"
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
    const modalReleaseType = document.getElementById("album-type");
    const modalStreaming = document.getElementById("album-streaming");

    // Populate the album grid dynamically
    albumData.forEach((album, index) => {
        const container = document.createElement("div");
        container.classList.add("album-container");

        const img = document.createElement("img");
        img.src = album.cover;
        img.alt = album.title;
        img.classList.add("album-cover");
        img.dataset.index = index;

        const titleElement = document.createElement("h3");
        titleElement.classList.add("album-grid-title");
        titleElement.textContent = album.title;

        const typeElement = document.createElement("span");
        typeElement.classList.add("album-grid-type");
        typeElement.textContent = album.releaseType;

        const dateElement = document.createElement("p");
        dateElement.classList.add("album-grid-date");
        dateElement.textContent = album.releaseDate;

        container.appendChild(img);
        container.appendChild(titleElement);
        container.appendChild(typeElement);
        container.appendChild(dateElement);

        container.addEventListener("click", () => {
            modalCover.src = album.cover;
            modalTitle.textContent = album.title;
            
            // Create artist link if it's The Goodness Guild
            if (album.artist === "The Goodness Guild") {
                modalArtist.innerHTML = `by <a href="https://goodnessguild.com" target="_blank">${album.artist}</a>`;
            } else {
                modalArtist.textContent = `by ${album.artist}`;
            }
            
            modalDescription.textContent = album.description;
            modalReleaseDate.textContent = album.releaseDate;
            modalReleaseType.textContent = album.releaseType;

            // Clear and populate dropdown options
            modalStreaming.innerHTML = '<option value="">Select an option...</option>';
            for (const [service, url] of Object.entries(album.links)) {
                const option = document.createElement("option");
                option.value = url;
                option.textContent = service;
                modalStreaming.appendChild(option);
            }

            modal.style.display = "flex";
        });

        grid.appendChild(container);
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