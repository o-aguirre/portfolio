import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import { writeups } from './index.js'

// react-markdown passes `node` to every component; strip it before the DOM.
// eslint-disable-next-line no-unused-vars
const styled = (Tag, base, extra = {}) => ({ node, className, ...props }) => (
    <Tag className={className ?? base} {...extra} {...props} />
)

// eslint-disable-next-line no-unused-vars
const ScrollableTable = ({ node, ...props }) => (
    <div className="overflow-x-auto my-4">
        <table className="border border-ansi-raised border-collapse" {...props} />
    </div>
)

const markdownComponents = {
    h1: styled('h2', 'text-2xl font-bold text-ansi-green mt-8 mb-3'),
    h2: styled('h2', 'text-xl font-bold text-ansi-green mt-8 mb-3'),
    h3: styled('h3', 'text-lg font-bold text-ansi-green mt-6 mb-2'),
    h4: styled('h4', 'font-bold text-ansi-green mt-4 mb-2'),
    p: styled('p', 'my-3 leading-relaxed'),
    a: styled('a', 'text-ansi-cyan underline', { rel: 'noreferrer' }),
    ul: styled('ul', 'list-disc pl-6 my-3'),
    ol: styled('ol', 'list-decimal pl-6 my-3'),
    blockquote: styled('blockquote', 'border-l-4 border-ansi-amber pl-4 my-4 text-ansi-gray'),
    pre: styled('pre', 'bg-ansi-surface border border-ansi-raised p-4 my-4 overflow-x-auto'),
    code: styled('code', 'bg-ansi-surface text-ansi-amber px-1'),
    th: styled('th', 'border border-ansi-raised px-3 py-1 text-left text-ansi-green'),
    td: styled('td', 'border border-ansi-raised px-3 py-1'),
    table: ScrollableTable,
}

const BackLink = () => (
    <Link to="/" state={{ scrollTo: 'writeups' }} className="text-ansi-cyan hover:text-ansi-green">
        cd ..
    </Link>
)

const WriteupPage = () => {
    const { slug } = useParams()
    const writeup = writeups.get(slug)

    useEffect(() => {
        if (writeup) document.title = writeup.title
    }, [writeup])

    if (!writeup) {
        return (
            <div className="font-mono p-5 container mx-auto">
                <p className="text-ansi-red mb-4">cat: {slug}.md: No such file or directory</p>
                <BackLink />
            </div>
        )
    }

    return (
        <article className="font-mono text-ansi-fg p-5 container mx-auto max-w-4xl">
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
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={markdownComponents}
            >
                {writeup.body}
            </ReactMarkdown>
            <div className="mt-10">
                <BackLink />
            </div>
        </article>
    )
}
export default WriteupPage;
