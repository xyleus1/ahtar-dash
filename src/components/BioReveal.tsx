// Adapted from React Bits SplitText (c49d6978d2496660f0f0c5a3b3ca77a059566a93).
// Copyright (c) 2026 David Haz. See THIRD_PARTY_NOTICES.md for the full license.
import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import useMediaQuery from '../hooks/useMediaQuery'

gsap.registerPlugin(SplitText, useGSAP)

interface BioRevealProps {
  text: string
  className?: string
}

/** A single masked entrance; the biography returns to native text afterwards. */
export default function BioReveal({ text, className = '' }: BioRevealProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const completedTextRef = useRef<string | null>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useGSAP(
    (_context, contextSafe) => {
      if (reducedMotion) {
        // Changing the preference back should not replay an already visible bio.
        completedTextRef.current = text
        return
      }
      if (!paragraphRef.current || !text || !contextSafe || completedTextRef.current === text) return

      let disposed = false
      let split: SplitText | undefined
      const startedAt = performance.now()

      // Native, readable text stays visible until its self-hosted font is ready.
      const reveal = contextSafe(() => {
        if (disposed || !paragraphRef.current) return

        split = SplitText.create(paragraphRef.current, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'bio-line',
          autoSplit: true,
          reduceWhiteSpace: false,
          aria: 'auto',
          // Returning the tween lets SplitText preserve progress on a resize.
          onSplit: (self) =>
            gsap.fromTo(
              self.lines,
              { yPercent: 105 },
              {
                yPercent: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.075,
                onComplete: () => {
                  completedTextRef.current = text
                  // Also disconnects SplitText's resize and font listeners.
                  self.revert()
                },
              },
            ),
        })
      })

      // Check this paragraph's face: fonts.ready can resolve before the browser selects it.
      const { fontStyle, fontWeight, fontSize, fontFamily } = window.getComputedStyle(paragraphRef.current)
      const fontSpec = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`

      if (document.fonts.check(fontSpec, text)) reveal()
      else {
        void document.fonts.load(fontSpec, text).then(
          () => {
            if (disposed) return
            // Do not hide text the visitor has already started reading on a slow font load.
            if (performance.now() - startedAt > 150) completedTextRef.current = text
            else reveal()
          },
          () => {
            // A failed font request keeps the readable fallback text static.
            if (!disposed) completedTextRef.current = text
          },
        )
      }

      return () => {
        disposed = true
        split?.revert()
      }
    },
    { scope: paragraphRef, dependencies: [text, reducedMotion], revertOnUpdate: true },
  )

  return (
    <p key={text} ref={paragraphRef} className={className}>
      {text}
    </p>
  )
}
