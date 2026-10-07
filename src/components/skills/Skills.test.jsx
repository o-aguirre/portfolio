// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { screen, cleanup } from '@testing-library/react'
import Skills from './Skills'
import { renderWithProviders } from '../../test/renderWithProviders'

afterEach(cleanup)

const categories = [
  {
    id: 'web',
    items: [
      { name: 'SQLi', tag: 'sqli' },
      { name: 'XSS', tag: 'xss' },
      { name: 'Git' },
    ],
  },
  { id: 'foundation', items: [{ name: 'React' }] },
]
const writeups = [
  { slug: 'a', tags: ['sqli'] },
  { slug: 'b', tags: ['sqli'] },
]

const renderSkills = (opts) =>
  renderWithProviders(<Skills categories={categories} writeups={writeups} />, opts)

describe('Skills tree', () => {
  it('renders the tree command as an h2', () => {
    renderSkills()
    expect(screen.getByRole('heading', { level: 2, name: /tree skills\// })).toBeTruthy()
  })

  it('renders category names and items as real text', () => {
    renderSkills()
    expect(screen.getByText('web/')).toBeTruthy()
    expect(screen.getByText('foundation/')).toBeTruthy()
    expect(screen.getByText('SQLi')).toBeTruthy()
    expect(screen.getByText('React')).toBeTruthy()
  })

  it('shows counts only when greater than zero, with an accessible label', () => {
    renderSkills()
    expect(screen.getByLabelText('2 writeups')).toBeTruthy()
    expect(screen.queryByText('(0)')).toBeNull()
    expect(screen.getAllByText(/^\(\d+\)$/)).toHaveLength(1)
  })

  it('translates the count label', () => {
    renderSkills({ lang: 'es' })
    expect(screen.getByLabelText('2 writeups')).toBeTruthy()
    cleanup()
    renderWithProviders(
      <Skills categories={categories} writeups={[writeups[0]]} />,
      { lang: 'es' },
    )
    expect(screen.getByLabelText('1 writeup')).toBeTruthy()
  })

  it('has no images and no AOS attributes', () => {
    const { container } = renderSkills()
    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelector('[data-aos]')).toBeNull()
  })
})
