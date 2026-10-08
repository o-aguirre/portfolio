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

| Slice | Branch | Tasks | Base | PR | Lines (lockfile excl.) |
|---|---|---|---|---|---|
| 1 | `feature/terminal-writeups` | T1–T4 | `main` | #4 | 375 |
| 2 | `feature/terminal-writeups-ui` | T5–T6b | slice 1 | #5 | 569 (size:exception) |
| 3 | `feature/terminal-writeups-restyle` | T7–T9 | slice 2 | #6 | 517 (size:exception) |
| 4a | `feature/terminal-writeups-i18n-core` | T10 | slice 3 | #7 | 379 |
| 4b | `feature/terminal-writeups-i18n` | T11–T13 + fixes | slice 4a | #8 | 538 (size:exception) |
| 5a | `feature/terminal-writeups-skills` | T14 | slice 4b | #9 | 264 |
| 5b | `feature/terminal-writeups-certs-log` | T15–T16 | slice 5a | #10 | 424 (size:exception) |
| 5c | `feature/terminal-writeups-sections` | T17, T17b, skills data | slice 5b | #11 | 285 |
| 6a | `feature/terminal-writeups-contact-core` | T18, T18b | slice 5c | #12 | 466 (size:exception; T18 alone is 409) |
| 6b | `feature/terminal-writeups-contact` | T19–T21 + whois alias | slice 6a | #13 | 269 + docs |

All branches pushed 2026-10-07; PRs opened by the owner's request. Merge in order; after each merge, retarget the next PR to `main`.

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
- [x] T8c — hexdump moved to `$ xxd hello.txt` (first command, hidden on mobile); fastfetch runs with --logo none (owner choice). Route: delegated. Evidence: RED (3 tests failed: xxd block, `--logo none` prompt, no pre in Fastfetch) -> GREEN `npm test` 46/46 (10 files), `npm run lint` and `npm run build` exit 0; gga hook passed; commit `8715151`.
- [x] T9 — Owner edits (removed `./contact` nav item, removed xxd block pending new art, fastfetch prompt back to plain `fastfetch`, rewritten about text) + fixes: nav centered (`md:mx-auto`), `<br />` spacers replaced by command blocks in a `space-y-8` body, dead `hello`/`toHexdump` code removed (`src/lib/hexdump.js` kept for later). Route: inline (mechanical, already-understood edits). Evidence: RED 2 failing (spacing block, nav centering) -> GREEN `npm test` 49/49, lint and build exit 0. Commit `9738263`.
- [x] T10 — i18n core: `src/i18n/` (`en`/`es` flat dictionaries, `LanguageProvider`, `useLanguage()` returning `{ lang, setLang, t }`, fallback en then key); initial language from `localStorage` else `navigator.language`; `<html lang>` sync; navbar `[ EN | ES ]` toggle replaces the contact button; `./contact` back in the nav menu; `renderWithProviders` test helper. Route: delegated. Evidence: RED (3 suites failed, i18n modules missing) -> GREEN `npm test` 63/63; `npm run lint`, `npm run build` exit 0; gga hook passed; commit `77bc07e`.
- [x] T11 — Translate UI strings (Hero h1/about, Skills prose, Contact labels/placeholders/status, Footer and link aria-labels, 404/loading, writeup not-found, empty listing, home document title). Shell commands stay in English; `profile.js` untouched. Route: delegated. Evidence: RED (11 new tests failed) -> GREEN `npm test` 80/80; `npm run lint`, `npm run build` exit 0; gga hook passed; commit `536c7ac`. Pending: owner reviews the English about text.
- [x] T12 — Writeups declare `lang: en|es` (required, validated in `parseWriteup`); listing shows `[EN]`/`[ES]` badge (amber); `WriteupPage` sets `lang` on the article; toggle does not filter writeups; AGENTS.md rule updated. Route: delegated. Evidence: RED (10 tests failed) -> GREEN `npm test` 88/88; `npm run lint`, `npm run build` exit 0; gga hook passed; commit `2a0fe35`.

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
### Slice 5 — sections (owner request)
- [x] T14 — Evidence: Route: delegated; RED (skillTree and Skills suites failed, modules/behavior missing) -> GREEN `npm test` 97/97; `npm run lint`, `npm run build` exit 0; gga passed; commit `6ff4d97`; deleted unused PNGs (js, tailwind-css, react, spring-boot, git). Skills as `tree skills/`: remove AOS animation, the two-column layout and the outdated full-stack `skills.about` text; data in `src/data/skills.js` (categories → items, optional `tag` per item); item shows writeup count when its `tag` matches writeup tags; only known items prefilled under `foundation/`, security categories left as commented examples for the owner.
- [x] T15 — Evidence: Route: delegated; RED (3 suites failed, modules missing) -> GREEN `npm test` 109/109; lint, build exit 0; gga passed; commit `2014ed2`. Certifications section `ls certs/`: data in `src/data/certs.js` (name, issuer, status earned|in-progress, optional year/url); section hidden while the list is empty; nav item `./certs`. Owner removes the `Certs` field from `src/data/profile.js` (file has owner's uncommitted edits — not touched).
- [x] T16 — Evidence: Route: delegated; RED (2 suites failed, modules missing) -> GREEN `npm test` 121/121; lint, build exit 0; first commit rejected by gga (nav target `log` did not match section id `timeline`) -> fixed with test, passed; commit `b324d00`. Timeline section `git log --oneline`: data in `src/data/timeline.js` (date, kind track|seminar|ctf|cert|milestone, bilingual `{ en, es }` text); newest first; fake short hash derived deterministically from the entry; hidden while empty; nav item `./log`.
- [x] T17 — Certs/timeline no longer throw on invalid owner data (would blank the page): `prepareCerts`/`prepareTimeline` return `{ items, errors }`, invalid entries skipped and logged once at module load, nav hides sections with no valid entries, tests assert real data has no errors; AGENTS.md rule generalized to all owner content. Route: inline (pattern already established in T6b). Evidence: RED 12 failing -> GREEN `npm test` 125/125, lint and build exit 0. Commit `811e029`.
- Review T14–T17 (`1705b72..811e029`): medium, consent granted, review-reliability → approved, acknowledged (lineage `review-da83feb70ad322e8`). Reviewed boundary: `811e029`. Fixed right after (T17b): R3-001 entry without id crashed `fakeHash` (page blank); R3-002 missing/duplicate ids broke React keys → shared `partitionEntries` (object + unique non-empty string id, never throws). RED 4 failing -> GREEN 129/129, lint and build exit 0.

### Slice 6 — contact (owner request)
- [x] T18 — Evidence: Route: delegated; RED (4 suites failed: obfuscate/contact modules missing, old form/EmailJS Contact; 1 translation test failed) -> GREEN `npm test` 144/144 (26 files); `npm run lint`, `npm run build` exit 0; `rg -i emailjs src package.json AGENTS.md` empty; gga passed; commit `9c0ab92`. Replace the EmailJS contact form with a `$ whois o-aguirre` block: channels in `src/data/contact.js` (email, github, linkedin, hackthebox, dockerlabs…; entries with empty value hidden); email stored and shown base64-encoded with a decode-and-copy button (decorative obfuscation, documented as not security); remove `@emailjs/browser` and the hardcoded IDs; update AGENTS.md rules that referenced EmailJS. Hero keeps the quick `ls links/`. Owner fills email and platform profiles (email is not published without the owner adding it).
- Review T17b–T18 (`811e029..52c07f2`): medium, consent granted, review-reliability → approved, acknowledged (lineage `review-883249eac9e54f1a`). Reviewed boundary: `52c07f2`. Fixed right after (T18b): non-text rendered fields (objects) passed validation and would make React throw → shared `isText`/`isOptionalText`/`isOptionalHttpsUrl` applied to contact, certs and timeline; cert `url` now restricted to https (blocks `javascript:` hrefs); whitespace-only contact values treated as placeholders. RED 4 failing -> GREEN 148/148, lint and build exit 0.

- [x] T19 — Footer reduced to `[exit 0] © year o-aguirre` (owner removed duplicated social links; dead code and tests cleaned). Route: inline. Evidence: RED 2 -> GREEN 150/150; commit `78cb3f1`.
- [x] T20 — Navbar grouped to `./writeups ./about ./contact` (owner choice `./about` → #skills, followed by certs and timeline); brand links to #home, `./home` removed; static `NAV_ITEMS`. Route: inline. Evidence: RED 4 -> GREEN 148/148, lint and build exit 0; commit `b7094df`.
- [x] T21 — Owner data committed: profile (Certs field removed), skills (web/privesc commented by owner), certs (Credly URLs), timeline, contact (email + HackTheBox; DockerLabs commented until the username is known). Format fixes: timeline date/kind/id, profile `': '` prefixes. Evidence: `npm test` 148/148 incl. real-data validation tests; no active `<id>`/`<user>`/`example.com`/`TODO` placeholders.

Next: owner reviews PRs #4 → #13 and merges them in order (retarget each next PR to `main` after its parent merges); visual pass in both languages; optionally uncomment DockerLabs in contact.js. Pending RDD: `52c07f2..983e38d` (under budget, not yet reviewed).

T13 (owner request): language switch redesigned as borderless `en / es` text buttons (one button per language, `aria-pressed`, labelled group), placed at the end of the right-aligned nav after a `│` divider. Route: inline. Evidence: RED 6 failing -> GREEN `npm test` 89/89, lint and build exit 0; gga passed; commit `4c040cc`.

Review T8–T13 (`fc86d4c..1705b72`): medium, consent granted, review-reliability → approved, acknowledged (lineage `review-b6b17c34fb9c840d`). Reviewed boundary: `1705b72`. Fixed right after: R3-001 slug echoed via `replace()` interpreted `$&`/`$$` patterns (RED test with slug `a$&b$$c` → replacer function → GREEN 90/90); R3-003 `translation.test.jsx` now restores mocks. Open: R3-002 `TODO:` placeholders in `src/data/profile.js` reach production — owner must fill before release.
