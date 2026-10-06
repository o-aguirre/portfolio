import { describe, it, expect, vi } from 'vitest'
import { scrollToSection } from './scrollToSection.js'

const makeDoc = (elements = {}) => ({
  getElementById: (id) => elements[id] ?? null,
})

describe('scrollToSection', () => {
  it('scrolls the matching element into view and returns true', () => {
    const el = { scrollIntoView: vi.fn() }
    const win = { scrollTo: vi.fn() }
    expect(scrollToSection('skills', makeDoc({ skills: el }), win)).toBe(true)
    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    expect(win.scrollTo).not.toHaveBeenCalled()
  })

  it('scrolls to the top when asking for home without an element', () => {
    const win = { scrollTo: vi.fn() }
    expect(scrollToSection('home', makeDoc(), win)).toBe(true)
    expect(win.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('returns false when the element does not exist', () => {
    const win = { scrollTo: vi.fn() }
    expect(scrollToSection('nope', makeDoc(), win)).toBe(false)
    expect(win.scrollTo).not.toHaveBeenCalled()
  })
})
