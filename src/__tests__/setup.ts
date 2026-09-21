import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Embla needs browser layout APIs; its motion and state are checked in real-browser QA.
vi.mock('embla-carousel-react', () => ({
  default: () => [() => {}, undefined],
}))

afterEach(() => {
  cleanup()
  window.history.replaceState(null, '', '/')
})
