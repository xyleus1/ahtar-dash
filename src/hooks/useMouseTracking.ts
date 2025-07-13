import { useRef, useEffect } from 'react'

export function useMouseTracking() {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Convert to percentage
      const xPercent = (x / rect.width) * 100
      const yPercent = (y / rect.height) * 100
      
      element.style.setProperty('--mouse-x', `${xPercent}%`)
      element.style.setProperty('--mouse-y', `${yPercent}%`)
    }

    const handleMouseLeave = () => {
      element.style.setProperty('--mouse-x', '50%')
      element.style.setProperty('--mouse-y', '50%')
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return elementRef
}