import { vi } from 'vitest'

// Tests run against fixture writeups, never the owner's real content.
// Real-content validation lives in src/features/writeups/index.test.js,
// which unmocks this module.
vi.mock('/src/features/writeups/index.js', async () => {
  const { createWriteupRepository } = await import('/src/features/writeups/writeups.js')
  const modules = import.meta.glob('/src/test/fixtures/writeups/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  })
  return { writeups: createWriteupRepository(modules) }
})
