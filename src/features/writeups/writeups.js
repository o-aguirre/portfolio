import { parseWriteup } from './parseWriteup.js'

export function createWriteupRepository(modules) {
  const parsed = []
  const errors = []

  for (const [path, raw] of Object.entries(modules)) {
    try {
      parsed.push(parseWriteup(path, raw))
    } catch (error) {
      errors.push({ path, message: error.message })
    }
  }

  const all = parsed.sort((a, b) => b.date.localeCompare(a.date))
  const bySlug = new Map(all.map((w) => [w.slug, w]))

  return {
    list: () => [...all],
    get: (slug) => bySlug.get(slug),
    errors,
  }
}
