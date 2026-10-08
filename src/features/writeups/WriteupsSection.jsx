import { Link } from 'react-router-dom'
import { writeups } from './index.js'
import { useLanguage } from '../../i18n/useLanguage'

const WriteupsSection = () => {
    const items = writeups.list()
    const { t } = useLanguage()

    return (
        <section id="writeups" className="font-mono text-ansi-fg py-16">
            <div className="container mx-auto px-5">
                <h2 className="text-lg mb-6">
                    <span className="text-ansi-green">onesimo@portfolio:~$</span> ls -la writeups/
                </h2>
                <p className="text-ansi-gray mb-4">total {items.length}</p>
                {items.length === 0 && <p className="text-ansi-gray">{t('writeups.empty')}</p>}
                <ul>
                    {items.map((item) => (
                        <li key={item.slug} className="group border-b border-ansi-raised py-4 hover:bg-ansi-surface transition-colors">
                            <div className="flex flex-col gap-1 md:flex-row md:gap-4 md:items-baseline">
                                <span className="text-ansi-amber">{item.date}</span>
                                <span className="text-ansi-amber">[{item.lang.toUpperCase()}]</span>
                                <span className="text-ansi-gray">{item.platform}</span>
                                <span className="text-ansi-gray">{item.difficulty}</span>
                                <Link
                                    to={`/writeups/${item.slug}`}
                                    className="text-ansi-fg font-bold group-hover:text-ansi-green hover:underline break-words"
                                >
                                    {item.title}
                                </Link>
                            </div>
                            <p className="text-ansi-gray mt-1">{item.summary}</p>
                            <p className="mt-1 flex flex-wrap gap-x-3">
                                {item.tags.map((tag) => (
                                    <span key={tag} className="text-ansi-cyan">#{tag}</span>
                                ))}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default WriteupsSection;
