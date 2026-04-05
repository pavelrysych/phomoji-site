# Phomoji — static site

Full-screen background video, home page, and legal pages (**Terms of Service**, **Privacy Policy**) aligned with [phomoji.com](https://phomoji.com).

## Structure

- `index.html` — single page: hero + Terms + Privacy (switched client-side; **no full reload** when using in-app links `#/terms`, `#/privacy`)
- `app.js` — hash routing (`#/`, `#/terms`, `#/privacy`), **Back** returns to home
- `terms.html` / `privacy.html` — redirect to `index.html#/…` for old bookmarks or direct URLs
- `styles.css` — layout and typography
- `assets/background.mp4` — background video (keep this file when deploying)

## Local preview

From this directory:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/` in a browser.

## Deploy

Upload the whole folder to any static host (Netlify, Vercel, Cloudflare Pages, etc.) and point your domain’s DNS to the host as described in their docs.
