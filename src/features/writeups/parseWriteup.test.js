import { describe, expect, it } from 'vitest'
import { parseWriteup } from './parseWriteup.js'

const PATH = '/src/content/writeups/htb-demo.md'

const doc = (fields = {}, body = '# Hello\n\nBody text.') => {
  const base = {
    title: 'Demo Box',
    date: '2025-03-14',
    platform: 'HackTheBox',
    summary: 'A demo summary.',
    lang: 'en',
    ...fields,
  }
  const lines = Object.entries(base)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}: ${v}`)
  return `---\n${lines.join('\n')}\n---\n${body}`
}

describe('parseWriteup', () => {
  it('parses frontmatter and body', () => {
    const w = parseWriteup(PATH, doc({ difficulty: 'Easy', tags: '[web, sqli]' }))
    expect(w).toMatchObject({
      title: 'Demo Box',
      date: '2025-03-14',
      platform: 'HackTheBox',
      difficulty: 'Easy',
      tags: ['web', 'sqli'],
      summary: 'A demo summary.',
      lang: 'en',
    })
    expect(w.body).toContain('Body text.')
  })

  it('derives the slug from the path filename without .md', () => {
    expect(parseWriteup(PATH, doc()).slug).toBe('htb-demo')
  })

  it('normalizes a YAML Date to a YYYY-MM-DD string', () => {
    const w = parseWriteup(PATH, doc({ date: '2024-01-05' }))
    expect(typeof w.date).toBe('string')
    expect(w.date).toBe('2024-01-05')
  })

  it('defaults tags to an empty array and difficulty to undefined', () => {
    const w = parseWriteup(PATH, doc())
    expect(w.tags).toEqual([])
    expect(w.difficulty).toBeUndefined()
  })

  it.each(['title', 'date', 'platform', 'summary', 'lang'])(
    'throws naming the file and field when %s is missing',
    (field) => {
      expect(() => parseWriteup(PATH, doc({ [field]: undefined }))).toThrow(
        new RegExp(`htb-demo\\.md.*${field}|${field}.*htb-demo\\.md`),
      )
    },
  )

  it.each(['en', 'es'])('accepts lang %s', (lang) => {
    expect(parseWriteup(PATH, doc({ lang })).lang).toBe(lang)
  })

  it.each(['fr', 'EN', 'english'])('throws on unsupported lang %s', (lang) => {
    expect(() => parseWriteup(PATH, doc({ lang }))).toThrow(/htb-demo\.md.*lang/)
  })

  it('throws on an invalid date', () => {
    expect(() => parseWriteup(PATH, doc({ date: 'not-a-date' }))).toThrow(
      /htb-demo\.md.*date/,
    )
    expect(() => parseWriteup(PATH, doc({ date: '2025-02-31' }))).toThrow(
      /htb-demo\.md.*date/,
    )
  })
})
