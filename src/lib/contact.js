import { partitionEntries, isText, isOptionalHttpsUrl } from './contentEntries.js'

function validate(entry) {
  if (!isText(entry.label)) return 'label must be text'
  if (!isText(entry.value)) return 'value must be text'
  if (!isOptionalHttpsUrl(entry.href)) return 'href must start with https://'
  return null
}

const isPlaceholder = (entry) =>
  entry !== null && typeof entry === 'object' && typeof entry.value === 'string' && entry.value.trim() === ''

// Entries with an empty (or whitespace-only) value are placeholders the owner
// has not filled yet: they are hidden silently. Invalid entries are skipped
// and reported in `errors` so bad data never blanks the page.
export function prepareContact(entries) {
  return partitionEntries(entries.filter((entry) => !isPlaceholder(entry)), validate)
}
