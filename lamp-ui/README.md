# lamp-ui

Next.js 15 + TypeScript + Tailwind CSS + shadcn (base-nova). This is the production Phomoji landing app for Vercel deployments with Root Directory set to `lamp-ui`.

## Run

```bash
cd lamp-ui
npm install
npm run dev
```

- Home: [http://localhost:3000](http://localhost:3000) — redesigned **Phomoji** landing with pastel hero artwork, app-preview sections, feature cards, Terms/Privacy modals, and coming-soon store messaging.

## Structure

| Path | Role |
|------|------|
| `src/components/phomoji/` | `PhomojiLanding` + тексты Terms/Privacy; стили `src/styles/phomoji-landing.css` |
| `public/phomoji-hero.png` | Main hero artwork used by the redesigned landing |
| `public/assets/background.mp4` | Legacy static-site video asset; no longer used by the Next landing |
| `src/components/ui/` | shadcn-style UI (includes `lamp.tsx`) |
| `src/lib/utils.ts` | `cn()` helper (`clsx` + `tailwind-merge`) |
| `src/app/page.tsx` | Главная: `<PhomojiLanding />` |

`components/ui` matches shadcn defaults so CLI `npx shadcn@latest add …` keeps working.

## Notes

- `components/ui` still matches shadcn defaults so CLI `npx shadcn@latest add …` keeps working.
- The root static site files remain in the repo for historical/static-host parity; Vercel production should build this `lamp-ui/` app.
