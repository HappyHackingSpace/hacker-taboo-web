# Hacker Taboo Web

Hacker Taboo is Taboo for hackers — a web app for generating and printing playing cards for the Hacker Taboo card game by [Happy Hacking Space](https://happyhacking.space).

Pick a category, a source and destination language, and the number of cards you want, then generate a random set of cards. Each card shows a tech keyword (e.g. "Firewall") together with the taboo words you are not allowed to say while explaining it. Cards can be printed straight from the browser for playing offline.

Card data is fetched at runtime from the [HappyHackingSpace/HackerTaboo](https://github.com/HappyHackingSpace/HackerTaboo) repository (`cards.json`). Want more cards? Contribute new keywords over there.

## Screenshots

<!-- TODO: add screenshots -->
<!-- ![Card generator](docs/screenshots/card-generator.png) -->

## Features

- Filter cards by category, source language, and destination language
- Choose how many cards to generate
- Regenerate a fresh random set with one click
- Print-friendly output: opens a print-ready page with the selected cards

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router) with [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components (Radix UI primitives)
- [Lucide](https://lucide.dev/) icons

## Getting started

Prerequisites: Node.js 18.18+ (20+ recommended) and [pnpm](https://pnpm.io/).

```bash
# Clone the repository
git clone https://github.com/HappyHackingSpace/hacker-taboo-web.git
cd hacker-taboo-web

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> Note: the repo also ships a `package-lock.json`, but `npm install` currently fails on a `react-day-picker`/`date-fns` peer dependency conflict. Use pnpm, or run `npm install --legacy-peer-deps`.

### Other scripts

```bash
pnpm build   # Production build
pnpm start   # Serve the production build
pnpm lint    # Lint (requires an ESLint config; `next lint` offers to set one up)
```

## Deployment

This is a standard Next.js app with no required environment variables, so it deploys anywhere Next.js runs — e.g. [Vercel](https://vercel.com/) (zero config) or any Node host via `pnpm build && pnpm start`.

The live site is at [hackertaboo.happyhacking.space](https://hackertaboo.happyhacking.space).

## Contributing

- Found a bug or have an idea for the web app? Open an issue or PR here.
- Want to add new cards, categories, or translations? Contribute to [HappyHackingSpace/HackerTaboo](https://github.com/HappyHackingSpace/HackerTaboo).

## About

Built by [Happy Hacking Space](https://happyhacking.space) — see more projects at [github.com/HappyHackingSpace](https://github.com/HappyHackingSpace).
