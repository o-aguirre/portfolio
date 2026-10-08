// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '../../i18n/LanguageProvider'
import Navbar from './Navbar'

afterEach(cleanup)

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <LanguageProvider initialLang="en">
        <Navbar />
      </LanguageProvider>
    </MemoryRouter>,
  )

describe('Navbar', () => {
  it('centers the section links between the brand and the language toggle', () => {
    renderNavbar()
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav.className).toContain('md:mx-auto')
  })

  it('lists ./contact in the nav menu', () => {
    renderNavbar()
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav.textContent).toContain('./contact')
  })

  it('renders the language toggle instead of the contact button', () => {
    renderNavbar()
    expect(screen.queryByRole('button', { name: /contact me/i })).toBeNull()
    expect(screen.getByRole('button', { name: /switch language/i })).toBeTruthy()
  })
})
