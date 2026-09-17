const queries = new Map<string, MediaQueryList>()

export function installMediaQueries() {
  queries.clear()
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) => {
      if (!queries.has(query)) {
        const events = new EventTarget()
        queries.set(query, {
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: events.addEventListener.bind(events),
          removeEventListener: events.removeEventListener.bind(events),
          dispatchEvent: events.dispatchEvent.bind(events),
        })
      }
      return queries.get(query)!
    },
  })
}

export function setMediaQuery(query: string, matches: boolean) {
  const media = window.matchMedia(query)
  Object.defineProperty(media, 'matches', { configurable: true, value: matches })
  media.dispatchEvent(new Event('change'))
}
