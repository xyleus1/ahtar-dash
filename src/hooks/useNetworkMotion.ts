import { useLayoutEffect, useRef, type RefObject } from 'react'
import { flushSync } from 'react-dom'
import type { ArcherContainerRef } from 'react-archer'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(Draggable, useGSAP)

type WindowNode = {
  id: string
  hitbox: HTMLElement
  element: HTMLElement
  handle: HTMLButtonElement
  originalStyle: string | null
  handleStyle: string | null
  setX: (value: number) => void
  setY: (value: number) => void
  draggable?: Draggable
  startX: number
  startY: number
}

function restoreStyle(element: HTMLElement, style: string | null) {
  if (style === null) element.removeAttribute('style')
  else element.setAttribute('style', style)
}

/** Direct, bounded window movement; no autonomous or reduced-motion-sensitive animation. */
export default function useNetworkMotion(
  boardRef: RefObject<HTMLDivElement | null>,
  archerRef: RefObject<ArcherContainerRef | null>,
  onPositionsChange?: () => void,
) {
  const positionsCallback = useRef(onPositionsChange)
  useLayoutEffect(() => { positionsCallback.current = onPositionsChange }, [onPositionsChange])

  useGSAP((context) => {
    const board = boardRef.current
    const page = board?.closest<HTMLElement>('main.page')
    if (!board || !page) return

    let disposed = false
    let refreshQueued = false
    let boundsQueued = false
    let hovered: WindowNode | undefined
    let focused: WindowNode | undefined
    let dragging: WindowNode | undefined
    let front: WindowNode | undefined
    let focusHasPriority = false
    let zIndex = 1
    const removers: (() => void)[] = []

    const refresh = () => {
      if (disposed || refreshQueued) return
      refreshQueued = true
      // Draggable renders once per frame; keep Archer in that same frame.
      queueMicrotask(() => {
        refreshQueued = false
        if (disposed) return
        // Archer measures in React layout effects; commit before this frame paints.
        flushSync(() => {
          positionsCallback.current?.()
          archerRef.current?.refreshScreen()
        })
      })
    }

    const nodes = Array.from(board.querySelectorAll<HTMLElement>('.node-hitbox')).flatMap((hitbox) => {
      const element = hitbox.querySelector<HTMLElement>('.document')
      const handle = hitbox.querySelector<HTMLButtonElement>('.drag-handle')
      if (!element || !handle || !hitbox.dataset.node) return []
      return [{
        id: hitbox.dataset.node, hitbox, element, handle,
        originalStyle: hitbox.getAttribute('style'),
        handleStyle: handle.getAttribute('style'),
        setX: gsap.quickSetter(hitbox, 'x', 'px') as (value: number) => void,
        setY: gsap.quickSetter(hitbox, 'y', 'px') as (value: number) => void,
        startX: 0, startY: 0,
      } satisfies WindowNode] as WindowNode[]
    })

    const highlight = () => {
      const active = dragging ?? (focusHasPriority ? focused ?? hovered : hovered ?? focused)
      if (active) board.dataset.active = active.id
      else delete board.dataset.active
      for (const node of nodes) {
        if (node === active) node.element.dataset.active = 'true'
        else delete node.element.dataset.active
      }
    }
    const raise = (node: WindowNode) => {
      if (front === node) return
      node.hitbox.style.zIndex = String(++zIndex)
      front = node
    }
    const setPosition = (node: WindowNode, x: number, y: number) => {
      node.setX(x)
      node.setY(y)
      node.draggable?.update(true)
      refresh()
    }
    const viewportBounds = (node: WindowNode) => {
      const viewport = page.getBoundingClientRect()
      const window = node.hitbox.getBoundingClientRect()
      const x = Number(gsap.getProperty(node.hitbox, 'x'))
      const y = Number(gsap.getProperty(node.hitbox, 'y'))
      // Draggable rounds element bounds; round inward to retain fractional CSS edges.
      return {
        minX: Math.ceil(x + viewport.left - window.left),
        maxX: Math.floor(x + viewport.right - window.right),
        minY: Math.ceil(y + viewport.top - window.top),
        maxY: Math.floor(y + viewport.bottom - window.bottom),
      }
    }

    for (const node of nodes) {
      // Own disposal order: an active press must end before Draggable is killed.
      context.ignore(() => { node.draggable = Draggable.create(node.hitbox, {
        type: 'x,y',
        trigger: node.handle,
        bounds: viewportBounds(node),
        edgeResistance: 1,
        dragResistance: 0,
        inertia: false,
        autoScroll: 0,
        minimumMovement: 3,
        dragClickables: true,
        zIndexBoost: false,
        cursor: 'grab',
        activeCursor: 'grabbing',
        onPress(this: Draggable) {
          if (dragging && dragging !== node) dragging.draggable?.endDrag(dragging.draggable.pointerEvent)
          node.startX = this.x
          node.startY = this.y
          dragging = node
          board.dataset.dragging = node.id
          node.hitbox.dataset.dragging = 'true'
          raise(node)
          node.handle.focus({ preventScroll: true })
          highlight()
        },
        onDrag: refresh,
        onRelease() {
          if (disposed) return
          if (dragging === node) dragging = undefined
          delete board.dataset.dragging
          delete node.hitbox.dataset.dragging
          highlight()
          refresh()
        },
      })[0] })

      const enter = (event: PointerEvent) => {
        if (event.pointerType === 'touch' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
        hovered = node
        focusHasPriority = false
        highlight()
      }
      const leave = () => {
        if (hovered === node) hovered = undefined
        highlight()
      }
      const pointerMove = (event: PointerEvent) => {
        if (event.pointerType !== 'touch' && focusHasPriority) enter(event)
      }
      const focusIn = () => {
        focused = node
        focusHasPriority = true
        raise(node)
        highlight()
      }
      const focusOut = (event: FocusEvent) => {
        if (event.relatedTarget instanceof Node && node.hitbox.contains(event.relatedTarget)) return
        if (focused === node) focused = undefined
        highlight()
      }
      const keyDown = (event: KeyboardEvent) => {
        if (event.altKey || event.ctrlKey || event.metaKey || dragging) return
        const step = event.shiftKey ? 1 : 10
        const directions: Record<string, [number, number]> = {
          ArrowLeft: [-step, 0], ArrowRight: [step, 0],
          ArrowUp: [0, -step], ArrowDown: [0, step],
        }
        const delta = directions[event.key]
        if (!delta && event.key !== 'Home') return
        event.preventDefault()
        raise(node)
        node.draggable?.update()
        setPosition(node, delta ? (node.draggable?.x ?? 0) + delta[0] : 0,
          delta ? (node.draggable?.y ?? 0) + delta[1] : 0)
      }

      node.hitbox.addEventListener('pointerenter', enter)
      node.hitbox.addEventListener('pointerleave', leave)
      node.hitbox.addEventListener('pointermove', pointerMove)
      node.hitbox.addEventListener('focusin', focusIn)
      node.hitbox.addEventListener('focusout', focusOut)
      node.handle.addEventListener('keydown', keyDown)
      removers.push(() => {
        node.hitbox.removeEventListener('pointerenter', enter)
        node.hitbox.removeEventListener('pointerleave', leave)
        node.hitbox.removeEventListener('pointermove', pointerMove)
        node.hitbox.removeEventListener('focusin', focusIn)
        node.hitbox.removeEventListener('focusout', focusOut)
        node.handle.removeEventListener('keydown', keyDown)
      })
    }

    const cancelDrag = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !dragging) return
      event.preventDefault()
      const node = dragging
      node.draggable?.endDrag(node.draggable.pointerEvent)
      setPosition(node, node.startX, node.startY)
    }
    const releaseOnBlur = () => {
      if (dragging) dragging.draggable?.endDrag(dragging.draggable.pointerEvent)
    }
    const resize = () => {
      if (disposed || boundsQueued) return
      boundsQueued = true
      queueMicrotask(() => {
        boundsQueued = false
        if (disposed) return
        for (const node of nodes) node.draggable?.applyBounds(viewportBounds(node))
        refresh()
      })
    }
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(resize)
    observer?.observe(page)
    observer?.observe(board)
    nodes.forEach((node) => observer?.observe(node.hitbox))
    window.addEventListener('resize', resize)
    window.visualViewport?.addEventListener('resize', resize)
    window.addEventListener('keydown', cancelDrag)
    window.addEventListener('blur', releaseOnBlur)
    focused = nodes.find((node) => node.hitbox.contains(document.activeElement))
    highlight()
    refresh()

    return () => {
      disposed = true
      observer?.disconnect()
      removers.forEach((remove) => remove())
      window.removeEventListener('resize', resize)
      window.visualViewport?.removeEventListener('resize', resize)
      window.removeEventListener('keydown', cancelDrag)
      window.removeEventListener('blur', releaseOnBlur)
      delete board.dataset.active
      delete board.dataset.dragging
      for (const node of nodes) {
        if (node.draggable?.isPressed) node.draggable.endDrag(node.draggable.pointerEvent)
        node.draggable?.kill()
        restoreStyle(node.hitbox, node.originalStyle)
        restoreStyle(node.handle, node.handleStyle)
        delete node.hitbox.dataset.dragging
        delete node.element.dataset.active
      }
    }
  }, { scope: boardRef, dependencies: [boardRef, archerRef], revertOnUpdate: true })
}
