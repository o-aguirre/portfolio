// Skills tree. Each category has an id (shown as `id/`) and a list of items,
// rendered in this order. An item may carry an optional `tag`: it is matched
// (case-insensitively) against writeup tags and the number of matching
// writeups is shown next to it.
//
// To add a skill, append `{ name: 'Tool', tag: 'tool' }` to its category.
// Use a `tag` only when your writeups use that same tag.
export const skills = [
  {
    id: 'recon',
    items: [
      { name: 'nmap', tag: 'nmap' },
      { name: 'gobuster', tag: 'gobuster' },
    ],
  },
//  {
//    id: 'web',
//    items: [
//      { name: 'SQL injection', tag: 'sqli' },
//      { name: 'XSS', tag: 'xss' },
//    ],
//  },
//  {
//    id: 'privesc',
//    items: [
//      { name: 'Linux privesc', tag: 'privesc' },
//      { name: 'SUID abuse', tag: 'suid' },
//    ],
//  },
  {
    id: 'scripting',
    items: [
      { name: 'Bash' },
      { name: 'Python', tag: 'python' },
    ],
  },
  {
    id: 'foundation',
    items: [
      { name: 'JavaScript' },
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'Spring Boot' },
      { name: 'Git' },
    ],
  },
]
