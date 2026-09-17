import BioReveal from './components/BioReveal'
import SmoothScroll from './components/SmoothScroll'
import { content, type Entry, type SiteContent } from './content'

function TextLink({ entry }: { entry: Entry }) {
  return entry.url
    ? <a href={entry.url}>{entry.title}</a>
    : <span>{entry.title}</span>
}

export default function App({ data = content }: { data?: SiteContent }) {
  return (
    <SmoothScroll>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="page">
        <header className="masthead">
          <h1>{data.name}</h1>
        </header>

        <main id="main" tabIndex={-1}>
          <BioReveal text={data.bio.join(' ')} className="bio" />

          <div className="index">
            <dl className="interests" aria-label="Personal interests">
              {data.sections.map((topic) => (
                <div className="interest" id={topic.id} key={topic.id}>
                  <dt>{topic.label}</dt>
                  <dd>
                    {topic.entries.length ? (
                      <ul>
                        {topic.entries.map((entry, index) => (
                          <li key={`${index}-${entry.title}`}><TextLink entry={entry} /></li>
                        ))}
                      </ul>
                    ) : <span>To come.</span>}
                  </dd>
                </div>
              ))}
            </dl>

            <nav className="contact" aria-label="Contact">
              <ul>
                {data.contact.map((entry, index) => (
                  <li key={`${index}-${entry.title}`}><TextLink entry={entry} /></li>
                ))}
                {data.contact.length === 0 && <li>Contact details to come.</li>}
              </ul>
            </nav>
          </div>
        </main>
      </div>
    </SmoothScroll>
  )
}
