import { useLanguage } from '../../i18n/useLanguage'

// Language names stay in their own language so they read correctly in either UI.
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
]

const baseClass = 'cursor-pointer transition-colors duration-300 hover:text-ansi-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ansi-green'

const LanguageToggle = () => {
  const { lang, setLang, t } = useLanguage()

  return (
    <div role="group" aria-label={t('lang.label')} className="flex items-center gap-1 text-sm">
      {languages.map(({ code, name }, index) => (
        <span key={code} className="flex items-center gap-1">
          {index > 0 && <span aria-hidden="true" className="text-ansi-raised">/</span>}
          <button
            type="button"
            lang={code}
            aria-label={name}
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
            className={`${baseClass} ${lang === code ? 'text-ansi-green font-bold' : 'text-ansi-gray'}`}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  )
}
export default LanguageToggle;
