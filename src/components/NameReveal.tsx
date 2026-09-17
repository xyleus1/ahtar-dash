// Adapted from React Bits SplitText (c49d6978d2496660f0f0c5a3b3ca77a059566a93).
// Copyright (c) 2026 David Haz. See THIRD_PARTY_NOTICES.md for the full license.
import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import useMediaQuery from '../hooks/useMediaQuery'

gsap.registerPlugin(SplitText, useGSAP)

interface NameRevealProps {
  text: string
  className?: string
}

/** React Bits' word-splitting reveal, scoped to the page's single heading. */
export default function NameReveal({ text, className = '' }: NameRevealProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useGSAP(
    (_context, contextSafe) => {
      if (reducedMotion || !headingRef.current || !text || !contextSafe) return

      let disposed = false
      let split: SplitText | undefined
      // Keep the original text visible while the self-hosted font is loading.
      const reveal = contextSafe(() => {
        if (disposed || !headingRef.current) return
        split = new SplitText(headingRef.current, {
          type: 'words',
          smartWrap: true,
          wordsClass: 'split-word',
          reduceWhiteSpace: false,
          aria: 'auto',
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.045,
                force3D: true,
                clearProps: 'transform,opacity',
              },
            ),
        })
      })

      if (document.fonts.status === 'loaded') reveal()
      else void document.fonts.ready.then(reveal)

      return () => {
        disposed = true
        split?.revert()
      }
    },
    { scope: headingRef, dependencies: [text, reducedMotion], revertOnUpdate: true },
  )

  return (
    <h1 ref={headingRef} className={`split-parent ${className}`}>
      {text}
    </h1>
  )
}
