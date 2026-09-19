# Home artwork

The home page centers a real, spinning 3D wireframe interpretation of Constantin
Brancusi's *Danaïde*, c.1918, Tate T00296, in its right two-thirds. Its container
is up to 420px wide; below 701px it appears after the text, up to 240px wide.
Section pages retain blank artwork areas with "Wireframe to come."

## Current 3D interpretation

[`src/lib/headModel.ts`](../src/lib/headModel.ts) assembles Three.js
`LatheGeometry`, `TubeGeometry`, and `ConeGeometry` into an ovoid head, short
neck, and facial contours. Three.js provides the geometry tessellation and
WebGL rendering. The head is a stylized geometric interpretation of the
existing illustration, not a museum scan, an exact reconstruction, or a raster
image transformed in 3D. It has actual surfaces visible as it turns.

GSAP rotates the model through 360 degrees around its vertical axis every 24
seconds with linear easing and an indefinite repeat. The head itself is the
pause/resume button and supports pointer and keyboard activation. Reduced
motion starts the model still. Rendering stops while offscreen or while the
document is hidden. The PNG below remains the loading, WebGL-failure, and
context-loss fallback.

A [Danaïde model by Santiago.Torres](https://sketchfab.com/3d-models/danaide-constantin-brancusi-02de23ed872b477a8d2d061356a9bc45)
was considered during asset research. Its listing specifies CC BY 4.0, but the
download requires a Sketchfab login. That model is not included, loaded, or
used by this site. No third-party sculpture model is bundled.

## Retained image fallback

[`public/art/brancusi-wireframe-v2.png`](../public/art/brancusi-wireframe-v2.png)
is the existing transparent, 1086 × 1448 PNG wireframe interpretation. The
original photograph is not shipped. No new section artwork has been generated.

Source: the [user-supplied Tate exhibition photograph](https://media.tate.org.uk/aztate-prd-ew-dg-wgtail-st1-ctr-data/images/.width-840_fK7Ago5.format-webp.webp).
Identification: [Tate collection metadata](https://github.com/tategallery/collection/blob/master/artworks/t/002/t00296-1430.json)
and [Tate object page](https://www.tate.org.uk/art/artworks/brancusi-danaide-t00296).

Created with the built-in imagegen tool, using the supplied photo as the first
edit target. A second edit strengthened the linework for its original small
corner placement. The current design retains that asset as a fallback without
regeneration. The selected PNG retains its generated alpha channel without
manual image edits. The exact historical prompts below remain unchanged;
references to an 80px corner ornament describe the original request.

## Initial prompt

> Use case: style-transfer. Asset type: a small website corner ornament, transparent PNG, portrait composition. Transform the supplied reference photograph of Constantin Brancusi's Danaide into a precise sparse black wireframe outline drawing. Preserve the exact head silhouette, camera angle, elongated egg-shaped cranium, paired arched closed eye contours descending into the narrow long nose, tiny mouth and tapered short neck from this specific photo. Show only the sculpture's head and neck; remove the rectangular stone plinth, table, photographic background, bronze materials, all lighting and all shadows. Draw a crisp continuous outer contour, accurately traced facial contours, and a sparse structured set of thin curved wireframe meridians and cross-section lines that describe its smooth three-dimensional volume. A quiet early computer CAD rendering, not a dense triangular mesh, not a generic human bust. All lines charcoal black #171717, uniform weight, transparent everywhere between lines. No gray fill, no hatching, no textures, no color, no glow, no text, no labels, no frame. Keep the entire head and short neck visible with a tight but uncropped margin. It will be shown only 80 pixels wide, so preserve recognition and simplify internal detail enough for that size. Genuinely transparent alpha background, high resolution, clean antialiased edges.

## Selected refinement prompt

> Edit this exact transparent black wireframe drawing for legibility as a tiny website corner ornament. Preserve every contour, mesh line, silhouette, facial feature, neck, orientation, framing, and transparent background exactly as they are. Change only the stroke weight: make all the existing black wireframe lines approximately three times thicker, cleanly and uniformly. Keep thin interior lines slightly lighter in weight than the outer contour and facial feature outlines. Do not add any lines, fills, background, shadows, colors, labels, text, or objects. Crisp charcoal black lines with genuine transparent alpha between them. The drawing will be displayed at about 80 pixels wide, so all facial features must survive the reduction. Output a high-resolution transparent PNG.
