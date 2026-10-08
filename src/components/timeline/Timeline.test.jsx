// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { screen, cleanup } from '@testing-library/react'
import Timeline from './Timeline'
import { renderWithProviders } from '../../test/renderWithProviders'
import { fakeHash } from '../../lib/timeline'

afterEach(cleanup)

const items = [
  { id: 'old', date: '2024-01', kind: 'track', text: { en: 'Started the track', es: 'Inicié la ruta' } },
  { id: 'new', date: '2025-06', kind: 'ctf', text: { en: 'Played a CTF', es: 'Jugué un CTF' } },
]

describe('Timeline', () => {
  it('renders the git log command heading', () => {
    renderWithProviders(<Timeline items={items} />)
    expect(screen.getByRole('heading', { level: 2, name: /git log --oneline/ })).toBeTruthy()
  })

  it('renders hash, date, kind and text, newest first', () => {
    renderWithProviders(<Timeline items={items} />)
    const rows = screen.getAllByRole('listitem')
    expect(rows).toHaveLength(2)
    expect(rows[0].textContent).toContain(fakeHash('new'))
    expect(rows[0].textContent).toContain('2025-06')
    expect(rows[0].textContent).toContain('(ctf)')
    expect(rows[0].textContent).toContain('Played a CTF')
    expect(rows[1].textContent).toContain('Started the track')
  })

  it('uses the current language for the text', () => {
    renderWithProviders(<Timeline items={items} />, { lang: 'es' })
    expect(screen.getByText('Jugué un CTF')).toBeTruthy()
    expect(screen.queryByText('Played a CTF')).toBeNull()
  })

  it('renders nothing when empty', () => {
    const { container } = renderWithProviders(<Timeline items={[]} />)
    expect(container.querySelector('#timeline')).toBeNull()
  })
})
