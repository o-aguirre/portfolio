import { partitionEntries } from './contentEntries.js'

function validate(entry) {
  if (!entry.label) return 'missing label'
  if (entry.href !== undefined && !(typeof entry.href === 'string' && entry.href.startsWith('https://'))) {
    return 'href must start with https://'
  }
  return null
}

// Entries with an empty value are placeholders the owner has not filled yet:
// they are hidden silently. Invalid entries are skipped and reported in
// `errors` so bad data never blanks the page.
export function prepareContact(entries) {
  const filled = entries.filter((entry) => entry === null || typeof entry !== 'object' || entry.value !== '')
  const { items, errors } = partitionEntries(filled, (entry) => (entry.value ? validate(entry) : 'missing value'))
  return { items, errors }
}
