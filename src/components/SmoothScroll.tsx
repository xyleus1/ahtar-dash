import { useEffect, useRef, type PropsWithChildren } from 'react'
import { gsap } from 'gsap'
import { ReactLenis, type LenisRef } from 'lenis/react'
import 'lenis/dist/lenis.css'
import useMediaQuery from '../hooks/useMediaQuery'

const scrollOptions = {
  autoRaf: false,
  smoothWheel: true,
  syncTouch: false,
  lerp: 0.12,
  anchors: true,
}

export default function SmoothScroll({ children }: PropsWithChildren) {
  const lenisRef = useRef<LenisRef>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const enabled = finePointer && !reducedMotion

  useEffect(() => {
    if (!enabled) return
    const update = (seconds: number) => lenisRef.current?.lenis?.raf(seconds * 1000)
    gsap.ticker.add(update)
    return () => gsap.ticker.remove(update)
  }, [enabled])

  return (
    <>
      {enabled && <ReactLenis root options={scrollOptions} ref={lenisRef} />}
      {children}
    </>
  )
}
