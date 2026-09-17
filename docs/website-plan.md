# ahtar.dev implementation brief

## Current intent

Create a more deliberate, retro personal desktop: four connected topic windows
and a distinct red Contact window on pure white. Keep all five inside one
viewport across desktop and mobile, with no outer-page scrolling or hero.
Visitors move windows by dragging their title bars; hover only highlights them.
The selected layout uses asymmetrical placement and thin Macintosh caption
rules, with a small wireframe Brancusi head in the top-right margin. This brief
supersedes automatic hover movement. Final verification and deployment of this
revision remain pending.

## Implementation direction

1. Retain React, TypeScript, Vite, plain CSS, and one npm lockfile. Use
   `@sakun/system.css` for monochrome Macintosh window framing, `react-archer`
   for connections, and GSAP Draggable with `@gsap/react` for dragging and cleanup.
2. Arrange Enjoying, Reading, Writing, and Building at the corners of a compact
   composition with Contact as the red central hub. Use small serif contents
   and compact library caption bars. Include the name inside Contact.
3. Size the composition against the viewport and recompose it at narrow or
   short sizes so all windows remain visible. Keep overflow inside individual
   content panes when lists outgrow them; do not expand the outer document.
4. Drag from title bars with a mouse or touch and retain positions until reload.
   Apply viewport bounds and clamp positions on resize. Update connector geometry
   during movement and switch to the nearest facing sides. Preserve six topic
   relationships and four Contact spokes, with lines behind the documents.
5. Make title bars keyboard-accessible: arrow keys move 10px, Shift+arrow moves
   1px, Home restores that window, and Escape cancels an active drag. Hover/focus
   highlight only. Reduced motion retains direct dragging and keyboard moves;
   omit automatic nudges, inertia, idle loops, and entrance choreography.
   Preserve usable links and independently scrollable content panes on touch.
6. Keep `name`, the four section arrays, and contact entries in `src/content.ts`.
   Entries accept a title and optional URL; absent URLs remain text. Keep the
   section IDs stable. Do not restore a bio field or invent personal content.
7. Add a small transparent PNG interpretation of Brancusi's *Danaïde* from the
   user-supplied Tate image using the built-in image tool. Keep it clear of all
   windows and non-interactive. Record exact prompts, selected asset, and source
   links in [artwork provenance](artwork.md), with credit in the notices.
8. Exclude fake status metadata, nonfunctional close/minimize controls, glow,
   and extra decorative widgets. Lenis and React Bits reveal components remain
   excluded. Preserve the licensed favicon and existing route behavior.

The [design direction](design-direction.md) records all reference sources,
comparison rationale, and the boundaries of the selected window treatment.

## Verification before publication

- Check all five windows fit at desktop, mobile, short-height, and landscape
  sizes, with no document scrolling or horizontal overflow.
- Exercise repeated mouse/touch dragging, bounds, resize clamping, retained
  positions, arrow/Shift+arrow moves, Home reset, and Escape cancellation.
  Lines must remain attached as their anchor sides change; hover must not move
  windows, and real links must remain easy to select.
- Check populated and empty lists, long titles, internal pane overflow,
  keyboard navigation, reduced motion, and touch behavior.
- Confirm the transparent head stays clear of the windows at every breakpoint.
- Complete visual review, lint, relevant tests, and the production build before
  publication. Prior hover-layout validation does not establish that this
  dragging/artwork revision has passed.

## Publishing

Deploy a preview using Vercel CLI **59.20.0** from the checkout linked to the
existing ahtar.dev project. After validation, publish the reviewed version with
`npx vercel@59.20.0 --prod` and record the previous deployment for rollback.

GitHub pushes run CI only. Vercel Git deployment remains pending GitHub app
access to `xyleus1/ahtar-dash`; do not treat a push as publication. Once access
is granted, connect production branch `main` and verify an actual deployment.

After publishing, verify the intended version at ahtar.dev, production assets,
HTTPS, the `www` redirect, legacy `/dash` redirects, and unknown-route 404 status.
