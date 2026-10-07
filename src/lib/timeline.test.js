import { describe, it, expect } from 'vitest'
import { prepareTimeline, fakeHash } from './timeline.js'
import { timeline as realTimeline } from '../data/timeline.js'

const errorIds = (entries) => prepareTimeline(entries).errors.map((e) => e.id)

const entry = (over = {}) => ({
  id: 'e1',
  date: '2025-03',
  kind: 'ctf',
  text: { en: 'Played a CTF', es: 'Jugué un CTF' },
  ...over,
})

describe('prepareTimeline', () => {
  it('skips a malformed date and reports the entry id', () => {
    expect(
      errorIds([
        entry({ id: 'a', date: '2025-3' }),
        entry({ id: 'b', date: '2025-13' }),
        entry({ id: 'c', date: undefined }),
      ]),
    ).toEqual(['a', 'b', 'c'])
  })

  it('skips an unknown kind', () => {
    expect(errorIds([entry({ id: 'k', kind: 'party' })])).toEqual(['k'])
  })

  it('requires both texts to be strings', () => {
    expect(
      errorIds([
        entry({ id: 'o', text: { en: { x: 1 }, es: 'ok' } }),
        entry({ id: 'p', text: { en: 'ok', es: ['no'] } }),
      ]),
    ).toEqual(['o', 'p'])
  })

  it('requires both languages', () => {
    expect(
      errorIds([entry({ id: 'l', text: { en: 'only' } }), entry({ id: 'm', text: undefined })]),
    ).toEqual(['l', 'm'])
  })

  it('skips entries without a usable id instead of crashing', () => {
    const { items, errors } = prepareTimeline([
      entry({ id: undefined }),
      entry({ id: '' }),
      null,
      entry({ id: 'good' }),
    ])
    expect(items.map((e) => e.id)).toEqual(['good'])
    expect(errors).toHaveLength(3)
  })

  it('skips a duplicate id, keeping the first entry', () => {
    const { items, errors } = prepareTimeline([
      entry({ id: 'dup', date: '2025-01' }),
      entry({ id: 'dup', date: '2025-02' }),
    ])
    expect(items).toHaveLength(1)
    expect(items[0].date).toBe('2025-01')
    expect(errors[0].message).toMatch(/duplicate/)
  })

  it('keeps valid entries when another one is invalid', () => {
    const { items } = prepareTimeline([entry({ id: 'bad', kind: 'party' }), entry({ id: 'good' })])
    expect(items.map((e) => e.id)).toEqual(['good'])
  })

  it('sorts newest first without mutating the input', () => {
    const input = [entry({ id: 'old', date: '2024-01' }), entry({ id: 'new', date: '2025-06' })]
    expect(prepareTimeline(input).items.map((e) => e.id)).toEqual(['new', 'old'])
    expect(input[0].id).toBe('old')
  })

  it('accepts the real timeline data without errors', () => {
    expect(prepareTimeline(realTimeline).errors).toEqual([])
  })

  it('attaches a deterministic 7-char hex hash', () => {
    const [a] = prepareTimeline([entry()]).items
    const [b] = prepareTimeline([entry()]).items
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
