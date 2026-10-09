import { describe, expect, it, vi } from 'vitest'

// The global test setup mocks this module with fixtures; here we need the real content.
vi.unmock('/src/features/writeups/index.js')
const { writeups } = await vi.importActual('./index.js')

// Counted independently of the repository, so a broken loader cannot make the
// per-writeup loops below pass vacuously over an empty list.
const contentFiles = Object.keys(import.meta.glob('/src/content/writeups/*.md'))

describe('writeups (real content)', () => {
  it('loads every markdown file in src/content/writeups', () => {
    expect(writeups.list().length + writeups.errors.filter((e) => e.kind !== 'vulnerability').length)
      .toBe(contentFiles.length)
  })

  it('has no invalid content files', () => {
    expect(writeups.errors).toEqual([])
  })

  it('loads every real writeup with the required fields', () => {
    for (const w of writeups.list()) {
      expect(w.slug).toBeTruthy()
      expect(w.title).toBeTruthy()
      expect(['en', 'es']).toContain(w.lang)
      expect(w.body.length).toBeGreaterThan(0)
      expect(writeups.get(w.slug)).toBe(w)
    }
  })

  it('has unique slugs', () => {
    const slugs = writeups.list().map((w) => w.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('lists writeups sorted by date, newest first', () => {
    const dates = writeups.list().map((w) => w.date)
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)))
  })

  it('parses every real finding without errors', () => {
    for (const w of writeups.list()) {
      expect(w.vulnerabilityErrors).toEqual([])
    }
  })
})
