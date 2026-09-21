# Memory article

Published route: `/writing/why-do-we-need-so-much-memory-anyway`.

The owner supplied **The K List - All Spaces (2).docx** and **Draf1Memory.pdf**.
The Word file supplies selectable text, hyperlinks, and 16 original PNG figures.
The PDF supplies visible headings, list hierarchy, the subtitle and public byline,
and five embedded source previews. All 26 PDF pages were visually reviewed.

`src/posts/MemoryArticle.tsx` contains the article as native semantic HTML through
React. `article.css` is scoped to this article. The component and its styles load
only on the exact article route. The homepage and four index layouts retain their
existing styles. The article scrolls naturally and adapts to narrow screens.

All 16 PNGs in `public/articles/why-do-we-need-so-much-memory-anyway/` retain the
original Word bytes, dimensions, and embedded source credits. The public author
avatar and five publication icons are original embedded images extracted from
the PDF. Figures remain in order and are never cropped. Small figures retain
their native widths; the PDF's narrower HBM diagram is centered. Alt text describes
each figure. Source links attached to figures preserve captions that were links
in Word but not visible text in the PDF.

The PDF's wording is used where it differs: the introductory website link and
“Give it a look!”, the “Video:” label, “Some general tools are:”, and the
“Where to invest” heading. Source preview text is transcribed from the PDF;
its relative dates and reaction counts are historical, not live widgets.
The article's technical text has not been rewritten.

The supplied PDF is an email printout. Mail headers, private addresses,
forwarding details, newsletter subscription controls, and the Substack draft
status are not article content and are not published. Original Word/PDF files
and their metadata are not included in the public site.

Editing requires no content service. Update the article component, run lint,
tests, and build, and publish with the existing Vercel workflow. New article
routes also need exact rewrites in `vercel.json` and entries in `public/sitemap.xml`.
