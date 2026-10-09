import { createWriteupRepository } from './writeups.js'

const modules = import.meta.glob('/src/content/writeups/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const writeups = createWriteupRepository(modules)

// Content errors must be visible without blanking the whole site.
for (const { path, message, kind } of writeups.errors) {
  console.error(kind === 'vulnerability' ? message : `Invalid writeup ${path}: ${message}`)
}
