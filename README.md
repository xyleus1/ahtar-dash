# ahtar.dev

A small personal index for things enjoyed, read, written, and built. Warm paper,
near-black type, and a restrained crimson accent. The initial site intentionally
uses placeholders for all personal information.

## Edit the page

Everything personal is in [`src/content.ts`](src/content.ts):

- `name`: the large heading.
- `bio`: three sentences, displayed together as a paragraph.
- `sections`: Enjoying, Reading, Writing, and Building, in that order.
- `contact`: email and social links.

An entry has a `title`, optional `description`, and optional `url`. Without a URL,
it is ordinary text; with a URL it becomes a link. Use `https://` for websites and
`mailto:` for email. Entries appear in array order. To add more entries, copy an
object in the relevant `entries` array. Empty sections show a short empty state.
Enjoying also works well with plain text entries.

```ts
{ title: 'An essay I keep returning to', url: 'https://example.com/essay', description: 'A brief note.' }
{ title: 'Listening to an old favorite' }
{ title: 'Email me', url: 'mailto:you@example.com' }
```

Keep the section IDs (`enjoying`, `reading`, `writing`, `building`) intact; they
provide stable anchor links and icon selection. There are no accounts, API keys,
database, analytics, or content service to configure.

## Development

Use Node 22.12 or newer in the Node 22 series and npm.

```sh
npm ci
npm run dev
```

The local address is printed by Vite (normally http://127.0.0.1:5173).

```sh
npm run lint
npm test
npm run build
npm run preview
```

The production output is `dist/`. Dependency versions are pinned in the npm
lockfile. GitHub Actions runs lint, tests, and the production build on pushes
and pull requests.

## Design and motion

Palette: paper `#F5F2EC`, ink `#191817`, crimson `#B3262D`, hover `#8F1D24`.
The crimson has approximately 5.8:1 contrast against the paper background.
Typography is self-hosted Host Grotesk. Icons, including the favicon, use Lucide.

The name animation and section illumination are adapted from React Bits.
GSAP handles the word reveal and drives one Lenis ticker. Touch scrolling stays
native. Reduced-motion preferences disable the reveal, smooth scrolling, and
pointer glow. All text and links are usable without hovering. See
[`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) for attribution and licenses.

## Publish

Use the existing Vercel project that owns **ahtar.dev**. The previous domain
connection may have used a different repository; verify the actual project
instead of assuming a push to this repository reaches the domain.

Connect `xyleus1/ahtar-dash`, production branch `main`, root directory `.`,
framework **Vite**, Node **22.x**, install `npm ci`, build `npm run build`, output
`dist`. These build settings are also recorded in `vercel.json`.

Deploy the feature branch as a preview before the first production cutover.
After validation, merge to `main` and verify that the production deployment
matches that commit. Future content changes on `main` then deploy automatically.

Keep `https://ahtar.dev/` canonical and redirect `www.ahtar.dev` to the apex with
valid TLS. Use the DNS values shown by the actual Vercel project if correction
is needed. Legacy `/dash` paths redirect to `/`; unknown paths should return the
custom `404.html` with a 404 status, not the homepage with a 200 status.

Record the previous Vercel production deployment and project settings before
cutover. Restore them if needed. The previous repository state is also retained
at Git tag `archive/pre-personal-site-20260916` and commit
`4b957822937c64c8c6add5ce26313f62d8bcd628`. No external Supabase data is deleted.

## Validation

Tests cover section order, headings, real versus placeholder links, long content,
empty sections, reduced motion, and animation lifecycle cleanup. Before launch,
check the preview at 320px and desktop widths, keyboard focus, native touch
scrolling, production asset delivery, redirects, and custom-domain HTTPS.

See [`docs/website-plan.md`](docs/website-plan.md) for the implementation brief.
