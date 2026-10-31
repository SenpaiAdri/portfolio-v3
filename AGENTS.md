# Portfolio v3 — agent guidance

Single-page portfolio site: Next.js 16 (App Router), React 19, Tailwind v4. Content is entirely data-driven; no database, no backend.

## Commands

Run commands from the repository root:

- `npm run dev` — start the local development server.
- `npm run lint` — run ESLint.
- `npx tsc --noEmit` — run the TypeScript check; there is no npm script for it.
- `npm run build` — production build and an additional type-checking signal.
- There are no automated tests or repository CI workflows.

## Framework quirks

- `cacheComponents: true` and `partialPrefetching: true` are enabled in `next.config.ts`.
- With Cache Components enabled, call-time-computed values that must be stable at build time (for example `new Date()`) need `"use cache"`; see `getCopyrightYear` in `app/page.tsx`.
- Tailwind runs through Turbopack (`turbopack.rules` in `next.config.ts`), not postcss.config. There is no tailwind.config; theme tokens (`--background`/`--foreground` → `bg-background`/`text-foreground`) are defined via `@theme inline` in `app/globals.css`.
- `experimental.agentFeedback` is enabled. Preserve the generated Next.js agent blocks in this file and follow any reporting instructions before finishing work.

## Structure

- Path alias `@/*` → repo root.
- `app/page.tsx` composes sections from `components/{hero,project,contact}/` plus `components/navbar.tsx`.
- `components/project/project-section.tsx` is a client component: it owns project accordion state, IntersectionObserver reveals, hover wipes, focus restoration, and the fullscreen image viewer.
- All portfolio content lives in `data/`: `site.ts` (navigation, social links, email, previous portfolios) and `projects.ts` (typed project list). For content changes edit these data files, not section components.
- Project images live in `public/projects/<project>/*.webp` and are referenced by absolute public paths in `data/projects.ts`.
- Site copy and SEO metadata (title, description, canonical URL, Open Graph/Twitter cards, robots, and viewport theme color) live in `app/layout.tsx`.

## Conventions

- Accessibility matters here: keep the `prefers-reduced-motion` and `@media (scripting: none)` fallbacks in `globals.css` working for any new JS-driven UI, and match the existing focus-management/aria-label patterns in interactive components.
- Prefer semantic sections, headings, buttons, and links. Preserve keyboard access, `aria-expanded`/`aria-controls` relationships, focus restoration, and reduced-motion behavior when changing interactive project UI.
- Use `next/image` for local images and preserve meaningful alt text. External project links opened in a new tab must retain `rel="noreferrer"`.
- Keep styling consistent with the CSS theme tokens and the existing warm light palette; do not introduce a Tailwind config or a second styling system without an explicit architectural reason.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Ignore routine debugging and unverified changes. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Keep a qualifying candidate through the reporting pass even if you resolve or work around it. A successful fix changes the report outcome; it does not erase the friction that qualified it.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `node node_modules/next/dist/bin/next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
