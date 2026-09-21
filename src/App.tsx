import { lazy, Suspense, useEffect, useRef } from 'react'
import { BrowserRouter, Link, useLocation } from 'react-router'
import { content, type Entry, type SiteContent } from './content'
import { memoryArticle } from './posts/memoryArticleInfo'
import GalleryCarousel from './GalleryCarousel'

const MemoryArticle = lazy(() => import('./posts/MemoryArticle'))

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

interface AppProps {
  data?: SiteContent
  pathname?: string
}

export default function App(props: AppProps) {
  return <BrowserRouter><Site {...props} /></BrowserRouter>
}

function Site({
  data = content,
  pathname,
}: AppProps) {
  const location = useLocation()
  const path = (pathname ?? location.pathname).replace(/\/+$/, '') || '/'
  const previousPath = useRef(path)
  const textPanel = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const isHome = path === '/'
  const isArticle = path === memoryArticle.path
  const section = data.sections.find((item) => path === `/${item.id}`)
  const title = isArticle
    ? memoryArticle.title
    : isHome ? data.name : (section?.label ?? 'Page not found.')

  useEffect(() => {
    document.title = isHome ? 'ahtar — a personal index' : `${title} — ahtar`
    const description = isArticle
      ? memoryArticle.subtitle
      : 'A personal index of things enjoyed, read, written, and built.'
    const metadata = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': document.title,
      'meta[property="og:description"]': description,
      'meta[property="og:type"]': isArticle ? 'article' : 'website',
      'meta[property="og:url"]': `https://ahtar.dev${isHome ? '/' : path}`,
    }
    for (const [selector, value] of Object.entries(metadata)) {
      document.querySelector(selector)?.setAttribute('content', value)
    }
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    )
    if (canonical) canonical.href = `https://ahtar.dev${isHome ? '/' : path}`
  }, [isHome, isArticle, path, title])

  useEffect(() => {
    if (previousPath.current === path) return
    previousPath.current = path
    if (textPanel.current) textPanel.current.scrollTop = 0
    if (window.scrollX || window.scrollY) window.scrollTo(0, 0)
    heading.current?.focus({ preventScroll: true })
  }, [path])

  if (isArticle) {
    return (
      <Suspense fallback={<p role="status">Loading article…</p>}>
        <MemoryArticle />
      </Suspense>
    )
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <main id="main" className="page" tabIndex={-1}>
        <section
          ref={textPanel}
          className="text-panel"
          aria-labelledby="page-heading"
          tabIndex={0}
        >
          <div className={`text-content${section?.groups?.length ? ' text-content-grouped' : ''}`}>
            {!isHome && (
              <Link className="home-link" to="/">
                Home
              </Link>
            )}
            <h1 id="page-heading" ref={heading} tabIndex={-1}>{title}</h1>
            {isHome ? (
              <>
                <p className="bio">{data.bio}</p>
                <nav className="section-nav" aria-label="Sections">
                  <ul>
                    {data.sections.map((item) => (
                      <li key={item.id}>
                        <Link to={`/${item.id}`}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                {data.contact.length > 0 && (
                  <Entries entries={data.contact} className="contact-links" />
                )}
              </>
            ) : section?.groups?.length ? (
              section.groups.map((group) => (
                <section className="entry-group" key={group.id} aria-labelledby={`${section.id}-${group.id}`}>
                  <h2 id={`${section.id}-${group.id}`}>{group.label}</h2>
                  <Entries
                    entries={group.entries}
                    className={`entry-list${group.columns ? ' entry-list-columns' : ''}`}
                  />
                </section>
              ))
            ) : section ? (
              <Entries entries={section.entries} className="entry-list" />
            ) : null}
          </div>
        </section>
        <div className="art-panel">
          {(isHome || section) && <GalleryCarousel />}
        </div>
      </main>
    </>
  )
}
