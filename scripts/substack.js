document.addEventListener('DOMContentLoaded', function() {
    const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
    const SUBSTACK_RSS = 'https://domtristrammusic.substack.com/feed';
    const substackContainer = document.getElementById('substack-posts');

    // Show loading state
    substackContainer.innerHTML = '<div class="loading">Loading latest posts...</div>';

    // Fetch and parse RSS feed
    fetch(`${CORS_PROXY}${encodeURIComponent(SUBSTACK_RSS)}`)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll('item');
            const posts = Array.from(items).slice(0, 5).map(item => ({
                title: item.querySelector('title').textContent,
                date: new Date(item.querySelector('pubDate').textContent),
                url: item.querySelector('link').textContent,
                excerpt: item.querySelector('description').textContent
                    .replace(/<[^>]*>/g, '') // Remove HTML tags
                    .substring(0, 150) + '...' // Limit excerpt length
            }));

            // Clear loading state
            substackContainer.innerHTML = '';

            // Display posts
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'substack-post';
                postElement.innerHTML = `
                    <h3><a href="${post.url}" target="_blank">${post.title}</a></h3>
                    <div class="post-meta">${formatDate(post.date)}</div>
                    <p class="post-excerpt">${post.excerpt}</p>
                `;
                substackContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            substackContainer.innerHTML = `
                <div class="error-message">
                    <p>Unable to load latest posts.</p>
                    <a href="https://domtristrammusic.substack.com" class="btn" target="_blank">
                        Visit Substack Directly
                    </a>
                </div>
            `;
            console.error('Error fetching Substack posts:', error);
        });
});

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
} 