// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import Hero from './Hero'
import { renderWithProviders } from '../../test/renderWithProviders'

afterEach(cleanup)

describe('Hero', () => {
  it('no longer renders a profile image', () => {
    const { container } = renderWithProviders(<Hero />)
    expect(container.querySelectorAll('img')).toHaveLength(0)
  })

  it('renders the about text as separate paragraphs', () => {
    const { container } = renderWithProviders(<Hero />)
    const prompt = [...container.querySelectorAll('p')].find((p) =>
      p.textContent.includes('cat about.txt'),
    )
    const paragraphs = prompt.nextElementSibling.querySelectorAll('p')
    expect(paragraphs.length).toBeGreaterThan(0)
  })

  it('separates command blocks with spacing instead of line breaks', () => {
    const { container } = renderWithProviders(<Hero />)
    const body = container.querySelector('[data-testid="terminal-body"]')
    expect(body.className).toContain('space-y-8')
    expect(body.querySelectorAll('br')).toHaveLength(0)
  })

  it('does not render the xxd block until the owner picks new art', () => {
    const { container } = renderWithProviders(<Hero />)
    expect(container.textContent).not.toContain('xxd')
    expect(container.querySelector('pre')).toBeNull()
  })

  it('runs fastfetch', () => {
    const { container } = renderWithProviders(<Hero />)
    const prompts = [...container.querySelectorAll('p')].map((p) => p.textContent)
    expect(prompts.some((t) => t.includes('$ fastfetch'))).toBe(true)
  })
})
