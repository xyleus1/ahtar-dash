import { useCallback, useRef, useState, type ComponentProps } from 'react'
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
import { connectionAnchors } from './lib/connectionAnchors'

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

const initialConnections: Record<SectionId, Relations> = {
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
  const [connections, setConnections] = useState(initialConnections)
  const updateConnections = useCallback(() => {
    const board = boardRef.current
    if (!board) return
    const boxes = new Map(
      Array.from(board.querySelectorAll<HTMLElement>('.document')).map(
        (node) => [node.id, node.getBoundingClientRect()],
      ),
    )
    setConnections((previous) => {
      let changed = false
      const next = { ...previous }
      for (const source of Object.keys(previous) as SectionId[]) {
        next[source] = previous[source].map((edge) => {
          const start = boxes.get(source)
          const end = boxes.get(edge.targetId)
          if (!start?.width || !end?.width) return edge
          const [sourceAnchor, targetAnchor] = connectionAnchors(start, end)
          if (
            sourceAnchor === edge.sourceAnchor &&
            targetAnchor === edge.targetAnchor
          )
            return edge
          changed = true
          return { ...edge, sourceAnchor, targetAnchor }
        })
      }
      return changed ? next : previous
    })
  }, [])
  useNetworkMotion(boardRef, archerRef, updateConnections)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <main id="main" className="page" tabIndex={-1}>
        <h1 className="sr-only">{data.name}</h1>
        <p id="drag-help" className="sr-only">
          Drag a title bar to move its window. Use arrow keys to move by ten
          pixels, or Shift and arrow keys for one pixel. Home resets this
          window. Escape cancels a drag.
        </p>
        <img
          className="corner-art"
          src="/art/brancusi-wireframe-v2.png"
          width="1086"
          height="1448"
          alt="Wireframe interpretation of Constantin Brâncuși’s Danaïde"
          draggable={false}
        />
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
            svgContainerStyle={{ strokeLinecap: 'round', overflow: 'visible' }}
          >
            <div className="documents">
              {data.sections.map((section) => (
                <div
                  className={`node-hitbox node-${section.id}`}
                  data-node={section.id}
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
                        <h2
                          id={`${section.id}-heading`}
                          aria-label={section.label}
                        >
                          <button
                            type="button"
                            className="drag-handle"
                            aria-label={`Move ${section.label} window`}
                            aria-describedby="drag-help"
                            title="Drag to move · Arrow keys to adjust · Home to reset"
                          >
                            <span>{section.label}</span>
                          </button>
                        </h2>
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
              <div className="node-hitbox node-contact" data-node="contact">
                <ArcherElement id="contact">
                  <section
                    className="document document-contact"
                    id="contact"
                    aria-labelledby="contact-heading"
                  >
                    <header className="title-bar">
                      <h2 id="contact-heading" aria-label="Contact">
                        <button
                          type="button"
                          className="drag-handle"
                          aria-label="Move Contact window"
                          aria-describedby="drag-help"
                          title="Drag to move · Arrow keys to adjust · Home to reset"
                        >
                          <span>Contact</span>
                        </button>
                      </h2>
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
