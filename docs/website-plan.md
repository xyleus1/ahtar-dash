# ahtar.dev implementation brief

## Intent

A personal introduction followed by Enjoying, Reading, Writing, Building, and
contact links. Keep every part editable in one content file and publish
placeholders until the owner supplies personal details.

This redesign replaces the initial centered card layout. It follows the
full-width typography and alignment of [Athena's About page](https://athenashiravi.com/about)
with fewer elements and a near-white canvas. The crimson `#B3262D` is an
interpretation of the requested fashion references, not an official brand color.
See [design-direction.md](design-direction.md) for research and visual rationale.

## Implemented structure

1. Retain React, TypeScript, Vite, plain CSS, and the npm lockfile.
2. Keep the name small. Join the three bio strings into one prominent Host
   Grotesk paragraph; use a desktop first-line indent and remove it on mobile.
3. Render the four interests as plain definition-list rows, followed by small
   contact links. Entries accept only a title and optional URL; missing URLs
   remain text. Empty lists get a short text fallback.
4. Replace NameReveal and SpotlightCard with one BioReveal adapted from React
   Bits SplitText. GSAP reveals masked lines once and restores native text.
5. Retain Lenis for desktop wheel scrolling through a single GSAP ticker.
   Respect reduced motion and native touch scrolling. Preserve visible focus,
   readable text during font loading, responsive reflow, and cleanup.
6. Remove card styling, hover glow, interface icons, descriptive subtitles,
   section headings, and the footer slogan. Retain the licensed Lucide favicon.
7. Preserve metadata, canonical URL, legacy `/dash` redirects, and the 404 page.

## Publishing

Validate with lint, tests, and the production build. Use Vercel CLI **59.20.0**
to deploy a preview from the checkout linked to the existing ahtar.dev project,
then publish the validated version with `npx vercel@59.20.0 --prod`.

GitHub pushes currently run CI only. Automatic Vercel Git deployment is pending
GitHub app access to `xyleus1/ahtar-dash`; do not assume a push publishes the
domain. After access is granted, connect production branch `main` and verify
the connection with an actual deployment.

Record the previous production deployment for rollback. Verify ahtar.dev serves
the intended version with working assets and HTTPS, `www` redirects securely,
and unknown paths return 404. The pre-redesign site remains at commit `e22dddb`.

## Acceptance

- One clear focal point: the bio, with generous empty space and no competing
  decorative components.
- Enjoying, Reading, Writing, and Building appear in order; long titles and
  multiple entries wrap without overflow.
- Placeholder text, real links, email links, and empty lists work correctly.
- Mobile, desktop, keyboard, reduced motion, font loading, and viewport changes
  preserve the content and layout.
- Build, lint, and relevant content/motion tests pass.
- Production domain, assets, redirects, HTTPS, and 404 behavior are verified
  after publication.
