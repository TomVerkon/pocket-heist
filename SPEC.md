# Pocket Heist — Project Spec

> **Tagline:** *Tiny missions. Big office mischief.*

A web app for creating and managing playful office "heists." This document summarizes the project's frameworks, architecture, and current feature set.

> **Status:** Early-stage scaffolding. The route structure and domain are sketched out, but pages render static headings only — there is no data layer, auth, or API yet.

## Tech Stack

| Concern   | Choice                                                                      |
|-----------|-----------------------------------------------------------------------------|
| Framework | **Next.js 16.2.6** (App Router) on **React 19.2**                           |
| Language  | **TypeScript 6** (strict mode), `@/*` path alias → repo root                |
| Styling   | **Tailwind CSS v4**                                                         | 
|           |   (CSS-first config via `@theme` in `globals.css`),                         |
|           |   PostCSS, CSS Modules for the Navbar                                       |
| Icons     | **lucide-react** (the `Clock8` icon doubles as the "o" in the logo)         |
| Fonts     | Geist Sans/Mono via `next/font/google` (root layout); Inter imported in CSS |
| Testing   | **Vitest 4** + jsdom + Testing Library (React/DOM/jest-dom),                | 
|           |    wired through `vite-tsconfig-paths`                                      |
| Linting   | ESLint 10 + `eslint-config-next`                                            |

> ⚠️ `AGENTS.md` warns this is a pre-release Next.js 16 with breaking changes, and instructs reading `node_modules/next/dist/docs/` before coding. Pinned versions (`next ^16.2.6`, `eslint ^10`, `typescript ^6`) are ahead of typical stable releases.

## Notable Gaps / Observations

- **No data layer, state, auth, or API routes yet** — no server actions, DB, or `route.ts` handlers. UI shell only.
- Splash-page **redirect logic is described in comments but unimplemented**.
- Minor bug: `login/page.tsx` and `signup/page.tsx` both export a component named `SignupPage` (login's is mislabeled).
- An empty `app/tests/` directory exists; the real test lives in top-level `tests/`.
