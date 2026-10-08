// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Skills from './skills/Skills'

afterEach(cleanup)

const renderHome = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <HomePage />
    </MemoryRouter>,
  )

describe('home page terminal restyle', () => {
  it('renders a single h1', () => {
    renderHome()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('renders no profile image in the hero', () => {
    const { container } = renderHome()
    expect(container.querySelector('#home img')).toBeNull()
  })

  it('adds rel=noreferrer to every target=_blank link', () => {
    const { container } = renderHome()
    const external = container.querySelectorAll('a[target=_blank]')
    expect(external.length).toBeGreaterThan(0)
    external.forEach((a) => expect(a.getAttribute('rel')).toContain('noreferrer'))
  })

  it('does not nest a button inside a link', () => {
    const { container } = renderHome()
    expect(container.querySelectorAll('a button')).toHaveLength(0)
  })

  it('exposes the CV as a download link', () => {
    renderHome()
    const cv = screen.getByRole('link', { name: /download_cv/ })
    expect(cv.hasAttribute('download')).toBe(true)
  })
})

describe('Skills', () => {
  it('uses an h2 section heading', () => {
    render(<Skills />)
    expect(screen.getByRole('heading', { level: 2, name: /skills/ })).toBeTruthy()
    expect(screen.queryAllByRole('heading', { level: 1 })).toHaveLength(0)
  })
})
