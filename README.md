# ahtar.dev

A plain personal index on white. The home page places a name, editable biography,
four section links, and quiet contact links in the left third. A spinning 3D
wireframe interpretation of Brancusi's *Danaïde* is centered in the right two-thirds.
Enjoying, Reading, Writing, and Building each have their own page.

## Edit the content

Everything personal is in [`src/content.ts`](src/content.ts):

- `name`: the home page heading.
- `bio`: the home biography; the placeholder suggests three sentences.
- `sections`: each section's stable ID, display label, and entries.
- `contact`: the home page's email and profile links.

Entries accept a `title` and optional `url`. Missing URLs render as ordinary
text; empty section lists display "To come." Use `https://` for websites and
`mailto:` for email. Array order controls display order.

```ts
{ title: 'An essay I keep returning to', url: 'https://example.com/essay' }
{ title: 'Listening to an old favorite' }
{ title: 'Email me', url: 'mailto:you@example.com' }
```

The IDs `enjoying`, `reading`, `writing`, and `building` determine the real URLs
`/enjoying`, `/reading`, `/writing`, and `/building`. Navigation uses ordinary
page links. Each section has a Home link, heading, and bullet list on the left;
the right area is reserved for future artwork and says "Wireframe to come."
No future section artwork has been generated. There is no backend, account,
analytics, or CMS.

## Development

Use Node 22.12 or newer in the Node 22 series and npm.

```sh
npm ci
npm run dev
```

Vite prints the local address, normally http://127.0.0.1:5173.

```sh
npm run lint
npm test
npm run build
npm run preview
```

Production output is `dist/`. GitHub Actions runs lint, tests, and the production
build on pushes and pull requests.

## Design and assets

The typography follows [Zygote's landing page](https://zyg.edith.reisen/): native
Times with a serif fallback. This site uses 18.4px text, 1.4 line height, and
muted red links (`#9B2228`). No web font is downloaded. Desktop uses a viewport-
sized 1:2 column layout; long text scrolls within its accessible left pane.
At 700px and below the columns stack, and the page scrolls naturally when needed.

The home head is a real Three.js mesh: library-provided lathed, tubular, and
conical geometry form a stylized interpretation of the sculpture. It is not a
museum scan or a rotated PNG. GSAP turns it through 360 degrees around its
vertical axis every 24 seconds, at a constant speed. Click the head, or focus
it and press Enter or Space, to pause or resume. Reduced-motion preferences
start it still; rendering stops while the artwork is offscreen or the page is
hidden. The existing transparent PNG remains visible during loading and if
WebGL fails or loses its context.

[Artwork provenance](docs/artwork.md) records the model's construction and
preserves the fallback image's exact generation prompts and Tate source. The
four section pages still reserve blank space for later artwork. The Lucide
favicon remains a licensed asset.

React, React DOM, Three.js, and GSAP are the direct runtime dependencies. The
requested GSAP, React Bits, and Lenis repositories were reviewed: GSAP supplies
the rotation, Three.js supplies the renderer and geometry, and a larger viewer
or smooth-scrolling system would add behavior this layout does not need. No
React Bits source is copied. The former windows, connectors, and dragging remain
removed.
See [design direction](docs/design-direction.md) and
[third-party notices](THIRD_PARTY_NOTICES.md).

## Publish

The live domain is **https://ahtar.dev/**. Git deployment is not connected:
Vercel's GitHub app still needs repository access to `xyleus1/ahtar-dash`.
Pushing to `main` runs CI but does not currently publish the site.

Manual deployment with Vercel CLI **59.20.0** is supported. From a checkout
linked to the existing project that owns ahtar.dev:

```sh
npx vercel@59.20.0
# Inspect the preview, then deploy the validated checkout:
npx vercel@59.20.0 --prod
```

For a fresh checkout, first run `npx vercel@59.20.0 link` and select that existing
project. Use root `.`, framework Vite, Node 22.x, install `npm ci`, build
`npm run build`, and output `dist`. Build settings are in `vercel.json`.

Record the previous deployment for rollback. After publishing, verify the
intended version, all four section URLs opened directly, production assets,
HTTPS, and the `www.ahtar.dev` redirect. Legacy `/dash` paths redirect to `/`;
unknown paths return the custom 404 with status 404. Repository history retains
the earlier designs.

Once GitHub app access is granted, connect production branch `main` and verify
an actual Git-triggered deployment before relying on it.

## Validation

Before publication, check native navigation, direct section URLs, browser back,
long and empty lists, link focus, desktop pane scrolling, and stacked mobile
scrolling. Confirm that the home head stays centered through a full revolution,
the pause control works with a pointer and keyboard, reduced motion starts
still, and offscreen/hidden rendering stops. Check the PNG fallback during
loading and after a WebGL failure or context loss. Section artwork areas should
contain only the placeholder text. Run lint, tests, and the production build
before publishing, then verify the deployed version and production routes.

The 3D head was published and verified on 2026-09-18. All 24 tests, lint, the
production build, and GitHub CI passed. Browser checks covered a full turn,
pointer/keyboard pause, reduced motion, context loss, mobile layout, and the
original-image fallback. The live JavaScript and CSS match the tested build;
all four section links and refreshes work. See the
[implementation brief](docs/website-plan.md).
