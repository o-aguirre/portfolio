import { isText } from '../../lib/contentEntries.js'

export const SEVERITIES = ['critical', 'high', 'medium', 'low', 'info']

const CWE_RE = /^(?:cwe-)?(\d+)$/i

// Accepts 250, "250" or "CWE-250" and returns a positive integer, or null.
const normalizeCwe = (value) => {
  if (typeof value === 'number') {
    return Number.isInteger(value) && value > 0 ? value : null
  }
  if (typeof value !== 'string') return null
  const match = CWE_RE.exec(value.trim())
  const n = match ? Number(match[1]) : 0
  return Number.isSafeInteger(n) && n > 0 ? n : null
}

// Returns the cleaned finding or an error message. Never throws.
const validate = (entry) => {
  if (typeof entry !== 'object' || entry === null || Array.isArray(entry)) {
    return { message: 'entry must be an object' }
  }
  const title = isText(entry.title) ? entry.title : null
  const fail = (message) => ({ message, title })

  if (!SEVERITIES.includes(entry.severity)) {
    return fail(`"severity" must be one of ${SEVERITIES.join(', ')}`)
  }
  if (!title) return fail('missing "title"')
  if (!isText(entry.impact)) return fail('missing "impact"')
  if (!isText(entry.mitigation)) return fail('missing "mitigation"')
  if (entry.owasp !== undefined && !isText(entry.owasp)) {
    return fail('"owasp" must be non-empty text')
  }

  const item = {
    severity: entry.severity,
    title,
    impact: entry.impact,
    mitigation: entry.mitigation,
  }
  if (entry.owasp !== undefined) item.owasp = entry.owasp
  if (entry.cwe !== undefined) {
    const cwe = normalizeCwe(entry.cwe)
    if (cwe === null) return fail('"cwe" must be a positive integer (e.g. 250 or CWE-250)')
    item.cwe = cwe
    item.cweUrl = `https://cwe.mitre.org/data/definitions/${cwe}.html`
  }
  return { item }
}

// Validates the optional `vulnerabilities` frontmatter list. Invalid entries
// are skipped and reported (1-based index) so one bad finding never hides the
// writeup. Valid items are sorted critical -> info, stable within a severity.
export function prepareVulnerabilities(list) {
  if (!Array.isArray(list)) return { items: [], errors: [] }

  const items = []
  const errors = []
  list.forEach((entry, i) => {
    const { item, message, title } = validate(entry)
    if (item) items.push(item)
    else {
      errors.push({ index: i + 1, message: title ? `"${title}": ${message}` : message })
    }
  })

  items.sort((a, b) => SEVERITIES.indexOf(a.severity) - SEVERITIES.indexOf(b.severity))
  return { items, errors }
}
