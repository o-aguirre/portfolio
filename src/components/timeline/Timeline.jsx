import { timeline as timelineData } from '../../data/timeline'
import { prepareTimeline } from '../../lib/timeline'
import { useLanguage } from '../../i18n/useLanguage'

// Content errors must be visible without blanking the whole site.
for (const { id, message } of prepareTimeline(timelineData).errors) {
    console.error(`Invalid timeline entry "${id}" in src/data/timeline.js: ${message}`)
}

const Timeline = ({ items = timelineData }) => {
    const { lang } = useLanguage()
    const rows = prepareTimeline(items).items
    if (rows.length === 0) return null

    return (
        <section id="timeline" className="font-mono text-ansi-fg py-16">
            <div className="container mx-auto px-5">
                <h2 className="text-lg mb-6 break-words">
                    <span className="text-ansi-green">$</span> git log --oneline
                </h2>
                <ul>
                    {rows.map((entry) => (
                        <li key={entry.id} className="border-b border-ansi-raised py-2 break-words">
                            <span className="text-ansi-amber">{entry.hash}</span>{' '}
                            <span className="text-ansi-gray">{entry.date}</span>{' '}
                            <span className="text-ansi-cyan">({entry.kind})</span>{' '}
                            <span>{entry.text[lang] ?? entry.text.en}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default Timeline;
