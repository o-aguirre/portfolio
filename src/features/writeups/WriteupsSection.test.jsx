// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import WriteupsSection from './WriteupsSection'

afterEach(cleanup)

describe('WriteupsSection', () => {
  it('renders a link per writeup pointing to its route', () => {
    render(
      <MemoryRouter>
        <WriteupsSection />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: 'Example Machine' })
    expect(link.getAttribute('href')).toBe('/writeups/htb-example-machine')
  })

  it('exposes the writeups section anchor', () => {
    const { container } = render(
      <MemoryRouter>
        <WriteupsSection />
      </MemoryRouter>,
    )
    expect(container.querySelector('#writeups')).not.toBeNull()
  })
})
