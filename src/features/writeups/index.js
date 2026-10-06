import { createWriteupRepository } from './writeups.js'

const modules = import.meta.glob('/src/content/writeups/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const writeups = createWriteupRepository(modules)
