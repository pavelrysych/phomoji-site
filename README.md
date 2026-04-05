# Phomoji — static site

Full-screen background video, home page, and legal pages (**Terms of Service**, **Privacy Policy**) aligned with [phomoji.com](https://phomoji.com).

## Structure

- `index.html` — landing with **Phomoji** title and links to legal pages
- `terms.html` — Terms of Service
- `privacy.html` — Privacy Policy
- `styles.css` — shared layout and typography
- `assets/background.mp4` — background video (keep this file when deploying)

## Local preview

From this directory:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/` in a browser.

## Deploy

Upload the whole folder to any static host (Netlify, Vercel, Cloudflare Pages, etc.) and point your domain’s DNS to the host as described in their docs.
