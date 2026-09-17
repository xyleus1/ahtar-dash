# Third-party notices

## React Bits

`src/components/BioReveal.tsx` is adapted from [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) at commit [`c49d6978d2496660f0f0c5a3b3ca77a059566a93`](https://github.com/DavidHDev/react-bits/tree/c49d6978d2496660f0f0c5a3b3ca77a059566a93): [SplitText TypeScript source](https://github.com/DavidHDev/react-bits/blob/c49d6978d2496660f0f0c5a3b3ca77a059566a93/src/ts-default/TextAnimations/SplitText/SplitText.tsx).

The adaptation reveals a biography paragraph through line masks using GSAP, removes offscreen ScrollTrigger behavior, respects live reduced-motion preferences, waits for fonts, and restores native text after completion. Responsive re-splitting and unmount cleanup preserve readable content. It replaces the previous NameReveal and SpotlightCard components; neither remains in the interface.

The upstream license is reproduced below verbatim from `LICENSE.md` at the pinned commit.

---

MIT + Commons Clause License Condition v1.0

Copyright (c) 2026 David Haz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, and distribute the Software **as part of an application, website, or product**, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

## Commons Clause Restriction

You may use this Software, including for any commercial purpose, **so long as you do not sell, sublicense, or redistribute the components themselves-whether alone, in a bundle, or as a ported version.**

## No Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Installed packages

GSAP and `@gsap/react`, Lenis, and Fontsource Host Grotesk retain the licenses included with their installed distributions. `SmoothScroll.tsx` follows the [official Lenis React GSAP integration](https://github.com/darkroomengineering/lenis/tree/main/packages/react#gsap-integration); Lenis is MIT-licensed. Host Grotesk is distributed under the SIL Open Font License. The `lucide-react` dependency was removed; the distributed favicon remains covered by Lucide's ISC License.


## Distributed assets

The favicon is Lucide's `asterisk.svg` from commit `076b52527f0c5fe4cc1cd2472ef716fc332ccf0e`, with only stroke color and dimensions changed. [Pinned source](https://github.com/lucide-icons/lucide/blob/076b52527f0c5fe4cc1cd2472ef716fc332ccf0e/icons/asterisk.svg).

The Lucide, Host Grotesk, and Lenis license notices are also included in `public/third-party-licenses.txt` and shipped with the site.
