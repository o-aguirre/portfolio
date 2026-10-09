# Feature: writeups-v2

## Objective
Make publishing writeups effortless and their pages compelling: automatic deploys, terminal-style code blocks with copy, working images, and a richer writeup page that keeps the site's terminal identity.

## Problem / why
- Deploy is manual (`npm run deploy`); the live site silently lags behind `main`.
- Writeups use code blocks instead of screenshots; commands cannot be copied and images do not work (`.md` loaded as raw text, no `public/`).
- The writeup page is a single plain column (owner feedback: "toscas y aburridas"), compared to a reference with sidebar tree, header metadata and phases.

## Scope
- In: CI (lint/test/build on Linux), Pages deploy via GitHub Actions, code-block terminal windows with copy, images from `public/writeups/<slug>/`, writing guide, writeup page header/phases/sidebar.
- Out: serif typography (keep JetBrains Mono), translating writeups, new home-page sections.
- Design per slice is summarized in the checklist below and in each PR description.

## Constraints
- GitHub Pages under `/portfolio`, HashRouter. Tokens only in `src/App.css` `@theme`. EN/ES i18n with key-parity test.
- TDD strict (global config), runner Vitest (`npm test`).
- Conventional Commits, no AI attribution; gga pre-commit hook reviews staged JS/JSX against `AGENTS.md`.
- Owner one-time step for slice 1: Settings → Pages → Source: GitHub Actions.

## Delivery
- Strategy `ask-on-risk`; chain strategy stacked-to-main (owner's established choice). One PR per slice, CI slice first.

| Slice | Branch | Tasks | Base | PR |
|---|---|---|---|---|
| 1 | `ci/pages-deploy` | V1 | `main` | #16 (merged, first Actions deploy succeeded) |
| 2 | `feat/writeup-code-images` | V2–V4 | slice 1 | — (commits `feda256`, `2b76e2f`, `7c7d03e`) |
| 3 | `feat/writeup-page-v2` | V5–V7 | slice 2 | — |

## Checklist
- [x] V1 — CI workflow (lint, test, build on ubuntu, `.nvmrc` = 26) + Pages deploy workflow (checkout v7, setup-node v7, configure-pages v6, upload-pages-artifact v5, deploy-pages v5); `gh-pages` dep and deploy scripts removed. Route: inline (mechanical config, already designed). Evidence: YAML parses; local `npm ci`, lint, `npm test` 148/148, build pass. CI run on the PR pending.
- [x] V2 — Code blocks as terminal windows: fence `title` meta, `$ ` prompt lines, copy button (commands only when prompts exist), i18n status. Route: delegated (one writer). RED→GREEN: `codeBlock.test.js` failed on the missing module, then 8/8; component/plugin tests written first, passed with the implementation. Extracted `WriteupMarkdown.jsx` from `WriteupPage.jsx` so the body is testable with injected markdown. Commit `feda256`.
- [x] V3 — Images from `public/writeups/<slug>/` via relative paths; `resolveImageSrc` (https allowed, other schemes rejected). Route: delegated. RED→GREEN: helper test failed on the missing module; image render tests failed (src unresolved, blocked image rendered), then 176/176. `public/writeups/.gitkeep` added. Commit `2b76e2f`.
- [x] V4 — `docs/writing-writeups.md` authoring guide. Route: delegated. Commit `7c7d03e`. Checks (all three tasks): `npm test` 176/176, `npm run lint` clean, `npm run build` ok.
- [ ] V5 — Optional frontmatter `os`, `target`, `services`, `hops` + header (eyebrow, title, lead, key/value row).
- [ ] V6 — Phases: each `##` section as a numbered phase with vertical timeline.
- [ ] V7 — Sidebar tree platform → difficulty → writeups with counts, current highlighted; collapsible on mobile.
- [x] V8 — Vulnerabilities & mitigations section (owner request): optional `vulnerabilities` frontmatter list (severity critical|high|medium|low|info, title, cwe, owasp, impact, mitigation); invalid entries skipped and reported; sorted by severity; cards with severity-coloured border, badge, CWE (MITRE link) / OWASP chips; labels follow the writeup's language. Branch `feat/writeup-vulnerabilities` stacked on #19. Route: delegated (one writer). RED→GREEN: `vulnerabilities.test.js` failed on the missing module, then 14/14; parse/repository/real-content/page tests failed first (7), component test failed on the missing component, then all pass. Checks: `npm test` 208/208, `npm run lint` clean, `npm run build` ok. Commits `8d47444` (code, tests, i18n, template block) and `23d83a5` (docs). gga hook passed both.

## Acceptance criteria
- PRs show green CI; merging to `main` deploys without local commands.
- Copy button copies only commands when `$ ` prompts exist; image in `public/writeups/<slug>/` renders at `/portfolio/`.
- Writeup page renders header, phases and sidebar at 360/768/1440 in EN/ES; one `<h1>`.
- `npm test`, `npm run lint`, `npm run build` green.

## Review (RDD)
- V1 (`main..08b7909`): high (shell in workflows), consent granted, 4 lenses → approved, acknowledged (lineage `review-d7d8e699730925eb`). Fixed right after: Pages/OIDC permissions moved to the deploy job only; actions pinned by commit SHA; deploy reuses `ci.yml` via `workflow_call` (no drifting duplicate steps; `configure-pages` dropped, not needed for Vite); this doc's stale "Next" and out-of-repo plan link. Open: Pages source must be switched to GitHub Actions before merging (gate, owner setting).

- Slice 2 (`origin/main..539ecc4`): medium, consent granted, review-reliability → approved, acknowledged (lineage `review-c6bec28b3f98806c`). Fixed right after (V3b): image-only paragraphs unwrapped (no `<figure>` inside `<p>`); `%2e%2e` traversal and malformed encodings rejected; blank lines kept in prompted blocks; img component memoized per slug (test proven to fail without the memo). RED 4 → GREEN 181/181, lint and build pass.
- Slice 2 split for review size: `feat/writeup-code-blocks` (V2, 405 lines) and `feat/writeup-code-images` (V3, V3b, V4).

- Slice 2a/2b PRs: #18 (`feat/writeup-code-blocks` → main) and #19 (`feat/writeup-code-images` → #18); scrollbar styling (`80d65ca`, owner opacity 15% `5d5d92d`) on #18, merged up the chain.
- V8 + test fixtures (`origin/feat/writeup-code-images..1869248`): medium, consent granted, review-reliability → approved, acknowledged (lineage `review-2faf0815d1c354aa`). Fixed right after: real-content test now proves every `.md` file loads (verified it fails with a broken glob, where the other checks passed vacuously); console message format extracted to `formatContentError` with tests. 213/213, lint and build pass.
- UI tests now use `src/test/fixtures/writeups/` via a global mock in `src/test/setup.js`; only `index.test.js` reads real content. Verified green with the template deleted.

## Progress / next step
Next: owner merges #18 → #19 → V8 PR; then V5–V7 (page header, phases, sidebar).
