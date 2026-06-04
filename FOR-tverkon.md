# FOR-tverkon: Setting Up the AI Development Environment for Pocket Heist

*What happened: CLAUDE.md was expanded from a stub into a full project guide, SPEC.md and TEACHME.md were created, and the splash page got its first real copy.*

---

## Step 1: What approach was taken, and why?

The goal here was **teaching the AI how to work in this project** — before writing a single line of feature code.

Think of it like onboarding a contractor. If you hire a plumber and just say "fix the leak," they might fix it in a way that works but creates problems for your renovation next month. But if you hand them a one-pager that says "we're doing a full gut next spring, use compression fittings not solder, don't touch the east wall," suddenly they make better decisions at every step without you having to supervise each one.

That's exactly what `CLAUDE.md` does. The starting point was a near-empty file (just `@AGENTS.md` — a reference to a one-line warning). The approach: expand it into a living map of the codebase, conventions, and rules. Give the AI the context it needs upfront so it doesn't have to guess or ask repeatedly.

The splash page copy was a small addition alongside this — turning a blank placeholder into something that actually communicates what the app is.

---

## Step 2: What alternatives were considered and rejected?

**Alternative 1: Document nothing, just start building features.**
Fast in the short term. Catastrophic over time. Without documented conventions, every AI session starts cold — the model might use `tailwind.config.js` (which doesn't exist in this v4 setup), create tests in the wrong folder, or write JSX that fights the existing patterns. You'd spend time correcting drift instead of building.

**Alternative 2: Write a massive README instead of CLAUDE.md.**
READMEs are for humans. CLAUDE.md is specifically loaded by Claude Code as a system instruction — it's machine-readable context that influences every response automatically. A README doesn't do that. They serve different audiences.

**Alternative 3: Just use comments in the code.**
Comments in code answer "what does this line do." CLAUDE.md answers "why is the project structured this way and what rules should I follow." You can't put "always use @apply for multi-class elements" in a component file — that's a global convention that needs to live above any individual file.

---

## Step 3: How do the pieces connect?

Picture three concentric rings:

**Outer ring — behavioral rules (`old-CLAUDE.md`, now at the workspace level):** The Karpathy-derived principles (Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution). These are *meta-rules* — they govern how the AI approaches any task, regardless of project. They live outside the project folder so they apply everywhere.

**Middle ring — project reality (`SPEC.md` + `CLAUDE.md`):** `SPEC.md` captures what exists right now — the tech stack, current feature state, known gaps. `CLAUDE.md` captures how to work within that reality — commands to run, file structure, naming conventions, testing locations. Together they answer "what is this thing and how do I not break it."

**Inner ring — teaching feedback loop (`TEACHME.md`):** The system for making sure you understand the *why* behind every decision made in the project, not just the *what*. This is the file you just ran.

They're ordered from most-stable (behavioral principles rarely change) to most-volatile (project state changes constantly). The architecture is sensible because of that ordering.

---

## Step 4: What tools and methods were used?

**CLAUDE.md with `@` imports:** Next.js has a concept of file references; CLAUDE.md borrowed the same pattern — `@AGENTS.md` and `@SPEC.md` get inlined at read time. This keeps the main file readable without being a monolith. Clean separation: AGENTS.md warns about the unusual Next.js version, SPEC.md documents project state, CLAUDE.md documents how to work.

**Route groups (`(public)` and `(dashboard)`):** Next.js App Router uses parentheses-wrapped folders as layout groups that don't appear in URLs. The `(public)` group gets a bare layout; `(dashboard)` gets the Navbar. This is Next.js-native way to have different shells for authenticated vs unauthenticated views without any JavaScript routing logic.

**CSS-first Tailwind v4:** No config file. Theme tokens defined in `globals.css` using `@theme`. This is a significant departure from Tailwind v3 — there's no `tailwind.config.js` because the config IS the CSS. If you tried to create a config file, things would break in confusing ways.

Why these specifically? They came with the project. The documentation work wasn't choosing tools — it was accurately mapping the tools that were already chosen.

---

## Step 5: What tradeoffs were made?

**Tradeoff 1: Specificity vs. staying current.**
Detailed documentation is more useful but goes stale faster. The more specific you are ("tests live in `tests/`, not `app/tests/`"), the more it has to be updated when things change. The choice here was to be specific anyway, with the understanding that CLAUDE.md needs maintenance as the project evolves — it's not a one-time artifact.

**Tradeoff 2: Splash page copy now vs. "later when we have auth."**
The splash page is technically supposed to redirect users (logged in → `/heists`, logged out → `/login`) and show nothing. But since auth isn't built yet, it shows content. The copy added is appropriate for a *loading/landing* moment — not a problem, just a current state. The tradeoff: something is there now, but it'll likely be replaced or hidden when auth lands.

**Tradeoff 3: Documenting current state vs. intended state.**
SPEC.md explicitly notes what's missing (no data layer, no auth, redirect logic described but unimplemented). The alternative was to document only what works. Documenting gaps is better — it prevents future confusion where someone reads the spec and thinks "but where's the auth?" Now they know: it's not there yet.

---

## Step 6: Mistakes, dead ends, or wrong turns?

The `login/page.tsx` exports a component named `SignupPage` — the wrong name. That bug is documented in SPEC.md but not fixed here. Why not fix it? Because the scope of this work was documentation and setup, not bug fixes. Mixing concerns (document the project + also fix bugs you notice) is how scope creep starts. The right call: flag it, keep it out of scope, fix it in a dedicated task.

The `app/tests/` directory exists and is empty — the real tests are in top-level `tests/`. That's the kind of thing that causes genuine confusion ("why does this folder exist?"). Again: documented, not deleted, because deleting it wasn't the task.

---

## Step 7: Pitfalls to watch out for next time

**CLAUDE.md is only as good as your discipline to update it.** The moment you move a file, rename a convention, or add a new pattern and don't update CLAUDE.md, the document starts lying. A lying CLAUDE.md is worse than no CLAUDE.md — the AI will confidently do the wrong thing based on stale info.

**Next.js 16 is pre-release with breaking changes.** The AGENTS.md warning is serious. If you Google a Next.js pattern and find a Stack Overflow answer from 2023, it's probably wrong for this version. The actual guide lives in `node_modules/next/dist/docs/` — read it before writing any new Next.js-specific code.

**Tailwind v4's `@apply` in CSS modules has quirks.** Since there's no config file, custom utilities need to be defined in `globals.css` under `@layer utilities`. If you try to `@apply` a class that isn't defined there, you'll get a cryptic build error, not a helpful message.

**The `(public)` / `(dashboard)` route group layout split is invisible.** If you add a new page and forget to put it in the right group, it'll render without the correct layout and you won't immediately see why. Always ask: should this page have a Navbar? → `(dashboard)`. No Navbar? → `(public)`.

---

## Step 8: What would an expert notice that a beginner would miss?

A beginner looks at CLAUDE.md and thinks: "this is just documentation."

An expert looks at it and thinks: "this is a behavioral spec for an AI collaborator — it's load-bearing infrastructure."

The distinction matters because documentation is optional; you can skip reading it. But CLAUDE.md shapes every AI response automatically. Getting it wrong means every AI action in the project has a subtle bias in the wrong direction. Getting it right means you get high-quality, contextually appropriate help without babysitting.

The expert also notices the absence of things: no `tailwind.config.js`, no `pages/` directory, no `_app.tsx`. These omissions are intentional — the project is using v4 CSS-first Tailwind and the App Router, both of which replace older patterns. Knowing what's *not* there is as important as knowing what is.

An expert also reads the SPEC.md "Notable Gaps" section as a risk map — those aren't bugs to feel bad about, they're known technical debt to sequence properly. The mislabeled component, the empty directory, the unimplemented redirects — each one is a small bomb that needs to be defused before the project ships. Documenting them is the first step to defusing them.

---

## Step 9: What lessons transfer to other projects?

**"Teach the tool before you use the tool."** Whether it's an AI assistant, a new team member, or a CI system — the ROI on upfront context-setting is enormous. The hour you spend writing the CLAUDE.md equivalent pays back tenfold in every session that follows.

**Separate the *what exists* document from the *how to work* document.** SPEC.md describes current reality. CLAUDE.md describes working conventions. They serve different purposes and should be updated at different times. Mixing them makes both less useful.

**Dead-accurate documentation of gaps is more valuable than cheerful documentation of features.** Knowing what doesn't work yet, and why, is the context that prevents you from designing features that collide with future work. The "known gaps" section in SPEC.md is often the most important part.

**Scope discipline is a skill.** Noticing a bug (wrong component name in `login/page.tsx`) while doing documentation work, and choosing *not* to fix it, is harder than it sounds. The temptation to "clean it up while I'm here" is real. But it conflates tasks, makes diffs harder to read, and makes it impossible to trace "why did this change" later. Fix one thing at a time. Always.
