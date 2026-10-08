// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest'
import { screen, cleanup, fireEvent, waitFor } from '@testing-library/react'
import Contact from './Contact'
import { encodeEmail } from '../../lib/obfuscate'
import { renderWithProviders } from '../../test/renderWithProviders'

const ADDRESS = 'owner@example.com'
const entries = [
  { id: 'github', label: 'github', value: 'github.com/o-aguirre', href: 'https://github.com/o-aguirre' },
  { id: 'linkedin', label: 'linkedin', value: 'linkedin.com/in/x', href: 'https://www.linkedin.com/in/x/' },
  { id: 'hackthebox', label: 'hackthebox', value: '' },
]

const mockClipboard = (writeText) => {
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  delete navigator.clipboard
})

describe('Contact (whois)', () => {
  it('renders the whois header and keeps the section id', () => {
    const { container } = renderWithProviders(<Contact entries={entries} email="" />)
    expect(screen.getByRole('heading', { level: 2 }).textContent).toContain('whois o-aguirre')
    expect(container.querySelector('section#contact')).toBeTruthy()
  })

  it('renders channels as external links with rel=noreferrer', () => {
    renderWithProviders(<Contact entries={entries} email="" />)
    for (const [name, href] of [['github.com/o-aguirre', 'https://github.com/o-aguirre'], ['linkedin.com/in/x', 'https://www.linkedin.com/in/x/']]) {
      const link = screen.getByRole('link', { name })
      expect(link.getAttribute('href')).toBe(href)
      expect(link.getAttribute('target')).toBe('_blank')
      expect(link.getAttribute('rel')).toBe('noreferrer')
    }
  })

  it('hides entries with an empty value', () => {
    const { container } = renderWithProviders(<Contact entries={entries} email="" />)
    expect(container.textContent).not.toContain('hackthebox')
  })

  it('hides the email row when the email is empty', () => {
    const { container } = renderWithProviders(<Contact entries={entries} email="" />)
    expect(container.textContent).not.toContain('email')
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('shows only the base64 form initially, never the plain address', () => {
    const { container } = renderWithProviders(<Contact entries={entries} email={ADDRESS} />)
    expect(container.textContent).toContain(encodeEmail(ADDRESS))
    expect(container.innerHTML).not.toContain(ADDRESS)
    expect(screen.queryByRole('link', { name: ADDRESS })).toBeNull()
    expect(screen.getByRole('status').textContent).toBe('')
  })

  it('reveals a mailto link and copies on decode', async () => {
    const writeText = vi.fn().mockResolvedValue()
    mockClipboard(writeText)
    renderWithProviders(<Contact entries={entries} email={ADDRESS} />)
    fireEvent.click(screen.getByRole('button', { name: '[ decode ]' }))
    const link = screen.getByRole('link', { name: ADDRESS })
    expect(link.getAttribute('href')).toBe(`mailto:${ADDRESS}`)
    expect(writeText).toHaveBeenCalledWith(ADDRESS)
    await waitFor(() => expect(screen.getByRole('status').textContent).toBe('copied'))
  })

  it('shows the failure text when the clipboard rejects', async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error('denied')))
    renderWithProviders(<Contact entries={entries} email={ADDRESS} />)
    fireEvent.click(screen.getByRole('button', { name: '[ decode ]' }))
    await waitFor(() => expect(screen.getByRole('status').textContent).toBe('copy failed'))
    expect(screen.getByRole('link', { name: ADDRESS })).toBeTruthy()
  })

  it('shows the failure text when the clipboard is unavailable', async () => {
    renderWithProviders(<Contact entries={entries} email={ADDRESS} />)
    fireEvent.click(screen.getByRole('button', { name: '[ decode ]' }))
    await waitFor(() => expect(screen.getByRole('status').textContent).toBe('copy failed'))
  })

  it('translates the button and status labels to Spanish', async () => {
    mockClipboard(vi.fn().mockResolvedValue())
    renderWithProviders(<Contact entries={entries} email={ADDRESS} />, { lang: 'es' })
    fireEvent.click(screen.getByRole('button', { name: '[ decodificar ]' }))
    await waitFor(() => expect(screen.getByRole('status').textContent).toBe('copiado'))
    cleanup()
    mockClipboard(vi.fn().mockRejectedValue(new Error('x')))
    renderWithProviders(<Contact entries={entries} email={ADDRESS} />, { lang: 'es' })
    fireEvent.click(screen.getByRole('button', { name: '[ decodificar ]' }))
    await waitFor(() => expect(screen.getByRole('status').textContent).toBe('no se pudo copiar'))
  })
})
