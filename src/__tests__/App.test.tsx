import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from '../App'
import { content, type SiteContent } from '../content'

// Embla's layout and timing are exercised in the real-browser carousel checks.
vi.mock('embla-carousel-react', () => ({
  default: () => [() => {}, undefined],
}))

const placeholderData: SiteContent = {
  ...content,
  sections: content.sections.map((section) => ({
    ...section,
    groups: undefined,
    entries: [{ title: `An unlinked ${section.id} entry` }],
  })),
  contact: [{ title: 'An email to add' }, { title: 'A profile to add', url: '' }],
}

describe('the personal site', () => {
  it('introduces the person and links to the four pages in order', () => {
    const data: SiteContent = {
      ...content,
      name: 'A Person',
      bio: 'I make things. I read widely. I enjoy long walks.',
    }

    render(<App data={data} pathname="/" />)

    expect(screen.getByRole('heading', { level: 1, name: data.name })).toBeVisible()
    expect(screen.getByText(data.bio)).toBeVisible()
    const links = within(screen.getByRole('navigation', { name: 'Sections' })).getAllByRole('link')
    expect(links.map((link) => link.textContent)).toEqual(data.sections.map((section) => section.label))
    expect(links.map((link) => link.getAttribute('href')))
      .toEqual(['/enjoying', '/reading', '/writing', '/building'])
    expect(screen.getByRole('region', { name: 'Art and references' })).toBeVisible()
    expect(screen.queryByAltText(/wireframe interpretation/i)).not.toBeInTheDocument()
    expect(screen.queryByText('Wireframe to come.')).not.toBeInTheDocument()
  })

  it('keeps contact placeholders readable without inventing destinations', () => {
    render(<App data={placeholderData} pathname="/" />)

    for (const entry of placeholderData.contact) {
      expect(screen.getByText(entry.title)).toBeVisible()
      expect(screen.getByText(entry.title).closest('a')).toBeNull()
    }
    expect(within(screen.getByRole('main')).getAllByRole('link'))
      .toHaveLength(content.sections.length)
  })

  it('preserves supplied email and profile links on the home page', () => {
    const data: SiteContent = {
      ...content,
      contact: [
        { title: 'Email me', url: 'mailto:hello@example.com' },
        { title: 'My profile', url: 'https://example.com/profile' },
        { title: 'Elsewhere soon', url: '' },
      ],
    }

    render(<App data={data} pathname="/" />)

    expect(screen.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', 'mailto:hello@example.com')
    expect(screen.getByRole('link', { name: 'My profile' })).toHaveAttribute('href', 'https://example.com/profile')
    expect(screen.getByText('Elsewhere soon').closest('a')).toBeNull()
  })

  it.each(placeholderData.sections.flatMap((section) => [
    { section, pathname: `/${section.id}` },
    { section, pathname: `/${section.id}/` },
  ]))('renders $pathname as its own content page', ({ section, pathname }) => {
    render(<App data={placeholderData} pathname={pathname} />)

    expect(screen.getByRole('heading', { level: 1, name: section.label })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    const entries = within(screen.getByRole('list')).getAllByRole('listitem')
    expect(entries.map((entry) => entry.textContent)).toEqual(section.entries.map((entry) => entry.title))
    for (const entry of entries) expect(within(entry).queryByRole('link')).not.toBeInTheDocument()
    expect(within(screen.getByRole('main')).getAllByRole('link')).toHaveLength(1)
    expect(screen.getByText('Wireframe to come.')).toBeVisible()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('preserves multiple long titles, exact URLs, and unlinked entries', () => {
    const longTitle = 'An extended reading title about architecture, music, making things, and the small details that connect them'
    const entries = [
      { title: longTitle, url: 'https://example.com/essay?edition=2#notes' },
      { title: 'A local note', url: '/notes/one' },
      { title: 'A book from the library' },
      { title: 'An essay to find', url: '' },
    ]
    const data: SiteContent = {
      ...content,
      sections: content.sections.map((section) => section.id === 'reading' ? { ...section, entries } : section),
    }

    render(<App data={data} pathname="/reading" />)

    expect(screen.getAllByRole('listitem').map((entry) => entry.textContent))
      .toEqual(entries.map((entry) => entry.title))
    expect(screen.getByRole('link', { name: longTitle })).toHaveAttribute('href', entries[0].url)
    expect(screen.getByRole('link', { name: 'A local note' })).toHaveAttribute('href', '/notes/one')
    expect(screen.getByText('A book from the library').closest('a')).toBeNull()
    expect(screen.getByText('An essay to find').closest('a')).toBeNull()
    expect(within(screen.getByRole('main')).getAllByRole('link')).toHaveLength(3)
  })

  it('gives an empty content page a readable placeholder and a way home', () => {
    const data: SiteContent = {
      ...content,
      sections: content.sections.map((section) => ({ ...section, entries: [] })),
      contact: [],
    }

    const { rerender } = render(<App data={data} pathname="/writing" />)

    expect(screen.getByRole('heading', { level: 1, name: 'Writing' })).toBeVisible()
    expect(screen.getByText('To come.')).toBeVisible()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')

    rerender(<App data={data} pathname="/" />)
    expect(screen.getByRole('heading', { level: 1, name: data.name })).toBeVisible()
    expect(within(screen.getByRole('navigation', { name: 'Sections' })).getAllByRole('link')).toHaveLength(4)
    expect(screen.queryByRole('link', { name: /email/i })).not.toBeInTheDocument()
  })

  it('uses the browser pathname when no route prop is supplied', () => {
    window.history.replaceState(null, '', '/building/')

    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'Building' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
  })

  it('offers a home link for an unknown route', () => {
    render(<App pathname="/does-not-exist" />)

    expect(screen.getByText('Page not found.')).toBeVisible()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
