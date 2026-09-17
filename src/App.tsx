import type { ComponentProps } from 'react'
import { ArcherContainer, ArcherElement } from 'react-archer'
import { content, type Entry, type SectionId, type SiteContent } from './content'
import useMediaQuery from './hooks/useMediaQuery'

type Relations = NonNullable<ComponentProps<typeof ArcherElement>['relations']>

const desktopConnections: Record<SectionId, Relations> = {
  enjoying: [
    { targetId: 'reading', sourceAnchor: 'right', targetAnchor: 'left' },
    { targetId: 'writing', sourceAnchor: 'bottom', targetAnchor: 'top' },
    { targetId: 'building', sourceAnchor: 'right', targetAnchor: 'left' },
  ],
  reading: [
    { targetId: 'writing', sourceAnchor: 'left', targetAnchor: 'right' },
    { targetId: 'building', sourceAnchor: 'bottom', targetAnchor: 'top' },
  ],
  writing: [{ targetId: 'building', sourceAnchor: 'right', targetAnchor: 'left' }],
  building: [{ targetId: 'contact', sourceAnchor: 'bottom', targetAnchor: 'right', style: { strokeDasharray: 'none' } }],
}

const mobileConnections: Record<SectionId, Relations> = {
  enjoying: [
    { targetId: 'reading', sourceAnchor: 'bottom', targetAnchor: 'top' },
    { targetId: 'writing', sourceAnchor: 'left', targetAnchor: 'left' },
    { targetId: 'building', sourceAnchor: 'right', targetAnchor: 'left' },
  ],
  reading: [
    { targetId: 'writing', sourceAnchor: 'bottom', targetAnchor: 'top' },
    { targetId: 'building', sourceAnchor: 'right', targetAnchor: 'right' },
  ],
  writing: [{ targetId: 'building', sourceAnchor: 'bottom', targetAnchor: 'top' }],
  building: [{ targetId: 'contact', sourceAnchor: 'bottom', targetAnchor: 'top', style: { strokeDasharray: 'none' } }],
}

function Entries({ entries }: { entries: Entry[] }) {
  if (!entries.length) return <p>To come.</p>
  return (
    <ul>
      {entries.map((entry, index) => (
        <li key={`${index}-${entry.title}`}>
          {entry.url ? <a href={entry.url}>{entry.title}</a> : <span>{entry.title}</span>}
        </li>
      ))}
    </ul>
  )
}

export default function App({ data = content }: { data?: SiteContent }) {
  const narrow = useMediaQuery('(max-width: 600px)')
  const connections = narrow ? mobileConnections : desktopConnections

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <main id="main" className="page" tabIndex={-1}>
        <h1 className="sr-only">{data.name}</h1>
        <ArcherContainer className="network" strokeColor="#333" strokeWidth={1.2} strokeDasharray="1 4" lineStyle="straight" endMarker={false} startMarker={false} svgContainerStyle={{ strokeLinecap: 'round' }}>
          <div className="documents">
            {data.sections.map((section) => (
              <ArcherElement id={section.id} relations={connections[section.id]} key={section.id}>
                <section className={`document document-${section.id}`} id={section.id} aria-labelledby={`${section.id}-heading`}>
                  <h2 id={`${section.id}-heading`}>{section.label}</h2>
                  <Entries entries={section.entries} />
                </section>
              </ArcherElement>
            ))}
            <ArcherElement id="contact">
              <section className="document document-contact" id="contact" aria-labelledby="contact-heading">
                <h2 id="contact-heading">Contact</h2>
                <p className="person">{data.name}</p>
                <Entries entries={data.contact} />
              </section>
            </ArcherElement>
          </div>
        </ArcherContainer>
      </main>
    </>
  )
}
