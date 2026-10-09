import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import rehypeFenceMeta from '../../lib/rehypeFenceMeta'
import { resolveImageSrc } from '../../lib/writeupImages'
import CodeBlock from './CodeBlock'

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

// Images live in public/writeups/<slug>/; blocked sources render nothing.
// eslint-disable-next-line no-unused-vars
const markdownImage = (slug) => ({ node, src, alt, title }) => {
    const resolved = resolveImageSrc(slug, src)
    if (!resolved) return null
    return (
        <figure className="my-4">
            <img
                src={resolved}
                alt={alt ?? ''}
                loading="lazy"
                className="max-w-full h-auto border border-ansi-raised rounded-md my-4"
            />
            {title && <figcaption className="text-sm text-ansi-gray">{title}</figcaption>}
        </figure>
    )
}

const Paragraph = styled('p', 'my-3 leading-relaxed')

// Markdown wraps a standalone image in a paragraph, but the image renders as
// a <figure>, which is invalid inside <p>: unwrap image-only paragraphs.
const isImageOnly = (node) =>
    node?.children?.length > 0 &&
    node.children.every(
        (child) => child.tagName === 'img' || (child.type === 'text' && child.value.trim() === ''),
    )

const MarkdownParagraph = ({ node, children, ...props }) =>
    isImageOnly(node) ? <>{children}</> : <Paragraph node={node} {...props}>{children}</Paragraph>

const markdownComponents = {
    h1: styled('h2', 'text-2xl font-bold text-ansi-green mt-8 mb-3'),
    h2: styled('h2', 'text-xl font-bold text-ansi-green mt-8 mb-3'),
    h3: styled('h3', 'text-lg font-bold text-ansi-green mt-6 mb-2'),
    h4: styled('h4', 'font-bold text-ansi-green mt-4 mb-2'),
    p: MarkdownParagraph,
    a: styled('a', 'text-ansi-cyan underline', { rel: 'noreferrer' }),
    ul: styled('ul', 'list-disc pl-6 my-3'),
    ol: styled('ol', 'list-decimal pl-6 my-3'),
    blockquote: styled('blockquote', 'border-l-4 border-ansi-amber pl-4 my-4 text-ansi-gray'),
    pre: CodeBlock,
    // Block code is rendered by CodeBlock; this is the inline style only.
    code: styled('code', 'bg-ansi-surface text-ansi-amber px-1'),
    th: styled('th', 'border border-ansi-raised px-3 py-1 text-left text-ansi-green'),
    td: styled('td', 'border border-ansi-raised px-3 py-1'),
    table: ScrollableTable,
}

const WriteupMarkdown = ({ slug, body }) => {
    // A new img component type on every render would remount every image.
    const components = useMemo(
        () => ({ ...markdownComponents, img: markdownImage(slug) }),
        [slug],
    )

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeFenceMeta, rehypeHighlight]}
            components={components}
        >
            {body}
        </ReactMarkdown>
    )
}
export default WriteupMarkdown
