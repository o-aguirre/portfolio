import { describe, it, expect } from 'vitest'
import { prepareTimeline, fakeHash } from './timeline.js'

const entry = (over = {}) => ({
  id: 'e1',
  date: '2025-03',
  kind: 'ctf',
  text: { en: 'Played a CTF', es: 'Jugué un CTF' },
  ...over,
})

describe('prepareTimeline', () => {
  it('rejects a malformed date, naming the entry id', () => {
    expect(() => prepareTimeline([entry({ id: 'a', date: '2025-3' })])).toThrow(/a/)
    expect(() => prepareTimeline([entry({ id: 'b', date: '2025-13' })])).toThrow(/b/)
    expect(() => prepareTimeline([entry({ id: 'c', date: undefined })])).toThrow(/c/)
  })

  it('rejects an unknown kind', () => {
    expect(() => prepareTimeline([entry({ id: 'k', kind: 'party' })])).toThrow(/k/)
  })

  it('requires both languages', () => {
    expect(() => prepareTimeline([entry({ id: 'l', text: { en: 'only' } })])).toThrow(/l/)
    expect(() => prepareTimeline([entry({ id: 'm', text: undefined })])).toThrow(/m/)
  })

  it('sorts newest first without mutating the input', () => {
    const input = [entry({ id: 'old', date: '2024-01' }), entry({ id: 'new', date: '2025-06' })]
    expect(prepareTimeline(input).map((e) => e.id)).toEqual(['new', 'old'])
    expect(input[0].id).toBe('old')
  })

  it('attaches a deterministic 7-char hex hash', () => {
    const [a] = prepareTimeline([entry()])
    const [b] = prepareTimeline([entry()])
    expect(a.hash).toMatch(/^[0-9a-f]{7}$/)
    expect(a.hash).toBe(b.hash)
  })
})

describe('fakeHash', () => {
  it('differs for different ids', () => {
    expect(fakeHash('one')).not.toBe(fakeHash('two'))
    expect(fakeHash('')).toMatch(/^[0-9a-f]{7}$/)
  })
})
