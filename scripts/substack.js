document.addEventListener('DOMContentLoaded', async function() {
    const SUBSTACK_URL = 'https://domtristrammusic.substack.com';
    const feed = encodeURIComponent(`${SUBSTACK_URL}/feed`);
    const CACHE_KEY = 'music-substack-posts-v1';
    const container = document.getElementById('substack-posts');
    if (!container) return;

    function normalisePosts(items) {
        const posts = items.map(item => {
            const url = new URL(item.url);
            const date = new Date(item.date);
            if (url.protocol !== 'https:' || Number.isNaN(date.getTime()) || !item.title) {
                throw new Error('Invalid post in Substack feed');
            }
            return { title: String(item.title), url: url.href, date: date.toISOString(), excerpt: String(item.excerpt || '') };
        }).slice(0, 5);
        if (!posts.length) throw new Error('Substack feed contains no posts');
        return posts;
    }

    function plainText(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        doc.querySelectorAll('script, style').forEach(element => element.remove());
        const text = (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
        return text.length > 150 ? `${text.slice(0, 150)}…` : text;
    }

    function render(posts) {
        const elements = posts.map(post => {
            const element = document.createElement('div');
            element.className = 'substack-post';
            const heading = document.createElement('h3');
            const link = document.createElement('a');
            link.href = post.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = post.title;
            heading.appendChild(link);
            const meta = document.createElement('div');
            meta.className = 'post-meta';
            meta.textContent = formatDate(new Date(post.date));
            const excerpt = document.createElement('p');
            excerpt.className = 'post-excerpt';
            excerpt.textContent = post.excerpt;
            element.append(heading, meta, excerpt);
            return element;
        });
        container.replaceChildren(...elements);
    }

    async function request(url, parse) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        try {
            const response = await fetch(url, { signal: controller.signal });
            if (!response.ok) throw new Error(`Feed service returned HTTP ${response.status}`);
            return await parse(response);
        } finally {
            clearTimeout(timeout);
        }
    }

    let cachedPosts;
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) cachedPosts = normalisePosts(JSON.parse(cached));
    } catch (error) {
        // Storage may be disabled, or an older cache may be invalid.
    }
    if (cachedPosts) render(cachedPosts);
    else container.innerHTML = '<div class="loading">Loading latest posts...</div>';

    const sources = [
        () => request(`https://api.rss2json.com/v1/api.json?rss_url=${feed}`, async response => {
            const data = await response.json();
            if (data.status !== 'ok' || !Array.isArray(data.items)) throw new Error('Invalid feed response');
            return normalisePosts(data.items.map(item => ({
                title: item.title,
                // RSS2JSON dates have no timezone suffix; Substack publishes in UTC.
                date: /Z$|[+-]\d\d:\d\d$/.test(item.pubDate) ? item.pubDate : `${item.pubDate.replace(' ', 'T')}Z`,
                url: item.link,
                excerpt: plainText(item.description || item.content || '')
            })));
        }),
        () => request(`https://api.allorigins.win/raw?url=${feed}`, async response => {
            const doc = new DOMParser().parseFromString(await response.text(), 'text/xml');
            if (doc.querySelector('parsererror')) throw new Error('Invalid RSS XML');
            return normalisePosts(Array.from(doc.querySelectorAll('item')).map(item => ({
                title: item.querySelector('title')?.textContent,
                date: item.querySelector('pubDate')?.textContent,
                url: item.querySelector('link')?.textContent,
                excerpt: plainText(item.querySelector('description')?.textContent || '')
            })));
        })
    ];

    for (const source of sources) {
        try {
            const posts = await source();
            render(posts);
            try { localStorage.setItem(CACHE_KEY, JSON.stringify(posts)); } catch (error) { /* Storage is optional. */ }
            return;
        } catch (error) {
            console.warn('Unable to refresh Substack posts from feed service:', error);
        }
    }

    if (!cachedPosts) {
        container.innerHTML = `
            <div class="error-message">
                <p>Latest posts are temporarily unavailable.</p>
                <a href="${SUBSTACK_URL}" class="btn" target="_blank" rel="noopener noreferrer">Read the latest posts on Substack</a>
            </div>`;
    }
});

function formatDate(date) {
    return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
}
