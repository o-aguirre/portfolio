// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { screen, cleanup } from '@testing-library/react'
import Certs from './Certs'
import { renderWithProviders } from '../../test/renderWithProviders'

afterEach(cleanup)

const items = [
  { id: 'oscp', name: 'OSCP', issuer: 'OffSec', status: 'in-progress' },
  { id: 'ejpt', name: 'eJPT', issuer: 'INE', status: 'earned', year: 2025, url: 'https://example.com/ejpt' },
]

describe('Certs', () => {
  it('renders the ls command heading and one row per cert', () => {
    renderWithProviders(<Certs items={items} />)
    expect(screen.getByRole('heading', { level: 2, name: /ls certs\// })).toBeTruthy()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('INE')).toBeTruthy()
    expect(screen.getByText('2025')).toBeTruthy()
  })

  it('lists earned before in-progress', () => {
    renderWithProviders(<Certs items={items} />)
    const rows = screen.getAllByRole('listitem')
    expect(rows[0].textContent).toContain('eJPT')
    expect(rows[1].textContent).toContain('OSCP')
  })

  it('links the name only when a url exists, with rel=noreferrer', () => {
    renderWithProviders(<Certs items={items} />)
    const link = screen.getByRole('link', { name: 'eJPT' })
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toContain('noreferrer')
    expect(screen.queryByRole('link', { name: 'OSCP' })).toBeNull()
  })

  it('translates status badges', () => {
    renderWithProviders(<Certs items={items} />, { lang: 'en' })
    expect(screen.getByText('[earned]')).toBeTruthy()
    expect(screen.getByText('[in-progress]')).toBeTruthy()
    cleanup()
    renderWithProviders(<Certs items={items} />, { lang: 'es' })
    expect(screen.getByText('[obtenida]')).toBeTruthy()
    expect(screen.getByText('[en curso]')).toBeTruthy()
  })

  it('renders nothing when the list is empty', () => {
    const { container } = renderWithProviders(<Certs items={[]} />)
    expect(container.querySelector('#certs')).toBeNull()
  })
})
