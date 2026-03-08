# Dinhstudio Website

Marketing site for Dinhstudio, built with Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root route redirects to the default locale (`/en-us`).

## Contributing

- Run required checks before opening a PR:

```bash
npm run lint
npm run build
```
- If you need available scripts, run:

```bash
npm run
```

### Take notice

- Locale-first routing and content: `en-us` and `vi-vn` determined by middleware or manual picker, with locale utilities in `i18n/config.ts` and typed copy in `i18n/dictionaries/`.
- Hero carousel and navigation are custom components tuned for animated transitions and responsive behavior.
