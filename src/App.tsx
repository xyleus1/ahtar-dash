import { lazy, Suspense, useEffect } from 'react'
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

export default function App({
  data = content,
  pathname = window.location.pathname,
}: {
  data?: SiteContent
  pathname?: string
}) {
  const path = pathname.replace(/\/+$/, '') || '/'
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
            <GalleryCarousel />
          ) : section ? (
            <p className="art-placeholder">Wireframe to come.</p>
          ) : null}
        </div>
      </main>
    </>
  )
}
