# Dinhstudio Website

Marketing site for Dinhstudio, built with Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- Framer Motion

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

The root route redirects to the default locale (`/en-us`).

## Project Structure

```text
app/
  [locale]/            Localized pages (home, work, services, about, contact)
  [locale]/[country]/  Country-aware landing route
  layout.tsx           Global shell
components/
  hero-carousel.tsx    Homepage hero carousel
  navbar.tsx           Responsive nav with locale switching
i18n/
  config.ts            Locale resolution and helpers
  dictionaries/        Translation dictionaries (en-us, vi-vn)
public/
  carousel/            Carousel image assets
scripts/
  check-i18n-sync.mjs  Translation key sync check
tests/
  carousel.spec.ts     Playwright carousel e2e
```

## Localization

- Supported locales: `en-us`, `vi-vn`
- Default locale: `en-us`
- Locale resolution utilities live in `i18n/config.ts`
- Page copy is managed through typed dictionaries in `i18n/dictionaries/`

## Commands

- `npm run dev`: Start local development server
- `npm run build`: Create production build
- `npm run start`: Run production build
- `npm run lint`: Run ESLint checks
- `npm run i18n:check`: Verify dictionary key sync
- `npm run bench:carousel`: Run carousel benchmark script
- `npm run bench:carousel:network`: Benchmark carousel network behavior
- `npm run bench:carousel:mainthread`: Benchmark main-thread carousel cost
- `npm run test:e2e:carousel`: Run Playwright carousel e2e (Chromium)

## Validation

Use these before opening a PR:

```bash
npm run lint
npm run build
```
