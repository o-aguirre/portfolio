// Primary navigation. The brand links back to the top of the page, so there
// is no `./home` item. `./about` groups skills, certs and timeline: it lands
// on skills, the first of the three, and the other two follow below it
// (each one still hides itself while it has no valid entries).
export const NAV_ITEMS = [
  { name: './writeups', target: 'writeups' },
  { name: './about', target: 'skills' },
  { name: './contact', target: 'contact' },
]
