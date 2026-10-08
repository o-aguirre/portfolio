import { certs as certsData } from '../../data/certs'
import { prepareCerts } from '../../lib/certs'
import { useLanguage } from '../../i18n/useLanguage'

const BADGE_COLOR = { earned: 'text-ansi-green', 'in-progress': 'text-ansi-amber' }

// Content errors must be visible without blanking the whole site.
for (const { id, message } of prepareCerts(certsData).errors) {
    console.error(`Invalid cert "${id}" in src/data/certs.js: ${message}`)
}

const Certs = ({ items = certsData }) => {
    const { t } = useLanguage()
    const rows = prepareCerts(items).items
    if (rows.length === 0) return null

    return (
        <section id="certs" className="font-mono text-ansi-fg py-16">
            <div className="container mx-auto px-5">
                <h2 className="text-lg mb-6 break-words">
                    <span className="text-ansi-green">$</span> ls certs/
                </h2>
                <ul>
                    {rows.map((cert) => (
                        <li key={cert.id} className="flex flex-wrap gap-x-4 border-b border-ansi-raised py-2">
                            <span aria-hidden="true" className="text-ansi-gray">-r--r--r--</span>
                            <span className="text-ansi-gray">{cert.year}</span>
                            {cert.url ? (
                                <a
                                    href={cert.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-bold hover:text-ansi-green hover:underline break-words"
                                >
                                    {cert.name}
                                </a>
                            ) : (
                                <span className="font-bold break-words">{cert.name}</span>
                            )}
                            <span className="text-ansi-gray">{cert.issuer}</span>
                            <span className={BADGE_COLOR[cert.status]}>[{t(`certs.status.${cert.status}`)}]</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default Certs;
