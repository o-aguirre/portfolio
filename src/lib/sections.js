import { certs as certsData } from '../data/certs.js'

const BASE = [
  { name: './home', target: 'home' },
  { name: './writeups', target: 'writeups' },
  { name: './skills', target: 'skills' },
]

// Single source of truth for which sections exist; `./certs` and `./log`
// only appear when their data lists are non-empty.
export function getNavItems({ certs = certsData, timeline = [] } = {}) {
  return [
    ...BASE,
    ...(certs.length > 0 ? [{ name: './certs', target: 'certs' }] : []),
    ...(timeline.length > 0 ? [{ name: './log', target: 'log' }] : []),
    { name: './contact', target: 'contact' },
  ]
}
