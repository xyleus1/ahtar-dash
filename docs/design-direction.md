# Design direction

Selected design: a compact, retro personal desktop on pure white. Four
corner windows contain Enjoying, Reading, Writing, and Building; Contact is a
red central hub. All five windows fit within the viewport on desktop and mobile.
The asymmetrical composition was selected after rendering and comparing it with
a symmetrical network and a plain serif registry. Fine one-pixel caption rules
and a bold name inside Contact complete the hierarchy. A small, transparent
wireframe head after Brancusi's *Danaïde* occupies the top-right margin.

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
pane overflow so the outer page does not grow. Keep the head clear of the windows
at every size; it adds no frame or caption and does not intercept interaction.
No hero, biography, photographic background, glow, dashboard chrome, fake status
metadata, or decorative window controls.

[react-archer](https://github.com/pierpo/react-archer) draws the connections.
[GSAP Draggable](https://gsap.com/docs/v3/Plugins/Draggable/) with `@gsap/react`
handles mouse and touch title-bar dragging and cleanup. Windows stay where the
visitor leaves them until reload; viewport bounds and resize clamping keep them
reachable. A geometry helper switches connectors to the nearest facing sides
as windows move. This follows Xanadu's transpointing-window idea: moving a
document preserves its visible relationships. Keep the lines behind the text.

Hover and focus change color only. A focused title bar supports arrow-key moves
of 10px, Shift+arrow moves of 1px, and Home to restore its initial position.
Escape cancels an active drag. Reduced-motion users retain these direct actions;
no automatic nudge, inertia, entrance reveal, or idle movement is needed. Touch
users drag the title bar while content panes retain normal link and scroll use.

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
| [Brancusi at Tate](https://www.tate.org.uk/whats-on/tate-modern/constantin-brancusi-essence-things) | The user-selected *Danaïde* head is interpreted as a small wireframe outline, giving the desktop one sculptural detail. |
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
custom work composes them around the actual content. The head is a transparent
PNG generated with the built-in image tool from the [exact supplied Tate image](https://media.tate.org.uk/aztate-prd-ew-dg-wgtail-st1-ctr-data/images/.width-840_fK7Ago5.format-webp.webp).
[Tate's collection metadata](https://github.com/tategallery/collection/blob/master/artworks/t/002/t00296-1430.json)
identifies *Danaïde*, c.1918, accession T00296. [Artwork provenance](artwork.md)
records its prompts and selected asset; third-party notices distinguish the
source artwork from the generated interpretation. Other reference-site images
and content are not distributed.

## Review targets

- All five windows remain visible within desktop, short, mobile, and landscape
  viewports; the document itself does not scroll or overflow horizontally.
- Long entries stay readable within panes, and connectors remain behind text.
- Mouse/touch dragging, keyboard moves, Home reset, Escape cancellation,
  resizing, and reduced motion preserve readable content and attached endpoints.
- Retained positions and changing connector sides work without moving windows
  on hover; the head remains small and clear of content on narrow/short screens.
- The page contains only real content roles and usable links: no invented
  controls, labels, or status data to manufacture a retro appearance.
- Complete visual comparison, build, lint, relevant tests, and production
  verification before treating the design as ready to publish.
