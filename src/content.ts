import { memoryArticle } from './posts/memoryArticleInfo'

/**
 * Your biography and all five pages live here. Replace the placeholders whenever you're ready.
 * Items without a URL display as text. Add as many items as you like;
 * the order below is the order visitors see. Use https:// URLs for links
 * and mailto:you@example.com for email. No account or database is needed.
 */
export interface Entry {
  title: string
  url?: string
}

export type SectionId = 'enjoying' | 'reading' | 'writing' | 'building'

export interface Section {
  id: SectionId
  label: string
  entries: Entry[]
}

export interface SiteContent {
  name: string
  bio: string
  sections: Section[]
  contact: Entry[]
}

export const content: SiteContent = {
  name: 'Your name',
  bio: 'A sentence about who you are. A sentence about what you care about. A sentence about what you are doing now.',
  sections: [
    {
      id: 'enjoying',
      label: 'Enjoying',
      entries: [{ title: 'A current favorite' }],
    },
    {
      id: 'reading',
      label: 'Reading',
      entries: [{ title: 'A book or an essay' }],
    },
    {
      id: 'writing',
      label: 'Writing',
      entries: [{ title: memoryArticle.title, url: memoryArticle.path }],
    },
    {
      id: 'building',
      label: 'Building',
      entries: [{ title: 'A work in progress' }],
    },
  ],
  contact: [{ title: 'Your email' }, { title: 'Your profile' }],
}
