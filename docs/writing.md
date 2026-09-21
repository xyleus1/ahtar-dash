# Memory article

Published route: `/writing/why-do-we-need-so-much-memory-anyway`.

The owner supplied **The K List - All Spaces (2).docx** and **Draf1Memory.pdf**.
The Word file supplies selectable text, hyperlinks, and 16 original PNG figures.
The PDF supplies the headings, bold labels, list hierarchy, and subtitle.
All 26 PDF pages were visually reviewed.

`src/posts/MemoryArticle.tsx` contains the article as native semantic HTML through
React. `article.css` is scoped to this article. The component renders only on its
exact route; its lazy module and styles preload on hover or focus of Writing or
the article entry, and when the Writing index opens. The entry and the article's
home link use client navigation without reloading the document.

The article fills its own scrolling reading column. A previously visited index's
gallery remains mounted but invisible, inert, and paused, preserving its selected
image for return navigation. Direct article visits do not create the gallery or
download its images until an index is visited. The article uses the same native
Times serif font and plain text treatment as the site and adapts to narrow screens.
Only the title, headings, and the PDF's four bold labels have bold weight.
The publication date appears directly under the title. There is no byline,
avatar, publication card, or decorative article UI.

All 16 PNGs in `public/articles/why-do-we-need-so-much-memory-anyway/` retain the
original Word bytes, dimensions, and embedded source credits.
Figures remain in order and are never cropped. Small figures retain
their native widths; the PDF's narrower HBM diagram is centered. Alt text describes
each figure. Each supplied image-source link is attached directly to its image,
with no separate visible source caption. Image16 has no source URL in the supplied
documents and remains unlinked.

The PDF's wording is used where it differs: the introductory website link and
“Give it a look!”, the “Video:” label, “Some general tools are:”, and the
“Where to invest” heading. Source previews are reduced to links on their images.
The article's technical text has not been rewritten. Both referenced YouTube
videos are embedded in place using native, lazy-loaded players without autoplay.
Their original text links remain available beside the embeds.

The supplied PDF is an email printout. Mail headers, private addresses,
forwarding details, newsletter subscription controls, and the Substack draft
status are not article content and are not published. Original Word/PDF files
and their metadata are not included in the public site.

Editing requires no content service. Update the article component, run lint,
tests, and build, and publish with the existing Vercel workflow. New article
routes also need exact rewrites in `vercel.json` and entries in `public/sitemap.xml`.
