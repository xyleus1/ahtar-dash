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
  poster?: { src: string; width: number; height: number }
}

export type SectionId = 'enjoying' | 'reading' | 'writing' | 'building'

export interface EntryGroup {
  id: string
  label: string
  entries: Entry[]
  columns?: boolean
  layout?: 'posters'
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
          id: 'movies',
          label: 'Movies',
          layout: 'posters',
          entries: [
            { title: 'Synecdoche, New York', poster: { src: '/posters/01-synecdoche-new-york.webp', width: 360, height: 540 } },
            { title: 'Three Colours: Red', poster: { src: '/posters/02-three-colours-red.webp', width: 360, height: 540 } },
            { title: "Ulysses' Gaze", poster: { src: '/posters/03-ulysses-gaze.webp', width: 360, height: 540 } },
            { title: 'Dekalog', poster: { src: '/posters/04-dekalog.webp', width: 360, height: 540 } },
            { title: 'The Pleasure of Being Robbed', poster: { src: '/posters/05-the-pleasure-of-being-robbed.webp', width: 360, height: 540 } },
            { title: 'Damnation', poster: { src: '/posters/06-damnation.webp', width: 360, height: 540 } },
            { title: 'End of Summer', poster: { src: '/posters/07-end-of-summer.webp', width: 360, height: 540 } },
            { title: 'The Passenger' },
            { title: 'In Bruges', poster: { src: '/posters/09-in-bruges.webp', width: 360, height: 540 } },
            { title: 'Din of Celestial Birds', poster: { src: '/posters/10-din-of-celestial-birds.webp', width: 360, height: 540 } },
            { title: 'Polia & Blastema', poster: { src: '/posters/11-polia-blastema.webp', width: 360, height: 540 } },
            { title: 'A Lullaby to the Sorrowful Mystery', poster: { src: '/posters/12-a-lullaby-to-the-sorrowful-mystery.webp', width: 360, height: 540 } },
          ],
        },
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
            { title: 'Slate Star Codex', url: 'https://slatestarcodex.com/' },
          ],
        },
      ],
    },
    {
      id: 'reading',
      label: 'Reading',
      entries: [],
      groups: [
        {
          id: 'in-progress',
          label: 'In progress as of September 20th, 2026',
          entries: [
            { title: 'Remarks on Colour - Ludwig Wittgenstein' },
            { title: 'Accelerando - Charles Stross' },
            { title: 'Torture Concrete: Jean-Luc Moulène and the Protocol of Abstraction - Reza Negarestani' },
            { title: 'Neverness - David Zindell' },
            { title: 'Permutation City - Greg Egan' },
            { title: "For Anatole’s Tomb - Stéphane Mallarmé" },
            { title: 'Slaughterhouse-Five - Kurt Vonnegut' },
          ],
        },
      ],
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
