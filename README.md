# ahtar.dev

A minimal personal page: a small name, three prominent bio sentences, four plain
interest rows, and contact links. Near-white, near-black, and crimson. Personal
content intentionally starts with placeholders.

## Edit the page

Everything personal is in [`src/content.ts`](src/content.ts):

- `name`: the small heading at the top.
- `bio`: exactly three strings, joined into one paragraph.
- `sections`: Enjoying, Reading, Writing, and Building, in display order.
- `contact`: email and profile links.

Entries accept a `title` and optional `url`. Missing URLs render as ordinary
text. Use `https://` for websites and `mailto:` for email. Add objects to an
`entries` array to add links; array order is display order.

```ts
{ title: 'An essay I keep returning to', url: 'https://example.com/essay' }
{ title: 'Listening to an old favorite' }
{ title: 'Email me', url: 'mailto:you@example.com' }
```

Keep the IDs `enjoying`, `reading`, `writing`, and `building` for stable anchors.
An empty interest list displays "To come." Empty contact details have a similar
plain-text fallback. There are no descriptions, icons, cards, accounts, API keys,
database, analytics, or CMS to configure.

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

## Design and motion

Self-hosted Host Grotesk supplies the typography. The palette is paper `#FAF9F6`,
ink `#191817`, muted text `#6B6763`, crimson `#B3262D`, and hover `#8F1D24`.
The bio spans the page with an indented first line on desktop; mobile removes
the indent. Interests use a plain definition list and contact uses text links.

`BioReveal` adapts React Bits SplitText into one masked line entrance using GSAP,
then restores native paragraph text. Lenis uses one GSAP ticker for desktop
wheel scrolling and adds no visible interface. Touch scrolling stays native.
Reduced motion disables the reveal and smoothing. No spotlight or icon
component is rendered; the existing Lucide favicon remains a licensed asset.

See [design direction and references](docs/design-direction.md) and
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

After publishing, verify the intended version at the apex domain, production
assets, valid HTTPS, and the `www.ahtar.dev` redirect. Legacy `/dash` paths
redirect to `/`; unknown paths must return the custom 404 with status 404.
Record the previous deployment before cutover for rollback. The pre-redesign
site is retained at commit `e22dddb`; the original dashboard is retained by tag
`archive/pre-personal-site-20260916`. No external Supabase data was deleted.

Once GitHub app access is granted, connect the repository with production branch
`main` and verify an actual Git-triggered deployment before relying on it.

## Validation

Check content order, placeholder versus real links, long text, empty lists,
keyboard focus, reduced motion, and animation cleanup. Inspect mobile and
desktop rendering, including viewport changes during the bio entrance.
The [implementation brief](docs/website-plan.md) records the current direction.
