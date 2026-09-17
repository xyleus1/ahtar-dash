import { StrictMode } from 'react'
import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SmoothScroll from '../components/SmoothScroll'
import { setMediaQuery } from './media'

const { activeCallbacks, raf } = vi.hoisted(() => ({
  activeCallbacks: new Set<(time: number) => void>(),
  raf: vi.fn(),
}))

vi.mock('gsap', () => ({
  gsap: {
    ticker: {
      add: (callback: (time: number) => void) => activeCallbacks.add(callback),
      remove: (callback: (time: number) => void) => activeCallbacks.delete(callback),
    },
  },
}))

vi.mock('lenis/react', async () => {
  const { useImperativeHandle } = await import('react')
  return {
    ReactLenis: function MockLenis({ ref }: { ref: React.Ref<unknown> }) {
      useImperativeHandle(ref, () => ({ lenis: { raf } }))
      return null
    },
  }
})

beforeEach(() => {
  activeCallbacks.clear()
  raf.mockClear()
})

describe('motion preferences and scroll lifecycle', () => {
  it('uses one ticker after a StrictMode mount and releases it when motion is disabled or the page unmounts', () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false)
    setMediaQuery('(hover: hover) and (pointer: fine)', true)
    const { unmount } = render(<StrictMode><SmoothScroll><p>Page content</p></SmoothScroll></StrictMode>)

    expect(activeCallbacks.size).toBe(1)
    for (const callback of activeCallbacks) callback(1.25)
    expect(raf).toHaveBeenCalledExactlyOnceWith(1250)
    expect(screen.getByText('Page content')).toBeVisible()

    act(() => setMediaQuery('(prefers-reduced-motion: reduce)', true))
    expect(activeCallbacks.size).toBe(0)
    expect(screen.getByText('Page content')).toBeVisible()

    act(() => setMediaQuery('(prefers-reduced-motion: reduce)', false))
    expect(activeCallbacks.size).toBe(1)
    unmount()
    expect(activeCallbacks.size).toBe(0)
  })

  it('leaves scrolling native for touch input and responds when the pointer changes', () => {
    setMediaQuery('(prefers-reduced-motion: reduce)', false)
    render(<SmoothScroll><p>Touch content</p></SmoothScroll>)

    expect(activeCallbacks.size).toBe(0)
    expect(screen.getByText('Touch content')).toBeVisible()
    act(() => setMediaQuery('(hover: hover) and (pointer: fine)', true))
    expect(activeCallbacks.size).toBe(1)
    act(() => setMediaQuery('(hover: hover) and (pointer: fine)', false))
    expect(activeCallbacks.size).toBe(0)
  })
})
