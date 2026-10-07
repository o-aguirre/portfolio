import { parseWriteup } from './parseWriteup.js'

export function createWriteupRepository(modules) {
  const all = Object.entries(modules)
    .map(([path, raw]) => parseWriteup(path, raw))
    .sort((a, b) => b.date.localeCompare(a.date))
  const bySlug = new Map(all.map((w) => [w.slug, w]))

  return {
    list: () => [...all],
    get: (slug) => bySlug.get(slug),
  }
}
