import { describe, expect, it } from 'vitest'
import { prepareVulnerabilities } from './vulnerabilities.js'

const finding = (overrides = {}) => ({
  severity: 'high',
  title: 'Weak sudo rule',
  impact: 'Root access.',
  mitigation: 'Restrict sudo.',
  ...overrides,
})

describe('prepareVulnerabilities', () => {
  it('returns empty results for missing or non-array input', () => {
    for (const input of [undefined, null, 'x', 42, { a: 1 }]) {
      expect(prepareVulnerabilities(input)).toEqual({ items: [], errors: [] })
    }
  })

  it('keeps valid findings', () => {
    const { items, errors } = prepareVulnerabilities([finding({ owasp: 'A01:2021' })])
    expect(errors).toEqual([])
    expect(items).toEqual([
      {
        severity: 'high',
        title: 'Weak sudo rule',
        impact: 'Root access.',
        mitigation: 'Restrict sudo.',
        owasp: 'A01:2021',
      },
    ])
  })

  it('sorts by severity, stable for equal severity', () => {
    const { items } = prepareVulnerabilities([
      finding({ severity: 'low', title: 'l1' }),
      finding({ severity: 'info', title: 'i1' }),
      finding({ severity: 'critical', title: 'c1' }),
      finding({ severity: 'low', title: 'l2' }),
      finding({ severity: 'medium', title: 'm1' }),
      finding({ severity: 'high', title: 'h1' }),
      finding({ severity: 'critical', title: 'c2' }),
    ])
    expect(items.map((i) => i.title)).toEqual(['c1', 'c2', 'h1', 'm1', 'l1', 'l2', 'i1'])
  })

  it('normalizes cwe numbers and strings and builds the MITRE url', () => {
    const { items, errors } = prepareVulnerabilities([
      finding({ cwe: 250 }),
      finding({ cwe: 'CWE-78' }),
      finding({ cwe: ' cwe-89 ' }),
      finding({ cwe: '22' }),
      finding(),
    ])
    expect(errors).toEqual([])
    expect(items.map((i) => i.cwe)).toEqual([250, 78, 89, 22, undefined])
    expect(items[0].cweUrl).toBe('https://cwe.mitre.org/data/definitions/250.html')
    expect(items[4].cweUrl).toBeUndefined()
  })

  it.each([0, -5, 1.5, 'abc', 'CWE-', {}, true, ''])('rejects invalid cwe %j', (cwe) => {
    const { items, errors } = prepareVulnerabilities([finding({ cwe })])
    expect(items).toEqual([])
    expect(errors[0].message).toMatch(/cwe/)
  })

  it('skips invalid entries with a 1-based index and the title when known', () => {
    const { items, errors } = prepareVulnerabilities([
      finding({ title: 'ok' }),
      finding({ title: 'Bad one', severity: 'urgent' }),
      null,
      'text',
      finding({ title: undefined }),
      finding({ impact: '  ' }),
      finding({ mitigation: 3 }),
      finding({ owasp: 5 }),
    ])
    expect(items.map((i) => i.title)).toEqual(['ok'])
    expect(errors.map((e) => e.index)).toEqual([2, 3, 4, 5, 6, 7, 8])
    expect(errors[0].message).toContain('Bad one')
    expect(errors[0].message).toContain('severity')
    expect(errors[1].message).toMatch(/object/)
    expect(errors[3].message).toContain('title')
    expect(errors[4].message).toContain('impact')
    expect(errors[5].message).toContain('mitigation')
    expect(errors[6].message).toContain('owasp')
  })

  it('never throws on hostile input', () => {
    expect(() => prepareVulnerabilities([[], () => 1, { severity: {} }, Symbol.iterator.toString()])).not.toThrow()
  })
})
