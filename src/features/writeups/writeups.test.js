import { describe, expect, it } from 'vitest'
import { createWriteupRepository } from './writeups.js'

const raw = (title, date) =>
  `---\ntitle: ${title}\ndate: ${date}\nplatform: CTF\nsummary: s\n---\nbody`

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
