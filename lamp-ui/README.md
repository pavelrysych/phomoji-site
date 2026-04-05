# lamp-ui (experiment)

Next.js 15 + TypeScript + Tailwind CSS + shadcn (base-nova) + **framer-motion**.

## Run

```bash
cd lamp-ui
npm install
npm run dev
```

- Home: [http://localhost:3000](http://localhost:3000)
- **Lamp section:** [http://localhost:3000/lamp](http://localhost:3000/lamp)

## Structure

| Path | Role |
|------|------|
| `src/components/ui/` | shadcn-style UI (includes `lamp.tsx`) |
| `src/lib/utils.ts` | `cn()` helper (`clsx` + `tailwind-merge`) |
| `src/app/lamp/page.tsx` | Route that renders `LampDemo` |

`components/ui` matches shadcn defaults so CLI `npx shadcn@latest add …` keeps working.

## Dependencies

- **framer-motion** — lamp animations (`motion.div`, `whileInView`, etc.)

## Notes

- `tailwind.config.ts` extends `backgroundImage.gradient-conic` for the lamp conic gradients.
- This folder is optional: delete the branch or folder to drop the experiment without touching the static `index.html` site at the repo root.
