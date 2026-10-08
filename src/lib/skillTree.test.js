import { describe, it, expect } from 'vitest'
import { withWriteupCounts } from './skillTree.js'

const skills = [
  {
    id: 'web',
    items: [
      { name: 'SQLi', tag: 'sqli' },
      { name: 'XSS', tag: 'XSS' },
      { name: 'Git' },
    ],
  },
]
const writeups = [
  { slug: 'a', tags: ['SQLi', 'linux'] },
  { slug: 'b', tags: ['sqli', 'xss'] },
  { slug: 'c', tags: ['linux'] },
]

describe('withWriteupCounts', () => {
  it('counts writeups by tag, case-insensitively', () => {
    const [cat] = withWriteupCounts(skills, writeups)
    expect(cat.items[0].count).toBe(2)
    expect(cat.items[1].count).toBe(1)
  })

  it('returns 0 for untagged items and unmatched tags', () => {
    const [cat] = withWriteupCounts(skills, [])
    expect(cat.items[0].count).toBe(0)
    expect(cat.items[2].count).toBe(0)
  })

  it('keeps ids and names and does not mutate the input', () => {
    const out = withWriteupCounts(skills, writeups)
    expect(out[0].id).toBe('web')
    expect(out[0].items[2].name).toBe('Git')
    expect(skills[0].items[0].count).toBeUndefined()
  })
})
