# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js App Router project.

- `app/`: route segments and page entry points (`app/page.tsx`, `app/about/page.tsx`, etc.), plus global layout/styles in `app/layout.tsx` and `app/globals.css`.
- `components/`: reusable client components (for example `navbar.tsx`, `hero-carousel.tsx`).
- `public/`: static assets served from root (`/carousel/project-1.jpg`, `/vercel.svg`).
- Root config: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`.

Use the `@/*` import alias defined in `tsconfig.json` for internal imports.

## Build, Test, and Development Commands
Use npm (lockfile is committed as `package-lock.json`).

- `npm run dev`: start local dev server on `http://localhost:3000`.
- `npm run build`: create production build.
- `npm run start`: run the production build locally.
- `npm run lint`: run ESLint with Next.js + TypeScript rules.

## Coding Style & Naming Conventions
- Language: TypeScript with `strict` mode enabled.
- Indentation: 2 spaces; use semicolons and double quotes (match existing files).
- Components: PascalCase exports (`Navbar`, `HeroCarousel`), file names are currently kebab-case (`hero-carousel.tsx`).
- Routes: folder-based, lowercase segment names under `app/`.
- Styling: Tailwind CSS v4 utility classes in JSX; keep classes grouped by layout, spacing, and visual concern.

Run `npm run lint` before opening a PR.

## Testing Guidelines
There is no dedicated automated test suite configured yet. Until tests are added:

- Treat `npm run lint` and `npm run build` as required checks.
- Manually verify key flows on desktop and mobile (navigation, carousel, page routing).
- If you add tests, colocate them clearly (for example `components/__tests__/...`) and document the command in `package.json`.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commit style (`feat:`, `fix:`, `style:`, `chore(deps):`). Continue this pattern.

- Keep commits focused and descriptive.
- PRs should include: purpose, key UI/behavior changes, and validation performed.
- Link related issues when applicable.
- For UI updates, include screenshots or short recordings for desktop and mobile states.
