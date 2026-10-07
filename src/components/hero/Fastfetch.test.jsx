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

  it('renders the about text as three paragraphs', () => {
    const { container } = render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    )
    const prompt = [...container.querySelectorAll('p')].find((p) =>
      p.textContent.includes('cat about.txt'),
    )
    const paragraphs = prompt.nextElementSibling.querySelectorAll('p')
    expect(paragraphs).toHaveLength(3)
  })

  it('runs the hello-friend hexdump as its own xxd command, hidden on mobile', () => {
    const { container } = render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    )
    const prompt = [...container.querySelectorAll('p')].find((p) =>
      p.textContent.includes('xxd hello.txt'),
    )
    const wrapper = prompt.parentElement
    expect(wrapper.className).toContain('hidden')
    expect(wrapper.className).toContain('md:block')
    const pre = wrapper.querySelector('pre')
    expect(pre.getAttribute('aria-hidden')).toBe('true')
    expect(pre.textContent).toContain('68 65 6c 6c 6f')
  })

  it('runs fastfetch without a logo', () => {
    const { container } = render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    )
    const prompts = [...container.querySelectorAll('p')].map((p) => p.textContent)
    expect(prompts.some((t) => t.includes('fastfetch --logo none'))).toBe(true)
  })
})
