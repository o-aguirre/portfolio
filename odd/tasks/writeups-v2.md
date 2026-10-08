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
- Plan: `~/.claude/plans/trabajas-con-gentle-ai-glowing-token.md`.

## Constraints
- GitHub Pages under `/portfolio`, HashRouter. Tokens only in `src/App.css` `@theme`. EN/ES i18n with key-parity test.
- TDD strict (global config), runner Vitest (`npm test`).
- Conventional Commits, no AI attribution; gga pre-commit hook reviews staged JS/JSX against `AGENTS.md`.
- Owner one-time step for slice 1: Settings → Pages → Source: GitHub Actions.

## Delivery
- Strategy `ask-on-risk`; chain strategy stacked-to-main (owner's established choice). One PR per slice, CI slice first.

| Slice | Branch | Tasks | Base | PR |
|---|---|---|---|---|
| 1 | `ci/pages-deploy` | V1 | `main` | — |
| 2 | `feat/writeup-code-images` | V2–V4 | slice 1 | — |
| 3 | `feat/writeup-page-v2` | V5–V7 | slice 2 | — |

## Checklist
- [x] V1 — CI workflow (lint, test, build on ubuntu, `.nvmrc` = 26) + Pages deploy workflow (checkout v7, setup-node v7, configure-pages v6, upload-pages-artifact v5, deploy-pages v5); `gh-pages` dep and deploy scripts removed. Route: inline (mechanical config, already designed). Evidence: YAML parses; local `npm ci`, lint, `npm test` 148/148, build pass. CI run on the PR pending.
- [ ] V2 — Code blocks as terminal windows: fence `title` meta, `$ ` prompt lines, copy button (commands only when prompts exist), i18n status.
- [ ] V3 — Images from `public/writeups/<slug>/` via relative paths; `resolveImageSrc` (https allowed, other schemes rejected).
- [ ] V4 — `docs/writing-writeups.md` authoring guide.
- [ ] V5 — Optional frontmatter `os`, `target`, `services`, `hops` + header (eyebrow, title, lead, key/value row).
- [ ] V6 — Phases: each `##` section as a numbered phase with vertical timeline.
- [ ] V7 — Sidebar tree platform → difficulty → writeups with counts, current highlighted; collapsible on mobile.

## Acceptance criteria
- PRs show green CI; merging to `main` deploys without local commands.
- Copy button copies only commands when `$ ` prompts exist; image in `public/writeups/<slug>/` renders at `/portfolio/`.
- Writeup page renders header, phases and sidebar at 360/768/1440 in EN/ES; one `<h1>`.
- `npm test`, `npm run lint`, `npm run build` green.

## Progress / next step
Next: V1.
