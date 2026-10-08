const STATUSES = ['earned', 'in-progress']

// Validates every entry (throws naming the entry id) and lists earned
// certifications first; relative order is otherwise preserved.
export function prepareCerts(certs) {
  for (const cert of certs) {
    if (!cert.name) throw new Error(`Invalid cert "${cert.id}": missing name`)
    if (!cert.status) throw new Error(`Invalid cert "${cert.id}": missing status`)
    if (!STATUSES.includes(cert.status)) {
      throw new Error(`Invalid cert "${cert.id}": unknown status "${cert.status}"`)
    }
  }
  const rank = (cert) => STATUSES.indexOf(cert.status)
  return [...certs].sort((a, b) => rank(a) - rank(b))
}
