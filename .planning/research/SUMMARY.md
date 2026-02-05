# Research Summary — Coffee Shop Landing Page

> Synthesized from: STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md
> Date: 2026-02-05

---

## Project Overview

A minimal, modern landing page for a coffee shop. Two sections only: hero with bold tagline, and about/story section. The goal is brand presence and aesthetic — not utility. No menu, no location, no ordering.

---

## Stack Decision

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 16 (App Router) | Modern default, Server Components, zero client JS by default |
| Styling | Tailwind CSS v4 | Zero-config, CSS variables, included in create-next-app |
| Animation | Motion 12.x | Minimal entrance effects, 3 lines of code |
| Fonts | next/font (Playfair Display + Inter) | Zero layout shift, self-hosted |

**Bootstrap command:**
```bash
npx create-next-app@latest coffee-landing --yes
cd coffee-landing
npm install motion clsx tailwind-merge
```

---

## Key Features (v1)

### Must Have
- Responsive hero section with impactful tagline
- About/story section with brand narrative
- Mobile-first responsive design
- Optimized images via next/image
- SEO metadata (title, description, OG image)

### Nice to Have
- Subtle entrance animation on hero (fade + slide)
- Smooth scroll behavior
- Custom font pairing (Playfair Display + Inter)

### Explicitly Out of Scope
- Menu/pricing
- Location/hours
- Contact form
- Newsletter signup
- Dark mode (v1)

---

## Architecture

```
App Shell (layout.tsx)
├── HeroSection
│   ├── HeroBackground (full-bleed image)
│   └── HeroContent (tagline, optional subtext)
├── AboutSection
│   ├── AboutImage (side visual)
│   └── AboutContent (heading, story body)
└── Footer (minimal)
```

**Key principle:** Hero and About are independent sibling blocks. No shared state. Top-down data flow only.

**Build order:**
1. Project scaffold + Tailwind + fonts
2. Layout shell
3. Hero section
4. About section
5. Footer
6. Polish (spacing, transitions)

---

## Top Pitfalls to Avoid

| Pitfall | Prevention |
|---------|------------|
| **"Minimal" becomes "empty"** | Every section needs 2+ layers of visual design (typography + background treatment) |
| **Generic tagline** | Tagline needs specific, differentiated brand signal — not "Exceptional Coffee" |
| **Typography deprioritized** | Lock in font stack before coding starts |
| **Mobile as afterthought** | Design mobile-first or mobile-alongside |
| **Slow hero image** | Define image budget (under 200KB), use next/image with priority |
| **Color drift** | Create design tokens file before any components |

---

## Roadmap Implications

Given the simple scope (2 sections), this should be a **3-4 phase project**:

1. **Foundation** — Scaffold, layout, design tokens, fonts
2. **Hero Section** — Background, content, responsive layout
3. **About Section** — Image, content, layout
4. **Polish** — Footer, animations, spacing, final QA

Each phase is independent after Phase 1. Hero and About can technically be built in parallel.

---

## Confidence

- **HIGH:** Stack recommendations (Next.js 16, Tailwind v4, Motion)
- **HIGH:** Architecture (simple, static, component-based)
- **HIGH:** Feature scope (minimal is correct for brand-presence)
- **MEDIUM:** Exact phase count (depends on polish level desired)
