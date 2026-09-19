import {
  Box3, Group, LineSegments, Mesh, OrthographicCamera, Scene, Vector3, WebGLRenderer,
} from 'three'
import { gsap } from 'gsap'
import { createHeadModel } from './headModel'

export function mountHeadScene(host: HTMLElement, onReady: (ready: boolean) => void) {
  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  } catch {
    return { setPaused: () => {}, dispose: () => {} }
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setClearColor(0xffffff, 0)
  host.appendChild(renderer.domElement)

  const scene = new Scene()
  const camera = new OrthographicCamera(-2, 2, 2, -2, 0.1, 50)
  camera.position.set(0, 0.12, 8)
  camera.lookAt(0, 0, 0)
  const pivot = new Group()
  const model = createHeadModel()
  const bounds = new Box3().setFromObject(model)
  const size = bounds.getSize(new Vector3())
  const center = bounds.getCenter(new Vector3())
  model.position.sub(center)
  const normalized = new Group()
  normalized.add(model)
  normalized.scale.setScalar(2.8 / size.y)
  pivot.add(normalized)
  scene.add(pivot)

  let disposed = false
  let contextLost = false
  let userPaused = false
  let inView = true
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const render = () => {
    if (!disposed && !contextLost) renderer.render(scene, camera)
  }
  const resize = () => {
    const { width, height } = host.getBoundingClientRect()
    if (!width || !height || disposed) return
    renderer.setSize(width, height, false)
    const aspect = width / height
    const halfHeight = Math.max(1.65, 1.3 / aspect)
    camera.left = -halfHeight * aspect
    camera.right = halfHeight * aspect
    camera.top = halfHeight
    camera.bottom = -halfHeight
    camera.updateProjectionMatrix()
    render()
  }

  // GSAP owns the clock, interpolation and seamless repeat. Three owns projection.
  const rotation = gsap.to(pivot.rotation, {
    id: 'head-rotation',
    y: Math.PI * 2,
    duration: 24,
    ease: 'none',
    repeat: -1,
    paused: true,
    onUpdate: render,
  })
  const updatePlayback = () => {
    rotation.paused(userPaused || reducedMotion.matches || document.hidden || !inView || contextLost)
  }
  const onMotionChange = () => { updatePlayback(); render() }
  const onContextLost = (event: Event) => {
    event.preventDefault()
    contextLost = true
    updatePlayback()
    onReady(false)
  }
  const onContextRestored = () => {
    contextLost = false
    resize()
    onReady(true)
    updatePlayback()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host)
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    updatePlayback()
  })
  visibilityObserver.observe(host)
  reducedMotion.addEventListener('change', onMotionChange)
  document.addEventListener('visibilitychange', updatePlayback)
  renderer.domElement.addEventListener('webglcontextlost', onContextLost)
  renderer.domElement.addEventListener('webglcontextrestored', onContextRestored)
  resize()
  onReady(true)
  updatePlayback()

  return {
    setPaused(paused: boolean) { userPaused = paused; updatePlayback() },
    dispose() {
      disposed = true
      rotation.kill()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      reducedMotion.removeEventListener('change', onMotionChange)
      document.removeEventListener('visibilitychange', updatePlayback)
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost)
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored)
      const geometries = new Set<Mesh['geometry']>()
      const materials = new Set<import('three').Material>()
      model.traverse((object) => {
        if (object instanceof Mesh || object instanceof LineSegments) {
          geometries.add(object.geometry)
          for (const material of [object.material].flat()) materials.add(material)
        }
      })
      geometries.forEach((geometry) => geometry.dispose())
      materials.forEach((material) => material.dispose())
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    },
  }
}
