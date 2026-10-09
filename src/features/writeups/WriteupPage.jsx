import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { writeups } from './index.js'
import WriteupMarkdown from './WriteupMarkdown.jsx'
import { useLanguage } from '../../i18n/useLanguage'

const BackLink = () => (
    <Link to="/" state={{ scrollTo: 'writeups' }} className="text-ansi-cyan hover:text-ansi-green">
        cd ..
    </Link>
)

const WriteupPage = () => {
    const { slug } = useParams()
    const { t } = useLanguage()
    const writeup = writeups.get(slug)

    useEffect(() => {
        if (!writeup) return undefined
        const previousTitle = document.title
        document.title = writeup.title
        return () => {
            document.title = previousTitle
        }
    }, [writeup])

    if (!writeup) {
        return (
            <div className="font-mono p-5 container mx-auto">
                <p className="text-ansi-red mb-4">{t('writeup.notFound').replace('{slug}', () => slug)}</p>
                <BackLink />
            </div>
        )
    }

    return (
        <article lang={writeup.lang} className="font-mono text-ansi-fg p-5 container mx-auto max-w-4xl">
            <p className="mb-4">
                <span className="text-ansi-green">onesimo@portfolio:~$</span> cat writeups/{writeup.slug}.md
            </p>
            <h1 className="text-3xl font-bold text-ansi-green break-words">{writeup.title}</h1>
            <p className="text-ansi-gray my-2">
                {writeup.date} · {writeup.platform} · {writeup.difficulty}
            </p>
            <p className="flex flex-wrap gap-x-3 mb-6">
                {writeup.tags.map((tag) => (
                    <span key={tag} className="text-ansi-cyan">#{tag}</span>
                ))}
            </p>
            <WriteupMarkdown slug={writeup.slug} body={writeup.body} />
            <div className="mt-10">
                <BackLink />
            </div>
        </article>
    )
}
export default WriteupPage;
