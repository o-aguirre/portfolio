import { translate } from '../../i18n/LanguageContext'

const SEVERITY_STYLES = {
  critical: {
    border: 'border-l-ansi-red',
    badge: 'bg-ansi-red text-ansi-bg border-ansi-red',
  },
  high: {
    border: 'border-l-ansi-red',
    badge: 'text-ansi-red border-ansi-red',
  },
  medium: {
    border: 'border-l-ansi-amber',
    badge: 'text-ansi-amber border-ansi-amber',
  },
  low: {
    border: 'border-l-ansi-cyan',
    badge: 'text-ansi-cyan border-ansi-cyan',
  },
  info: {
    border: 'border-l-ansi-gray',
    badge: 'text-ansi-gray border-ansi-gray',
  },
}

const CHIP = 'text-xs border border-ansi-raised rounded px-2 py-0.5 break-words'

const Row = ({ label, children }) => (
  <div className="mt-3">
    <p className="text-xs uppercase tracking-widest text-ansi-green">{label}</p>
    <p className="text-ansi-fg break-words">{children}</p>
  </div>
)

// Labels follow the writeup's language (`lang`), not the UI language toggle.
const VulnerabilitiesSection = ({ items, lang }) => {
  if (!items || items.length === 0) return null
  const t = (key) => translate(lang, key)

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-ansi-green break-words">{t('vuln.title')}</h2>
      <p className="text-ansi-gray mt-1 mb-4">{t('vuln.intro')}</p>
      <div className="flex flex-col gap-4">
        {items.map((item, i) => {
          const style = SEVERITY_STYLES[item.severity]
          return (
            <article
              key={`${item.severity}:${item.title}:${i}`}
              className={`bg-ansi-surface border border-ansi-raised border-l-4 ${style.border} rounded-md p-5`}
            >
              <span
                className={`inline-block text-xs uppercase tracking-widest font-bold border rounded px-2 py-0.5 ${style.badge}`}
              >
                {t(`vuln.severity.${item.severity}`)}
              </span>
              <h3 className="text-lg font-bold text-ansi-fg mt-2 break-words">{item.title}</h3>
              {(item.cwe || item.owasp) && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.cwe && (
                    <a
                      href={item.cweUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`${CHIP} text-ansi-cyan hover:text-ansi-green`}
                    >
                      {`CWE-${item.cwe}`}
                    </a>
                  )}
                  {item.owasp && <span className={`${CHIP} text-ansi-gray`}>{item.owasp}</span>}
                </div>
              )}
              <Row label={t('vuln.impact')}>{item.impact}</Row>
              <Row label={t('vuln.mitigation')}>{item.mitigation}</Row>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default VulnerabilitiesSection
