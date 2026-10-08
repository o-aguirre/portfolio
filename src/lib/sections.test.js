import { describe, it, expect } from 'vitest'
import { getNavItems } from './sections.js'

const targets = (items) => items.map((i) => i.target)
const cert = { id: 'ejpt', name: 'eJPT', issuer: 'INE', status: 'earned' }
const event = { id: 'e1', date: '2025-03', kind: 'ctf', text: { en: 'CTF', es: 'CTF' } }

describe('getNavItems', () => {
  it('hides certs and log while their lists are empty', () => {
    expect(targets(getNavItems({ certs: [], timeline: [] }))).toEqual([
      'home', 'writeups', 'skills', 'contact',
    ])
  })

  it('shows certs and log, in order, when they have valid entries', () => {
    const items = getNavItems({ certs: [cert], timeline: [event] })
    expect(targets(items)).toEqual(['home', 'writeups', 'skills', 'certs', 'timeline', 'contact'])
    expect(items.map((i) => i.name)).toContain('./log')
  })

  it('hides a section whose entries are all invalid', () => {
    expect(targets(getNavItems({ certs: [{ id: 'bad' }], timeline: [{ id: 'bad' }] }))).toEqual([
      'home', 'writeups', 'skills', 'contact',
    ])
  })
})
