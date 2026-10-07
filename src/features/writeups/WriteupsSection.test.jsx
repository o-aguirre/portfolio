// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { screen, cleanup } from '@testing-library/react'
import { renderWithProviders } from '../../test/renderWithProviders'
import WriteupsSection from './WriteupsSection'

afterEach(cleanup)

describe('WriteupsSection', () => {
  it('renders a link per writeup pointing to its route', () => {
    renderWithProviders(<WriteupsSection />)
    const link = screen.getByRole('link', { name: 'Example Machine' })
    expect(link.getAttribute('href')).toBe('/writeups/htb-example-machine')
  })

  it('exposes the writeups section anchor', () => {
    const { container } = renderWithProviders(<WriteupsSection />)
    expect(container.querySelector('#writeups')).not.toBeNull()
  })
})
