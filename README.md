# ahtar.dev

A static personal link diagram: four connected wireframe boxes for Enjoying,
Reading, Writing, and Building, plus a distinct Contact box. Pure white, native
serif text, and thin lines. No hero, biography, animation, or smooth scrolling.
Personal content intentionally starts with placeholders.

## Edit the page

Everything personal is in [`src/content.ts`](src/content.ts):

- `name`: displayed inside Contact and used by the accessible page heading.
- `sections`: the four interest boxes, with their labels and entries.
- `contact`: email and profile links.

Entries accept a `title` and optional `url`. Missing URLs render as ordinary
text; empty lists display "To come." Use `https://` for websites and `mailto:`
for email. Entry array order controls display order within a box.

```ts
{ title: 'An essay I keep returning to', url: 'https://example.com/essay' }
{ title: 'Listening to an old favorite' }
{ title: 'Email me', url: 'mailto:you@example.com' }
```

Keep the IDs `enjoying`, `reading`, `writing`, and `building`: the layout and
connector graph depend on them. There is no bio or entry-description field,
backend, account, analytics, or CMS.

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

## Design and dependencies

The design follows [Ted Nelson's Xanadu diagram](https://xanadu.com.au/ted/XUsurvey/HARTadj5in.JPG):
sharp document outlines, labels above the edges, and visible connections.
Small Times text uses local system fonts; no font assets are downloaded.

[react-archer 5.1.0](https://github.com/pierpo/react-archer) positions the static
connections. Every viewport has six dotted edges joining every pair of interest
boxes and one solid edge from Building to Contact. At 600px and below, the boxes
stack in a staggered arrangement; adjusted anchors preserve all seven edges.
Contact has a muted red `#9B2228` double border.
Links use conventional blue and visited purple with visible keyboard focus.

GSAP, Lenis, React Bits, and Fontsource components are no longer shipped. The
existing Lucide favicon remains a licensed asset. See
[design direction](docs/design-direction.md) and
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
intended version, production assets, HTTPS, and the `www.ahtar.dev` redirect.
Legacy `/dash` paths redirect to `/`; unknown paths return the custom 404 with
status 404. Repository history retains the earlier designs.

Once GitHub app access is granted, connect production branch `main` and verify
an actual Git-triggered deployment before relying on it.

## Validation

Check all five boxes, desktop and mobile connections, real versus placeholder
links, long titles, empty lists, keyboard focus, and narrow-screen overflow.
Verify that resizing keeps lines attached and content remains readable above
connections. See the [implementation brief](docs/website-plan.md).
