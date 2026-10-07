// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import Fastfetch from './Fastfetch'
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
