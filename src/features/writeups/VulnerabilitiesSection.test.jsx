// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { screen, cleanup, within } from '@testing-library/react'
import { renderWithProviders } from '../../test/renderWithProviders'
import VulnerabilitiesSection from './VulnerabilitiesSection'
import { prepareVulnerabilities } from './vulnerabilities'

afterEach(cleanup)

const items = (list) => prepareVulnerabilities(list).items
const base = { impact: 'Root.', mitigation: 'Fix it.' }

describe('VulnerabilitiesSection', () => {
  it('renders nothing without findings', () => {
    const { container } = renderWithProviders(<VulnerabilitiesSection items={[]} lang="en" />)
    expect(container.firstChild).toBeNull()
  })

  it('renders heading, intro and one article per finding in severity order', () => {
    renderWithProviders(
      <VulnerabilitiesSection
        lang="en"
        items={items([
          { ...base, severity: 'low', title: 'Low one' },
          { ...base, severity: 'critical', title: 'Critical one' },
        ])}
      />,
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Vulnerabilities & mitigations' })).toBeTruthy()
    expect(screen.getByText(/ordered by severity/)).toBeTruthy()
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(2)
    expect(within(cards[0]).getByRole('heading', { level: 3 }).textContent).toBe('Critical one')
    expect(within(cards[0]).getByText('CRITICAL')).toBeTruthy()
    expect(within(cards[1]).getByText('LOW')).toBeTruthy()
    expect(within(cards[0]).getByText('IMPACT')).toBeTruthy()
    expect(within(cards[0]).getByText('MITIGATION')).toBeTruthy()
    expect(within(cards[0]).getByText('Root.')).toBeTruthy()
    expect(within(cards[0]).getByText('Fix it.')).toBeTruthy()
  })

  it('uses the writeup language, not the UI language', () => {
    renderWithProviders(
      <VulnerabilitiesSection lang="es" items={items([{ ...base, severity: 'high', title: 'T' }])} />,
      { lang: 'en' },
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Vulnerabilidades y mitigaciones' })).toBeTruthy()
    expect(screen.getByText('ALTA')).toBeTruthy()
    expect(screen.getByText('IMPACTO')).toBeTruthy()
    expect(screen.getByText('MITIGACIÓN')).toBeTruthy()
    expect(screen.queryByText('HIGH')).toBeNull()
  })

  it('links the CWE chip to MITRE safely and shows the OWASP chip', () => {
    renderWithProviders(
      <VulnerabilitiesSection
        lang="en"
        items={items([{ ...base, severity: 'high', title: 'T', cwe: 'CWE-250', owasp: 'A01:2021' }])}
      />,
    )
    const link = screen.getByRole('link', { name: 'CWE-250' })
    expect(link.getAttribute('href')).toBe('https://cwe.mitre.org/data/definitions/250.html')
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toContain('noreferrer')
    expect(screen.getByText('A01:2021').closest('a')).toBeNull()
  })

  it('does not render chips that are missing', () => {
    renderWithProviders(
      <VulnerabilitiesSection lang="en" items={items([{ ...base, severity: 'info', title: 'T' }])} />,
    )
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.queryByText(/CWE-/)).toBeNull()
    expect(screen.queryByText(/OWASP|A0\d:/)).toBeNull()
  })
})
