// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from '../../App'
import NavLinkButton from '../../components/navbar/NavLinkButton'

const scrollIntoView = vi.fn()

afterEach(() => {
  cleanup()
  scrollIntoView.mockReset()
})

const renderApp = (path) => {
  Element.prototype.scrollIntoView = scrollIntoView
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('navigation from a writeup page', () => {
  it('goes home and scrolls to the writeups section via the back link', async () => {
    renderApp('/writeups/htb-example-machine')
    fireEvent.click(await screen.findByRole('link', { name: 'cd ..' }))
    expect(
      await screen.findByRole('heading', { level: 1 }),
    ).toBeTruthy()
    expect(scrollIntoView).toHaveBeenCalled()
    expect(scrollIntoView.mock.contexts.at(-1).id).toBe('writeups')
  })
})

describe('NavLinkButton', () => {
  it('scrolls to the target section when already on home', () => {
    Element.prototype.scrollIntoView = scrollIntoView
    render(
      <MemoryRouter initialEntries={['/']}>
        <section id="skills" />
        <NavLinkButton target="skills">Skills</NavLinkButton>
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Skills' }))
    expect(scrollIntoView).toHaveBeenCalledTimes(1)
    expect(scrollIntoView.mock.contexts[0].id).toBe('skills')
  })

  it('navigates home with scroll state when on another route', () => {
    const Probe = () => {
      const { pathname, state } = useLocation()
      return <p>{`${pathname}|${state?.scrollTo}`}</p>
    }
    render(
      <MemoryRouter initialEntries={['/writeups/x']}>
        <Routes>
          <Route path="/" element={<Probe />} />
          <Route
            path="/writeups/x"
            element={<NavLinkButton target="skills">Skills</NavLinkButton>}
          />
        </Routes>
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Skills' }))
    expect(screen.getByText('/|skills')).toBeTruthy()
  })
})
