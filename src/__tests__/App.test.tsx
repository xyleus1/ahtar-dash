import { act, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { content, type SiteContent } from '../content'
import { setMediaQuery } from './media'

const sectionLabels = ['Enjoying', 'Reading', 'Writing', 'Building', 'Contact']

describe('the personal document network', () => {
  it('presents four named documents followed by contact with an accessible page identity', () => {
    render(<App />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(content.name)
    expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent))
      .toEqual(sectionLabels)
    expect(screen.getAllByRole('region')).toHaveLength(5)
    for (const label of sectionLabels) {
      const document = screen.getByRole('region', { name: label })
      expect(document).toBeVisible()
      expect(within(document).getByRole('heading', { level: 2, name: label })).toBeVisible()
    }
    expect(within(screen.getByRole('region', { name: 'Contact' })).getByText(content.name)).toBeVisible()
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main')
    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1')
  })

  it('shows placeholders as readable text without inventing outgoing links', () => {
    render(<App />)

    for (const section of content.sections) {
      const document = screen.getByRole('region', { name: section.label })
      expect(within(document).queryByRole('link')).not.toBeInTheDocument()
      for (const entry of section.entries) {
        expect(within(document).getByText(entry.title)).toBeVisible()
      }
    }
    const contact = screen.getByRole('region', { name: 'Contact' })
    expect(within(contact).queryByRole('link')).not.toBeInTheDocument()
    for (const entry of content.contact) {
      expect(within(contact).getByText(entry.title)).toBeVisible()
    }
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })

  it('preserves supplied destinations, long titles, multiple entries, and unlinked interests', () => {
    const longTitle = 'An extended reading title about architecture, music, making things, and the small details that connect them'
    const data: SiteContent = {
      ...content,
      name: 'A Person',
      sections: content.sections.map((section) => ({
        ...section,
        entries: section.id === 'enjoying'
          ? [{ title: 'Long walks at dusk', url: '' }]
          : [
              { title: `${longTitle} (${section.id})`, url: `https://example.com/${section.id}` },
              { title: `Another ${section.id} entry`, url: `https://example.com/${section.id}/second` },
            ],
      })),
      contact: [{ title: 'Email me', url: 'mailto:hello@example.com' }, { title: 'My profile', url: 'https://example.com/profile' }],
    }

    render(<App data={data} />)

    const enjoying = screen.getByRole('region', { name: 'Enjoying' })
    expect(within(enjoying).getByText('Long walks at dusk')).toBeVisible()
    expect(within(enjoying).queryByRole('link')).not.toBeInTheDocument()
    for (const section of data.sections.filter((section) => section.id !== 'enjoying')) {
      const entries = within(screen.getByRole('region', { name: section.label })).getAllByRole('link')
      expect(entries.map((entry) => entry.textContent))
        .toEqual([`${longTitle} (${section.id})`, `Another ${section.id} entry`])
      expect(entries[0]).toHaveAttribute('href', `https://example.com/${section.id}`)
      expect(entries[1]).toHaveAttribute('href', `https://example.com/${section.id}/second`)
    }
    const contact = screen.getByRole('region', { name: 'Contact' })
    expect(within(contact).getByText(data.name)).toBeVisible()
    expect(within(contact).getByRole('link', { name: 'Email me' })).toHaveAttribute('href', 'mailto:hello@example.com')
    expect(within(contact).getByRole('link', { name: 'My profile' })).toHaveAttribute('href', 'https://example.com/profile')
  })

  it('keeps named documents understandable when their content lists are empty', () => {
    const data: SiteContent = {
      ...content,
      sections: content.sections.map((section) => ({ ...section, entries: [] })),
      contact: [],
    }

    render(<App data={data} />)

    for (const label of sectionLabels) {
      const document = screen.getByRole('region', { name: label })
      expect(within(document).getByText('To come.')).toBeVisible()
      expect(within(document).queryByRole('list')).not.toBeInTheDocument()
    }
    expect(within(screen.getByRole('region', { name: 'Contact' })).getByText(data.name)).toBeVisible()
  })

  it('keeps all documents and entries available as the mobile connection layout changes', () => {
    render(<App />)

    for (const narrow of [true, false]) {
      act(() => setMediaQuery('(max-width: 600px)', narrow))

      expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent))
        .toEqual(sectionLabels)
      for (const section of content.sections) {
        const document = screen.getByRole('region', { name: section.label })
        for (const entry of section.entries) {
          expect(within(document).getByText(entry.title)).toBeVisible()
        }
      }
      const contact = screen.getByRole('region', { name: 'Contact' })
      expect(within(contact).getByText(content.name)).toBeVisible()
      for (const entry of content.contact) {
        expect(within(contact).getByText(entry.title)).toBeVisible()
      }
    }
  })
})
