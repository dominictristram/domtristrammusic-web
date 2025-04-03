document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Latest Release Card
    const latestRelease = {
        title: "All Is Calm",
        artist: "The Goodness Guild",
        cover: "images/discography/all_is_calm.png",
        releaseDate: "1st December 2024"
    };

    const releaseCard = document.querySelector('.release-card');
    if (releaseCard) {
        releaseCard.innerHTML = `
            <img src="${latestRelease.cover}" alt="${latestRelease.title}" style="width: 200px; border-radius: 10px;">
            <h3>${latestRelease.title}</h3>
            <p>${latestRelease.artist}</p>
            <p>Released: ${latestRelease.releaseDate}</p>
            <a href="discography.html" class="btn">Learn More</a>
        `;
    }

    // Add intersection observer for fade-in effects
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});