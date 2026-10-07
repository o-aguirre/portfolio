// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
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

  it('shows only ./writeups, ./about and ./contact as section links', () => {
    renderNavbar()
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav.textContent).toContain('./writeups')
    expect(nav.textContent).toContain('./about')
    expect(nav.textContent).not.toMatch(/\.\/(home|skills|certs|log)/)
  })

  it('uses the brand as the link back to the top of the page', () => {
    const scrollIntoView = vi.fn()
    render(
      <MemoryRouter>
        <LanguageProvider initialLang="en">
          <div id="home" />
          <Navbar />
        </LanguageProvider>
      </MemoryRouter>,
    )
    document.getElementById('home').scrollIntoView = scrollIntoView
    fireEvent.click(screen.getByRole('button', { name: /o-aguirre@portfolio/ }))
    expect(scrollIntoView).toHaveBeenCalled()
  })

  it('renders the language toggle instead of the contact button', () => {
    renderNavbar()
    expect(screen.queryByRole('button', { name: /contact me/i })).toBeNull()
    expect(screen.getByRole('button', { name: 'Español' })).toBeTruthy()
  })
})
