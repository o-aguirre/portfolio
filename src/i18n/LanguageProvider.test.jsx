// @vitest-environment jsdom
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { LanguageProvider } from './LanguageProvider'
import { useLanguage } from './useLanguage'
import en from './en'
import es from './es'

const Probe = () => {
  const { lang, setLang, t } = useLanguage()
  return (
    <div>
      <p data-testid="lang">{lang}</p>
      <p data-testid="text">{t('nav.contact')}</p>
      <p data-testid="missing">{t('does.not.exist')}</p>
      <button onClick={() => setLang('es')}>to-es</button>
    </div>
  )
}

const renderProbe = () =>
  render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>,
  )

const setNavigatorLanguage = (value) => {
  vi.spyOn(window.navigator, 'language', 'get').mockReturnValue(value)
}

beforeEach(() => {
  window.localStorage.clear()
  document.documentElement.lang = ''
  setNavigatorLanguage('en-US')
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('LanguageProvider initial language', () => {
  it('defaults to en', () => {
    renderProbe()
    expect(screen.getByTestId('lang').textContent).toBe('en')
  })

  it('uses es when navigator.language starts with es', () => {
    setNavigatorLanguage('es-CL')
    renderProbe()
    expect(screen.getByTestId('lang').textContent).toBe('es')
  })

  it('prefers a valid stored language over the navigator', () => {
    window.localStorage.setItem('lang', 'en')
    setNavigatorLanguage('es-CL')
    renderProbe()
    expect(screen.getByTestId('lang').textContent).toBe('en')
  })

  it('ignores an invalid stored language', () => {
    window.localStorage.setItem('lang', 'fr')
    renderProbe()
    expect(screen.getByTestId('lang').textContent).toBe('en')
  })

  it('does not crash when localStorage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    renderProbe()
    fireEvent.click(screen.getByText('to-es'))
    expect(screen.getByTestId('lang').textContent).toBe('es')
  })
})

describe('LanguageProvider behavior', () => {
  it('syncs html lang on mount', () => {
    renderProbe()
    expect(document.documentElement.lang).toBe('en')
  })

  it('switches text, html lang and localStorage on setLang', () => {
    renderProbe()
    expect(screen.getByTestId('text').textContent).toBe(en['nav.contact'])
    fireEvent.click(screen.getByText('to-es'))
    expect(screen.getByTestId('text').textContent).toBe(es['nav.contact'])
    expect(document.documentElement.lang).toBe('es')
    expect(window.localStorage.getItem('lang')).toBe('es')
  })

  it('falls back to the key when it is missing in every dictionary', () => {
    renderProbe()
    expect(screen.getByTestId('missing').textContent).toBe('does.not.exist')
  })
})

describe('dictionaries', () => {
  it('have identical key sets', () => {
    expect(Object.keys(es).sort()).toEqual(Object.keys(en).sort())
  })

  it('have no empty values', () => {
    for (const dict of [en, es]) {
      for (const [key, value] of Object.entries(dict)) {
        expect(value, key).not.toBe('')
      }
    }
  })
})
