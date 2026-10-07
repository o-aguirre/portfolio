// @vitest-environment jsdom
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { screen, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import Hero from '../components/hero/Hero'
import Contact from '../components/contact/Contact'
import Footer from '../components/footer/Footer'
import HomePage from '../pages/HomePage'
import WriteupsSection from '../features/writeups/WriteupsSection'
import WriteupPage from '../features/writeups/WriteupPage'
import App from '../App'
import { renderWithProviders } from '../test/renderWithProviders'

const send = vi.hoisted(() => vi.fn())
vi.mock('@emailjs/browser', () => ({ default: { sendForm: send } }))

beforeEach(() => {
  send.mockReset()
  window.localStorage.clear()
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Hero', () => {
  it('renders the English h1 and about text', () => {
    renderWithProviders(<Hero />, { lang: 'en' })
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe("Hi! I'm mephibosheth")
    expect(screen.getByText(/Computer Engineering student at Duoc UC/)).toBeTruthy()
    expect(screen.getByText('I am looking for my first internship in pentesting.')).toBeTruthy()
    expect(screen.getAllByLabelText('GitHub profile').length).toBeGreaterThan(0)
  })

  it('renders the Spanish h1 and about text', () => {
    renderWithProviders(<Hero />, { lang: 'es' })
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('¡Hola! Soy mephibosheth')
    expect(screen.getByText(/Estudiante de Ingeniería Informática en Duoc UC/)).toBeTruthy()
    expect(screen.getByText('Busco mi primera práctica en pentesting.')).toBeTruthy()
    expect(screen.getAllByLabelText('Perfil de GitHub').length).toBeGreaterThan(0)
  })

  it('keeps shell commands in English in Spanish', () => {
    const { container } = renderWithProviders(<Hero />, { lang: 'es' })
    for (const command of ['whoami', 'fastfetch', 'cat about.txt', 'ls links/', './download_cv.sh']) {
      expect(container.textContent).toContain(command)
    }
  })
})

describe('Contact', () => {
  it('translates labels and placeholders', () => {
    renderWithProviders(<Contact />, { lang: 'en' })
    expect(screen.getByLabelText('email:')).toBeTruthy()
    expect(screen.getByPlaceholderText('Leave a comment...')).toBeTruthy()
    cleanup()
    renderWithProviders(<Contact />, { lang: 'es' })
    expect(screen.getByLabelText('correo:')).toBeTruthy()
    expect(screen.getByPlaceholderText('Deja un comentario...')).toBeTruthy()
  })

  it.each([
    ['en', 'Message sent successfully!'],
    ['es', '¡Mensaje enviado con éxito!'],
  ])('shows the success status in %s', async (lang, text) => {
    send.mockResolvedValue({ text: 'OK' })
    const { container } = renderWithProviders(<Contact />, { lang })
    fireEvent.submit(container.querySelector('form'))
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain(text))
  })

  it.each([
    ['en', 'Failed to send message'],
    ['es', 'No se pudo enviar el mensaje'],
  ])('shows the error status in %s', async (lang, text) => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    send.mockRejectedValue({ text: 'boom' })
    const { container } = renderWithProviders(<Contact />, { lang })
    fireEvent.submit(container.querySelector('form'))
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain(text))
  })
})

describe('Footer', () => {
  it('translates the link aria-labels', () => {
    renderWithProviders(<Footer />, { lang: 'es' })
    expect(screen.getByLabelText('Perfil de LinkedIn')).toBeTruthy()
    cleanup()
    renderWithProviders(<Footer />, { lang: 'en' })
    expect(screen.getByLabelText('LinkedIn profile')).toBeTruthy()
  })
})

describe('WriteupsSection', () => {
  it('keeps the shell command and the writeup content untouched in Spanish', () => {
    renderWithProviders(<WriteupsSection />, { lang: 'es' })
    expect(screen.getByText(/ls -la writeups\//)).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Example Machine' })).toBeTruthy()
  })
})

describe('WriteupPage', () => {
  const renderMissing = (lang) =>
    renderWithProviders(
      <Routes>
        <Route path="/writeups/:slug" element={<WriteupPage />} />
      </Routes>,
      { lang, route: '/writeups/nope' },
    )

  it('translates the not-found message', () => {
    renderMissing('en')
    expect(screen.getByText('cat: nope.md: No such file or directory')).toBeTruthy()
    cleanup()
    renderMissing('es')
    expect(screen.getByText('cat: nope.md: No existe el archivo o el directorio')).toBeTruthy()
  })
})

describe('document title', () => {
  it.each([
    ['en', 'Onésimo Aguirre — Security Portfolio'],
    ['es', 'Onésimo Aguirre — Portafolio de ciberseguridad'],
  ])('is set from the dictionary in %s', (lang, title) => {
    renderWithProviders(<HomePage />, { lang })
    expect(document.title).toBe(title)
  })
})

describe('App chrome', () => {
  it('translates the 404 message', () => {
    renderWithProviders(<App />, { lang: 'es', route: '/nope' })
    expect(screen.getByText('bash: comando no encontrado (404)')).toBeTruthy()
  })
})
