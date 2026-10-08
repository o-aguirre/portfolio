// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import Footer from './Footer'

afterEach(cleanup)

describe('Footer', () => {
  it('renders the exit line with the current year', () => {
    const { container } = render(<Footer />)
    expect(container.textContent).toContain(`[exit 0] © ${new Date().getFullYear()} o-aguirre`)
  })

  it('leaves the links to the contact section', () => {
    const { container } = render(<Footer />)
    expect(container.querySelectorAll('a')).toHaveLength(0)
  })
})
