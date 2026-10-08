import { createContext } from 'react'
import en from './en'
import es from './es'

export const dictionaries = { en, es }
export const SUPPORTED_LANGS = Object.keys(dictionaries)
export const STORAGE_KEY = 'lang'

export const LanguageContext = createContext(null)

export const translate = (lang, key) =>
  dictionaries[lang]?.[key] ?? dictionaries.en[key] ?? key

export const readStoredLang = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return SUPPORTED_LANGS.includes(stored) ? stored : null
  } catch {
    return null
  }
}

export const detectInitialLang = () => {
  const stored = readStoredLang()
  if (stored) return stored
  const navigatorLang = typeof navigator === 'undefined' ? '' : navigator.language ?? ''
  return navigatorLang.toLowerCase().startsWith('es') ? 'es' : 'en'
}
