// Splits owner-provided entries into valid items and reported errors.
// Every entry must be an object with a unique, non-empty string id (used as
// the React key); `validate` adds the content-specific checks and returns an
// error message or null. Never throws, so bad data cannot blank the page.
export function partitionEntries(entries, validate) {
  const items = []
  const errors = []
  const seen = new Set()
  for (const entry of entries) {
    const id = entry?.id
    let message = null
    if (typeof entry !== 'object' || entry === null) message = 'entry must be an object'
    else if (typeof id !== 'string' || id === '') message = 'missing id'
    else if (seen.has(id)) message = 'duplicate id'
    else message = validate(entry)

    if (message) {
      errors.push({ id: typeof id === 'string' && id !== '' ? id : '(no id)', message })
    } else {
      seen.add(id)
      items.push(entry)
    }
  }
  return { items, errors }
}
