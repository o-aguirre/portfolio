import { certs as certsData } from '../data/certs.js'
import { timeline as timelineData } from '../data/timeline.js'
import { prepareCerts } from './certs.js'
import { prepareTimeline } from './timeline.js'

const BASE = [
  { name: './home', target: 'home' },
  { name: './writeups', target: 'writeups' },
  { name: './skills', target: 'skills' },
]

// Single source of truth for which sections exist; `./certs` and `./log`
// only appear when they have at least one valid entry, matching when the
// sections themselves render.
export function getNavItems({ certs = certsData, timeline = timelineData } = {}) {
  const hasCerts = prepareCerts(certs).items.length > 0
  const hasTimeline = prepareTimeline(timeline).items.length > 0
  return [
    ...BASE,
    ...(hasCerts ? [{ name: './certs', target: 'certs' }] : []),
    ...(hasTimeline ? [{ name: './log', target: 'timeline' }] : []),
    { name: './contact', target: 'contact' },
  ]
}
