import { describe, it, expect } from 'vitest'
import { NAV_ITEMS } from './sections.js'

describe('NAV_ITEMS', () => {
  it('groups the menu into writeups, about and contact', () => {
    expect(NAV_ITEMS.map((i) => i.name)).toEqual(['./writeups', './about', './contact'])
  })

  it('points ./about at the skills section, the first of skills, certs and timeline', () => {
    expect(NAV_ITEMS.find((i) => i.name === './about').target).toBe('skills')
  })
})
