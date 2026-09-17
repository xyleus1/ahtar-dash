type Box = { left: number; top: number; width: number; height: number }
type Side = 'top' | 'bottom' | 'left' | 'right'

/** Attach to the side intersected by the line between the two window centers. */
export function connectionAnchors(source: Box, target: Box): [Side, Side] {
  const dx = target.left + target.width / 2 - source.left - source.width / 2
  const dy = target.top + target.height / 2 - source.top - source.height / 2
  const facingSide = (box: Box, x: number, y: number): Side => {
    if (
      Math.abs(x) / Math.max(box.width, 1) >=
      Math.abs(y) / Math.max(box.height, 1)
    ) {
      return x >= 0 ? 'right' : 'left'
    }
    return y >= 0 ? 'bottom' : 'top'
  }
  if (dx === 0 && dy === 0) return ['right', 'left']
  return [facingSide(source, dx, dy), facingSide(target, -dx, -dy)]
}
