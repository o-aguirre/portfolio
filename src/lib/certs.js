import { partitionEntries } from './contentEntries.js'

const STATUSES = ['earned', 'in-progress']

function validate(cert) {
  if (!cert.name) return 'missing name'
  if (!cert.status) return 'missing status'
  if (!STATUSES.includes(cert.status)) return `unknown status "${cert.status}"`
  return null
}

// Skips invalid entries (reported in `errors` by id) so one bad entry never
// blanks the page, and lists earned certifications first; relative order is
// otherwise preserved.
export function prepareCerts(certs) {
  const { items, errors } = partitionEntries(certs, validate)
  const rank = (cert) => STATUSES.indexOf(cert.status)
  return { items: items.sort((a, b) => rank(a) - rank(b)), errors }
}
