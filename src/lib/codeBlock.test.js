import { describe, it, expect } from 'vitest'
import { parseFenceMeta, splitPromptLines, extractCommands } from './codeBlock'

describe('parseFenceMeta', () => {
  it('reads a double-quoted title', () => {
    expect(parseFenceMeta('title="nmap scan"')).toEqual({ title: 'nmap scan' })
  })

  it('reads a single-quoted title among other tokens', () => {
    expect(parseFenceMeta("foo title='x' bar")).toEqual({ title: 'x' })
  })

  it('returns an empty object for empty, unknown or invalid meta', () => {
    expect(parseFenceMeta('')).toEqual({})
    expect(parseFenceMeta(undefined)).toEqual({})
    expect(parseFenceMeta(null)).toEqual({})
    expect(parseFenceMeta(42)).toEqual({})
    expect(parseFenceMeta('foo bar')).toEqual({})
    expect(parseFenceMeta('title="unterminated')).toEqual({})
    expect(parseFenceMeta('title=""')).toEqual({})
  })
})

describe('splitPromptLines', () => {
  it('flags only "$ " lines as commands', () => {
    expect(splitPromptLines('$ ls -la\ntotal 0\n# comment\n$whoami')).toEqual([
      { text: 'ls -la', isCommand: true },
      { text: 'total 0', isCommand: false },
      { text: '# comment', isCommand: false },
      { text: '$whoami', isCommand: false },
    ])
  })

  it('ignores one trailing newline and tolerates empty input', () => {
    expect(splitPromptLines('$ id\n')).toEqual([{ text: 'id', isCommand: true }])
    expect(splitPromptLines('')).toEqual([])
    expect(splitPromptLines(undefined)).toEqual([])
  })
})

describe('extractCommands', () => {
  it('returns only the commands, without the prompt, when prompts exist', () => {
    expect(extractCommands('$ nmap -sV host\nPORT STATE\n$ id')).toBe('nmap -sV host\nid')
  })

  it('returns the whole text minus one trailing newline otherwise', () => {
    expect(extractCommands('echo hi\nout\n')).toBe('echo hi\nout')
    expect(extractCommands('a\n\n')).toBe('a\n')
  })

  it('tolerates empty input', () => {
    expect(extractCommands('')).toBe('')
    expect(extractCommands(undefined)).toBe('')
  })
})
