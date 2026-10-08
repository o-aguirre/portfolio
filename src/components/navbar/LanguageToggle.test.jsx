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
  it('names the target language and highlights the active one', () => {
    renderToggle('en')
    const button = screen.getByRole('button', { name: 'Switch language to Español' })
    expect(button.textContent).toBe('[ EN | ES ]')
    expect(screen.getByText('EN').className).toContain('text-ansi-green')
    expect(screen.getByText('ES').className).not.toContain('text-ansi-green')
  })

  it('switches to Spanish on click and updates the accessible name', () => {
    renderToggle('en')
    fireEvent.click(screen.getByRole('button', { name: 'Switch language to Español' }))
    expect(screen.getByRole('button', { name: 'Cambiar idioma a English' })).toBeTruthy()
    expect(screen.getByText('ES').className).toContain('text-ansi-green')
    expect(document.documentElement.lang).toBe('es')
    expect(window.localStorage.getItem('lang')).toBe('es')
  })

  it('switches back to English', () => {
    renderToggle('es')
    fireEvent.click(screen.getByRole('button', { name: 'Cambiar idioma a English' }))
    expect(screen.getByRole('button', { name: 'Switch language to Español' })).toBeTruthy()
    expect(document.documentElement.lang).toBe('en')
  })
})
