// @vitest-environment jsdom
import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { LanguageProvider } from '../../i18n/LanguageProvider'
import LanguageToggle from './LanguageToggle'

beforeEach(() => window.localStorage.clear())
afterEach(cleanup)

const renderToggle = (initialLang) =>
  render(
    <LanguageProvider initialLang={initialLang}>
      <LanguageToggle />
    </LanguageProvider>,
  )

describe('LanguageToggle', () => {
  it('renders one plain-text button per language inside a labelled group', () => {
    renderToggle('en')
    expect(screen.getByRole('group', { name: 'Language' })).toBeTruthy()
    const en = screen.getByRole('button', { name: 'English' })
    const es = screen.getByRole('button', { name: 'Español' })
    expect(en.textContent).toBe('en')
    expect(es.textContent).toBe('es')
    expect(en.className).not.toContain('border')
  })

  it('marks the active language as pressed and highlighted', () => {
    renderToggle('en')
    const en = screen.getByRole('button', { name: 'English' })
    const es = screen.getByRole('button', { name: 'Español' })
    expect(en.getAttribute('aria-pressed')).toBe('true')
    expect(en.className).toContain('text-ansi-green')
    expect(es.getAttribute('aria-pressed')).toBe('false')
    expect(es.className).toContain('text-ansi-gray')
  })

  it('switches to Spanish when es is clicked', () => {
    renderToggle('en')
    fireEvent.click(screen.getByRole('button', { name: 'Español' }))
    expect(screen.getByRole('group', { name: 'Idioma' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Español' }).getAttribute('aria-pressed')).toBe('true')
    expect(document.documentElement.lang).toBe('es')
    expect(window.localStorage.getItem('lang')).toBe('es')
  })

  it('switches back to English when en is clicked', () => {
    renderToggle('es')
    fireEvent.click(screen.getByRole('button', { name: 'English' }))
    expect(screen.getByRole('button', { name: 'English' }).getAttribute('aria-pressed')).toBe('true')
    expect(document.documentElement.lang).toBe('en')
  })
})
