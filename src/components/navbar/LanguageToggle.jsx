import { useLanguage } from '../../i18n/useLanguage'

const activeClass = 'text-ansi-green font-bold'

const LanguageToggle = () => {
  const { lang, setLang, t } = useLanguage()
  const target = lang === 'en' ? 'es' : 'en'

  return (
    <button
        type="button"
        onClick={() => setLang(target)}
        aria-label={t('lang.switchTo')}
        className="inline-flex items-center border border-ansi-green text-ansi-fg hover:border-ansi-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ansi-green py-1 px-4 transition-colors duration-300 cursor-pointer"
    >
        [ <span className={lang === 'en' ? activeClass : undefined}>EN</span> | <span className={lang === 'es' ? activeClass : undefined}>ES</span> ]
    </button>
  )
}
export default LanguageToggle;
