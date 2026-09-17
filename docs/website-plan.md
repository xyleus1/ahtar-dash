# ahtar.dev implementation brief

## Intent

A static personal link diagram on pure white: four connected boxes for
Enjoying, Reading, Writing, and Building, plus a differentiated Contact box.
This direction replaces the previous large biography and animated layout.
Personal data remains editable in one file and starts with placeholders.

## Implemented structure

1. Retain React, TypeScript, Vite, plain CSS, and the npm lockfile.
2. Render four sharp, thin-bordered document boxes in a staggered desktop
   arrangement. Small italic titles sit above the borders. Use native Times
   text at 16px, a white background, and conventional underlined links.
3. Use react-archer 5.1.0 for six dotted pairwise connections between the four
   interest boxes. Draw one solid connection from Building to Contact, without
   arrowheads. White box backgrounds keep lines behind the content.
4. Give Contact a muted red `#9B2228` double border and include the name, email,
   and profile entries inside. At 600px and below, stack the boxes in a
   staggered arrangement and adjust anchors while preserving all seven edges.
5. Keep `name`, four section arrays, and contact entries in `src/content.ts`.
   Entries accept a title and optional URL; missing URLs stay text and empty
   lists display "To come." Keep section IDs stable for the connector graph.
6. Remove the hero, biography field, animation components, smooth scrolling,
   downloaded fonts, and their dependencies. Preserve the licensed favicon,
   semantic headings, skip link, visible focus, and mobile tap targets.
7. Preserve metadata, canonical URL, legacy `/dash` redirects, and the 404 page.

The [design direction](design-direction.md) records the Xanadu reference,
secondary influences, and the reasons for using explicitly requested boxes.

## Publishing

Validate lint, tests, and the production build. Deploy a preview with Vercel CLI
**59.20.0** from the checkout linked to the existing ahtar.dev project, then
publish the validated version with `npx vercel@59.20.0 --prod`.

GitHub pushes currently run CI only. Automatic Vercel Git deployment is pending
GitHub app access to `xyleus1/ahtar-dash`; a push does not publish the domain.
Once access is granted, connect branch `main` and verify an actual deployment.

Record the previous production deployment for rollback. Verify the intended
version at ahtar.dev, production assets, HTTPS, the `www` redirect, legacy
redirects, and unknown-route 404 status after publishing.

## Acceptance

- Exactly four interest boxes and one distinct Contact box; no hero or animation.
- Desktop and mobile both have six dotted pairwise interest connections and
  one solid Contact connection, with legible lines and attached endpoints.
- Long titles, multiple entries, and empty lists remain inside their boxes.
- Real links, email links, placeholders, keyboard focus, and mobile targets work.
- No horizontal overflow at narrow widths; connectors stay behind readable text.
- Build, lint, relevant tests, and production verification pass.
