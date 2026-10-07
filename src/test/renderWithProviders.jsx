import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '../i18n/LanguageProvider'

export const renderWithProviders = (ui, { lang = 'en', route = '/' } = {}) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <LanguageProvider initialLang={lang}>{ui}</LanguageProvider>
    </MemoryRouter>,
  )
