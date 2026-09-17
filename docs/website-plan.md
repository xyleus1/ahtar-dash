# ahtar.dev — personal website

## Intent

Replace the previous fashion dashboard with one personal index: name, a
three-sentence introduction, Enjoying, Reading, Writing, Building, and Contact.
Use the compact format of https://jstwng.com/ and the typographic confidence of
https://athenashiravi.com/about. Publish placeholders throughout initially.

## Design

- A centered 720px column, left-aligned contents, 24px mobile gutters.
- Paper #F5F2EC, text #191817, crimson #B3262D, hover #8F1D24.
- Red inspired by archival fashion references including Helmut Lang and
  A.F. Vandevorst; it is an interpreted accent, not an official brand color.
- Restrained red section labels, icons, focus outlines, and hover illumination.
- Self-hosted Host Grotesk and existing Lucide icon assets.
- All four collections remain visible in a vertical stack; no tabs or filters.

## Implementation sequence

1. Record the old commit and production deployment. Replace tracked app contents
   on feat/personal-site while retaining Git history and external data.
2. Build with React, TypeScript, Vite, plain CSS, and one npm lockfile.
3. Put name, three bio sentences, section entries, and contact details into
   src/content.ts. Each entry accepts title, optional description, optional URL.
4. Render Introduction, Enjoying, Reading, Writing, Building, Contact in order.
   Missing URLs are plain text. Use placeholders without invented identity.
5. Adapt official React Bits SplitText and SpotlightCard components with source
   and license notices. Limit custom work to composition and integration.
6. Use GSAP/@gsap/react for a 0.6s, 12px word reveal, and one ticker for Lenis.
   Respect reduced motion, native touch scrolling, keyboard focus, and cleanup.
7. Add metadata, canonical URL, library favicon, legacy /dash redirects, and 404.
8. Identify the Vercel project that actually owns ahtar.dev; record settings and
   link xyleus1/ahtar-dash with main as production, Vite, root '.', npm ci,
   npm run build, dist output. Validate a preview before production cutover.
9. Publish the placeholder site, verify source commit/domain/TLS, fix the www
   redirect if necessary, and retain the previous deployment for rollback.

## Acceptance

- Build, TypeScript, lint, and meaningful content/motion tests pass.
- Four collections display in order and work with missing and long content.
- Placeholder rows are not fake links; populated rows and mailto links work.
- Mobile layout, keyboard focus, reduced motion, and touch scrolling work.
- No dashboard branding, Supabase requests, or former tracking remains.
- ahtar.dev serves the replacement; www redirects with a valid certificate.

## Access

Repository push access, the Vercel account owning ahtar.dev, and DNS access if
corrections are necessary. The first public version intentionally uses
placeholders. All subsequent content edits use one file and deploy from main.
