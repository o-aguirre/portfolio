// @vitest-environment jsdom
import { useState } from 'react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { screen, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../test/renderWithProviders'
import WriteupMarkdown from './WriteupMarkdown'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

const fence = (info, body) => `\`\`\`${info}\n${body}\n\`\`\``
const render = (body, options) =>
  renderWithProviders(<WriteupMarkdown slug="demo" body={body} />, options)

describe('code blocks', () => {
  it('shows the fence title in the title bar', () => {
    render(fence('bash title="nmap scan"', '$ nmap -sV host'))
    expect(screen.getByText('nmap scan')).toBeTruthy()
  })

  it('falls back to the language, then to "terminal"', () => {
    const { unmount } = render(fence('bash', 'echo hi'))
    expect(screen.getByText('bash', { selector: 'span' })).toBeTruthy()
    unmount()
    render(fence('', 'plain'))
    expect(screen.getByText('terminal')).toBeTruthy()
  })

  it('styles "$ " lines as prompts and keeps other lines plain', () => {
    const { container } = render(fence('bash', '$ id\nuid=0(root)'))
    const prompt = container.querySelector('pre .text-ansi-green')
    expect(prompt.textContent).toBe('$')
    expect(container.querySelector('pre').textContent).toContain('uid=0(root)')
    expect(container.querySelector('pre').textContent).not.toContain('$ id\n')
  })

  it('keeps blank lines visible inside prompted blocks', () => {
    const { container } = render(fence('bash', '$ id\n\nuid=0(root)'))
    const lines = container.querySelectorAll('pre code > span')
    expect(lines).toHaveLength(3)
    expect(lines[1].textContent).not.toBe('')
  })

  it('keeps syntax highlighting for blocks without prompts', () => {
    const { container } = render(fence('js', 'const a = 1'))
    expect(container.querySelector('pre .hljs-keyword')).toBeTruthy()
  })

  it('keeps inline code outside the terminal window', () => {
    const { container } = render('use `ls` here')
    expect(container.querySelector('pre')).toBeNull()
    expect(container.querySelector('code').className).toContain('text-ansi-amber')
  })

  it('copies only the commands when prompts exist', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    render(fence('bash', '$ nmap host\nPORT STATE\n$ id'))
    fireEvent.click(screen.getByRole('button', { name: 'Copy commands' }))
    await waitFor(() => expect(screen.getByRole('status').textContent).toBe('copied'))
    expect(writeText).toHaveBeenCalledWith('nmap host\nid')
  })

  it('copies the whole block when there are no prompts', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    render(fence('txt', 'line one\nline two'))
    fireEvent.click(screen.getByRole('button', { name: 'Copy commands' }))
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('line one\nline two'))
  })

  it('reports failure when the clipboard rejects or is missing', async () => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
    })
    const { unmount } = render(fence('bash', '$ id'))
    fireEvent.click(screen.getByRole('button', { name: 'Copy commands' }))
    await waitFor(() => expect(screen.getByRole('status').textContent).toBe('copy failed'))
    unmount()

    vi.stubGlobal('navigator', {})
    render(fence('bash', '$ id'))
    fireEvent.click(screen.getByRole('button', { name: 'Copy commands' }))
    await waitFor(() => expect(screen.getByRole('status').textContent).toBe('copy failed'))
  })

  it('renders an empty live region before any copy', () => {
    render(fence('bash', '$ id'))
    const status = screen.getByRole('status')
    expect(status.textContent).toBe('')
    expect(status.getAttribute('aria-live')).toBe('polite')
  })

  it('translates the labels to Spanish', async () => {
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockResolvedValue() } })
    render(fence('bash', '$ id'), { lang: 'es' })
    fireEvent.click(screen.getByRole('button', { name: 'Copiar comandos' }))
    await waitFor(() => expect(screen.getByRole('status').textContent).toBe('copiado'))
  })
})

describe('images', () => {
  it('resolves a relative image under the writeup folder', () => {
    render('![nmap output](nmap.png "Open ports")')
    const img = screen.getByRole('img', { name: 'nmap output' })
    expect(img.getAttribute('src')).toBe(`${import.meta.env.BASE_URL}writeups/demo/nmap.png`)
    expect(img.getAttribute('loading')).toBe('lazy')
    expect(screen.getByText('Open ports').tagName).toBe('FIGCAPTION')
  })

  it('omits the caption when there is no title', () => {
    const { container } = render('![alt](a.png)')
    expect(container.querySelector('figcaption')).toBeNull()
  })

  it('does not nest a standalone image figure inside a paragraph', () => {
    const { container } = render('Intro text.\n\n![nmap output](nmap.png)\n\nMore text.')
    const figure = container.querySelector('figure')
    expect(figure).toBeTruthy()
    expect(figure.closest('p')).toBeNull()
    expect(container.querySelectorAll('p')).toHaveLength(2)
  })

  it('keeps the same image element when the parent re-renders', () => {
    // A parent re-render (e.g. a language toggle) must not remount images.
    const Parent = () => {
      const [count, setCount] = useState(0)
      return (
        <>
          <button type="button" onClick={() => setCount(count + 1)}>rerender {count}</button>
          <WriteupMarkdown slug="demo" body="![nmap output](nmap.png)" />
        </>
      )
    }
    const { container } = renderWithProviders(<Parent />)
    const before = container.querySelector('img')
    fireEvent.click(screen.getByRole('button', { name: /rerender/ }))
    expect(screen.getByRole('button', { name: 'rerender 1' })).toBeTruthy()
    expect(container.querySelector('img')).toBe(before)
  })

  it('renders nothing for a blocked source', () => {
    const { container } = render('![x](javascript:alert(1))\n\n![y](../a.png)')
    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelector('figure')).toBeNull()
  })
})
