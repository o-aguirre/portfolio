// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest'
import { screen, cleanup } from '@testing-library/react'
import WriteupsSection from './WriteupsSection'
import { renderWithProviders } from '../../test/renderWithProviders'

vi.mock('./index.js', () => ({ writeups: { list: () => [], get: () => undefined, errors: [] } }))

afterEach(cleanup)

describe('WriteupsSection empty state', () => {
  it.each([
    ['en', 'No writeups yet.'],
    ['es', 'Aún no hay writeups.'],
  ])('shows the empty message in %s', (lang, text) => {
    renderWithProviders(<WriteupsSection />, { lang })
    expect(screen.getByText(text)).toBeTruthy()
  })
})
