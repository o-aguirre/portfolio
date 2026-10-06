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
