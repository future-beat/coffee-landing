# PITFALLS — Coffee Shop Landing Page

> Research dimension: What do landing page projects commonly get wrong?
> Scope: Minimal, brand-focused coffee shop landing page (Next.js / React). Hero + About sections. No menu, no location — pure brand storytelling.

---

## P1 — Treating "Minimal" as "Empty" Instead of "Intentional"

**What goes wrong:**
Developers and designers interpret "minimal aesthetic" as removing content without adding visual weight or whitespace structure. The result is a page that feels unfinished rather than curated. A single hero tagline floating on a bare background reads as a placeholder, not a brand statement.

**Warning signs (how to detect early):**
- Hero section has no secondary visual anchor (texture, image, subtle gradient, or typographic hierarchy) — just text on a flat color.
- Stakeholder feedback in early reviews uses words like "empty" or "it needs more."
- No explicit decision documented about what is *deliberately* excluded and why.

**Prevention strategy:**
- In the design phase, define a "visual weight checklist" per section: every section must have at least two layers of intentional design (e.g., typography scale + background treatment, or a hero image + a typographic tagline with contrast).
- Treat whitespace as a *designed element* — specify it in the layout spec, not as the absence of content.

**Phase:** Design / Visual spec (before any implementation begins)

---

## P2 — Ignoring Typography as the Primary Brand Vehicle

**What goes wrong:**
On a page with no menu, no location, and only two sections, typography does almost all the brand-conveying. Projects routinely reach for a generic system font or a trendy sans-serif and call it done. For a specialty coffee brand, the font *is* the first impression — and it gets deprioritized behind layout and framework setup.

**Warning signs (how to detect early):**
- No font pairing decision made before the first component is coded.
- Fonts are loaded via a default Next.js `next/font` import without any brand rationale documented.
- The tagline and the about-section body copy use the same font weight and size.

**Prevention strategy:**
- Lock in a font stack (primary display font + secondary body font) during the design phase, with explicit weight/size/line-height tokens defined before implementation.
- Typography is the *first* visual decision to sign off on — not a detail added at the end.
- Use CSS custom properties or a design token file so the font choices propagate consistently.

**Phase:** Design (font selection) / Implementation setup (design tokens)

---

## P3 — Hero Tagline That Sounds Generic, Not Specific

**What goes wrong:**
The hero tagline is the single most visible piece of copy on the page. Projects default to broad, interchangeable phrases ("Exceptional Coffee," "Crafted with Care") that could belong to any coffee brand. On a minimal page with no other differentiators in view, a generic tagline makes the entire page feel stock.

**Warning signs (how to detect early):**
- Tagline was written by the developer or generated as placeholder text and never reviewed by a copywriter or brand owner.
- The tagline contains no specific, concrete detail (origin, process, ritual, place) that anchors it to *this* coffee shop.
- No A/B or iteration plan exists for the tagline — it's treated as a one-and-done decision.

**Prevention strategy:**
- Treat the tagline as a *deliverable* with its own review step, separate from layout/code review.
- Brief the brand owner or copywriter with: what makes this shop different from the 500 others in the city? The tagline must contain at least one specific, differentiated signal.
- Have 2–3 tagline options ready before the hero layout is finalized so the layout can flex to accommodate different lengths.

**Phase:** Content / Copy (before hero layout is locked)

---

## P4 — Mobile Experience Designed Last (or Not At All)

**What goes wrong:**
Two-section landing pages feel simple enough that mobile is treated as an afterthought — "we'll just stack it." But on mobile, the entire brand impression compresses into a single viewport. A hero that works at 1440px with a sweeping image and large tagline becomes a cramped, misaligned mess at 375px if mobile layout was never explicitly designed.

**Warning signs (how to detect early):**
- No mobile wireframe or even a mobile-specific layout note exists in the design spec.
- Responsive breakpoints are added reactively during QA, not planned during implementation.
- The hero image or background treatment has no mobile-specific crop or fallback.

**Prevention strategy:**
- Design mobile-first or at minimum produce a mobile layout spec *alongside* the desktop spec before any code is written.
- Define responsive breakpoints and image crop behavior as explicit requirements in the implementation plan.
- Test on a real device (not just DevTools resize) at least once during development, not only at the end.

**Phase:** Design (mobile spec) / Implementation (responsive tokens + image handling)

---

## P5 — Image/Asset Strategy Undefined — Performance Kills the "Sleek" Feel

**What goes wrong:**
Brand-focused pages rely heavily on high-quality imagery (hero photos, texture, atmosphere shots). Developers grab large PNGs or JPEGs, drop them into Next.js, and ship. The page looks stunning in a local dev environment but loads painfully slow in production — completely undermining the "sleek, modern" brand promise. A 2-second load on a brand page is a brand failure.

**Warning signs (how to detect early):**
- No image format or size budget defined before assets are sourced.
- Hero image is a raw export from a design tool (often 2–5 MB).
- `next/image` is not being used, or is used with no explicit `sizes` prop.
- No Lighthouse or Core Web Vitals check is in the QA checklist.

**Prevention strategy:**
- Define an image budget (e.g., hero image must be under 200 KB after optimization) before assets are finalized.
- Use `next/image` with explicit `sizes`, `priority` on the hero image, and modern formats (WebP/AVIF).
- Add a Core Web Vitals check (LCP specifically) as a gate before the page is considered "done."

**Phase:** Asset planning (before design is finalized) / Implementation (image component setup) / QA (performance gate)

---

## P6 — Brand Colors Drift Between Design and Code

**What goes wrong:**
The design comp specifies exact hex values, HSL, or Tailwind palette tokens for the coffee brand palette (deep browns, creams, warm neutrals). During implementation, developers eyeball colors, use slightly-off Tailwind defaults, or hardcode hex values inconsistently across components. By the time the page is assembled, the brand palette is a patchwork.

**Warning signs (how to detect early):**
- Colors are specified as inline hex values in component JSX/CSS rather than pulled from a centralized theme or token file.
- The design spec has a color palette defined but no corresponding code-side token map.
- Two components that should share a background color visibly don't match on screen.

**Prevention strategy:**
- Create a design token file (e.g., `theme.ts` or a Tailwind `theme.extend` config) as one of the *first* implementation tasks, before any components are built.
- All color references in components must pull from tokens — zero hardcoded hex values in component code.
- Do a side-by-side design-vs-implementation color audit before any content review.

**Phase:** Implementation setup (design tokens) / QA (visual audit)

---

## P7 — "About/Story" Section Becomes a Wall of Text

**What goes wrong:**
The about section is where the brand story lives. On minimal pages, there's a temptation to dump the full origin story into this section to justify its existence. The result: a paragraph-dense block that visually and tonally contradicts the "minimal, impactful" design intent of the rest of the page.

**Warning signs (how to detect early):**
- The about section copy is longer than 4–5 sentences without any visual break, pull quote, or structural interruption.
- No layout structure (e.g., split layout, pull quote, image + text) is defined for the about section — it's just a text block.
- The about section wasn't reviewed alongside the hero section for tonal and visual consistency.

**Prevention strategy:**
- Cap the about section copy at 3–5 sentences max, or structure longer copy with a visual hierarchy (pull quote, image break, or a two-column layout with an image).
- Review the about section layout and copy *together with* the hero in a single design review — they are one brand impression, not two independent sections.
- The brand owner should sign off on the story text before layout is built around it, so the layout can be designed for the actual content, not placeholder copy.

**Phase:** Content / Copy (before layout is coded) / Design (section layout spec)

---

## P8 — Accessibility Treated as a Post-Ship Checklist Item

**What goes wrong:**
Minimal, visually-driven pages frequently fail accessibility standards. Low contrast between a cream background and a light warm-brown tagline. No semantic heading structure (everything is a `div` with font-size). No focus states on any interactive elements. For a brand page, this is both an ethical failure and an SEO failure (heading structure matters for indexing).

**Warning signs (how to detect early):**
- No contrast ratio check has been run against the brand color palette.
- The page has no `<h1>` or uses headings purely for visual styling without semantic meaning.
- Focus states are not visible or not designed.

**Prevention strategy:**
- Run a contrast ratio check on the brand palette *during the design phase*, before implementation. Adjust palette tokens if needed — the brand can flex, the WCAG minimum cannot.
- Use semantic HTML elements (`<h1>`, `<h2>`, `<section>`, `<nav>`) as a hard requirement — enforced in code review.
- Design visible focus states for any interactive element (even if the current page has few).

**Phase:** Design (contrast audit) / Implementation (semantic HTML enforcement) / QA (accessibility audit)

---

## P9 — Next.js App Structure Overengineered for a Two-Section Page

**What goes wrong:**
Developers familiar with Next.js scaffold a full app structure with dynamic routes, middleware, API routes, or complex layout nesting — for a page that is, functionally, a single static route. This adds build complexity, slows iteration, and makes future changes harder to reason about than they need to be.

**Warning signs (how to detect early):**
- More than one route/page file exists for what is a single-page landing page.
- `middleware.ts` or `next.config.js` has non-trivial configuration for no clear reason.
- A teammate unfamiliar with the project takes more than 5 minutes to understand the file structure.

**Prevention strategy:**
- Explicitly scope the Next.js structure at project kickoff: one page (`page.tsx`), a small number of components, a theme/token file, and static assets. That's it.
- If the page is purely static (no user-specific data, no dynamic routes), consider using `output: 'export'` for a zero-server deploy. Document the decision.
- Keep the file structure flat and legible — complexity earns its keep only when there's a reason for it.

**Phase:** Implementation setup (project scaffolding)

---

## P10 — Deployment Environment Mismatch Breaks Visual Fidelity

**What goes wrong:**
The page looks perfect on the developer's machine (local fonts loaded, full-res images cached, dark mode off). It deploys to Vercel or Netlify and suddenly: fonts flash unstyled (FOUT), images are cropped differently, or the page flickers on first load. The "sleek" brand impression is destroyed in the first 200ms of the real user experience.

**Warning signs (how to detect early):**
- No production preview has been reviewed before the final sign-off.
- Fonts are not preloaded or are loaded in a way that causes layout shift.
- The team has only reviewed the page locally, never on a staging/preview URL.

**Prevention strategy:**
- Make a production preview review a *required* step before any design or content sign-off. Local dev is for development; production preview is for decisions.
- Use `next/font` with `display: 'swap'` and preload hints, and test for FOUT on a clean browser (no cache).
- Add a deployment checklist item: "Has this been reviewed on a production preview URL on at least two devices?"

**Phase:** QA / Deployment (pre-ship gate)
