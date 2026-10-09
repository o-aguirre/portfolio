import { describe, expect, it } from 'vitest'
import { createWriteupRepository, formatContentError } from './writeups.js'

const raw = (title, date) =>
  `---\ntitle: ${title}\ndate: ${date}\nplatform: CTF\nsummary: s\nlang: en\n---\nbody`

const repo = createWriteupRepository({
  '/src/content/writeups/old.md': raw('Old', '2024-01-01'),
  '/src/content/writeups/new.md': raw('New', '2025-06-01'),
  '/src/content/writeups/mid.md': raw('Mid', '2024-12-31'),
})

describe('createWriteupRepository', () => {
  it('lists writeups sorted by date descending', () => {
    expect(repo.list().map((w) => w.slug)).toEqual(['new', 'mid', 'old'])
  })

  it('gets a writeup by slug', () => {
    expect(repo.get('mid')).toMatchObject({ slug: 'mid', title: 'Mid' })
  })

  it('returns undefined for an unknown slug', () => {
    expect(repo.get('nope')).toBeUndefined()
  })
})

describe('createWriteupRepository with invalid entries', () => {
  const broken = createWriteupRepository({
    '/src/content/writeups/ok.md': raw('Ok', '2025-01-01'),
    '/src/content/writeups/bad.md': 'no front matter at all',
  })

  it('skips invalid entries and keeps valid ones', () => {
    expect(broken.list().map((w) => w.slug)).toEqual(['ok'])
    expect(broken.get('bad')).toBeUndefined()
  })

  it('collects invalid entries in errors', () => {
    expect(broken.errors).toHaveLength(1)
    expect(broken.errors[0].path).toBe('/src/content/writeups/bad.md')
    expect(typeof broken.errors[0].message).toBe('string')
    expect(broken.errors[0].message.length).toBeGreaterThan(0)
  })

  it('exposes an empty errors array when all entries are valid', () => {
    expect(repo.errors).toEqual([])
  })
})

describe('createWriteupRepository with bad vulnerabilities', () => {
  const withBad = createWriteupRepository({
    '/src/content/writeups/v.md':
      '---\ntitle: V\ndate: 2025-01-01\nplatform: CTF\nsummary: s\nlang: en\nvulnerabilities:\n  - severity: nope\n    title: X\n    impact: i\n    mitigation: m\n  - severity: low\n    title: Y\n    impact: i\n    mitigation: m\n---\nbody',
  })

  it('keeps the writeup and its valid findings', () => {
    expect(withBad.get('v').vulnerabilities.map((v) => v.title)).toEqual(['Y'])
  })

  it('reports each bad finding in errors', () => {
    expect(withBad.errors).toHaveLength(1)
    expect(withBad.errors[0].path).toBe('/src/content/writeups/v.md')
    expect(withBad.errors[0].message).toMatch(/^Invalid vulnerability #1 in v\.md: /)
    expect(withBad.errors[0].kind).toBe('vulnerability')
  })
})

describe('formatContentError', () => {
  it('prefixes invalid writeup files with their path', () => {
    expect(formatContentError({ path: '/src/content/writeups/x.md', message: 'missing "title"' }))
      .toBe('Invalid writeup /src/content/writeups/x.md: missing "title"')
  })

  it('prints vulnerability errors as-is, since they already name the file', () => {
    const message = 'Invalid vulnerability #2 in x.md: "SQLi": unknown severity "huge"'
    expect(formatContentError({ path: '/src/content/writeups/x.md', message, kind: 'vulnerability' }))
      .toBe(message)
  })
})
