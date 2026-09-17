# Design direction

Selected design: a compact, retro personal desktop on pure white. Four
corner windows contain Enjoying, Reading, Writing, and Building; Contact is a
red central hub. All five windows fit within the viewport on desktop and mobile.
The asymmetrical composition was selected after rendering and comparing it with
a symmetrical network and a plain serif registry. Fine one-pixel caption rules
and a bold name inside Contact complete the hierarchy.

## Composition and interaction

Use [System.css](https://sakofchit.github.io/system.css/) for the early Macintosh
window vocabulary: sharp frames, compact caption bars, and fine horizontal
rules. Small serif content keeps the documents readable. The caption and content
have distinct roles; the frame should feel deliberate without overwhelming the
few links inside it. Contact carries the name and contact details with the
restrained red accent retained from the fashion references.

The page owns one viewport rather than forming a tall scrolling document.
Recompose the four topic windows around Contact at narrow widths; keep the full
relationship graph and every window reachable. Long lists use their own content
pane overflow so the outer page does not grow. No hero, biography, photos,
glow, dashboard chrome, fake status metadata, or decorative window controls.

[react-archer](https://github.com/pierpo/react-archer) draws the connections.
[GSAP](https://gsap.com/docs/v3/) with `@gsap/react` handles bounded hover movement
and cleanup. The authored interaction is a moving document whose connecting
threads remain attached. This comes directly from Xanadu's transpointing-window
idea; it is not a page-load reveal. Keep targets stable and lines behind text.
Reduced motion removes spatial travel while preserving visible focus and state
feedback. Touch users get the complete static composition and usable links,
without depending on hover. Nothing moves perpetually while idle.

## Reference selection

| Reference | Contribution to this direction |
| --- | --- |
| [Xanadu diagram](https://xanadu.com.au/ted/XUsurvey/HARTadj5in.JPG) and [article](https://xanadu.com.au/ted/XUsurvey/xuDation.html) | Primary structure: distinct document windows and visible relationships. Connections are visual; this site does not implement transclusion. |
| [1972 mockup](https://xanadu.com.au/ted/XUsurvey/ptf1ov81.jpg), [1998 demo](https://xanadu.com.au/ted/XUsurvey/ianlines.jpg), [PYXI viewer](https://xanadu.com.au/ted/XUsurvey/pingshot.gif) | Actual historical examples of compact window framing, serif documents, open connection space, and links following moved windows. |
| [Athena Shiravi](https://athenashiravi.com/about) | Decisive hierarchy and a committed accent. Its oversized prose, photography, and orange canvas do not fit the latest brief. |
| [Justin Wang](https://jstwng.com/) | Direct personal links and ordinary readable text inform the document contents. |
| [Kaliacc](https://kaliacc.org/) and [Zygote](https://zyg.edith.reisen/) | Personal-directory scale and old-web directness; visual influence only, without their content, imagery, or dark backgrounds. |
| [A.F. Vandevorst at MoMu](https://www.momu.be/en/collection-stories/a-f-vandevorst-2) | Institutional white with a scarce red accent. The chosen red is an interpretation, not an official brand value. |
| [Helmut Lang logotype research](https://famira.com/portfolio/helmut_lang) | Precise lettering, restrained graphic identity, and refinement at small sizes. |
| [Impeccable](https://impeccable.style/) | [Distill](https://github.com/pbakaus/impeccable/blob/main/skill/reference/distill.md), [quieter](https://github.com/pbakaus/impeccable/blob/main/skill/reference/quieter.md), [layout](https://github.com/pbakaus/impeccable/blob/main/skill/reference/layout.md), and [animate](https://github.com/pbakaus/impeccable/blob/main/skill/reference/animate.md) guide removal, density, and purposeful motion. |
| [Pen.dev workflow](https://docs.pen.dev/core-concepts/ai-agents) | Compare alternative compositions, then refine the selected one. Reference material; the pen.dev application was not used. |

The [Impeccable craft floor](https://github.com/pbakaus/impeccable/blob/main/skill/reference/craft-floor.md)
puts the chosen brief above generic defaults. Explicitly requested retro windows
and serif documents earn their place; anti-template advice should not flatten
this design into another card-free landing page.

System.css is selected over the evaluated [98.css](https://jdan.github.io/98.css/)
because its monochrome Macintosh vocabulary fits the white canvas. The earlier
[React Bits](https://github.com/DavidHDev/react-bits) reveal/glow components and
[Lenis](https://github.com/darkroomengineering/lenis) scrolling are not part of
this direction. Use the named libraries for framing, geometry, and motion;
custom work composes them around the actual content. Reference images are not
shipped with the site.

## Review targets

- All five windows remain visible within desktop, short, mobile, and landscape
  viewports; the document itself does not scroll or overflow horizontally.
- Long entries stay readable within panes, and connectors remain behind text.
- Hover interruption, mouse exit, resizing, keyboard focus, reduced motion, and
  touch preserve readable content and attached endpoints.
- The page contains only real content roles and usable links: no invented
  controls, labels, or status data to manufacture a retro appearance.
- Complete visual comparison, build, lint, relevant tests, and production
  verification before treating the design as ready to publish.
