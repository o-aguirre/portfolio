import { describe, it, expect } from 'vitest'
import { prepareCerts } from './certs.js'
import { certs as realCerts } from '../data/certs.js'

const ok = (over = {}) => ({ id: 'ejpt', name: 'eJPT', issuer: 'INE', status: 'earned', ...over })

describe('prepareCerts', () => {
  it('lists earned certifications before in-progress ones, keeping order otherwise', () => {
    const { items } = prepareCerts([
      ok({ id: 'a', status: 'in-progress' }),
      ok({ id: 'b' }),
      ok({ id: 'c', status: 'in-progress' }),
      ok({ id: 'd' }),
    ])
    expect(items.map((c) => c.id)).toEqual(['b', 'd', 'a', 'c'])
  })

  it('skips an entry with a missing name and reports it by id', () => {
    const { items, errors } = prepareCerts([ok({ id: 'x', name: '' }), ok({ id: 'good' })])
    expect(items.map((c) => c.id)).toEqual(['good'])
    expect(errors).toHaveLength(1)
    expect(errors[0].id).toBe('x')
    expect(errors[0].message).toMatch(/name/)
  })

  it('skips entries with a missing or unknown status', () => {
    const { items, errors } = prepareCerts([
      ok({ id: 'y', status: undefined }),
      ok({ id: 'z', status: 'done' }),
    ])
    expect(items).toEqual([])
    expect(errors.map((e) => e.id)).toEqual(['y', 'z'])
  })

  it('does not mutate the input', () => {
    const input = [ok({ id: 'a', status: 'in-progress' }), ok({ id: 'b' })]
    prepareCerts(input)
    expect(input[0].id).toBe('a')
  })

  it('accepts the real certifications data without errors', () => {
    expect(prepareCerts(realCerts).errors).toEqual([])
  })
})
