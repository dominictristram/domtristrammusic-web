const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const source = readFileSync('scripts/substack.js', 'utf8');

const post = { title: '<A title>', date: '2026-11-16T10:00:00Z', url: 'https://domtristrammusic.substack.com/p/test', excerpt: 'Saved excerpt' };
function element() {
    return { children: [], innerHTML: '', append(...nodes) { this.children.push(...nodes); }, appendChild(node) { this.children.push(node); }, replaceChildren(...nodes) { this.children = nodes; } };
}
async function run(fetch, cached, storageFails = false) {
    const container = element();
    let ready;
    const saved = [];
    const context = {
        document: { addEventListener: (_, callback) => { ready = callback; }, getElementById: () => container, createElement: element },
        DOMParser: class { parseFromString(text, type) {
            if (type === 'text/html') return { body: { textContent: text }, querySelectorAll: () => [] };
            return { querySelector: () => null, querySelectorAll: () => [{ querySelector: name => ({ textContent: { title: post.title, pubDate: post.date, link: post.url, description: post.excerpt }[name] }) }] };
        } },
        localStorage: { getItem() { if (storageFails) throw Error('Disabled'); return cached; }, setItem: (_, value) => saved.push(JSON.parse(value)) },
        fetch, URL, AbortController, setTimeout, clearTimeout, console: { warn() {} }
    };
    vm.runInNewContext(source, context);
    await ready();
    return { container, saved };
}

test('renders and caches JSON feed using text nodes, even with storage disabled', async () => {
    const result = await run(async () => ({ ok: true, json: async () => ({ status: 'ok', items: [{ title: post.title, pubDate: '2026-11-16 10:00:00', link: post.url, description: 'Excerpt' }] }) }), null, true);
    assert.equal(result.container.children.length, 1);
    assert.equal(result.container.children[0].children[0].children[0].textContent, post.title);
    assert.equal(result.saved[0][0].date, new Date(post.date).toISOString());
});

test('falls back to RSS when the JSON service returns an HTTP error', async () => {
    let calls = 0;
    const result = await run(async () => ++calls === 1 ? { ok: false, status: 503 } : { ok: true, text: async () => '<rss />' });
    assert.equal(calls, 2);
    assert.equal(result.container.children.length, 1);
    assert.equal(result.saved[0][0].title, post.title);
});

test('keeps saved posts when both services fail', async () => {
    const result = await run(async () => { throw Error('Offline'); }, JSON.stringify([post]));
    assert.equal(result.container.children.length, 1);
    assert.equal(result.container.innerHTML, '');
});

test('shows a direct link when both services fail and cache is corrupt', async () => {
    const result = await run(async () => { throw Error('Offline'); }, '{bad json');
    assert.match(result.container.innerHTML, /Read the latest posts on Substack/);
});

test('rejects an empty JSON feed and tries RSS', async () => {
    let calls = 0;
    const result = await run(async () => ++calls === 1 ? { ok: true, json: async () => ({ status: 'ok', items: [] }) } : { ok: true, text: async () => '<rss />' });
    assert.equal(calls, 2);
    assert.equal(result.container.children.length, 1);
});
