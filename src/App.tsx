import { useEffect } from 'react'
import { content, type Entry, type SiteContent } from './content'
import WireframeHead from './components/WireframeHead'

function Entries({
  entries,
  className,
}: {
  entries: Entry[]
  className?: string
}) {
  if (!entries.length) return <p className={className}>To come.</p>
  return (
    <ul className={className}>
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

export default function App({
  data = content,
  pathname = window.location.pathname,
}: {
  data?: SiteContent
  pathname?: string
}) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const isHome = path === '/'
  const section = data.sections.find((item) => path === `/${item.id}`)
  const title = isHome ? data.name : (section?.label ?? 'Page not found.')

  useEffect(() => {
    document.title = isHome ? 'ahtar — a personal index' : `${title} — ahtar`
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    )
    if (canonical) canonical.href = `https://ahtar.dev${isHome ? '/' : path}`
  }, [isHome, path, title])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <main id="main" className="page" tabIndex={-1}>
        <section
          className="text-panel"
          aria-labelledby="page-heading"
          tabIndex={0}
        >
          <div className="text-content">
            {!isHome && (
              <a className="home-link" href="/">
                Home
              </a>
            )}
            <h1 id="page-heading">{title}</h1>
            {isHome ? (
              <>
                <p className="bio">{data.bio}</p>
                <nav className="section-nav" aria-label="Sections">
                  <ul>
                    {data.sections.map((item) => (
                      <li key={item.id}>
                        <a href={`/${item.id}`}>{item.label}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
                {data.contact.length > 0 && (
                  <Entries entries={data.contact} className="contact-links" />
                )}
              </>
            ) : section ? (
              <Entries entries={section.entries} className="entry-list" />
            ) : null}
          </div>
        </section>
        <div className="art-panel">
          {isHome ? (
            <WireframeHead />
          ) : section ? (
            <p className="art-placeholder">Wireframe to come.</p>
          ) : null}
        </div>
      </main>
    </>
  )
}
