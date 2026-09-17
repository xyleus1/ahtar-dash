# Design direction

The page is a static map of personal interests. Four connected document boxes
contain Enjoying, Reading, Writing, and Building; a fifth box holds Contact.
Pure white, small native serif text, thin outlines, and empty space define it.
This brief supersedes the earlier Athena-inspired biography and motion.

## Composition

- A compact diagram, at most 800px wide, with a staggered desktop arrangement.
  Sharp 1px outlines enclose the content; italic 16px labels sit above them.
- Six dotted lines connect every pair of interest boxes. One solid line joins
  Building to Contact. Lines have no arrowheads and pass behind opaque white
  boxes. react-archer 5.1.0 keeps the endpoints attached as layout changes.
- Contact uses a muted red `#9B2228` double border and a plain title, making its
  different role visible without a filled panel. The name appears inside it.
- At 600px and below, boxes stack in a staggered arrangement in the order
  Enjoying, Reading, Writing, Building, Contact. Adjusted anchors preserve all
  six pairwise interest connections and the solid Contact connection.
- Times New Roman / Times / serif at 16px uses system fonts. Text is near-black,
  links are underlined blue with visited purple, and the page is pure white.
- No hero, bio paragraph, animation, smooth scrolling, photos, glow, shadows,
  rounded corners, icons, gradients, or background grid.

## References and interpretation

The primary visual source is [Ted Nelson's original Xanadu diagram](https://xanadu.com.au/ted/XUsurvey/HARTadj5in.JPG),
shown in [Xanalogical Structure](https://xanadu.com.au/ted/XUsurvey/xuDation.html).
Its unequal rectangular documents, labels beside edges, and visibly connected
contents inform this layout. The article distinguishes links from shared
content; this site's lines express the owner's related interests and do not
implement Xanadu's document or transclusion system. The reference image itself
is not distributed with the website.

[Kaliacc](https://kaliacc.org/) and [Zygote](https://zyg.edith.reisen/) are secondary
visual influences for plain link-directory structure and direct, small-scale
text. Their content, imagery, dark backgrounds, and decorative motifs are not
part of this site.

[Impeccable distill](https://github.com/pbakaus/impeccable/blob/main/skill/reference/distill.md)
and [quieter](https://github.com/pbakaus/impeccable/blob/main/skill/reference/quieter.md)
help remove redundant copy, effects, and competing emphasis. The
[craft floor](https://github.com/pbakaus/impeccable/blob/main/skill/reference/craft-floor.md)
explicitly puts the chosen brief above general defaults. Advice against generic
cards or default typography is not an automatic ban on the wireframe boxes and
serif text explicitly requested here: the boxes are the diagram's structure.

## Acceptance checks

- The five boxes and their relationships read clearly at desktop and mobile
  widths. Resizing retains the correct graph and attached endpoints.
- Text remains above connectors. Long links and multiple entries wrap without
  clipping or horizontal overflow; empty boxes retain a useful text fallback.
- Headings, skip navigation, focus, link contrast, and mobile targets remain
  usable. Missing URLs never become false interactive controls.
- No motion, font download, or removed animation library remains in the build.
- Build, lint, content/connection tests, and deployed-domain checks pass.
