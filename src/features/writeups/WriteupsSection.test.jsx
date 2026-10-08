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

  it('shows a language badge per row and does not filter by the UI language', () => {
    renderWithProviders(<WriteupsSection />, { lang: 'es' })
    expect(screen.getByText('[EN]').className).toContain('text-ansi-amber')
    expect(screen.getByRole('link', { name: 'Example Machine' })).toBeTruthy()
  })

  it('exposes the writeups section anchor', () => {
    const { container } = renderWithProviders(<WriteupsSection />)
    expect(container.querySelector('#writeups')).not.toBeNull()
  })
})
