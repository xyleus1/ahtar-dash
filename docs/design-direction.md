# Design direction

The page is a personal introduction and a short list of things to explore. Typography, alignment, and empty space carry the design. The four interests remain available without becoming four separate visual sections.

## Composition

- A small name at the top, with the same outer gutter as the rest of the page.
- Three editable bio sentences form one large, full-width paragraph. Use Host Grotesk with a medium weight, close tracking, responsive sizing, and an indented first line on desktop. Remove the indent on mobile. Leave enough space around the paragraph to make it the focal point.
- One plain definition list follows: **Enjoying, Reading, Writing, Building**, in that order. Labels and entries share consistent columns; long entries wrap naturally. Mobile uses narrower label columns and comfortable link targets.
- Small contact links finish the page. Empty URLs are readable text, never fake links.
- A near-white `#FAF9F6` surface, near-black `#191817` text, muted `#6B6763` labels, and restrained crimson `#B3262D`. Accent color is intentional, not a background effect.
- No cards, boxes, borders around content, icons, hover glow, photos, decorative symbols, oversized section headings, or footer slogan.

[Athena Shiravi's About page](https://athenashiravi.com/about) is the main composition reference. Its published CSS uses full-width prose, 24px gutters, Host Grotesk 500, tight tracking, and a large responsive type scale: 66px on desktop, 45px on tablet, and 28px on mobile. Those are reference measurements, not requirements to duplicate at every breakpoint. The rendered desktop reference has an orange canvas; a white background declaration in its static source does not describe that final appearance. Our near-white canvas is an intentional adaptation of the requested neutral palette and crimson accent. Preserve Athena's confident prose and shared alignment while reducing the navigation and removing the photography and career sections.

The rejected centered card layout divided a small amount of content into too many competing objects. Removing the cards, icon labels, spotlights, and repeated copy makes the bio the clear entry point and lets the links read as one compact list.

## Motion

Use one masked line reveal for the bio, based on [React Bits SplitText](https://reactbits.dev/text-animations/split-text) and [GSAP SplitText](https://gsap.com/docs/v3/Plugins/SplitText/). Keep the entrance short, use restrained easing, and avoid a perpetual effect. Content remains readable while fonts load; if the font takes longer than 150ms, skip the entrance so text already being read never disappears. The desktop first-line indent stays intact before, during, and after the reveal. Splitting must preserve the accessible text, handle responsive reflow, and clean up after itself. Ordinary links need clear hover and keyboard feedback; they do not need another animation system.

## Design references

These references guide the decisions above; they are not runtime dependencies.

- [Justin Wang](https://jstwng.com/): a simple text name, short prose, and inline contact links inform the supporting structure; Athena remains the reference for the large display type.
- [web.dev: prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion): honor live operating-system preference changes, stop unnecessary movement, and preserve a complete static variant without requiring a reload.
- [Impeccable: distill](https://github.com/pbakaus/impeccable/blob/main/skill/reference/distill.md): remove redundant content, unnecessary containers, and decorative complexity; use alignment and spacing to organize information.
- [Impeccable: typeset](https://github.com/pbakaus/impeccable/blob/main/skill/reference/typeset.md): keep a deliberate, limited hierarchy; tune tracking and leading to the actual face; check long text, font loading, and zoom.
- [Impeccable: quieter](https://github.com/pbakaus/impeccable/blob/main/skill/reference/quieter.md): reduce competing emphasis and motion while retaining a clear visual identity.
- [Impeccable: craft floor](https://github.com/pbakaus/impeccable/blob/main/skill/reference/craft-floor.md): verify the rendered result, including contrast, responsive behavior, spacing, and interaction quality.
- [pen.dev: design and code](https://docs.pen.dev/design-and-code/design-to-code) and [agent iteration](https://docs.pen.dev/core-concepts/ai-agents): keep design decisions and code consistent, compare alternatives, and refine the selected composition. Consulted as workflow references; the pen.dev application was not used to build this page.

## Acceptance checks

- At 320px, tablet, and wide desktop widths, the bio reads cleanly and no content overflows horizontally. Check populated content and unusually long titles as well as placeholders.
- The first impression is the bio and empty space. No decorative component competes with the text; no card or spotlight styling survives.
- Enjoying precedes Reading, Writing, and Building. Their entries and contact details remain editable through the content file.
- Keyboard users can identify and activate every real link. Focus is visible, touch targets are usable, and text meets contrast requirements.
- Reduced motion shows the complete bio without waiting. Font loading and viewport changes do not leave text clipped, missing, duplicated for assistive technology, or stuck in its entrance state.
- Build, lint, and relevant content/link tests pass. Review the deployed page at the production domain after publishing.
