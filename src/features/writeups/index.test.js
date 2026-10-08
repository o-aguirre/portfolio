import { describe, expect, it } from 'vitest'
import { writeups } from './index.js'

describe('writeups (real content)', () => {
  it('loads the sample writeup from src/content/writeups', () => {
    const sample = writeups.get('htb-example-machine')
    expect(sample).toBeDefined()
    expect(sample.platform).toBe('HackTheBox')
    expect(sample.lang).toBe('en')
    expect(sample.body).toContain('Recon')
    expect(writeups.list().length).toBeGreaterThan(0)
  })

  it('has no invalid content files', () => {
    expect(writeups.errors).toEqual([])
  })
})
