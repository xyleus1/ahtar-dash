import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { content, type SiteContent } from '../content'

describe('the personal index', () => {
  it('presents the introduction and four interests in the requested order', () => {
    render(<App />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(content.name)
    expect(screen.getByText(content.bio.join(' '))).toBeVisible()
    const interests = screen.getByLabelText('Personal interests')
    expect(interests.tagName).toBe('DL')
    expect(within(interests).getAllByRole('term').map((term) => term.textContent))
      .toEqual(['Enjoying', 'Reading', 'Writing', 'Building'])
    expect(within(interests).getAllByRole('definition')).toHaveLength(4)
    expect(screen.queryAllByRole('heading', { level: 2 })).toHaveLength(0)
    expect(screen.getByRole('navigation', { name: 'Contact' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main')
  })

  it('shows initial content as readable placeholders without fake outgoing links', () => {
    render(<App />)

    const definitions = within(screen.getByLabelText('Personal interests')).getAllByRole('definition')
    for (const [index, section] of content.sections.entries()) {
      const definition = definitions[index]
      expect(within(definition).queryByRole('link')).not.toBeInTheDocument()
      for (const entry of section.entries) {
        expect(within(definition).getByText(entry.title)).toBeVisible()
      }
    }
    const contact = screen.getByRole('navigation', { name: 'Contact' })
    expect(within(contact).queryByRole('link')).not.toBeInTheDocument()
    expect(within(contact).getByText('Your email')).toBeVisible()
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })

  it('renders supplied links, email, long titles, and unlinked interests without changing their content', () => {
    const longTitle = 'An extended reading title about architecture, music, making things, and the small details that connect them'
    const data: SiteContent = {
      ...content,
      name: 'A Person',
      bio: ['First sentence.', 'Second sentence.', 'Third sentence.'],
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

    const definitions = within(screen.getByLabelText('Personal interests')).getAllByRole('definition')
    const enjoying = definitions[0]
    expect(within(enjoying).getByText('Long walks at dusk')).toBeVisible()
    expect(within(enjoying).queryByRole('link')).not.toBeInTheDocument()
    for (const [index, section] of ['reading', 'writing', 'building'].entries()) {
      const entries = within(definitions[index + 1]).getAllByRole('link')
      expect(entries.map((entry) => entry.textContent))
        .toEqual([`${longTitle} (${section})`, `Another ${section} entry`])
      expect(entries[0])
        .toHaveAttribute('href', `https://example.com/${section}`)
      expect(entries[1])
        .toHaveAttribute('href', `https://example.com/${section}/second`)
    }
    const contact = screen.getByRole('navigation', { name: 'Contact' })
    expect(within(contact).getByRole('link', { name: 'Email me' })).toHaveAttribute('href', 'mailto:hello@example.com')
    expect(within(contact).getByRole('link', { name: 'My profile' })).toHaveAttribute('href', 'https://example.com/profile')
  })

  it('keeps every section and the contact area understandable when their lists are empty', () => {
    const data: SiteContent = {
      ...content,
      sections: content.sections.map((section) => ({ ...section, entries: [] })),
      contact: [],
    }

    render(<App data={data} />)

    const interests = screen.getByLabelText('Personal interests')
    expect(within(interests).getAllByRole('term')).toHaveLength(4)
    for (const definition of within(interests).getAllByRole('definition')) {
      expect(within(definition).getByText('To come.')).toBeVisible()
      expect(within(definition).queryByRole('list')).not.toBeInTheDocument()
    }
    expect(within(screen.getByRole('navigation', { name: 'Contact' })).getByText('Contact details to come.')).toBeVisible()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('leaves the complete biography visible and unsplit when reduced motion is requested', () => {
    render(<App />)

    expect(window.matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(true)
    const biography = screen.getByText(content.bio.join(' '))
    expect(biography.tagName).toBe('P')
    expect(biography).toBeVisible()
    expect(biography.textContent).toBe(content.bio.join(' '))
    expect(biography.children).toHaveLength(0)
    expect(biography).not.toHaveStyle({ opacity: '0' })
  })
})
