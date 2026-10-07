import { describe, it, expect } from 'vitest'
import { getNavItems } from './sections.js'

const targets = (items) => items.map((i) => i.target)

describe('getNavItems', () => {
  it('hides certs and log while their lists are empty', () => {
    expect(targets(getNavItems({ certs: [], timeline: [] }))).toEqual([
      'home', 'writeups', 'skills', 'contact',
    ])
  })

  it('shows certs and log, in order, when they have entries', () => {
    const items = getNavItems({ certs: [{}], timeline: [{}] })
    expect(targets(items)).toEqual(['home', 'writeups', 'skills', 'certs', 'log', 'contact'])
    expect(items.map((i) => i.name)).toContain('./log')
  })
})
