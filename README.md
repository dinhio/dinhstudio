# Dinhstudio Website

Marketing site for Dinhstudio, built with Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root route redirects to the default locale (`/en-us`).

## What Is Unique Here

- Locale-first routing and content: `en-us` and `vi-vn` are first-class route segments, with locale utilities in `i18n/config.ts` and typed copy in `i18n/dictionaries/`.
- Motion-heavy homepage experience: the hero carousel and navigation are custom components tuned for animated transitions and responsive behavior.

## Contributing

- Run required checks before opening a PR:

```bash
npm run lint
npm run build
```

- Prefer documenting only stable workflows in this README; avoid listing every internal script or file path.
- If you need available scripts, run:

```bash
npm run
```
