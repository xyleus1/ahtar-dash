import {
  CatmullRomCurve3, ConeGeometry, EdgesGeometry, Group, LatheGeometry,
  LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, SplineCurve,
  TubeGeometry, Vector2, Vector3,
} from 'three'

/** A geometric interpretation of the existing illustration, not a museum scan.
 * Three.js supplies the surfaces and curve tessellation; no raster image is spun.
 */
export function createHeadModel() {
  const head = new Group()
  const paper = new MeshBasicMaterial({
    color: 0xffffff, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
  })
  const wire = new MeshBasicMaterial({ color: 0x171717, wireframe: true })
  const ink = new MeshBasicMaterial({ color: 0x171717 })
  const profile = new SplineCurve([
    [0.28, -1.45], [0.34, -1.32], [0.38, -1.12],
    [0.39, -0.91], [0.42, -0.73], [0.52, -0.56], [0.68, -0.29],
    [0.78, 0.06], [0.80, 0.43], [0.74, 0.80], [0.60, 1.14],
    [0.36, 1.39], [0.18, 1.50], [0, 1.53],
  ].map(([x, y]) => new Vector2(x, y)))
  const surface = new LatheGeometry([new Vector2(0, -1.45), ...profile.getPoints(24)], 24)
  // The ovoid is slightly flatter through the face than across the temples.
  surface.scale(1, 1, 0.86)
  // Three's edge extractor keeps the surface grid without triangulation diagonals.
  const grid = new LineSegments(new EdgesGeometry(surface, 1), new LineBasicMaterial({ color: 0x171717 }))
  head.add(new Mesh(surface, paper), grid)

  function contour(points: number[][], radius = 0.009) {
    const path = new CatmullRomCurve3(points.map(([x, y, z]) => new Vector3(x, y, z)))
    head.add(new Mesh(new TubeGeometry(path, 32, radius, 4, false), ink))
  }
  // Raised brows and closed eyelids follow the sculpture's long nose bridge.
  for (const side of [-1, 1]) {
    contour([
      [side * 0.66, 0.31, 0.39], [side * 0.50, 0.53, 0.53],
      [side * 0.29, 0.59, 0.64], [side * 0.13, 0.46, 0.69],
      [side * 0.07, 0.17, 0.71], [side * 0.045, -0.21, 0.69],
    ])
    contour([
      [side * 0.65, 0.16, 0.40], [side * 0.47, 0.35, 0.59],
      [side * 0.27, 0.39, 0.66], [side * 0.12, 0.25, 0.70],
    ], 0.007)
  }
  const noseGeometry = new ConeGeometry(0.08, 0.78, 4, 2)
  noseGeometry.scale(0.65, 1, 0.6)
  noseGeometry.translate(0, 0.10, 0.63)
  head.add(new Mesh(noseGeometry, paper), new Mesh(noseGeometry, wire))
  contour([[-0.10, -0.40, 0.51], [0, -0.42, 0.56], [0.10, -0.40, 0.51]], 0.007)
  head.rotation.y = -0.16
  return head
}
