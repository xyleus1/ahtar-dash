import { describe, expect, it } from 'vitest'
import { connectionAnchors } from '../lib/connectionAnchors'

describe('connections between rearranged windows', () => {
  const window = { left: 100, top: 100, width: 200, height: 100 }

  it('switches to the facing sides when another window crosses horizontally', () => {
    expect(connectionAnchors(window, { ...window, left: 600 })).toEqual([
      'right',
      'left',
    ])
    expect(connectionAnchors(window, { ...window, left: -300 })).toEqual([
      'left',
      'right',
    ])
  })

  it('uses the top or bottom when windows are stacked vertically', () => {
    expect(connectionAnchors(window, { ...window, top: 400 })).toEqual([
      'bottom',
      'top',
    ])
    expect(connectionAnchors(window, { ...window, top: -200 })).toEqual([
      'top',
      'bottom',
    ])
  })

  it('accounts for differently shaped windows along a diagonal', () => {
    const tall = { left: 0, top: 0, width: 100, height: 400 }
    const wide = { left: 300, top: 300, width: 400, height: 100 }
    expect(connectionAnchors(tall, wide)).toEqual(['right', 'top'])
  })

  it('keeps deterministic attachment sides for coincident windows', () => {
    expect(connectionAnchors(window, window)).toEqual(['right', 'left'])
  })
})
