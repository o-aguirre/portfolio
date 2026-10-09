import { Children, isValidElement, useState } from 'react'
import { extractCommands, parseFenceMeta, splitPromptLines } from '../../lib/codeBlock'
import { useLanguage } from '../../i18n/useLanguage'

const textOf = (node) => {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement(node)) return textOf(node.props.children)
  return ''
}

const languageOf = (className = '') => /(?:^|\s)language-(\S+)/.exec(className)?.[1]

const PromptLines = ({ text }) => (
    <>
        {splitPromptLines(text).map((line, index) => (
            // Lines are static for the lifetime of the block; index is stable.
            <span key={index} className="block">
                {line.isCommand ? (
                    <>
                        <span className="text-ansi-green">$</span>{' '}
                        <span className="text-ansi-fg">{line.text}</span>
                    </>
                ) : (
                    // A block span with no text collapses; keep blank lines visible.
                    <span className="text-ansi-gray">{line.text || ' '}</span>
                )}
            </span>
        ))}
    </>
)

// eslint-disable-next-line no-unused-vars
const CodeBlock = ({ node, children }) => {
    const { t } = useLanguage()
    const [statusKey, setStatusKey] = useState('')

    const code = Children.toArray(children).find(isValidElement)
    const codeProps = code?.props ?? {}
    const raw = textOf(code ? codeProps.children : children)
    const title = parseFenceMeta(codeProps['data-meta']).title
        ?? languageOf(codeProps.className)
        ?? 'terminal'
    const hasPrompts = splitPromptLines(raw).some((line) => line.isCommand)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(extractCommands(raw))
            setStatusKey('code.copied')
        } catch {
            setStatusKey('code.copyFailed')
        }
    }

    return (
        <div className="bg-ansi-surface border border-ansi-raised rounded-md overflow-hidden my-5">
            <div className="flex items-center gap-2 px-4 py-2 bg-ansi-raised">
                <span className="size-3 rounded-full bg-ansi-red" aria-hidden="true" />
                <span className="size-3 rounded-full bg-ansi-amber" aria-hidden="true" />
                <span className="size-3 rounded-full bg-ansi-green" aria-hidden="true" />
                <span className="ml-2 text-sm text-ansi-gray truncate">{title}</span>
                <span className="ml-auto flex items-center gap-2 text-sm">
                    <span role="status" aria-live="polite" className="text-ansi-amber">{statusKey && t(statusKey)}</span>
                    <button
                        type="button"
                        onClick={copy}
                        aria-label={t('code.copyLabel')}
                        className="text-ansi-green hover:underline focus-visible:outline-2 focus-visible:outline-ansi-green"
                    >
                        {t('code.copy')}
                    </button>
                </span>
            </div>
            <pre className="overflow-x-auto p-4 text-sm">
                <code className={`${codeProps.className ?? ''} !bg-transparent !p-0`.trim()}>
                    {hasPrompts ? <PromptLines text={raw} /> : codeProps.children ?? children}
                </code>
            </pre>
        </div>
    )
}
export default CodeBlock
