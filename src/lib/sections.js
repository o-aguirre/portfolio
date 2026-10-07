import { certs as certsData } from '../data/certs.js'
import { timeline as timelineData } from '../data/timeline.js'

const BASE = [
  { name: './home', target: 'home' },
  { name: './writeups', target: 'writeups' },
  { name: './skills', target: 'skills' },
]

// Single source of truth for which sections exist; `./certs` and `./log`
// only appear when their data lists are non-empty.
export function getNavItems({ certs = certsData, timeline = timelineData } = {}) {
  return [
    ...BASE,
    ...(certs.length > 0 ? [{ name: './certs', target: 'certs' }] : []),
    ...(timeline.length > 0 ? [{ name: './log', target: 'timeline' }] : []),
    { name: './contact', target: 'contact' },
  ]
}
