import { useState } from 'react'
import { contact as contactData, email as emailData } from '../../data/contact'
import { prepareContact } from '../../lib/contact'
import { encodeEmail, decodeEmail } from '../../lib/obfuscate'
import { useLanguage } from '../../i18n/useLanguage'

// Content errors must be visible without blanking the whole site.
for (const { id, message } of prepareContact(contactData).errors) {
    console.error(`Invalid contact entry "${id}" in src/data/contact.js: ${message}`)
}

const linkClass = "text-ansi-cyan hover:text-ansi-green hover:underline focus-visible:outline-2 focus-visible:outline-ansi-green break-all"

const EmailRow = ({ email }) => {
    const { t } = useLanguage()
    const [decoded, setDecoded] = useState(null)
    const [statusKey, setStatusKey] = useState('')

    const reveal = async () => {
        const address = decodeEmail(encodeEmail(email))
        setDecoded(address)
        try {
            await navigator.clipboard.writeText(address)
            setStatusKey('contact.copied')
        } catch {
            setStatusKey('contact.copyFailed')
        }
    }

    return (
        <>
            <dt className="text-ansi-cyan">email:</dt>
            <dd className="text-ansi-fg break-all">
                {decoded ? (
                    <a href={`mailto:${decoded}`} className={linkClass}>{decoded}</a>
                ) : (
                    <>
                        <span>{encodeEmail(email)}</span>{' '}
                        <button
                            type="button"
                            onClick={reveal}
                            className="text-ansi-green hover:underline focus-visible:outline-2 focus-visible:outline-ansi-green"
                        >
                            {t('contact.decode')}
                        </button>
                    </>
                )}
                <span role="status" aria-live="polite" className="ml-2 text-ansi-amber">{statusKey && t(statusKey)}</span>
            </dd>
        </>
    )
}

const Contact = ({ entries = contactData, email = emailData }) => {
    const rows = prepareContact(entries).items

    return (
        <section id="contact" className="font-mono text-ansi-fg">
            <div className="px-4 py-8 lg:py-16 mx-auto max-w-3xl">
                <h2 className="mb-6 text-2xl sm:text-3xl font-bold break-words">
                    <span className="text-ansi-green">$</span> whois mephibosheth
                </h2>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                    {email && <EmailRow email={email} />}
                    {rows.map((entry) => (
                        <div key={entry.id} className="contents">
                            <dt className="text-ansi-cyan">{entry.label}:</dt>
                            <dd className="text-ansi-fg break-all">
                                {entry.href ? (
                                    <a href={entry.href} target="_blank" rel="noreferrer" className={linkClass}>{entry.value}</a>
                                ) : (
                                    entry.value
                                )}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}
export default Contact;
