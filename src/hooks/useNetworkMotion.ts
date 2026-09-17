import type { RefObject } from 'react'
import type { ArcherContainerRef } from 'react-archer'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import useMediaQuery from './useMediaQuery'

gsap.registerPlugin(useGSAP)

type NodeMotion = {
  id: string
  hitbox: HTMLElement
  element: HTMLElement
  x: number
  y: number
  xTo?: ReturnType<typeof gsap.quickTo>
  yTo?: ReturnType<typeof gsap.quickTo>
}

const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value))
const vector = (value: string | undefined) => clamp(Number(value) || 0, 12)

/** Move registered documents, measuring their connections only while they move. */
export default function useNetworkMotion(
  boardRef: RefObject<HTMLDivElement | null>,
  archerRef: RefObject<ArcherContainerRef | null>,
) {
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useGSAP(() => {
    const board = boardRef.current
    if (!board) return

    let disposed = false
    let refreshQueued = false
    let hovered: NodeMotion | undefined
    let focused: NodeMotion | undefined
    let pressed: NodeMotion | undefined
    let focusHasPriority = false
    const removers: (() => void)[] = []
    const canMove = finePointer && !reducedMotion

    const refresh = () => {
      if (disposed || refreshQueued) return
      refreshQueued = true
      // Coalesce x/y updates within this frame, rather than waiting another frame.
      queueMicrotask(() => {
        refreshQueued = false
        if (!disposed) archerRef.current?.refreshScreen()
      })
    }

    const nodes = Array.from(board.querySelectorAll<HTMLElement>('.node-hitbox')).flatMap((hitbox) => {
      const element = hitbox.querySelector<HTMLElement>('.document')
      if (!element || !hitbox.dataset.node) return []
      const node: NodeMotion = {
        id: hitbox.dataset.node,
        hitbox,
        element,
        x: vector(hitbox.dataset.hoverX),
        y: vector(hitbox.dataset.hoverY),
      }
      if (canMove) {
        // These reusable tweens are created inside the GSAP context for cleanup.
        const options = { duration: 0.35, ease: 'power3.out', onUpdate: refresh, onComplete: refresh }
        node.xTo = gsap.quickTo(element, 'x', options)
        node.yTo = gsap.quickTo(element, 'y', options)
      }
      return [node]
    })

    const highlight = () => {
      const active = focusHasPriority ? focused ?? hovered : hovered ?? focused
      if (active) board.dataset.active = active.id
      else delete board.dataset.active
      for (const node of nodes) {
        if (node === active) node.element.dataset.active = 'true'
        else delete node.element.dataset.active
      }
    }

    const reset = (node: NodeMotion) => {
      node.xTo?.(0)
      node.yTo?.(0)
    }

    const move = (node: NodeMotion, event: PointerEvent) => {
      if (!canMove || pressed || event.buttons || event.pointerType === 'touch') return
      const bounds = node.hitbox.getBoundingClientRect()
      const x = bounds.width ? clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 8, 4) : 0
      const y = bounds.height ? clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 8, 4) : 0
      node.xTo?.(node.x + x)
      node.yTo?.(node.y + y)
    }

    for (const node of nodes) {
      const enter = (event: PointerEvent) => {
        if (!finePointer || event.pointerType === 'touch') return
        if (hovered && hovered !== node && hovered !== pressed) reset(hovered)
        hovered = node
        focusHasPriority = false
        highlight()
        move(node, event)
      }
      const leave = () => {
        if (hovered === node) hovered = undefined
        if (pressed !== node) reset(node)
        highlight()
      }
      const pointerMove = (event: PointerEvent) => {
        if (finePointer && event.pointerType !== 'touch') {
          if (hovered !== node) enter(event)
          else {
            if (focusHasPriority) {
              focusHasPriority = false
              highlight()
            }
            move(node, event)
          }
        }
      }
      const down = (event: PointerEvent) => {
        if (!canMove || event.pointerType === 'touch') return
        pressed = node
        // Keep the native link under the pointer throughout press, release, and click.
        node.xTo?.tween.pause()
        node.yTo?.tween.pause()
        refresh()
      }
      const focusIn = () => {
        focused = node
        focusHasPriority = true
        highlight()
      }
      const focusOut = (event: FocusEvent) => {
        if (event.relatedTarget instanceof Node && node.hitbox.contains(event.relatedTarget)) return
        if (focused === node) focused = undefined
        highlight()
      }

      node.hitbox.addEventListener('pointerenter', enter)
      node.hitbox.addEventListener('pointerleave', leave)
      node.hitbox.addEventListener('pointermove', pointerMove)
      node.hitbox.addEventListener('pointerdown', down)
      node.hitbox.addEventListener('focusin', focusIn)
      node.hitbox.addEventListener('focusout', focusOut)
      removers.push(() => {
        node.hitbox.removeEventListener('pointerenter', enter)
        node.hitbox.removeEventListener('pointerleave', leave)
        node.hitbox.removeEventListener('pointermove', pointerMove)
        node.hitbox.removeEventListener('pointerdown', down)
        node.hitbox.removeEventListener('focusin', focusIn)
        node.hitbox.removeEventListener('focusout', focusOut)
      })
    }

    const release = () => {
      const released = pressed
      pressed = undefined
      if (released && released !== hovered) reset(released)
    }
    const cancel = () => {
      hovered = undefined
      pressed = undefined
      nodes.forEach(reset)
      highlight()
    }
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', cancel)
    window.addEventListener('blur', cancel)
    focused = nodes.find((node) => node.hitbox.contains(document.activeElement))
    highlight()
    // Re-measure after preference changes have restored the original transforms.
    refresh()

    return () => {
      disposed = true
      removers.forEach((remove) => remove())
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', cancel)
      window.removeEventListener('blur', cancel)
      delete board.dataset.active
      for (const node of nodes) {
        node.xTo?.tween.revert()
        node.yTo?.tween.revert()
        delete node.element.dataset.active
      }
      // Preference changes restore geometry immediately; detached boards need no update.
      if (board.isConnected && boardRef.current === board) archerRef.current?.refreshScreen()
    }
  }, { scope: boardRef, dependencies: [boardRef, archerRef, finePointer, reducedMotion], revertOnUpdate: true })
}
