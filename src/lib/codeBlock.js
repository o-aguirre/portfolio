const PROMPT = '$ '
const TITLE = /(?:^|\s)title=(?:"([^"]*)"|'([^']*)')/

const trimOneNewline = (text) => (text.endsWith('\n') ? text.slice(0, -1) : text)

// Reads `title="..."` (or single quotes) from a fenced-code meta string.
export const parseFenceMeta = (meta) => {
  if (typeof meta !== 'string') return {}
  const match = TITLE.exec(meta)
  const title = match ? (match[1] ?? match[2]).trim() : ''
  return title ? { title } : {}
}

// Lines starting with `$ ` are commands. `#` is never a prompt: it is
// ambiguous with comments.
export const splitPromptLines = (text) => {
  if (typeof text !== 'string' || text === '') return []
  return trimOneNewline(text)
    .split('\n')
    .map((line) =>
      line.startsWith(PROMPT)
        ? { text: line.slice(PROMPT.length), isCommand: true }
        : { text: line, isCommand: false },
    )
}

// What the copy button puts on the clipboard.
export const extractCommands = (text) => {
  if (typeof text !== 'string') return ''
  const commands = splitPromptLines(text).filter((line) => line.isCommand)
  if (commands.length > 0) return commands.map((line) => line.text).join('\n')
  return trimOneNewline(text)
}
