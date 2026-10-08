// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import WriteupPage from './WriteupPage'

afterEach(cleanup)

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/writeups/:slug" element={<WriteupPage />} />
      </Routes>
    </MemoryRouter>,
  )

describe('WriteupPage', () => {
  it('renders the writeup title and sets the document title', () => {
    renderAt('/writeups/htb-example-machine')
    expect(
      screen.getByRole('heading', { level: 1, name: 'Example Machine' }),
    ).toBeTruthy()
    expect(document.title).toContain('Example Machine')
  })

  it('renders the markdown body', () => {
    renderAt('/writeups/htb-example-machine')
    expect(screen.getByRole('heading', { name: 'Recon' })).toBeTruthy()
  })

  it('shows a not-found message for an unknown slug', () => {
    renderAt('/writeups/does-not-exist')
    expect(
      screen.getByText('cat: does-not-exist.md: No such file or directory'),
    ).toBeTruthy()
    expect(screen.getByRole('link', { name: /cd \.\./ })).toBeTruthy()
  })

  it('restores the previous document title on unmount', () => {
    document.title = 'Original title'
    const { unmount } = renderAt('/writeups/htb-example-machine')
    expect(document.title).toBe('Example Machine')
    unmount()
    expect(document.title).toBe('Original title')
  })
})
