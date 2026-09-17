# ahtar.dev

A personal hypertext desktop: Enjoying, Reading, Writing, and Building surround
one red Contact window. Pure white, early Macintosh frames, serif links, and a
network that follows windows dragged by their title bars. All five windows fit
the viewport; the page itself does not scroll. A small wireframe interpretation
of Brancusi's *Danaïde* sits in the upper-right corner. Personal content
intentionally starts with placeholders.

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

The structure follows [Ted Nelson's Xanadu diagram](https://xanadu.com.au/ted/XUsurvey/HARTadj5in.JPG)
and its historical transpointing-window demos. The selected window/title-bar skin
and self-hosted ChiKareGo2 caption font come from [System.css 0.1.11](https://github.com/sakofchit/system.css).
Body text uses native Times. Only the relevant skin is adapted; the library's
full global stylesheet is not shipped.

[react-archer 5.1.0](https://github.com/pierpo/react-archer) draws six dotted
connections between topic windows and four solid connections to Contact.
[GSAP 3.15.0 Draggable](https://gsap.com/docs/v3/Plugins/Draggable/) and
`@gsap/react` handle title-bar dragging and cleanup. Drag with a mouse or touch;
positions last until reload. Bounds keep windows inside the viewport, and
resizing clamps their positions. A geometry helper chooses the nearest facing
sides for attached connections as windows move. Hover and focus highlight the
window and its connected edges without nudging it. Contact uses `#9B2228` red.

With a title bar focused, arrow keys move its window 10px, Shift+arrow moves it
1px, and Home restores its initial position. Escape cancels an active drag.
Direct dragging and keyboard positioning remain available with reduced motion;
there is no automatic window movement or idle animation.

Responsive CSS recomposes the windows without shrinking the entire canvas.
Longer lists scroll inside their keyboard-accessible panes, preserving the
single-screen composition. Real links use conventional blue and visited purple.
Lenis and React Bits are not shipped; this page needs neither smooth scrolling
nor a second animation effect. The existing Lucide favicon remains a licensed
asset. The transparent head image was generated with the built-in image tool
from the user-supplied Tate reference; [artwork provenance](docs/artwork.md)
records the selected asset and prompts. See [design direction](docs/design-direction.md)
and [third-party notices](THIRD_PARTY_NOTICES.md).

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

Before publishing this revision, check mouse/touch title-bar dragging, retained
positions, keyboard moves, Home reset, Escape cancellation, viewport bounds,
resize clamping, and connector side changes. Check real link clicks, long titles,
empty lists, pane scrolling, reduced motion, and short-screen layouts. Confirm
the head does not obscure window controls or content and the outer page never
scrolls. See the [implementation brief](docs/website-plan.md). Final verification
and deployment of this revision are pending.
