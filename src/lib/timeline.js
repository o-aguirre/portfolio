const KINDS = ['track', 'seminar', 'ctf', 'cert', 'milestone']
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

// Validates entries (throws naming the entry id), sorts newest first and
// attaches the decorative `hash`.
export function prepareTimeline(entries) {
  for (const entry of entries) {
    const fail = (reason) => {
      throw new Error(`Invalid timeline entry "${entry.id}": ${reason}`)
    }
    if (typeof entry.date !== 'string' || !DATE.test(entry.date)) fail('date must be YYYY-MM')
    if (!KINDS.includes(entry.kind)) fail(`unknown kind "${entry.kind}"`)
    if (!entry.text?.en || !entry.text?.es) fail('text needs both en and es')
  }
  return entries
    .map((entry) => ({ ...entry, hash: fakeHash(entry.id) }))
    .sort((a, b) => b.date.localeCompare(a.date))
}
