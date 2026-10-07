# Code Review Rules — portfolio

Cybersecurity portfolio. React 19 + Vite 7 + Tailwind 4 (`@tailwindcss/vite`), JS/JSX only, ESM, deployed to GitHub Pages under `/portfolio`.

Review the **changed lines** of the staged files. Pre-existing issues in untouched lines are not grounds for rejection; a pure rename (`git mv`) with no content change must pass.

## Build and imports
- REJECT: an import path whose casing does not match the file on disk exactly. Linux builds are case-sensitive; `npm run build` is the gate, lint alone does not catch this.
- Components live in PascalCase files (`Hero.jsx`, `WriteupPage.jsx`).

## Styling (Tailwind 4)
- `src/App.css` `@theme` is the only source of custom design tokens (fonts, ANSI palette).
- REJECT: a class name that Tailwind will not generate (no token behind it, or a typo such as `pd-10`).
- Prefer token utilities (`bg-ansi-bg`, `text-ansi-green`, `font-mono`) over arbitrary hex values. An arbitrary value is acceptable only when no token exists for it (e.g. a one-off glow shadow).
- Do not add new non-Tailwind CSS libraries.

## React
- Functional components only.
- REJECT: `key={index}` on lists that can reorder or change; use a stable id or slug.
- REJECT: `<a>` wrapping `<button>` (invalid interactive nesting). Style the link itself.
- REJECT: `target="_blank"` without `rel="noreferrer"`.
- One `<h1>` per page.
- Images need meaningful `alt` text (empty `alt=""` only for decorative images).

## Routing and writeups
- Routing uses `HashRouter` (GitHub Pages has no SPA fallback). Do not switch to `BrowserRouter`.
- Writeups are Markdown files in `src/content/writeups/<slug>.md` with frontmatter: `title`, `date`, `platform`, `difficulty`, `tags`, `summary`, `lang` (required, `en` or `es`; one language per writeup, not affected by the UI language toggle).
- Writeup loading and parsing logic lives in `src/features/writeups/` and must have Vitest tests.
- Never render writeup Markdown with `dangerouslySetInnerHTML`; use `react-markdown` (no raw HTML plugin).

## Security and config
- No secrets in source. EmailJS service/template IDs belong in `import.meta.env` (`VITE_*`), not hardcoded in new code.
- `console.log` is allowed only for the EmailJS response handling in `Contact.jsx`; reject it elsewhere. `console.error` is also allowed at module load in `src/features/writeups/index.js`, `src/components/certs/Certs.jsx` and `src/components/timeline/Timeline.jsx` to report invalid owner content once.
- Owner content (writeups, certs, timeline) must never blank the page: skip invalid entries, report them, and keep a test asserting the real data has no errors.

## Tests
- Logic changes ship with tests in the same commit (`npm test`, Vitest).
