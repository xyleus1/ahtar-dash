# ahtar.dev implementation brief

## Current intent

Create a more deliberate, retro personal desktop: four connected topic windows
and a distinct red Contact window on pure white. Keep all five inside one
viewport across desktop and mobile, with no outer-page scrolling or hero.
Hover should move windows and their attached connections. This supersedes the
static, vertically stacked wireframe version. The selected layout uses asymmetrical placement and thin Macintosh caption rules.

## Implementation direction

1. Retain React, TypeScript, Vite, plain CSS, and one npm lockfile. Use
   `@sakun/system.css` for monochrome Macintosh window framing, `react-archer`
   for connections, and GSAP with `@gsap/react` for hover motion and cleanup.
2. Arrange Enjoying, Reading, Writing, and Building at the corners of a compact
   composition with Contact as the red central hub. Use small serif contents
   and compact library caption bars. Include the name inside Contact.
3. Size the composition against the viewport and recompose it at narrow or
   short sizes so all windows remain visible. Keep overflow inside individual
   content panes when lists outgrow them; do not expand the outer document.
4. Preserve the topic relationships while windows move. Use bounded hover
   offsets and update connector geometry throughout movement. Keep lines behind
   content and hit targets stable. Avoid idle loops and entrance choreography.
5. Give reduced-motion users a static layout with clear focus/state feedback.
   Touch interaction must work without hover. Maintain semantic headings,
   keyboard access, visible focus, and usable link targets.
6. Keep `name`, the four section arrays, and contact entries in `src/content.ts`.
   Entries accept a title and optional URL; absent URLs remain text. Keep the
   section IDs stable. Do not restore a bio field or invent personal content.
7. Exclude fake status metadata, nonfunctional close/minimize controls, photos,
   glow, and extra decorative widgets. Lenis and React Bits reveal components
   remain excluded. Preserve the licensed favicon and existing route behavior.

The [design direction](design-direction.md) records all reference sources,
comparison rationale, and the boundaries of the selected window treatment.

## Verification before publication

- Check all five windows fit at desktop, mobile, short-height, and landscape
  sizes, with no document scrolling or horizontal overflow.
- Exercise window hover, exit, interruption, resize, and repeated movement;
  lines must remain attached and readable links must remain easy to select.
- Check populated and empty lists, long titles, internal pane overflow,
  keyboard navigation, reduced motion, and touch behavior.
- Complete visual review, lint, tests, and the production build for each change.
  The initial iteration passed lint, five component tests, production build, and
  fresh-browser checks for viewport fit, motion, native clicks, keyboard, touch,
  reduced motion, and connector alignment.

## Publishing

Deploy a preview using Vercel CLI **59.20.0** from the checkout linked to the
existing ahtar.dev project. After validation, publish the reviewed version with
`npx vercel@59.20.0 --prod` and record the previous deployment for rollback.

GitHub pushes run CI only. Vercel Git deployment remains pending GitHub app
access to `xyleus1/ahtar-dash`; do not treat a push as publication. Once access
is granted, connect production branch `main` and verify an actual deployment.

After publishing, verify the intended version at ahtar.dev, production assets,
HTTPS, the `www` redirect, legacy `/dash` redirects, and unknown-route 404 status.
