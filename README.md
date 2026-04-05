# Phomoji — static site

Full-screen background video, home page, and legal pages (**Terms of Service**, **Privacy Policy**) aligned with [phomoji.com](https://phomoji.com).

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

On branch `experiment/lamp-react`, the repo includes a **Next.js + TypeScript + Tailwind + shadcn** sub-app in `lamp-ui/` (hero + Lamp section on `/`). It does not replace the static landing; deploy or run it separately — see `lamp-ui/README.md`.

## Deploy

Upload the whole folder to any static host (Netlify, Vercel, Cloudflare Pages, etc.) and point your domain’s DNS to the host as described in their docs. For production, deploy **either** the static files at the repo root **or** configure your host to build `lamp-ui/` as a separate app if you use that experiment.
