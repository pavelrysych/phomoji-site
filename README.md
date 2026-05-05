# Phomoji

Website for [phomoji.com](https://phomoji.com). The production app lives in `lamp-ui/` and is a Next.js landing page for the Phomoji mobile app concept.

## Structure

- `index.html` — hero always visible; Terms / Privacy open as **bottom sheets** (slide up from below), hash `#/terms` / `#/privacy`, **no full reload**
- `app.js` — opens/closes sheets, **Back** / backdrop click / **Esc** closes to `#/`
- `terms.html` / `privacy.html` — redirect to `index.html#/…` for old bookmarks or direct URLs
- `styles.css` — layout and typography
- `assets/background.mp4` — background video (keep this file when deploying)
- `assets/favicon.png` — favicon (cloud character)
- `assets/og-image.png` — Open Graph / social preview image
- `robots.txt` — crawler rules; points to the sitemap
- `sitemap.xml` — homepage + `terms.html` / `privacy.html` entry URLs
- `llms.txt` — concise site summary for AI / LLM crawlers
- `site.webmanifest` — PWA manifest (name, theme, icon) for install prompts and mobile chrome

## Local preview

From this directory:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/` in a browser.

## Optional: React experiment (`lamp-ui/`)

The repo includes a **Next.js + TypeScript + Tailwind + shadcn** sub-app in `lamp-ui/` — the current production Phomoji landing with pastel hero artwork, feature sections, social metadata, favicon, and Terms/Privacy modals.

## Deploy

For Vercel production, configure **Root Directory = `lamp-ui`** and deploy from `main`. The root static files are retained for historical/static-host fallback only.
