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
- Chain strategy (owner choice): **stacked-to-main**. Push/PR creation remain the owner's decision.

| Slice | Branch | Tasks | Base | Commits |
|---|---|---|---|---|
| 1 | `feature/terminal-writeups` | T1–T4 | `main` | `014b0e8`..this doc commit (367 authored lines before it) |
| 2 | `feature/terminal-writeups-ui` | T5–T6 | slice 1 | `4e2d437`, `998012d`, `4f8fc01` |
| 3 | `feature/terminal-writeups-restyle` | T7–T8 | slice 2 | `accaebc`, `014e39d`, `d58d7c9` |

## Checklist
- [x] T1 — Unblock build: rename `projects.jsx` → `Projects.jsx`. Route: inline (1 file). Evidence: `npm run build` ✓, commit `014b0e8`.
- [x] T1b — `AGENTS.md` for gga (F8 pulled forward: hook blocked commits without it). Route: inline. Commit `a79a2fe`.
- [x] T2 — Vitest + `npm test` script. Route: delegated. Evidence: `npm test` exit 0 (passWithNoTests), `npm run build` exit 0, commit `a29f702`.
- [x] T3 — `@theme` tokens (font-mono JetBrains Mono via @fontsource, ANSI palette); remove dead `title-font`/`body-font`. Route: delegated. Evidence: `rg 'title-font|body-font' src` empty; lint, test, build exit 0; commit `9595d95`.
- [x] T4 — Writeup content model (TDD): `src/features/writeups/` (`parseWriteup`, `createWriteupRepository`, glob wiring in `index.js`), `front-matter` dep, sample writeup; removed `passWithNoTests` (R3-001). Route: delegated. Evidence: RED (3 suites failed, modules missing) → first GREEN run 12/13 (YAML rolls `2025-02-31` into a valid Date) → fixed by validating the raw date text → 13/13; `npm test`, `npm run lint`, `npm run build` exit 0; commit `5b9fefb`.
- [x] T5 — HashRouter: `/` Home, `/writeups/:slug` lazy WriteupPage; navbar scroll helper (fixes `#home`). Route: delegated. Evidence: RED (`scrollToSection` module missing, suite failed) → GREEN 3/3; `npm test`, `npm run lint`, `npm run build` exit 0; commit `4e2d437`.
- [x] T6 — Writeups UI (`ls -la` listing + markdown page with GFM + highlight); drop react-slick/slick-carousel and Projects. Route: delegated. Evidence: RED (WriteupsSection module missing; WriteupPage stub failed 3 tests) → GREEN 21/21 tests; `npm run lint`, `npm run build` exit 0; `rg 'slick|image1' src` and `rg 'dangerouslySetInnerHTML|rehype-raw' src` empty; preview `/portfolio/` HTTP 200; commit `998012d`.
- [x] T6b — Review fixes R3-001..003 (lineage `review-d33c7d70a0e2217a`, approved+acknowledged): restore `document.title` on unmount, `createWriteupRepository` skips invalid entries and exposes `errors` (logged via `console.error` in `index.js`, AGENTS.md exception added), navigation and `NavLinkButton` tests. Route: delegated. Evidence: RED (3 failing + suite load error) → GREEN 29/29; `npm test`, `npm run lint`, `npm run build` exit 0; commit `4f8fc01`.
- [x] T7 — Restyle Hero/Navbar/Footer/Skills/Contact/App/index.html; fix a11y defects in touched lines. Route: delegated. Evidence: RED (6 new tests failed: two h1, alt, rel, nesting, CV link, Skills h2) → GREEN 35/35; `npm test`, `npm run lint`, `npm run build` exit 0; forbidden-class `rg` and `target="_blank"` without `rel=` checks empty; built `index.html` has new title, description and working favicon path; commit `accaebc`. Pending: owner visual pass at 360/768/1440.
- [x] T8 — Fastfetch hero replaces photo ("hello, friend." hexdump, ASCII hidden on mobile, profile data in src/data/profile.js). Route: delegated. Evidence: RED (hexdump and Fastfetch suites failed, modules missing) -> GREEN 42/43 tests (1 failure in `navigation.test.jsx` caused by the owner's uncommitted Hero h1 change to "mephibosheth", pre-existing, not T8); `npm run lint`, `npm run build` exit 0; `rg 'o-aguirre.jpg' src` empty; commit `014e39d`. Pending: owner fills real values in `src/data/profile.js`; navigation test expects `/Onésimo/` h1.
- [x] T8b — Hero layout fix (single terminal window, fastfetch grid, hexdump from lg) + owner copy markup; note: owner's copy edit landed inside 014e39d. Route: delegated. Evidence: `npm test` 44/44 (10 files), `npm run lint` and `npm run build` exit 0; `rg 'react-typed|ReactTyped' src package.json` empty (dependency uninstalled); navigation test no longer depends on the h1 wording; new test asserts 3 about paragraphs; commit `d58d7c9`. Pending: owner visual pass at ~1720px.

## Acceptance criteria
- `npm test`, `npm run lint`, `npm run build` green.
- Terminal look at 360/768/1440px; navbar scrolls to sections; `#/writeups/<slug>` renders Markdown with highlighted code, reload works under `/portfolio/`.
- `rg 'title-font|body-font|slick|bg-\[#000000\]' src` empty.

## Review (RDD)
- T1–T3 slice (`6172916..bd2d9cf`): medium risk, consent granted, lens review-reliability → **approved**, acknowledged (lineage `review-7d18634b483297e1`). Reviewed boundary: `bd2d9cf`.
- Advisory R3-001: `passWithNoTests` makes `npm test` vacuous → T4 removes it. R3-002: `pd-10` in Skills.jsx (pre-existing) → T7.
- Authored lines so far (lockfile excluded): 128.
- T4 (`bd2d9cf..49c6629`): assess risk medium (package-lock config change), `review_due=false` (`under_budget`) → pending in slice.

- T4–T6 (`bd2d9cf..31f5565`): medium, consent granted, review-reliability → approved, acknowledged (lineage `review-d33c7d70a0e2217a`); advisories R3-001..003 fixed in T6b. Reviewed boundary: `31f5565`.
- T6b–T7 (`31f5565..235a1d7`): medium, consent granted, review-reliability → approved, acknowledged (lineage `review-c7d6f30f77b00c2f`). Reviewed boundary: `235a1d7`.
- Follow-ups (SUGGESTION, non-blocking): Contact `role="status"` region should always render (screen-reader announcement); navigation tests should restore `scrollIntoView` (use `vi.spyOn` + `restoreAllMocks`); test the load-time `console.error` reporting in `writeups/index.js`.

## Progress / next step
Next: owner fills src/data/profile.js, visual pass, push/PR decision.
