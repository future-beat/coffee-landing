# ARCHITECTURE — Coffee Shop Landing Page

> Research output for project architecture. Informs phase structure in roadmap.
> Written by: gsd-project-researcher
> Date: 2026-02-05

---

## Context

A minimal, two-section Next.js landing page for a coffee shop brand. No server-side data fetching, no CMS integration, no interactive forms — pure brand presence. The goal is impactful visuals and a clean narrative, not utility. This keeps the architecture static, component-driven, and dead simple.

---

## Component Map

```
App Shell (layout)
├── Navbar (optional/minimal — logo + nav links or just logo)
├── HeroSection
│   ├── HeroBackground (full-bleed image or video, CSS overlay)
│   ├── HeroContent
│   │   ├── Tagline (h1)
│   │   └── Subtext / CTA (optional)
│   └── ScrollIndicator (optional — subtle arrow or fade)
├── AboutSection
│   ├── AboutImage (side image or decorative visual)
│   ├── AboutContent
│   │   ├── SectionHeading (h2)
│   │   └── StoryBody (p — brand narrative)
│   └── (optional) AccentVisual (small texture or illustration)
└── Footer (minimal — copyright, maybe socials)
```

### Component Boundaries — What Talks to What

| Component | Receives | Passes Down | Notes |
|---|---|---|---|
| `layout.tsx` (App Shell) | — | Renders page children in order | Next.js app router layout; wraps font/theme provider |
| `HeroSection` | — | Props to HeroBackground, HeroContent | Self-contained page block; no shared state |
| `HeroBackground` | `imageSrc` or `videoSrc` | — | Purely presentational; CSS `object-cover` or video element |
| `HeroContent` | `tagline`, `subtext` (strings) | — | Typography-focused; no logic |
| `AboutSection` | — | Props to AboutImage, AboutContent | Self-contained page block |
| `AboutImage` | `src`, `alt` | — | Presentational; `next/image` for optimization |
| `AboutContent` | `heading`, `body` (strings) | — | Purely presentational |
| `Footer` | — | — | Static. Logo, copyright year, optional social links |

Key boundary rule: **HeroSection and AboutSection do not communicate with each other.** They are sibling blocks rendered sequentially by the layout. No shared state, no context, no props flowing between them.

---

## Data Flow

```
Static content (hardcoded or local config)
        │
        ▼
layout.tsx renders sections in order
        │
        ├──▶ HeroSection ──▶ HeroBackground (imageSrc)
        │                 └──▶ HeroContent   (tagline, subtext)
        │
        └──▶ AboutSection ──▶ AboutImage    (src, alt)
                          └──▶ AboutContent  (heading, body)
```

- **Direction:** Top-down only. Parent to child, props only.
- **No state management needed.** No `useState`, no `useContext`, no Redux. All content is static strings and image paths.
- **No API calls.** Content lives in the component files directly, or optionally in a single `content.ts` config object that is imported where needed. That config file is the single source of truth for all copy and image paths — easy to swap later if a CMS is introduced.
- **`next/image`** is used for any `<img>` tags to get automatic optimization, lazy loading, and responsive sizing for free.

---

## Build Order (Dependencies)

This is the order to build in. Each item depends only on what is above it.

| Step | What to Build | Why This Order |
|---|---|---|
| 1 | **Project scaffold** — `next create`, Tailwind (or CSS modules), font setup (`next/font`) | Foundation. Everything else sits on this. |
| 2 | **`layout.tsx`** — App shell, global styles, font provider | The wrapper. Sections render inside it. |
| 3 | **`HeroSection` + children** (`HeroBackground`, `HeroContent`) | First thing a visitor sees. Core brand moment. No dependencies on other page sections. |
| 4 | **`AboutSection` + children** (`AboutImage`, `AboutContent`) | Second section. Same pattern as Hero — independent block. Can be built in parallel with Hero if two people are working, but sequentially it comes next as the narrative flows top-to-bottom. |
| 5 | **`Footer`** | Last and simplest. No dependencies. |
| 6 | **Spacing, transitions, scroll polish** | Final layer. Fine-tune gaps, section transitions (e.g., subtle fade or parallax on scroll), and overall vertical rhythm. |

### Dependency Notes

- Steps 3 and 4 are **independent of each other** — they can be built in parallel.
- Step 6 (polish) is the only step that touches multiple sections, so it comes last.
- If a `content.ts` config file is used, it can be introduced at Step 3 and reused at Step 4 — but it is not required. Hardcoded strings in each section work fine for a two-section page.

---

## Technology Decisions (Implied by Architecture)

| Decision | Rationale |
|---|---|
| Next.js App Router (`app/`) | Modern default. `layout.tsx` + `page.tsx` pattern is clean for single-page sites. |
| Tailwind CSS | Utility-first = fast to style minimal layouts. No unused CSS bloat in production. |
| `next/font` | Zero-layout-shift font loading. Critical for a brand-forward design. |
| `next/image` | Automatic image optimization. Matters for hero background and about image. |
| No client-side state | Page is static. `"use client"` only needed if scroll-triggered animations are added later. |
| No data fetching | All content is local. ISG/SSR is unnecessary overhead for a brand page. |

---

## What This Architecture Does NOT Include (and Why)

- **No CMS / API layer** — Out of scope for brand-presence MVP. Can be bolted on later by replacing the `content.ts` config with an API call.
- **No authentication** — No user accounts, no login.
- **No routing beyond `/`** — Single page. If a menu or contact page is added later, the layout and section-block pattern scales naturally.
- **No animation library** — Scroll-triggered effects can be added with CSS (`@keyframes`, `IntersectionObserver`) without pulling in a dependency. Keep it light until there is a reason not to.

---

## Quality Gate

- [x] Components clearly defined with boundaries
- [x] Data flow direction explicit
- [x] Build order implications noted
