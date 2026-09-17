/**
 * Your whole page lives here. Replace the placeholders whenever you're ready.
 * Items without a URL display as text. Add as many items as you like;
 * the order below is the order visitors see. Use https:// URLs for links
 * and mailto:you@example.com for email. No account or database is needed.
 */
export interface Entry {
  title: string
  url?: string
  description?: string
}

export type SectionId = 'enjoying' | 'reading' | 'writing' | 'building'

export interface Section {
  id: SectionId
  label: string
  entries: Entry[]
}

export interface SiteContent {
  name: string
  bio: [string, string, string]
  sections: Section[]
  contact: Entry[]
}

export const content: SiteContent = {
  name: 'Your name',
  bio: [
    'A sentence about who you are.',
    'A sentence about what draws you in.',
    'A sentence about what comes next.',
  ],
  sections: [
    {
      id: 'enjoying',
      label: 'Enjoying',
      entries: [{ title: 'Something you’re enjoying', description: 'A song, a film, a small obsession.' }],
    },
    {
      id: 'reading',
      label: 'Reading',
      entries: [{ title: 'Something you’re reading', description: 'A book, an essay, a different perspective.' }],
    },
    {
      id: 'writing',
      label: 'Writing',
      entries: [{ title: 'Something you’ve written', description: 'A thought worth putting into words.' }],
    },
    {
      id: 'building',
      label: 'Building',
      entries: [{ title: 'Something you’re building', description: 'An idea finding its way into the world.' }],
    },
  ],
  contact: [{ title: 'Your email' }, { title: 'Your social link' }],
}
