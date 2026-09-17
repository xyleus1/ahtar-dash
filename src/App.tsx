import { useRef, type ComponentProps } from 'react'
import {
  ArcherContainer,
  ArcherElement,
  type ArcherContainerRef,
} from 'react-archer'
import {
  content,
  type Entry,
  type SectionId,
  type SiteContent,
} from './content'
import useNetworkMotion from './hooks/useNetworkMotion'

type Relations = NonNullable<ComponentProps<typeof ArcherElement>['relations']>
type NodeId = SectionId | 'contact'
type Anchor = Relations[number]['sourceAnchor']

function relation(
  source: NodeId,
  target: NodeId,
  sourceAnchor: Anchor,
  targetAnchor: Anchor,
): Relations[number] {
  return {
    targetId: target,
    sourceAnchor,
    targetAnchor,
    className: `connection edge-${source} edge-${target}`,
    ...(target === 'contact'
      ? {
          style: {
            strokeDasharray: 'none',
            strokeColor: 'var(--connection-color, #777)',
          },
        }
      : {}),
  }
}

const connections: Record<SectionId, Relations> = {
  enjoying: [
    relation('enjoying', 'reading', 'right', 'left'),
    relation('enjoying', 'writing', 'bottom', 'top'),
    relation('enjoying', 'building', 'bottom', 'top'),
    relation('enjoying', 'contact', 'right', 'left'),
  ],
  reading: [
    relation('reading', 'writing', 'bottom', 'top'),
    relation('reading', 'building', 'bottom', 'top'),
    relation('reading', 'contact', 'left', 'right'),
  ],
  writing: [
    relation('writing', 'building', 'right', 'left'),
    relation('writing', 'contact', 'right', 'left'),
  ],
  building: [relation('building', 'contact', 'left', 'right')],
}
const vectors: Record<NodeId, [number, number]> = {
  enjoying: [-9, -6],
  reading: [10, -8],
  writing: [-8, 8],
  building: [9, 7],
  contact: [3, -5],
}

function Entries({ entries }: { entries: Entry[] }) {
  if (!entries.length) return <p>To come.</p>
  return (
    <ul>
      {entries.map((entry, index) => (
        <li key={`${index}-${entry.title}`}>
          {entry.url ? (
            <a href={entry.url}>{entry.title}</a>
          ) : (
            <span>{entry.title}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function App({ data = content }: { data?: SiteContent }) {
  const boardRef = useRef<HTMLDivElement>(null)
  const archerRef = useRef<ArcherContainerRef>(null)
  useNetworkMotion(boardRef, archerRef)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <main id="main" className="page" tabIndex={-1}>
        <h1 className="sr-only">{data.name}</h1>
        <div className="stage" ref={boardRef}>
          <ArcherContainer
            ref={archerRef}
            className="network"
            strokeColor="var(--connection-color, #555)"
            strokeWidth={1}
            strokeDasharray="1 4"
            lineStyle="straight"
            endMarker={false}
            startMarker={false}
            svgContainerStyle={{ strokeLinecap: 'round' }}
          >
            <div className="documents">
              {data.sections.map((section) => (
                <div
                  className={`node-hitbox node-${section.id}`}
                  data-node={section.id}
                  data-hover-x={vectors[section.id][0]}
                  data-hover-y={vectors[section.id][1]}
                  key={section.id}
                >
                  <ArcherElement
                    id={section.id}
                    relations={connections[section.id]}
                  >
                    <section
                      className={`document document-${section.id}`}
                      id={section.id}
                      aria-labelledby={`${section.id}-heading`}
                    >
                      <header className="title-bar">
                        <h2 id={`${section.id}-heading`}>{section.label}</h2>
                      </header>
                      <div
                        className="window-pane"
                        tabIndex={0}
                        role="group"
                        aria-label={`${section.label} links`}
                      >
                        <Entries entries={section.entries} />
                      </div>
                    </section>
                  </ArcherElement>
                </div>
              ))}
              <div
                className="node-hitbox node-contact"
                data-node="contact"
                data-hover-x={vectors.contact[0]}
                data-hover-y={vectors.contact[1]}
              >
                <ArcherElement id="contact">
                  <section
                    className="document document-contact"
                    id="contact"
                    aria-labelledby="contact-heading"
                  >
                    <header className="title-bar">
                      <h2 id="contact-heading">Contact</h2>
                    </header>
                    <div
                      className="window-pane"
                      tabIndex={0}
                      role="group"
                      aria-label="Contact details"
                    >
                      <p className="person">{data.name}</p>
                      <Entries entries={data.contact} />
                    </div>
                  </section>
                </ArcherElement>
              </div>
            </div>
          </ArcherContainer>
        </div>
      </main>
    </>
  )
}
