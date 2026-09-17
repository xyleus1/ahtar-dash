// Adapted from React Bits SpotlightCard (c49d6978d2496660f0f0c5a3b3ca77a059566a93).
// Copyright (c) 2026 David Haz. See THIRD_PARTY_NOTICES.md for the full license.
import { useRef, type MouseEventHandler, type PropsWithChildren } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'
import './SpotlightCard.css'

interface SpotlightCardProps extends PropsWithChildren {
  className?: string
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(179, 38, 45, 0.07)',
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const enabled = finePointer && !reducedMotion

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!enabled || !divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    divRef.current.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
    divRef.current.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
    divRef.current.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={enabled ? handleMouseMove : undefined}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  )
}
