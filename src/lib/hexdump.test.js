import { describe, it, expect } from 'vitest'
import { toHexdump } from './hexdump.js'

describe('toHexdump', () => {
  it('formats text like xxd with an aligned ASCII column', () => {
    expect(toHexdump('hello, friend.')).toEqual([
      '00000000  68 65 6c 6c 6f 2c 20 66  |hello, f|',
      '00000008  72 69 65 6e 64 2e        |riend.  |',
    ])
  })

  it('renders multibyte characters as UTF-8 bytes and dots', () => {
    expect(toHexdump('é')).toEqual(['00000000  c3 a9                    |..      |'])
  })

  it('returns no lines for an empty string', () => {
    expect(toHexdump('')).toEqual([])
  })

  it('honours a custom bytesPerLine', () => {
    expect(toHexdump('abcd', 2)).toEqual([
      '00000000  61 62  |ab|',
      '00000002  63 64  |cd|',
    ])
  })
})
