// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

afterEach(cleanup)

describe('Navbar', () => {
  it('centers the section links between the brand and the contact button', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav.className).toContain('md:mx-auto')
  })

  it('reaches contact only through the contact button', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav.textContent).not.toContain('contact')
    expect(screen.getByRole('button', { name: /contact me/i })).toBeTruthy()
  })
})
