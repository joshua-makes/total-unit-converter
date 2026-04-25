# ⚡ Total Unit Converter

> A fast, clean, single-page unit converter — length, weight, temperature, volume, and speed — built with Next.js 15, Tailwind CSS v4, and TypeScript.

## ✨ Features

- **5 categories**: Length, Weight/Mass, Temperature, Volume, Speed
- **40+ units** including metric, imperial, and special (Rankine, knots)
- **Non-linear temperature** conversions (°C ↔ °F ↔ K ↔ °R)
- **Swap button** — flip from/to units and value instantly
- **Precision slider** — 0–10 decimal places
- **Copy to clipboard** — one-click result copy with toast feedback
- **Quick conversions** — common chip buttons per category
- **Dark mode** — system preference + manual toggle, persisted
- **Persistent preferences** — last category, units, precision saved to localStorage

## 🛠️ Tech Stack

| Tool | Version |
|------|---------|
| Next.js | 15 (App Router) |
| React | 19 |
| TypeScript | 5 (strict) |
| Tailwind CSS | 4 |
| Vitest | 2 |

## 🚀 Getting Started

```bash
npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📋 Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix lint issues |
| `npm run format` | Format with Prettier |
| `npm run test` | Run tests (watch) |
| `npm run test -- --run` | Run tests once |
| `npm run typecheck` | TypeScript check |

## 📄 License

MIT
