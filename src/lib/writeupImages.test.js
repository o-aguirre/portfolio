import { describe, it, expect } from 'vitest'
import { resolveImageSrc } from './writeupImages'

const BASE = '/portfolio/'
const resolve = (src) => resolveImageSrc('demo', src, BASE)

describe('resolveImageSrc', () => {
  it('resolves relative paths under writeups/<slug>', () => {
    expect(resolve('nmap.png')).toBe('/portfolio/writeups/demo/nmap.png')
    expect(resolve('./img/a.png')).toBe('/portfolio/writeups/demo/img/a.png')
  })

  it('keeps absolute https URLs unchanged', () => {
    expect(resolve('https://example.com/a.png')).toBe('https://example.com/a.png')
  })

  it('maps root-absolute paths onto the base without doubling slashes', () => {
    expect(resolve('/x.png')).toBe('/portfolio/x.png')
    expect(resolveImageSrc('demo', '/x.png', '/')).toBe('/x.png')
  })

  it('rejects anything else', () => {
    for (const src of [
      'http://example.com/a.png',
      'javascript:alert(1)',
      'data:image/png;base64,AAAA',
      '//evil.example/a.png',
      '../secret.png',
      'img/../../secret.png',
      '/../secret.png',
      '',
      '   ',
      undefined,
      null,
      42,
    ]) {
      expect(resolve(src)).toBeNull()
    }
  })

  it('rejects backslash tricks and control characters', () => {
    expect(resolve('..\\secret.png')).toBeNull()
    expect(resolve('\\\\host\\a.png')).toBeNull()
    expect(resolve('a\n.png')).toBeNull()
  })
})
