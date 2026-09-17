import { ArrowDown, ArrowUpRight, Asterisk, BookOpen, Heart, Mail, PenLine, Shapes } from 'lucide-react'
import NameReveal from './components/NameReveal'
import SpotlightCard from './components/SpotlightCard'
import SmoothScroll from './components/SmoothScroll'
import { content, type Entry, type SectionId, type SiteContent } from './content'

const icons = { enjoying: Heart, reading: BookOpen, writing: PenLine, building: Shapes }

function EntryRow({ entry }: { entry: Entry }) {
  const inner = (
    <>
      <span className="entry-copy">
        <span className="entry-title">{entry.title}</span>
        {entry.description && <span className="entry-description">{entry.description}</span>}
      </span>
      {entry.url && <ArrowUpRight className="entry-arrow" size={18} aria-hidden="true" />}
    </>
  )

  return (
    <li>
      {entry.url ? <a className="entry entry-link" href={entry.url}>{inner}</a> : <div className="entry">{inner}</div>}
    </li>
  )
}

export default function App({ data = content }: { data?: SiteContent }) {
  return (
    <SmoothScroll>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="page">
        <header className="masthead">
          <a className="wordmark" href="/" aria-label="ahtar home">
            <Asterisk size={28} strokeWidth={1.6} aria-hidden="true" />
            <span>ahtar.dev</span>
          </a>
          <span className="masthead-note">A personal index</span>
        </header>

        <main id="main" tabIndex={-1}>
          <section className="introduction" aria-label="Introduction">
            <p className="eyebrow"><span className="small-rule" />Hello, I’m</p>
            <NameReveal text={data.name} className="name" />
            <p className="bio">{data.bio.join(' ')}</p>
            <a className="jump-link" href="#enjoying">
              A few things, lately <ArrowDown size={14} aria-hidden="true" />
            </a>
          </section>

          <div className="collections" aria-label="Personal collections">
            {data.sections.map((section, index) => {
              const Icon = icons[section.id as SectionId]
              return (
                <section id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`} className="collection">
                  <SpotlightCard className="collection-panel" spotlightColor="rgba(179, 38, 45, 0.065)">
                    <div className="section-heading">
                      <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                      <h2 id={`${section.id}-heading`}>{section.label}</h2>
                      <span className="section-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    {section.entries.length > 0 ? (
                      <ul className="entries">{section.entries.map((entry, itemIndex) => <EntryRow entry={entry} key={`${itemIndex}-${entry.title}`} />)}</ul>
                    ) : (
                      <p className="empty-state">A little more here, soon.</p>
                    )}
                  </SpotlightCard>
                </section>
              )
            })}
          </div>

          <section id="contact" className="contact" aria-labelledby="contact-heading">
            <div className="contact-intro">
              <p className="eyebrow">Keep in touch</p>
              <h2 id="contact-heading">Say hello.</h2>
            </div>
            <ul className="contact-links">
              {data.contact.map((entry, index) => (
                <li key={`${index}-${entry.title}`}>
                  {entry.url ? (
                    <a href={entry.url}>
                      {entry.url.startsWith('mailto:') && <Mail size={14} aria-hidden="true" />}
                      {entry.title}<ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  ) : <span className="contact-placeholder">{entry.title}</span>}
                </li>
              ))}
              {data.contact.length === 0 && <li><span className="contact-placeholder">Contact details coming soon.</span></li>}
            </ul>
          </section>
        </main>

        <footer className="footer">
          <span>A small corner of the internet.</span>
          <Asterisk size={20} strokeWidth={1.4} aria-hidden="true" />
        </footer>
      </div>
    </SmoothScroll>
  )
}
