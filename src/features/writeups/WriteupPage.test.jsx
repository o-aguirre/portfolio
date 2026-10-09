// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { screen, cleanup } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '../../test/renderWithProviders'
import WriteupPage from './WriteupPage'

afterEach(cleanup)

const renderAt = (path) =>
  renderWithProviders(
    <Routes>
      <Route path="/writeups/:slug" element={<WriteupPage />} />
    </Routes>,
    { route: path },
  )

describe('WriteupPage', () => {
  it('renders the writeup title and sets the document title', () => {
    renderAt('/writeups/fixture-alpha-box')
    expect(
      screen.getByRole('heading', { level: 1, name: 'Fixture Alpha Box' }),
    ).toBeTruthy()
    expect(document.title).toContain('Fixture Alpha Box')
  })

  it('sets the writeup language on the article, whatever the UI language', () => {
    const { container } = renderWithProviders(
      <Routes>
        <Route path="/writeups/:slug" element={<WriteupPage />} />
      </Routes>,
      { lang: 'es', route: '/writeups/fixture-alpha-box' },
    )
    expect(container.querySelector('article').getAttribute('lang')).toBe('en')
  })

  it('renders the markdown body', () => {
    renderAt('/writeups/fixture-alpha-box')
    expect(screen.getByRole('heading', { name: 'Fixture recon' })).toBeTruthy()
  })

  it('shows a not-found message for an unknown slug', () => {
    renderAt('/writeups/does-not-exist')
    expect(
      screen.getByText('cat: does-not-exist.md: No such file or directory'),
    ).toBeTruthy()
    expect(screen.getByRole('link', { name: /cd \.\./ })).toBeTruthy()
  })

  it('echoes slugs with replacement patterns literally in the not-found message', () => {
    renderAt('/writeups/a$&b$$c')
    expect(
      screen.getByText('cat: a$&b$$c.md: No such file or directory'),
    ).toBeTruthy()
  })

  it('restores the previous document title on unmount', () => {
    document.title = 'Original title'
    const { unmount } = renderAt('/writeups/fixture-alpha-box')
    expect(document.title).toBe('Fixture Alpha Box')
    unmount()
    expect(document.title).toBe('Original title')
  })

  it('shows the vulnerabilities section after the body', () => {
    renderAt('/writeups/fixture-alpha-box')
    const heading = screen.getByRole('heading', { level: 2, name: 'Vulnerabilities & mitigations' })
    const lastBodyHeading = screen.getByRole('heading', { name: 'Fixture closing notes' })
    expect(
      lastBodyHeading.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })
})
