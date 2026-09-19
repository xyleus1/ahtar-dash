import { StrictMode } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Box3, Group, LineSegments, Mesh, OrthographicCamera, Scene, Vector3, type Material } from 'three'
import { gsap } from 'gsap'
import WireframeHead from '../components/WireframeHead'
import { mountHeadScene } from '../lib/headScene'

const rendererState = vi.hoisted(() => ({
  unavailable: false,
  instances: [] as {
    domElement: HTMLCanvasElement
    render: ReturnType<typeof vi.fn>
    dispose: ReturnType<typeof vi.fn>
    forceContextLoss: ReturnType<typeof vi.fn>
  }[],
}))

vi.mock('three', async (importOriginal) => {
  const actual = await importOriginal<typeof import('three')>()
  return {
    ...actual,
    WebGLRenderer: class {
      domElement = document.createElement('canvas')
      setPixelRatio = vi.fn()
      setClearColor = vi.fn()
      setSize = vi.fn()
      render = vi.fn()
      dispose = vi.fn()
      forceContextLoss = vi.fn()

      constructor() {
        if (rendererState.unavailable) throw new Error('WebGL unavailable')
        rendererState.instances.push(this)
      }
    },
  }
})

class ResizeObserverStub {
  observe = vi.fn()
  disconnect = vi.fn()
  constructor() { resizeObservers.push(this) }
}

class IntersectionObserverStub {
  observe = vi.fn()
  disconnect = vi.fn()
  constructor(private callback: IntersectionObserverCallback) {
    intersectionObservers.push(this)
  }
  setVisible(isIntersecting: boolean) {
    this.callback([{ isIntersecting } as IntersectionObserverEntry], this as unknown as IntersectionObserver)
  }
}

const resizeObservers: ResizeObserverStub[] = []
const intersectionObservers: IntersectionObserverStub[] = []
const scenes: ReturnType<typeof mountHeadScene>[] = []
const hosts: HTMLElement[] = []
let motion: EventTarget & { matches: boolean }
let hidden = false

function mount() {
  const host = document.createElement('div')
  document.body.append(host)
  hosts.push(host)
  vi.spyOn(host, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 400, 560))
  const ready = vi.fn()
  const controls = mountHeadScene(host, ready)
  scenes.push(controls)
  gsap.ticker.sleep()
  const renderer = rendererState.instances.at(-1)!
  const [scene, camera] = renderer.render.mock.calls[0] as [Scene, OrthographicCamera]
  const pivot = scene.children.find((child) => child instanceof Group) as Group
  const rotation = gsap.getTweensOf(pivot.rotation)[0]
  return { host, controls, renderer, scene, camera, pivot, rotation, ready }
}

beforeEach(() => {
  rendererState.unavailable = false
  rendererState.instances.length = 0
  resizeObservers.length = 0
  intersectionObservers.length = 0
  hidden = false
  motion = Object.assign(new EventTarget(), { matches: false })
  vi.stubGlobal('matchMedia', vi.fn(() => motion))
  vi.stubGlobal('ResizeObserver', ResizeObserverStub)
  vi.stubGlobal('IntersectionObserver', IntersectionObserverStub)
  vi.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden)
})

afterEach(() => {
  scenes.splice(0).forEach((scene) => scene.dispose())
  hosts.splice(0).forEach((host) => host.remove())
  gsap.ticker.sleep()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('the wireframe head scene', () => {
  it('renders real centered mesh geometry and completes a continuous 360-degree turn', () => {
    const { scene, pivot, rotation, renderer, ready } = mount()
    const meshes: Mesh[] = []
    const grids: LineSegments[] = []
    scene.traverse((object) => {
      if (object instanceof Mesh) meshes.push(object)
      if (object instanceof LineSegments) grids.push(object)
    })
    expect(meshes.length).toBeGreaterThan(0)
    expect(grids.some((grid) => grid.geometry.getAttribute('position').count > 0)).toBe(true)
    expect(meshes.some((mesh) => [mesh.material].flat().some((material) => 'wireframe' in material && material.wireframe))).toBe(true)
    const bounds = new Box3().setFromObject(pivot)
    expect(bounds.getSize(new Vector3()).y).toBeCloseTo(2.8)
    expect(bounds.getCenter(new Vector3()).length()).toBeLessThan(0.00001)
    expect(ready).toHaveBeenLastCalledWith(true)
    expect(rotation.paused()).toBe(false)

    const duration = rotation.duration()
    rotation.totalTime(duration / 4)
    expect(pivot.rotation.y).toBeCloseTo(Math.PI / 2)
    rotation.totalTime(duration)
    expect(pivot.rotation.y).toBeCloseTo(Math.PI * 2)
    rotation.totalTime(duration * 1.25)
    expect(pivot.rotation.y).toBeCloseTo(Math.PI / 2)
    expect(renderer.render.mock.calls.length).toBeGreaterThan(3)
  })

  it('retains user pause through motion-preference changes and resumes only when allowed', () => {
    const { controls, rotation, pivot } = mount()
    rotation.totalTime(3)
    const angle = pivot.rotation.y
    motion.matches = true
    motion.dispatchEvent(new Event('change'))
    expect(rotation.paused()).toBe(true)
    expect(pivot.rotation.y).toBe(angle)
    controls.setPaused(false)
    expect(rotation.paused()).toBe(true)

    controls.setPaused(true)
    motion.matches = false
    motion.dispatchEvent(new Event('change'))
    expect(rotation.paused()).toBe(true)
    controls.setPaused(false)
    expect(rotation.paused()).toBe(false)
    expect(pivot.rotation.y).toBe(angle)
  })

  it('does not start rotating for an existing reduced-motion preference', () => {
    motion.matches = true
    const { rotation, renderer, pivot } = mount()
    expect(rotation.paused()).toBe(true)
    expect(pivot.rotation.y).toBe(0)
    expect(renderer.render).toHaveBeenCalled()
  })

  it('pauses offscreen, in hidden tabs, and on context loss, preserving user choice', () => {
    const { controls, rotation, renderer, ready } = mount()
    const observer = intersectionObservers[0]
    observer.setVisible(false)
    expect(rotation.paused()).toBe(true)
    hidden = true
    observer.setVisible(true)
    expect(rotation.paused()).toBe(true)
    hidden = false
    document.dispatchEvent(new Event('visibilitychange'))
    expect(rotation.paused()).toBe(false)

    const lost = new Event('webglcontextlost', { cancelable: true })
    renderer.domElement.dispatchEvent(lost)
    expect(lost.defaultPrevented).toBe(true)
    expect(rotation.paused()).toBe(true)
    expect(ready).toHaveBeenLastCalledWith(false)
    controls.setPaused(true)
    renderer.domElement.dispatchEvent(new Event('webglcontextrestored'))
    expect(ready).toHaveBeenLastCalledWith(true)
    expect(rotation.paused()).toBe(true)
  })

  it('releases its GPU resources and stops responding after disposal', () => {
    const { controls, host, scene, pivot, renderer } = mount()
    const geometries = new Set<Mesh['geometry']>()
    const materials = new Set<Material>()
    scene.traverse((object) => {
      if (object instanceof Mesh || object instanceof LineSegments) {
        geometries.add(object.geometry)
        for (const material of [object.material].flat()) materials.add(material)
      }
    })
    const disposals = [...geometries, ...materials].map((resource) => vi.spyOn(resource, 'dispose'))
    controls.dispose()
    scenes.splice(scenes.indexOf(controls), 1)
    const frames = renderer.render.mock.calls.length

    expect(gsap.getTweensOf(pivot.rotation)).toHaveLength(0)
    expect(disposals.every((dispose) => dispose.mock.calls.length === 1)).toBe(true)
    expect(resizeObservers[0].disconnect).toHaveBeenCalledOnce()
    expect(intersectionObservers[0].disconnect).toHaveBeenCalledOnce()
    expect(renderer.dispose).toHaveBeenCalledOnce()
    expect(renderer.forceContextLoss).toHaveBeenCalledOnce()
    expect(host.querySelector('canvas')).toBeNull()
    motion.matches = true
    motion.dispatchEvent(new Event('change'))
    document.dispatchEvent(new Event('visibilitychange'))
    renderer.domElement.dispatchEvent(new Event('webglcontextrestored'))
    expect(renderer.render).toHaveBeenCalledTimes(frames)
  })

  it('keeps the fallback usable when WebGL cannot be initialized', () => {
    rendererState.unavailable = true
    const host = document.createElement('div')
    const ready = vi.fn()
    const controls = mountHeadScene(host, ready)
    expect(host.querySelector('canvas')).toBeNull()
    expect(ready).not.toHaveBeenCalledWith(true)
    expect(() => { controls.setPaused(true); controls.dispose() }).not.toThrow()
  })
})

describe('the artwork control', () => {
  it('supports pause/resume and cleans up its single StrictMode scene', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 400, 560))
    const { unmount } = render(<StrictMode><WireframeHead /></StrictMode>)
    const button = screen.getByRole('button', { name: /wireframe interpretation/i })
    expect(button).toBeDisabled()
    await waitFor(() => expect(button).toHaveAttribute('data-ready', 'true'))
    expect(button).toBeEnabled()
    expect(button).toHaveAccessibleName(/pause head rotation.*wireframe interpretation/i)
    expect(rendererState.instances).toHaveLength(1)
    const renderer = rendererState.instances[0]
    const scene = renderer.render.mock.calls[0][0] as Scene
    const pivot = scene.children[0] as Group
    const rotation = gsap.getTweensOf(pivot.rotation)[0]
    gsap.ticker.sleep()

    act(() => { fireEvent.click(button) })
    expect(button).toHaveAccessibleName(/resume head rotation/i)
    expect(rotation.paused()).toBe(true)
    act(() => { fireEvent.click(button) })
    expect(button).toHaveAccessibleName(/pause head rotation/i)
    expect(rotation.paused()).toBe(false)

    act(() => { renderer.domElement.dispatchEvent(new Event('webglcontextlost', { cancelable: true })) })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('data-ready', 'false')
    expect(button).toHaveAccessibleName(/^wireframe interpretation/i)
    act(() => { renderer.domElement.dispatchEvent(new Event('webglcontextrestored')) })
    expect(button).toBeEnabled()
    expect(button).toHaveAccessibleName(/pause head rotation/i)
    unmount()
    expect(gsap.getTweensOf(pivot.rotation)).toHaveLength(0)
    expect(renderer.dispose).toHaveBeenCalledOnce()
  })

  it('keeps the still artwork descriptive and disables rotation for reduced motion', async () => {
    motion.matches = true
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 400, 560))
    const { unmount } = render(<WireframeHead />)
    const button = screen.getByRole('button', { name: /^wireframe interpretation/i })
    await waitFor(() => expect(button).toHaveAttribute('data-ready', 'true'))
    const renderer = rendererState.instances[0]
    const scene = renderer.render.mock.calls[0][0] as Scene
    const pivot = scene.children[0] as Group
    const rotation = gsap.getTweensOf(pivot.rotation)[0]
    gsap.ticker.sleep()

    expect(button).toBeDisabled()
    expect(rotation.paused()).toBe(true)
    act(() => { fireEvent.click(button) })
    expect(button).toHaveAttribute('data-paused', 'false')
    expect(rotation.paused()).toBe(true)

    act(() => { motion.matches = false; motion.dispatchEvent(new Event('change')) })
    expect(button).toBeEnabled()
    expect(button).toHaveAccessibleName(/pause head rotation/i)
    expect(rotation.paused()).toBe(false)
    act(() => { fireEvent.click(button) })
    expect(rotation.paused()).toBe(true)

    act(() => { motion.matches = true; motion.dispatchEvent(new Event('change')) })
    expect(button).toBeDisabled()
    expect(button).toHaveAccessibleName(/^wireframe interpretation/i)
    act(() => { motion.matches = false; motion.dispatchEvent(new Event('change')) })
    expect(button).toBeEnabled()
    expect(button).toHaveAccessibleName(/resume head rotation/i)
    expect(rotation.paused()).toBe(true)
    unmount()
  })

  it('keeps the original artwork available without offering an inoperative WebGL control', async () => {
    rendererState.unavailable = true
    const { unmount } = render(<WireframeHead />)
    await act(async () => { await vi.dynamicImportSettled() })

    const button = screen.getByRole('button', { name: /^wireframe interpretation/i })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('data-ready', 'false')
    expect(screen.getByRole('img', { name: /wireframe interpretation/i }))
      .toHaveAttribute('src', '/art/brancusi-wireframe-v2.png')
    expect(button.querySelector('canvas')).toBeNull()
    expect(rendererState.instances).toHaveLength(0)
    act(() => { fireEvent.click(button) })
    expect(button).toHaveAttribute('data-paused', 'false')
    unmount()
  })
})
