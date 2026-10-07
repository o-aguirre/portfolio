// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Fastfetch from './Fastfetch'
import Hero from './Hero'
import { profile } from '../../data/profile'

afterEach(cleanup)

describe('Fastfetch', () => {
  it('renders every profile field as a dt/dd pair', () => {
    const { container } = render(<Fastfetch />)
    const dts = container.querySelectorAll('dt')
    const dds = container.querySelectorAll('dd')
    expect(dts).toHaveLength(profile.fields.length)
    expect(dds).toHaveLength(profile.fields.length)
    profile.fields.forEach((f, i) => {
      expect(dts[i].textContent).toContain(f.key)
      expect(dds[i].textContent).toBe(f.value)
    })
  })

  it('renders the user@host header as real text', () => {
    render(<Fastfetch />)
    expect(screen.getByText(profile.user)).toBeTruthy()
    expect(screen.getByText(profile.host)).toBeTruthy()
  })

  it('does not render a hexdump logo', () => {
    const { container } = render(<Fastfetch />)
    expect(container.querySelector('pre')).toBeNull()
  })
})

describe('Hero', () => {
  it('no longer renders a profile image', () => {
    const { container } = render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    )
    expect(container.querySelectorAll('img')).toHaveLength(0)
  })

  it('renders the about text as separate paragraphs', () => {
    const { container } = render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    )
    const prompt = [...container.querySelectorAll('p')].find((p) =>
      p.textContent.includes('cat about.txt'),
    )
    const paragraphs = prompt.nextElementSibling.querySelectorAll('p')
    expect(paragraphs.length).toBeGreaterThan(0)
  })

  it('separates command blocks with spacing instead of line breaks', () => {
    const { container } = render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    )
    const body = container.querySelector('[data-testid="terminal-body"]')
    expect(body.className).toContain('space-y-8')
    expect(body.querySelectorAll('br')).toHaveLength(0)
  })

  it('does not render the xxd block until the owner picks new art', () => {
    const { container } = render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    )
    expect(container.textContent).not.toContain('xxd')
    expect(container.querySelector('pre')).toBeNull()
  })

  it('runs fastfetch', () => {
    const { container } = render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    )
    const prompts = [...container.querySelectorAll('p')].map((p) => p.textContent)
    expect(prompts.some((t) => t.includes('$ fastfetch'))).toBe(true)
  })
})
