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
  it('pushes the section links and the language toggle to the right', () => {
    renderNavbar()
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav.className).toContain('md:ml-auto')
    expect(nav.contains(screen.getByRole('group', { name: 'Language' }))).toBe(true)
  })

  it('lists ./contact in the nav menu', () => {
    renderNavbar()
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav.textContent).toContain('./contact')
  })

  it('renders the language toggle instead of the contact button', () => {
    renderNavbar()
    expect(screen.queryByRole('button', { name: /contact me/i })).toBeNull()
    expect(screen.getByRole('button', { name: 'Español' })).toBeTruthy()
  })
})
