# Third-party notices

## Runtime libraries

[react-archer 5.1.0](https://github.com/pierpo/react-archer) positions the connections
between document boxes. It is MIT-licensed, copyright (c) 2018 Pierre Poupin.
The site configures its existing straight-line, dash, anchor, and marker options;
it does not distribute a separate custom connector library.

React and React DOM, plus the runtime dependencies react-compiler-runtime,
scheduler, react-fast-compare, and resize-observer-polyfill, retain their MIT
licenses. Full notices are reproduced from installed distributions in
[`public/third-party-licenses.txt`](public/third-party-licenses.txt), which ships
with the site. The React compiler runtime identifies the same Meta MIT license
in its source header; its full text is included with the React group.

[GSAP 3.15.0](https://github.com/greensock/GSAP) and
[@gsap/react 2.1.2](https://github.com/greensock/react) provide motion and React
lifecycle cleanup. Both use the [GSAP Standard No Charge
License](https://gsap.com/standard-license), not the MIT license. Their original
copyright notices and license references are retained in the distributed license
file.

Lenis, React Bits components, and Fontsource assets are no longer part of the
current application. Their earlier notices remain available in Git history.

## Window styling and typeface

The window and title-bar styles are adapted from
[@sakun/system.css 0.1.11](https://github.com/sakofchit/system.css), MIT-licensed,
copyright (c) 2022 Sakun Acharige. The site adapts only those CSS patterns and
loads the packaged ChiKareGo2 font; it does not import System.css's JavaScript
dependencies or its other font assets.

**ChiKareGo2** is by **Giles Booth** (@blogmywiki). The font's own copyright
metadata reads `GilesBooth`; System.css also credits the author in its README.
Its [original BitFontMaker2
listing](https://www.pentacom.jp/pentacom/bitfontmaker2/gallery/?id=3780) identifies
the license as **Creative Commons Attribution**, without specifying a version.
The site's font comes unchanged from
`@sakun/system.css/fonts/ChiKareGo2.woff2`; the package also supplies a corresponding
`.woff` asset. The package's web-font conversion is retained; no glyph modifications or
subsetting are performed by this project. Font attribution and the original
license source are included in the distributed license file separately from
System.css's MIT notice.

## Favicon

The favicon remains Lucide's `asterisk.svg` from commit
`076b52527f0c5fe4cc1cd2472ef716fc332ccf0e`, with only stroke color and dimensions
changed. [Pinned source](https://github.com/lucide-icons/lucide/blob/076b52527f0c5fe4cc1cd2472ef716fc332ccf0e/icons/asterisk.svg).
The ISC copyright and permission notice is retained in the distributed license
file. The `lucide-react` package is not a dependency.

## Visual references

The Xanadu diagram, Kaliacc, and Zygote were consulted for composition only;
no reference-site images or content are distributed. Sources and interpretation
are recorded in [`docs/design-direction.md`](docs/design-direction.md).
