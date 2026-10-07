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
  const items = []
  const errors = []
  for (const cert of certs) {
    const message = validate(cert)
    if (message) errors.push({ id: cert.id, message })
    else items.push(cert)
  }
  const rank = (cert) => STATUSES.indexOf(cert.status)
  return { items: items.sort((a, b) => rank(a) - rank(b)), errors }
}
