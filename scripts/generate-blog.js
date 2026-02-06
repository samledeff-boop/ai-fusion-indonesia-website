const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'AIFP-Blog-Generator/1.0',
  },
});

const FEEDS = [
  { url: 'https://tekno.kompas.com/rss', name: 'Kompas Tekno' },
  { url: 'https://inet.detik.com/rss', name: 'Detik iNET' },
];

const KEYWORDS = [
  'AI', 'kecerdasan buatan', 'artificial intelligence',
  'otomasi', 'automation', 'machine learning',
  'ChatGPT', 'teknologi', 'digital',
];

const DRAFTS_DIR = path.join(__dirname, '..', 'blog-drafts');
const HTML_DIR = path.join(DRAFTS_DIR, 'html');

function ensureDirs() {
  if (!fs.existsSync(DRAFTS_DIR)) fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  if (!fs.existsSync(HTML_DIR)) fs.mkdirSync(HTML_DIR, { recursive: true });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80)
    .replace(/-$/, '');
}

function matchesKeywords(text) {
  const lower = text.toLowerCase();
  return KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, '').trim();
}

function createMarkdown(article, sourceName) {
  const title = stripHtml(article.title || 'Tanpa Judul');
  const date = formatDate(article.pubDate || article.isoDate);
  const slug = slugify(title);
  const excerpt = stripHtml(article.contentSnippet || article.content || '').substring(0, 200);
  const link = article.link || '';

  const md = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
source: "${sourceName}"
sourceUrl: "${link}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
slug: "${slug}"
---

## Ringkasan

${excerpt}...

## Relevansi untuk Bisnis Indonesia

<!-- TODO: Tambahkan analisis manual tentang bagaimana berita ini relevan untuk bisnis di Indonesia -->

_Bagian ini perlu diedit secara manual untuk memberikan konteks bisnis yang relevan._

---

**Sumber:** [${sourceName}](${link})
`;

  return { slug, md, title, date, excerpt, link, sourceName };
}

function createHtml(article) {
  const { slug, title, date, excerpt, link, sourceName } = article;

  return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${excerpt.replace(/"/g, '&quot;')}">
    <title>${title} | Blog AI Fusion Partner</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Poppins:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/modern-style.css">
    <link rel="stylesheet" href="../assets/css/aura-enhancements.css">
    <link rel="stylesheet" href="../assets/css/fixes-final.css">
    <link rel="stylesheet" href="../assets/css/aura-inspired.css">
    <link rel="stylesheet" href="../assets/css/logo-override.css">
    <link rel="stylesheet" href="../assets/css/aesthetic-updates.css">
</head>
<body>
    <div class="radial-glow glow-blue"></div>

    <header class="header" id="header">
        <div class="container">
            <nav class="navbar">
                <a href="../index-modern.html" class="logo">
                    <img src="../assets/images/logos/logo-white-bg.png" alt="AI Fusion Partner Logo">
                </a>
                <ul class="nav-menu">
                    <li><a href="../index-modern.html#agents" class="nav-link">Agen AI</a></li>
                    <li><a href="../pricing.html" class="nav-link">Harga</a></li>
                    <li><a href="../integrations.html" class="nav-link">Integrasi</a></li>
                    <li><a href="../blog.html" class="nav-link active">Blog</a></li>
                    <li><a href="#" class="btn btn-primary">Demo Gratis</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section class="section" style="padding-top: 200px; padding-bottom: 40px;">
        <div class="container" style="max-width: 800px;">
            <a href="../blog.html" style="color: var(--color-text-muted); text-decoration: none; font-size: 0.9rem;">&larr; Kembali ke Blog</a>
            <h1 style="margin-top: var(--spacing-md);">${title}</h1>
            <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-lg);">${date} &middot; Sumber: ${sourceName}</p>

            <div style="color: var(--color-text-secondary); line-height: 1.8; font-size: 1.05rem;">
                <h2>Ringkasan</h2>
                <p>${excerpt}...</p>

                <h2>Relevansi untuk Bisnis Indonesia</h2>
                <p><em>Bagian ini perlu diedit secara manual untuk memberikan konteks bisnis yang relevan.</em></p>
            </div>

            <div style="margin-top: var(--spacing-xl); padding: var(--spacing-md); background: var(--color-bg-card); border-radius: 16px; border: 1px solid rgba(0,0,0,0.05);">
                <p style="color: var(--color-text-muted); font-size: 0.9rem;">
                    Sumber asli: <a href="${link}" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary);">${sourceName}</a>
                </p>
            </div>
        </div>
    </section>

    <footer style="background: var(--color-bg-darker); padding: var(--spacing-xl) 0 var(--spacing-md); border-top: 1px solid rgba(255, 255, 255, 0.05);">
        <div class="container">
            <div style="text-align: center;">
                <p style="color: var(--color-text-muted); font-size: 0.85rem;">&copy; 2026 AI Fusion Partner. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="../assets/js/animations.js"></script>
</body>
</html>`;
}

async function main() {
  ensureDirs();

  let totalGenerated = 0;
  let totalSkipped = 0;

  for (const feed of FEEDS) {
    console.log(`\nFetching: ${feed.name} (${feed.url})...`);

    let items;
    try {
      const result = await parser.parseURL(feed.url);
      items = result.items || [];
      console.log(`  Found ${items.length} articles.`);
    } catch (err) {
      console.error(`  ERROR fetching ${feed.name}: ${err.message}`);
      continue;
    }

    for (const item of items) {
      const text = `${item.title || ''} ${item.contentSnippet || ''} ${item.content || ''}`;

      if (!matchesKeywords(text)) {
        totalSkipped++;
        continue;
      }

      const article = createMarkdown(item, feed.name);
      const mdPath = path.join(DRAFTS_DIR, `${article.slug}.md`);
      const htmlPath = path.join(HTML_DIR, `${article.slug}.html`);

      fs.writeFileSync(mdPath, article.md, 'utf-8');
      fs.writeFileSync(htmlPath, createHtml(article), 'utf-8');

      console.log(`  + ${article.title}`);
      totalGenerated++;
    }
  }

  console.log(`\n========== SUMMARY ==========`);
  console.log(`Generated: ${totalGenerated} articles`);
  console.log(`Skipped (no keyword match): ${totalSkipped}`);
  console.log(`Markdown drafts: ${DRAFTS_DIR}`);
  console.log(`HTML drafts: ${HTML_DIR}`);
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
