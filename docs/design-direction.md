# Design direction

The current design is a plain personal index with five real pages. White space,
native serif type, red links, and a spinning 3D Brancusi interpretation carry the identity.
The window frames, network, and dragging experiment are retired.

## Composition and typography

On the home page, the left third contains a small name heading, the editable
biography, four section links, and quiet contact links. The right two-thirds
center the *Danaïde* head, in a container up to 420px wide. The artwork has no
frame or caption. It turns in place, with its own surface acting as a discreet
pause/resume button; keyboard focus makes the control visible.

Each section URL has a Home link, its heading, and a bullet list in the same
left column. Its right column is reserved blank space with the small plain-text
message "Wireframe to come." No substitute shapes or future artwork are created.

[Zygote's actual landing CSS](https://zyg.edith.reisen/css/screen.css) specifies
`Times, serif`, a root size of `1.15em`, and inherited/browser-normal line height.
This implementation uses `Times, 'Times New Roman', serif` at 18.4px with an
explicit 1.4 line height for prose. Zygote's black background and orange display
heading are separate choices; this brief retains white and `#9B2228` links.
There is no downloaded font.

Desktop keeps a 1:2 column composition within the viewport. The text pane can
scroll when its contents exceed the available height; readable lines are limited
to approximately 34 characters. At 700px and below, text comes first and artwork
follows, with 24px side gutters and natural page scrolling. The head is capped
at 240px on these small screens. Ordinary underlined links, native page
navigation, and visible keyboard focus provide the page interactions. The head
is the only animated element: one constant-speed revolution every 24 seconds,
implemented with GSAP. Reduced motion starts it still, and it stops rendering
while offscreen or while the page is hidden.

## References and selection

| Reference | Role in the current direction |
| --- | --- |
| [Zygote](https://zyg.edith.reisen/) | Primary typography reference: native Times and direct personal links. Its content, artwork, colors, and vertical rule are not copied. |
| [Justin Wang](https://jstwng.com/) | Small name, short biography, and straightforward personal/contact links. |
| [Athena Shiravi](https://athenashiravi.com/about) | Earlier reference for decisive hierarchy. Its large prose, photography, and observed orange canvas are not the current layout. |
| [Kaliacc](https://kaliacc.org/) | Earlier personal-directory reference; visual context only, with no copied content or imagery. |
| [A.F. Vandevorst at MoMu](https://www.momu.be/en/collection-stories/a-f-vandevorst-2) | Restrained red against white. The chosen red is an interpretation, not an official brand value. |
| [Helmut Lang logotype research](https://famira.com/portfolio/helmut_lang) | Precise, economical graphic identity and care at small sizes. |
| [Brancusi at Tate](https://www.tate.org.uk/whats-on/tate-modern/constantin-brancusi-essence-things) | The user-selected *Danaïde* remains the home page's one artwork, now interpreted as a rotating 3D mesh. |
| [Impeccable](https://impeccable.style/) | [Distill](https://github.com/pbakaus/impeccable/blob/main/skill/reference/distill.md), [quieter](https://github.com/pbakaus/impeccable/blob/main/skill/reference/quieter.md), and [layout](https://github.com/pbakaus/impeccable/blob/main/skill/reference/layout.md) support reduction and clear proportions. [Animate](https://github.com/pbakaus/impeccable/blob/main/skill/reference/animate.md) informs restraint and reduced-motion support for the requested head rotation. |
| [Pen.dev workflow](https://docs.pen.dev/core-concepts/ai-agents) | Reference for comparing compositions and refining them. The pen.dev application was not used. |
| [Xanadu diagram](https://xanadu.com.au/ted/XUsurvey/HARTadj5in.JPG) and [article](https://xanadu.com.au/ted/XUsurvey/xuDation.html) | Historical context for the retired document-network layout. |
| [1972 mockup](https://xanadu.com.au/ted/XUsurvey/ptf1ov81.jpg), [1998 demo](https://xanadu.com.au/ted/XUsurvey/ianlines.jpg), [PYXI viewer](https://xanadu.com.au/ted/XUsurvey/pingshot.gif) | Earlier research into connected document windows; those interactions are no longer part of the site. |

The [Impeccable craft floor](https://github.com/pbakaus/impeccable/blob/main/skill/reference/craft-floor.md)
puts the actual brief above generic defaults. The current request earns the
plain serif layout; the earlier explicit window request earned a different
solution. Neither should become a reason to add decorative UI now.

[GSAP](https://github.com/greensock/GSAP),
[React Bits](https://github.com/DavidHDev/react-bits), and
[Lenis](https://github.com/darkroomengineering/lenis) were reviewed for this
request. GSAP supplies the rotation timeline; [Three.js](https://threejs.org/)
supplies the geometry and renderer. No React Bits source is copied: a full
viewer adds controls and behavior beyond the single artwork. Lenis would
change scrolling without helping the requested rotation, so it is not used.
React and React DOM remain the page framework; CSS supplies the layout.

[System.css](https://sakofchit.github.io/system.css/),
[98.css](https://jdan.github.io/98.css/), and
[react-archer](https://github.com/pierpo/react-archer) belong to previous research
or iterations and are not shipped.

## Artwork and review

The existing PNG fallback was generated from the [exact supplied Tate image](https://media.tate.org.uk/aztate-prd-ew-dg-wgtail-st1-ctr-data/images/.width-840_fK7Ago5.format-webp.webp).
[Tate's collection metadata](https://github.com/tategallery/collection/blob/master/artworks/t/002/t00296-1430.json)
identifies *Danaïde*, c.1918, accession T00296. [Artwork provenance](artwork.md)
preserves the original prompts and asset and documents the current mesh. The
mesh is a stylized interpretation assembled from Three.js geometry, not a
museum scan or an exact reconstruction of the PNG. The source photograph and
other reference-site imagery are not distributed.

Review direct section URLs, native navigation, real/empty/long entry lists,
keyboard focus, desktop pane overflow, stacked mobile scrolling, and artwork
proportions throughout a full rotation. Check pause/resume with pointer and
keyboard, reduced motion, offscreen/hidden suspension, and the PNG fallback on
loading or WebGL failure. Complete visual review and required checks before publication;
this document does not record completed QA or deployment.
