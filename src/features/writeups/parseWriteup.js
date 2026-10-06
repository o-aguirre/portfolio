import fm from 'front-matter'

const REQUIRED = ['title', 'date', 'platform', 'summary']
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

const fileName = (path) => path.split('/').pop()

const normalizeDate = (value) => {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value.toISOString().slice(0, 10)
  }
  const str = String(value).trim()
  if (!DATE_RE.test(str)) return null
  const parsed = new Date(`${str}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== str) {
    return null
  }
  return str
}

export function parseWriteup(path, raw) {
  const file = fileName(path)
  const { attributes, body, frontmatter } = fm(raw)

  for (const field of REQUIRED) {
    const value = attributes[field]
    if (value === undefined || value === null || value === '') {
      throw new Error(`Writeup ${file}: missing required frontmatter field "${field}"`)
    }
  }

  // YAML rolls impossible dates (2025-02-31) over into a valid Date, so
  // validate the literal text when the value was written as a bare date.
  const rawDate = /^date:\s*(\S+)\s*$/m.exec(frontmatter)?.[1]
  const date = normalizeDate(attributes.date instanceof Date && rawDate ? rawDate : attributes.date)
  if (!date) {
    throw new Error(
      `Writeup ${file}: invalid "date" (${String(attributes.date)}), expected YYYY-MM-DD`,
    )
  }

  return {
    slug: file.replace(/\.md$/, ''),
    title: String(attributes.title),
    date,
    platform: String(attributes.platform),
    difficulty: attributes.difficulty === undefined ? undefined : String(attributes.difficulty),
    tags: Array.isArray(attributes.tags) ? attributes.tags.map(String) : [],
    summary: String(attributes.summary),
    body,
  }
}
