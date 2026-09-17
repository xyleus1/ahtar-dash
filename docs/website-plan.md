# ahtar.dev implementation brief

## Current intent

Build a plain five-page personal index using Zygote's native serif typography.
The home page has biography and navigation in the left third and the existing
wireframe head centered in the right two-thirds. Each topic has a real URL and
bullet links, with its right column reserved for a future wireframe. This
supersedes the window, connector, and dragging interface.

## Implementation

1. Retain React, React DOM, TypeScript, Vite, plain CSS, and one npm lockfile.
   Remove GSAP, `@gsap/react`, `react-archer`, System.css, and the Chicago font.
2. Keep `name`, the editable `bio` string, four sections, and contact entries in
   `src/content.ts`. Entries accept a title and optional URL; absent URLs remain
   text. Empty section lists display "To come."
3. On `/`, show the name, biography, Enjoying/Reading/Writing/Building links, and
   quiet contact links. Center the existing transparent head in the right
   column at up to 420px wide. Do not generate another home image.
4. Use ordinary native links to `/enjoying`, `/reading`, `/writing`, and
   `/building`. Each page has a Home link, heading, and bullet entries on the
   left. The right column contains only "Wireframe to come." as a small text
   placeholder. Configure hosting to serve these URLs directly.
5. Use native Times at 18.4px, line height 1.4, white background, and muted red
   underlined links. Keep headings modest and preserve clear keyboard focus.
6. Above 700px, use viewport-fitted 1:2 columns with overflow only inside the
   accessible text pane. At 700px and below, stack text then artwork, cap the
   head at 240px, and allow natural document scrolling as needed.
7. Preserve the existing head's exact generation prompts and Tate attribution
   in [artwork provenance](artwork.md). Retain the licensed favicon and existing
   `/dash`, `www`, and unknown-route behavior. Add no motion, window chrome,
   network lines, invented artwork, or substitute shapes.

[Design direction](design-direction.md) records current and historical sources
and explains which references still influence the implementation.

## Verification before publication

- Open every section URL directly and refresh it; follow native links and
  browser Back. Check each page's title, heading, and Home link.
- Check populated/empty lists, long titles, contact links, keyboard focus, and
  reachable overflow in the desktop text pane.
- Check two-column and stacked layouts across wide, narrow, short-height, and
  landscape screens. Mobile may scroll naturally; desktop art stays in its
  column while long text remains reachable.
- Confirm that only the home page shows the existing head and topic artwork
  areas contain only their plain-text placeholder.
- Complete visual review, lint, relevant tests, and the production build.
  Final verification and deployment of this revision remain pending.

## Publishing

Deploy a preview using Vercel CLI **59.20.0** from the checkout linked to the
existing ahtar.dev project. After validation, publish the reviewed version with
`npx vercel@59.20.0 --prod` and record the previous deployment for rollback.

GitHub pushes run CI only. Vercel Git deployment remains pending GitHub app
access to `xyleus1/ahtar-dash`; do not treat a push as publication. Once access
is granted, connect production branch `main` and verify an actual deployment.

After publishing, verify the intended version at ahtar.dev, all four section
URLs opened directly, production assets, HTTPS, the `www` redirect, legacy
`/dash` redirects, and unknown-route 404 status.
