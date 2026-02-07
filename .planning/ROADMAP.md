# Roadmap: Coffee Shop Landing Page

## Overview

A 4-phase roadmap that scaffolds the project foundation first, then builds the two content sections (Hero, About) as independent vertical slices, and closes with site-wide polish. Each phase delivers one verifiable capability. Phases 2 and 3 are independent after Phase 1 completes.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Project scaffold, layout shell, design tokens, mobile-first baseline
- [x] **Phase 2: Hero Section** - Full-viewport hero with background visual and tagline
- [x] **Phase 3: About Section** - Brand story section with side image
- [x] **Phase 4: Polish and Launch** - SEO metadata, footer, final spacing and review

## Phase Details

### Phase 1: Foundation
**Goal**: The project builds, runs locally, and establishes the visual and layout system that every section builds on.
**Depends on**: Nothing (first phase)
**Requirements**: [SITE-01]
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` starts the site with no errors and the browser shows a valid page
  2. The layout shell renders correctly at mobile, tablet, and desktop widths with no horizontal overflow
  3. Design tokens (colors, spacing, typography) are defined in one place and applied consistently
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Scaffold Next.js project, configure Tailwind and design tokens
- [x] 01-02-PLAN.md — Build responsive layout shell with fonts, verify at all breakpoints

### Phase 2: Hero Section
**Goal**: A visitor landing on the page sees a bold, full-viewport hero that immediately communicates brand identity.
**Depends on**: Phase 1
**Requirements**: [HERO-01, HERO-02, HERO-03]
**Success Criteria** (what must be TRUE):
  1. The hero occupies the full viewport height on first load with no scrolling required to see it
  2. A punchy, differentiated tagline is clearly readable against the background at all screen sizes
  3. The background visual (image or color with overlay) renders without layout shift and stays under 200KB
  4. The hero layout adapts cleanly to mobile, tablet, and desktop without text or image clipping
**Plans**: 1 plan

Plans:
- [x] 02-01-PLAN.md — Full-viewport hero with color background and responsive tagline

### Phase 3: About Section
**Goal**: A visitor who scrolls past the hero encounters a clear brand story that reinforces the shop's identity and aesthetic.
**Depends on**: Phase 1
**Requirements**: [ABOUT-01, ABOUT-02, ABOUT-03]
**Success Criteria** (what must be TRUE):
  1. The about section displays a heading and brand story paragraph that reads as a coherent narrative
  2. A side image is visible alongside the text content on desktop and repositions gracefully on mobile
  3. The section layout is readable and well-proportioned at mobile, tablet, and desktop widths
**Plans**: 1 plan

Plans:
- [x] 03-01-PLAN.md — Build about section with responsive grid and side image

### Phase 4: Polish and Launch
**Goal**: The site is production-ready: discoverable by search engines, complete with a footer, and visually cohesive end to end.
**Depends on**: Phase 2, Phase 3
**Requirements**: [SITE-02, SITE-03]
**Success Criteria** (what must be TRUE):
  1. The page has a descriptive title, meta description, and Open Graph image that appear correctly when the URL is shared
  2. A minimal footer with copyright is visible at the bottom of the page on all screen sizes
  3. Scrolling through the full page (hero to about to footer) feels visually cohesive with consistent spacing and no jarring transitions
**Plans**: 1 plan

Plans:
- [x] 04-01-PLAN.md — SEO metadata, OG image, footer, and visual cohesion review

## Progress

**Execution Order:**
1 -> 2 -> 3 -> 4 (Phases 2 and 3 are independent; both must complete before Phase 4)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete | 2026-02-06 |
| 2. Hero Section | 1/1 | Complete | 2026-02-07 |
| 3. About Section | 1/1 | Complete | 2026-02-07 |
| 4. Polish and Launch | 1/1 | Complete | 2026-02-07 |
