import { useEffect, useRef, useState } from 'react'

export default function WireframeHead() {
  const container = useRef<HTMLSpanElement>(null)
  const controls = useRef<{ setPaused: (paused: boolean) => void } | null>(null)
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  )
  const canRotate = ready && !reducedMotion

  useEffect(() => {
    const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!preference) return
    const update = () => setReducedMotion(preference.matches)
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const host = container.current
    if (!host) return
    let active = true
    let dispose: (() => void) | undefined

    // Keep the still artwork while the optional 3D bundle loads.
    import('../lib/headScene').then(({ mountHeadScene }) => {
      if (!active) return
      const scene = mountHeadScene(host, (available) => {
        if (active) setReady(available)
      })
      controls.current = scene
      dispose = scene.dispose
    }).catch(() => { /* The original image remains usable without WebGL. */ })

    return () => {
      active = false
      controls.current = null
      dispose?.()
    }
  }, [])

  useEffect(() => {
    controls.current?.setPaused(paused)
  }, [paused, ready])

  return (
    <button
      className="head"
      type="button"
      aria-label={canRotate
        ? `${paused ? 'Resume' : 'Pause'} head rotation — wireframe interpretation of Brâncuși’s Danaïde`
        : 'Wireframe interpretation of Brâncuși’s Danaïde'}
      disabled={!canRotate}
      title={canRotate ? (paused ? 'Resume rotation' : 'Pause rotation') : undefined}
      onClick={() => setPaused((value) => !value)}
      data-ready={ready}
      data-paused={paused}
    >
      <img
        className="head-fallback"
        src="/art/brancusi-wireframe-v2.png"
        width="1086"
        height="1448"
        alt="Wireframe interpretation of Constantin Brâncuși’s Danaïde"
        draggable={false}
      />
      <span className="head-canvas" ref={container} aria-hidden="true" />
    </button>
  )
}
