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

GSAP, Lenis, React Bits components, and Fontsource assets are no longer part of
the current application. Their earlier notices remain available in Git history.
The serif font stack uses fonts already installed on the visitor's device.

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
