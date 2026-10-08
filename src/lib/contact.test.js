import { describe, it, expect } from 'vitest'
import { prepareContact } from './contact.js'
import { contact as realContact } from '../data/contact.js'

const ok = (over = {}) => ({ id: 'github', label: 'github', value: 'github.com/x', href: 'https://github.com/x', ...over })

describe('prepareContact', () => {
  it('keeps valid entries in order', () => {
    const { items, errors } = prepareContact([ok({ id: 'a' }), ok({ id: 'b' })])
    expect(items.map((e) => e.id)).toEqual(['a', 'b'])
    expect(errors).toEqual([])
  })

  it('hides entries with an empty value without reporting an error', () => {
    const { items, errors } = prepareContact([ok({ id: 'a', value: '' }), ok({ id: 'b' })])
    expect(items.map((e) => e.id)).toEqual(['b'])
    expect(errors).toEqual([])
  })

  it('skips entries without label or non-https href', () => {
    const { items, errors } = prepareContact([
      ok({ id: 'a', label: '' }),
      ok({ id: 'b', href: 'http://x.com' }),
      ok({ id: 'c', href: 'javascript:alert(1)' }),
      ok({ id: 'd', href: undefined }),
    ])
    expect(items.map((e) => e.id)).toEqual(['d'])
    expect(errors.map((e) => e.id)).toEqual(['a', 'b', 'c'])
  })

  it('skips entries whose label or value is not text', () => {
    const { items, errors } = prepareContact([
      ok({ id: 'a', value: { en: 'x', es: 'y' } }),
      ok({ id: 'b', label: { en: 'x' } }),
      ok({ id: 'good' }),
    ])
    expect(items.map((e) => e.id)).toEqual(['good'])
    expect(errors.map((e) => e.id)).toEqual(['a', 'b'])
  })

  it('treats a whitespace-only value as an unfilled placeholder', () => {
    const { items, errors } = prepareContact([ok({ id: 'blank', value: '   ' }), ok({ id: 'good' })])
    expect(items.map((e) => e.id)).toEqual(['good'])
    expect(errors).toEqual([])
  })

  it('does not throw on malformed input', () => {
    const { items, errors } = prepareContact([null, { id: 'x', label: 'x', value: 'y' }])
    expect(items).toHaveLength(1)
    expect(errors).toHaveLength(1)
  })

  it('accepts the real contact data without errors', () => {
    expect(prepareContact(realContact).errors).toEqual([])
  })
})
