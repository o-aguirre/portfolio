import { partitionEntries } from './contentEntries.js'

const KINDS =['track', 'seminar', 'ctf', 'cert', 'milestone']
const DATE = /^\d{4}-(0[1-9]|1[0-2])$/

// Decorative only: a 7-char hex string derived from the entry id with a
// non-cryptographic FNV-1a hash, so every entry looks like a git commit.
export function fakeHash(id) {
  let h = 0x811c9dc5
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, '0').slice(0, 7)
}

function validate(entry) {
  if (typeof entry.date !== 'string' || !DATE.test(entry.date)) return 'date must be YYYY-MM'
  if (!KINDS.includes(entry.kind)) return `unknown kind "${entry.kind}"`
  if (!entry.text?.en || !entry.text?.es) return 'text needs both en and es'
  return null
}

// Skips invalid entries (reported in `errors` by id) so one bad entry never
// blanks the page, sorts newest first and attaches the decorative `hash`.
export function prepareTimeline(entries) {
  const { items, errors } = partitionEntries(entries, validate)
  return {
    items: items
      .map((entry) => ({ ...entry, hash: fakeHash(entry.id) }))
      .sort((a, b) => b.date.localeCompare(a.date)),
    errors,
  }
}
