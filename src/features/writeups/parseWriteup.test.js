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

describe('parseWriteup vulnerabilities', () => {
  const withFindings = (yaml) =>
    `---\ntitle: T\ndate: 2025-03-14\nplatform: CTF\nsummary: s\nlang: en\nvulnerabilities:\n${yaml}\n---\nbody`

  const good = `  - severity: low\n    title: Banner\n    impact: Leaks version.\n    mitigation: Hide it.\n  - severity: critical\n    title: RCE\n    cwe: CWE-78\n    impact: Shell.\n    mitigation: Sanitize.`

  it('defaults to no vulnerabilities', () => {
    const w = parseWriteup(PATH, doc())
    expect(w.vulnerabilities).toEqual([])
    expect(w.vulnerabilityErrors).toEqual([])
  })

  it('passes prepared vulnerabilities through, sorted', () => {
    const w = parseWriteup(PATH, withFindings(good))
    expect(w.vulnerabilities.map((v) => v.title)).toEqual(['RCE', 'Banner'])
    expect(w.vulnerabilities[0].cweUrl).toBe('https://cwe.mitre.org/data/definitions/78.html')
    expect(w.vulnerabilityErrors).toEqual([])
  })

  it('keeps the writeup valid when a finding is bad and reports it', () => {
    const bad = `${good}\n  - severity: nope\n    title: Broken\n    impact: i\n    mitigation: m`
    const w = parseWriteup(PATH, withFindings(bad))
    expect(w.title).toBe('T')
    expect(w.vulnerabilities).toHaveLength(2)
    expect(w.vulnerabilityErrors).toHaveLength(1)
    expect(w.vulnerabilityErrors[0].message).toBe(
      'Invalid vulnerability #3 in htb-demo.md: "Broken": "severity" must be one of critical, high, medium, low, info',
    )
  })

  it('ignores a non-list vulnerabilities field', () => {
    const w = parseWriteup(PATH, doc({ vulnerabilities: 'oops' }))
    expect(w.vulnerabilities).toEqual([])
  })
})
