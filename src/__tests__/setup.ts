import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'
import { installMediaQueries } from './media'

beforeEach(() => {
  installMediaQueries()
  Object.defineProperty(document, 'fonts', {
    configurable: true,
    value: { status: 'loaded', ready: Promise.resolve() },
  })
})

afterEach(cleanup)
