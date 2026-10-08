import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  LanguageContext,
  STORAGE_KEY,
  SUPPORTED_LANGS,
  detectInitialLang,
  translate,
} from './LanguageContext'

export const LanguageProvider = ({ children, initialLang }) => {
  const [lang, setLangState] = useState(() =>
    SUPPORTED_LANGS.includes(initialLang) ? initialLang : detectInitialLang(),
  )

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next) => {
    if (!SUPPORTED_LANGS.includes(next)) return
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be blocked; the choice then lasts for this session only.
    }
  }, [])

  const value = useMemo(
    () => ({ lang, setLang, t: (key) => translate(lang, key) }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
