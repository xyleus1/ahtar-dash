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

export interface EntryGroup {
  id: string
  label: string
  entries: Entry[]
  columns?: boolean
}

export interface Section {
  id: SectionId
  label: string
  entries: Entry[]
  groups?: EntryGroup[]
}

export interface SiteContent {
  name: string
  bio: string
  sections: Section[]
  contact: Entry[]
}

export const content: SiteContent = {
  name: 'Nima Kamali',
  bio: 'Working on getting good at investing and reading, among other things',
  sections: [
    {
      id: 'enjoying',
      label: 'Enjoying',
      entries: [],
      groups: [
        {
          id: 'shows',
          label: 'Shows',
          columns: true,
          entries: [
            { title: 'Better Call Saul' },
            { title: 'The Mentalist' },
            { title: 'Final Space' },
            { title: 'Severance' },
            { title: 'The White Lotus' },
            { title: 'Shameless' },
            { title: 'Love, Death, & Robots' },
            { title: 'Serial Experiments: Lain' },
            { title: 'Ergo Proxy' },
          ],
        },
        {
          id: 'podcasts',
          label: 'Podcasts',
          entries: [
            { title: '99% Invisible' },
            { title: 'Serial' },
            { title: 'Caliphate' },
            { title: 'Rabbit Hole' },
            { title: 'Hunting Warhead' },
            { title: 'The Adam Friedland Show' },
          ],
        },
        {
          id: 'movies',
          label: 'Movies',
          entries: [
            { title: 'Synecdoche, New York' },
            { title: 'Three Colours: Red' },
            { title: "Ulysses' Gaze" },
            { title: 'Dekalog' },
            { title: 'The Pleasure of Being Robbed' },
            { title: 'Damnation' },
            { title: 'End of Summer' },
            { title: 'The Passenger' },
            { title: 'In Bruges' },
            { title: 'Din of Celestial Birds' },
            { title: 'Polia & Blastema' },
            { title: 'A Lullaby to the Sorrowful Mystery' },
          ],
        },
        {
          id: 'websites',
          label: 'Websites',
          entries: [
            { title: 'Edith Reisen', url: 'https://zyg.edith.reisen/' },
            { title: 'Hyperstition Abstract Dynamics', url: 'http://hyperstition.abstractdynamics.org/archives/003428.html' },
            { title: 'Vast Abrupt', url: 'https://vastabrupt.com/' },
            { title: 'Biblioklept', url: 'https://biblioklept.org/' },
            { title: 'Science Sacrée', url: 'https://www.sciencesacree.com/' },
            { title: 'Remilia', url: 'https://hyperstitional.com/' },
            { title: 'QRI', url: 'https://qri.org/glossary?utm_source=chatgpt.com' },
            { title: 'Unqualified Reservations', url: 'https://www.unqualified-reservations.org/' },
            { title: 'Alamut', url: 'https://www.alamut.com/subj/subject_index.html' },
            { title: 'Extropy', url: 'https://lists.extropy.org/pipermail/extropy-chat/' },
          ],
        },
      ],
    },
    {
      id: 'reading',
      label: 'Reading',
      entries: [{ title: 'TBD' }],
    },
    {
      id: 'writing',
      label: 'Writing',
      entries: [
        { title: memoryArticle.title, url: memoryArticle.path },
        { title: 'Metals' },
        { title: 'AI for chip design' },
        { title: 'How to make robots scale like software' },
        { title: 'The end-state of human-computer interaction' },
        { title: 'More to come...' },
      ],
    },
    {
      id: 'building',
      label: 'Building',
      entries: [{ title: 'TBD' }],
    },
  ],
  contact: [
    { title: 'nimakamali@ucla.edu', url: 'mailto:nimakamali@ucla.edu' },
    { title: 'My Linkedin', url: 'https://www.linkedin.com/in/nima-kamali/' },
  ],
}
