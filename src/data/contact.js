// Owner content for the `whois` block. Each entry: { id, label, value, href? }.
// - Entries with an empty `value` are hidden; `href`, if present, must start
//   with https://.
// - Do NOT add your email here. Put it in plain text in the `email` export
//   below; the page shows it base64-encoded and reveals it on click.
export const contact = [
  { id: 'github', label: 'github', value: 'github.com/o-aguirre', href: 'https://github.com/o-aguirre' },
  { id: 'linkedin', label: 'linkedin', value: 'linkedin.com/in/onesimo-aguirre', href: 'https://www.linkedin.com/in/onesimo-aguirre/' },
  // { id: 'hackthebox', label: 'hackthebox', value: 'app.hackthebox.com/profile/<id>', href: 'https://app.hackthebox.com/profile/<id>' },
  // { id: 'tryhackme', label: 'tryhackme', value: 'tryhackme.com/p/<user>', href: 'https://tryhackme.com/p/<user>' },
  // { id: 'dockerlabs', label: 'dockerlabs', value: 'dockerlabs.es/<user>', href: 'https://dockerlabs.es/<user>' },
]

// Your email address in plain text (e.g. 'name@example.com'); leave empty to
// hide the email row. It is obfuscated in the rendered HTML, which is
// decorative only and not a security measure.
export const email = ''
