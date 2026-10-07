import { describe, it, expect } from 'vitest'
import { prepareCerts } from './certs.js'

const ok = (over = {}) => ({ id: 'ejpt', name: 'eJPT', issuer: 'INE', status: 'earned', ...over })

describe('prepareCerts', () => {
  it('lists earned certifications before in-progress ones, keeping order otherwise', () => {
    const out = prepareCerts([
      ok({ id: 'a', status: 'in-progress' }),
      ok({ id: 'b' }),
      ok({ id: 'c', status: 'in-progress' }),
      ok({ id: 'd' }),
    ])
    expect(out.map((c) => c.id)).toEqual(['b', 'd', 'a', 'c'])
  })

  it('throws with the entry id when name is missing', () => {
    expect(() => prepareCerts([ok({ id: 'x', name: '' })])).toThrow(/x/)
  })

  it('throws with the entry id when status is missing or unknown', () => {
    expect(() => prepareCerts([ok({ id: 'y', status: undefined })])).toThrow(/y/)
    expect(() => prepareCerts([ok({ id: 'z', status: 'done' })])).toThrow(/z/)
  })

  it('does not mutate the input', () => {
    const input = [ok({ id: 'a', status: 'in-progress' }), ok({ id: 'b' })]
    prepareCerts(input)
    expect(input[0].id).toBe('a')
  })
})
