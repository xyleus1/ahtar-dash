import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { content, type SiteContent } from '../content'

describe('the personal index', () => {
  it('presents the introduction and four collections in the requested order', () => {
    render(<App />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(content.name)
    expect(screen.getByText(content.bio.join(' '))).toBeVisible()
    expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent))
      .toEqual(['Enjoying', 'Reading', 'Writing', 'Building', 'Say hello.'])
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main')
  })

  it('shows initial content as readable placeholders without fake outgoing links', () => {
    render(<App />)

    for (const section of content.sections) {
      const region = screen.getByRole('region', { name: section.label })
      expect(within(region).queryByRole('link')).not.toBeInTheDocument()
      for (const entry of section.entries) {
        expect(within(region).getByText(entry.title)).toBeVisible()
      }
    }
    const contact = screen.getByRole('region', { name: 'Say hello.' })
    expect(within(contact).queryByRole('link')).not.toBeInTheDocument()
    expect(within(contact).getByText('Your email')).toBeVisible()
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
          : [{ title: `${longTitle} (${section.id})`, url: `https://example.com/${section.id}`, description: 'A short note.' }],
      })),
      contact: [{ title: 'Email me', url: 'mailto:hello@example.com' }, { title: 'My profile', url: 'https://example.com/profile' }],
    }

    render(<App data={data} />)

    const enjoying = screen.getByRole('region', { name: 'Enjoying' })
    expect(within(enjoying).getByText('Long walks at dusk')).toBeVisible()
    expect(within(enjoying).queryByRole('link')).not.toBeInTheDocument()
    for (const section of ['reading', 'writing', 'building']) {
      expect(screen.getByRole('link', { name: (name) => name.startsWith(`${longTitle} (${section})`) }))
        .toHaveAttribute('href', `https://example.com/${section}`)
    }
    expect(screen.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', 'mailto:hello@example.com')
    expect(screen.getByRole('link', { name: 'My profile' })).toHaveAttribute('href', 'https://example.com/profile')
  })

  it('keeps every section and the contact area understandable when their lists are empty', () => {
    const data: SiteContent = {
      ...content,
      sections: content.sections.map((section) => ({ ...section, entries: [] })),
      contact: [],
    }

    render(<App data={data} />)

    for (const section of data.sections) {
      const region = screen.getByRole('region', { name: section.label })
      expect(within(region).getByText('A little more here, soon.')).toBeVisible()
      expect(within(region).queryByRole('list')).not.toBeInTheDocument()
    }
    expect(screen.getByText('Contact details coming soon.')).toBeVisible()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('leaves the complete name visible and unsplit when reduced motion is requested', () => {
    render(<App />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeVisible()
    expect(heading.textContent).toBe(content.name)
    expect(heading.children).toHaveLength(0)
    expect(heading).not.toHaveStyle({ opacity: '0' })
  })
})
