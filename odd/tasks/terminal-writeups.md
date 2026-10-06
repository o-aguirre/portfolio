# Feature: terminal-writeups

## Objective
Reposition the portfolio as a cybersecurity portfolio: terminal visual identity across the site, and replace the placeholder Projects carousel with Markdown writeups rendered inside the site.

## Problem / why
- Projects section is a react-slick carousel with 4 dummy items; the owner's content is writeups.
- Visual identity (blue glow, rounded buttons) does not match a cybersecurity focus.
- `npm run build` was broken on `main` (casing mismatch) — fixed in T1.

## Scope
- In: build fix, gga rules file, Vitest, `@theme` tokens, writeup content model, HashRouter routing, writeups UI, restyle of all components.
- Out: AOS removal (F4), CI (F6), automated deploy (F7). Hero copy rewrite is the owner's.
- Spec reference: `~/.opencode/plan/features.md` (F1, F2, F3, F5, F8).

## Constraints
- GitHub Pages under `/portfolio` → `HashRouter`.
- Tailwind 4 tokens only in `src/App.css` `@theme`.
- Commits: Conventional Commits, no AI attribution. gga pre-commit hook reviews staged JS/JSX against `AGENTS.md`.
- TDD: strict, source = global config; runner = Vitest (`npm test`) once T2 lands.

## Delivery
- Strategy: `ask-on-risk`. Forecast ~700–900 authored changed lines → ask chain strategy before crossing ~400.

## Checklist
- [x] T1 — Unblock build: rename `projects.jsx` → `Projects.jsx`. Route: inline (1 file). Evidence: `npm run build` ✓, commit `014b0e8`.
- [x] T1b — `AGENTS.md` for gga (F8 pulled forward: hook blocked commits without it). Route: inline. Commit `a79a2fe`.
- [x] T2 — Vitest + `npm test` script. Route: delegated. Evidence: `npm test` exit 0 (passWithNoTests), `npm run build` exit 0, commit `a29f702`.
- [x] T3 — `@theme` tokens (font-mono JetBrains Mono via @fontsource, ANSI palette); remove dead `title-font`/`body-font`. Route: delegated. Evidence: `rg 'title-font|body-font' src` empty; lint, test, build exit 0; commit `9595d95`.
- [x] T4 — Writeup content model (TDD): `src/features/writeups/` (`parseWriteup`, `createWriteupRepository`, glob wiring in `index.js`), `front-matter` dep, sample writeup; removed `passWithNoTests` (R3-001). Route: delegated. Evidence: RED (3 suites failed, modules missing) → first GREEN run 12/13 (YAML rolls `2025-02-31` into a valid Date) → fixed by validating the raw date text → 13/13; `npm test`, `npm run lint`, `npm run build` exit 0; commit `5b9fefb`.
- [ ] T5 — HashRouter: `/` Home, `/writeups/:slug` lazy WriteupPage; navbar scroll helper (fixes `#home`).
- [ ] T6 — Writeups UI (`ls -la` listing + markdown page with GFM + highlight); drop react-slick/slick-carousel and Projects.
- [ ] T7 — Restyle Hero/Navbar/Footer/Skills/Contact/App/index.html; fix a11y defects in touched lines.

## Acceptance criteria
- `npm test`, `npm run lint`, `npm run build` green.
- Terminal look at 360/768/1440px; navbar scrolls to sections; `#/writeups/<slug>` renders Markdown with highlighted code, reload works under `/portfolio/`.
- `rg 'title-font|body-font|slick|bg-\[#000000\]' src` empty.

## Review (RDD)
- T1–T3 slice (`6172916..bd2d9cf`): medium risk, consent granted, lens review-reliability → **approved**, acknowledged (lineage `review-7d18634b483297e1`). Reviewed boundary: `bd2d9cf`.
- Advisory R3-001: `passWithNoTests` makes `npm test` vacuous → T4 removes it. R3-002: `pd-10` in Skills.jsx (pre-existing) → T7.
- Authored lines so far (lockfile excluded): 128.

## Progress / next step
Next: T5.
