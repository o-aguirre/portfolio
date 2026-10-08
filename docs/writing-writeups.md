# Writing a writeup

A writeup is one Markdown file. Add it, run the tests, merge to `main`.

## 1. Create the file

`src/content/writeups/<slug>.md`. The file name (without `.md`) is the slug and the URL: `#/writeups/<slug>`. Use lowercase and hyphens, e.g. `htb-example-machine`.

## 2. Frontmatter

```yaml
---
title: Example Machine
date: 2026-10-08
platform: HackTheBox
lang: en
summary: One sentence shown in the list.
difficulty: Easy
tags: [linux, web, nmap]
---
```

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Page heading. |
| `date` | yes | `YYYY-MM-DD`, a real calendar date. |
| `platform` | yes | e.g. `HackTheBox`, `DockerLabs`. |
| `lang` | yes | `en` or `es`. One language per writeup; the UI toggle does not translate it. |
| `summary` | yes | One sentence. |
| `difficulty` | no | Free text, e.g. `Easy`. |
| `tags` | no | YAML list. |

A file with a missing or invalid field is skipped and reported in the console; the site keeps working. `npm test` fails if the real content has errors.

## 3. Tags and skills counters

Each skill in `src/data/skills.js` with a `tag` shows how many writeups use that tag (case-insensitive). To make a writeup count for `nmap`, add `nmap` to its `tags`. The tag must equal the skill item's `tag` exactly, or nothing is counted.

## 4. Code blocks

Add a title with `title="..."` after the language. Start commands with `$ ` and leave output without a prompt:

````markdown
```bash title="nmap scan"
$ nmap -sV -p- 10.10.10.10
PORT   STATE SERVICE
22/tcp open  ssh
```
````

- The title falls back to the language, then to `terminal`.
- The copy button copies **only the `$ ` lines** (without `$ `). A block with no `$ ` lines is copied whole.
- `#` is not a prompt (it is ambiguous with comments). Write root commands as `$ sudo ...`.

## 5. Images

Put files in `public/writeups/<slug>/` and reference them relatively:

```markdown
![Nmap results](nmap.png "Optional caption")
```

- The alt text is required in practice: describe what the image shows.
- The title in quotes becomes the caption.
- Allowed: relative paths, `/absolute/in/public.png`, and `https://` URLs. Blocked (nothing is rendered): `http:`, `data:`, `javascript:`, `//host` and any path containing `..`.

## 6. Before committing

```bash
npm test        # includes the real-content checks
npm run lint
npm run build
```

Commit with a Conventional Commit, e.g. `feat(writeups): add HTB Example Machine writeup`.

## 7. Publishing

Merging to `main` deploys automatically through GitHub Actions; there is no manual deploy step. Check the Actions tab if the page does not update.

Only publish **retired** machines or ones the platform explicitly allows. HackTheBox forbids publishing writeups for active machines and challenges; DockerLabs machines are fine once the platform permits sharing. Never include live flags, passwords or personal data.
