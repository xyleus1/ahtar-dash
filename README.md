# ahtar.dev

A plain personal index on white. The home page places a name, editable biography,
four section links, and quiet contact links in the left third. A square carousel
of twenty selected photographs is centered in the right two-thirds and shared
with the Enjoying, Reading, Writing, and Building index pages.

## Edit the content

Everything personal is in [`src/content.ts`](src/content.ts):

- `name`: the home page heading.
- `bio`: the home biography.
- `sections`: each section's stable ID, display label, and entries.
- `sections[].groups`: optional subheadings and their entries; `columns` enables a
  responsive list with up to three columns, as used for Enjoying's shows.
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
`/enjoying`, `/reading`, `/writing`, and `/building`. Home and section links use
React Router client navigation, keeping the same gallery mounted so the current
image and autoplay timer continue. Each section has a Home link, heading, and
bullet list on the left. Entry links remain ordinary document links. There is
no backend, account, analytics, or CMS.

Enjoying groups Shows, Podcasts, Movies, and Websites in that order under bold
subheadings. Show, podcast, and movie titles are plain text; websites have links.

Writing links to **Why do we need so much memory, anyway?** at
`/writing/why-do-we-need-so-much-memory-anyway`. Its text and markup are in
[`src/posts/MemoryArticle.tsx`](src/posts/MemoryArticle.tsx), with title and route
in `memoryArticleInfo.ts`. Its link opens a separate document with a scrolling
reading column, the site's Times serif font, the PDF's bolding, and inline
images and videos. The gallery is absent from individual articles.
See [article source notes](docs/writing.md).

The shared gallery's images, captions, source URLs, alt text, and crop focal
points are in [`src/gallery-images.ts`](src/gallery-images.ts). Display images
and thumbnails live in `public/gallery/`; see [image sources](docs/gallery-assets.md).

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

The shared carousel follows the image viewer, preview strip, and quiet captions
of [Gagosian's Richard Serra exhibition](https://gagosian.com/exhibitions/2011/richard-serra-junction-cycle/).
The selected thumbnail stays centered in a looping strip. Click a thumbnail or
swipe either the photograph or the strip to choose an image. Images advance every
20 seconds; manual navigation resets the timer. Hovering the image viewer or
using the keyboard inside the gallery temporarily pauses playback. Reduced
motion disables automatic playback and removes animated transitions.

Images retain their source proportions; the browser crops only to fill the
square, using reviewed focal points. [Historical artwork provenance](docs/artwork.md)
records the retired generated head; that PNG is no longer shipped.

React and React DOM render the site. React Router 7.18.4 handles index navigation.
Embla Carousel 8.6.0 supplies the slider, dragging, and autoplay. The Lucide
favicon remains a licensed asset.
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

Before publication, check client navigation, direct section URLs, browser back,
long and empty lists, link focus, desktop pane scrolling, and stacked mobile
scrolling. Check all twenty images, captions, square crops, thumbnail selection,
dragging, centered thumbnails, keyboard navigation, loop boundaries, the 20-second timer,
and reduced motion. Confirm the gallery fits its right column and preserves its
image and timer across Home and section navigation. Check that article links
load a separate reading page without the gallery. Verify production assets,
redirects, and custom 404 responses after publishing.
