import { describe, it, expect } from 'vitest'
import { encodeEmail, decodeEmail } from './obfuscate.js'

describe('obfuscate', () => {
  it('encodes to base64', () => {
    expect(encodeEmail('a@b.co')).toBe('YUBiLmNv')
  })

  it('round-trips ASCII addresses', () => {
    expect(decodeEmail(encodeEmail('user.name+tag@example.com'))).toBe('user.name+tag@example.com')
  })

  it('round-trips non-ASCII addresses', () => {
    const address = 'onésimo.ñandú@exämple.com'
    expect(decodeEmail(encodeEmail(address))).toBe(address)
  })

  it('does not contain the plain address in the encoded form', () => {
    expect(encodeEmail('user@example.com')).not.toContain('@')
  })

  it('round-trips the empty string', () => {
    expect(decodeEmail(encodeEmail(''))).toBe('')
  })
})
