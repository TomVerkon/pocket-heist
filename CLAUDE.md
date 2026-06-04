# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

@SPEC.md

## Commands

```bash
npm run dev             # dev server (DEP0205 warning suppressed via NODE_OPTIONS)
npm run build           # production build
npm run lint            # ESLint 10
npm run test            # Vitest (watch mode)
npx vitest run <path>   # run a single test file, e.g. tests/components/Navbar.test.tsx
```

## Architecture

Pure **App Router** with two **route groups** that set up distinct layout contexts — the groups don't appear in URLs:

```
app/
├── layout.tsx              # root: <html>, fonts, global metadata
├── globals.css             # Tailwind v4 theme tokens + layout utilities
│
├── (public)/               # unauthenticated context — bare <main className="public">
│   ├── page.tsx            #   "/"  splash (intended redirect: logged-in→/heists, else→/login)
│   ├── login/page.tsx      #   /login
│   ├── signup/page.tsx     #   /signup
│   └── preview/page.tsx    #   /preview  (sandbox for new UI components)
│
├── (dashboard)/            # authenticated context — renders <Navbar/> + <main>
│   └── heists/
│       ├── page.tsx        #   /heists           (Active / Assigned / Expired sections)
│       ├── create/page.tsx #   /heists/create
│       └── [id]/page.tsx   #   /heists/:id       (heist details)
│
└── components/Navbar/      # barrel-exported component (index.ts) + Navbar.module.css
```

## Key Conventions

- **Tailwind v4** is configured CSS-first via `@theme` in `globals.css` — no `tailwind.config.*` file. Custom tokens: `primary`, `secondary`, `dark`, `light`, `lighter`, `success`, `error`, `heading`, `body`.
- Layout utility classes (`.page-content`, `.center-content`, `.form-title`) live in `globals.css` — add new ones there.
- Path alias `@/*` resolves to the repo root (e.g. `@/app/components/Navbar`).
- Tests live in top-level `tests/` (not `app/tests/`, which is empty and unused). Testing stack: Vitest 4 + jsdom + Testing Library.

## Features (current state)

- **Heists dashboard** with three intended buckets: *Active*, *Assigned to others*, *Expired*.
- **Create / view-detail** heist flows (`/heists/create`, `/heists/[id]`).
- **Auth surfaces:** login + signup pages, and a splash router page (redirect logic described in comments but not yet implemented).
- **Navbar** with logo link and "Create Heist" CTA — the only component with real markup and the only thing under test (2 tests).
- A **`/preview` page** convention for prototyping UI components in isolation.


## Additional coding practices

-- Do not apply tailwind classes directly in component templates unless essential or just 1 at most. If an element needs more than a single tailwind class, combine them into a custom class using the `@apply` directive.
-- Use minimal project dependencies where possible
-- Use the `git switch -c` to switch to new branches, not `git checkout`.