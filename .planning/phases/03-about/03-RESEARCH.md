# Phase 3: About Section - Research

**Researched:** 2026-02-06
**Domain:** Responsive text + image layouts, next/image, typography for readability
**Confidence:** HIGH

## Summary

This phase builds an "About" section that displays a brand story with a heading, paragraph, and side image. The layout needs to be side-by-side on desktop and stack gracefully on mobile. The research focuses on four key areas: (1) text + image layout patterns using CSS Grid and Flexbox, (2) Next.js `next/image` for optimized content images, (3) typography and spacing for readability, and (4) mobile reflow best practices.

The established approach for this pattern is a CSS Grid or Flexbox two-column layout that switches from `grid-cols-2` (desktop) to `grid-cols-1` (mobile) using Tailwind's mobile-first responsive prefixes. The `next/image` component with the `fill` prop inside a relatively-positioned container handles responsive images without layout shift. Typography should use a 45-75 character line length (`max-w-prose` in Tailwind) and 1.4-1.5 line height for optimal readability.

**Primary recommendation:** Use a CSS Grid layout with `grid grid-cols-1 md:grid-cols-2 gap-8 items-center` for the two-column arrangement, `next/image` with `fill` and `object-cover` for the side image, and `max-w-prose` for readable paragraph width.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next/image | Next.js 16 built-in | Optimized responsive images | Automatic WebP, lazy loading, prevents CLS |
| Tailwind CSS Grid | v4.1 | Two-column layout | Native CSS Grid with utility classes |
| Tailwind CSS Typography | v4.1 | Line height, max-width | `max-w-prose`, `leading-*` utilities |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx + tailwind-merge (cn utility) | @latest | Conditional class composition | When combining dynamic classes |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Grid | Flexbox | Flexbox works fine for simple 2-column; Grid is more explicit and handles alignment better |
| next/image fill | next/image with explicit dimensions | Explicit dimensions work when aspect ratio is fixed; fill is better for responsive containers |

**Installation:**
```bash
# Already installed from Phase 1 - no additional packages needed
```

## Architecture Patterns

### Recommended Component Structure
```
app/
├── components/
│   └── About.tsx          # About section component
└── page.tsx               # Imports and renders About
```

### Pattern 1: Responsive Two-Column Grid
**What:** CSS Grid layout that stacks on mobile and becomes side-by-side on desktop
**When to use:** Any text + image side-by-side layout
**Example:**
```tsx
// Source: Tailwind CSS docs - grid-template-columns, responsive-design
<section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-16 px-4 md:px-8 lg:px-16">
  {/* Text column */}
  <div>
    <h2 className="font-display text-3xl md:text-4xl mb-6">Our Story</h2>
    <p className="max-w-prose leading-relaxed">
      Brand story paragraph goes here...
    </p>
  </div>

  {/* Image column */}
  <div className="relative aspect-[4/3] md:aspect-square">
    <Image
      src="/about-image.jpg"
      alt="Coffee shop interior"
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover rounded-lg"
    />
  </div>
</section>
```

### Pattern 2: next/image with Fill for Responsive Images
**What:** Image component that fills its container, maintaining aspect ratio
**When to use:** When image should be responsive within a layout container
**Example:**
```tsx
// Source: Next.js 16 docs - image component, getting-started/images
<div className="relative aspect-[4/3]">
  <Image
    src="/about-image.jpg"
    alt="Descriptive alt text"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
  />
</div>
```

**Key requirements:**
- Parent must have `position: relative`
- Parent should have defined dimensions (via `aspect-*` or explicit height)
- Use `sizes` prop to help browser select correct image size
- Use `object-cover` or `object-contain` for aspect ratio handling

### Pattern 3: Readable Typography
**What:** Line length and spacing optimized for readability
**When to use:** Any body text content
**Example:**
```tsx
// Source: Typography best practices research
<p className="max-w-prose leading-relaxed text-base md:text-lg">
  Text content here...
</p>
```

**Key values:**
- `max-w-prose` = 65ch (characters) - optimal line length
- `leading-relaxed` = 1.625 line height - good for body text
- `leading-normal` = 1.5 - also acceptable
- Base font size 16px minimum

### Anti-Patterns to Avoid
- **Fixed pixel widths for text containers:** Use `max-w-prose` or percentage-based widths instead
- **Images without aspect ratio containers:** Always wrap `fill` images in a container with defined aspect ratio
- **Missing `sizes` prop on responsive images:** Causes unnecessarily large downloads
- **Tight line height on body text:** Use at least `leading-normal` (1.5) or `leading-relaxed` (1.625)

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive images | `<img>` with CSS | `next/image` with `fill` | WebP conversion, srcset generation, lazy loading, blur placeholder |
| Image aspect ratio | Padding-bottom hack | `aspect-*` Tailwind utility | Native CSS aspect-ratio is well-supported |
| Readable line length | Custom max-width calc | `max-w-prose` | 65ch is the typographic standard |
| Responsive layout | Manual media queries | Tailwind grid + prefixes | Consistent breakpoints, less code |

**Key insight:** The `next/image` component handles image optimization automatically (WebP conversion, responsive srcset, lazy loading, blur placeholders). Rolling your own `<img>` loses all these optimizations.

## Common Pitfalls

### Pitfall 1: Missing Position Relative on Image Container
**What goes wrong:** `next/image` with `fill` renders incorrectly or at 0 size
**Why it happens:** `fill` images use `position: absolute` and need a positioned parent
**How to avoid:** Always add `relative` class to the image container div
**Warning signs:** Image not visible or overflowing layout

### Pitfall 2: No `sizes` Prop on Fill Images
**What goes wrong:** Browser downloads full-size image even on mobile
**Why it happens:** Without `sizes`, browser assumes image is 100vw
**How to avoid:** Always provide `sizes` prop matching your layout breakpoints
**Warning signs:** Large LCP times on mobile, high bandwidth usage

### Pitfall 3: Text Column Too Wide
**What goes wrong:** Lines exceed 90 characters, reducing readability
**Why it happens:** Grid columns expand to fill space without max-width constraint
**How to avoid:** Use `max-w-prose` on text content
**Warning signs:** Paragraph text feels hard to read, eyes losing track of lines

### Pitfall 4: Image Aspect Ratio Not Defined
**What goes wrong:** Layout shift when image loads, or image squished/stretched
**Why it happens:** Container has no inherent height for `fill` image to fill
**How to avoid:** Use `aspect-*` utility on container (e.g., `aspect-[4/3]`, `aspect-square`)
**Warning signs:** CLS issues, image looks distorted

### Pitfall 5: Column Order on Mobile
**What goes wrong:** Image appears before text on mobile (may not match design intent)
**Why it happens:** Grid source order places image column first
**How to avoid:** Consider column order - text first in markup, or use `order-*` utilities
**Warning signs:** Mobile layout feels off compared to design

## Code Examples

Verified patterns from official sources:

### Complete About Section Component
```tsx
// Source: Next.js docs (image), Tailwind docs (grid, responsive-design)
import Image from "next/image";

export default function About() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Text content */}
        <div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6">
            Our Story
          </h2>
          <p className="max-w-prose leading-relaxed text-base md:text-lg">
            We believe in the ritual of great coffee. From sourcing the finest
            beans to perfecting our roast, every cup tells a story of craft
            and care. Our space is designed to be your third place - somewhere
            between home and work where you can slow down, savor the moment,
            and connect.
          </p>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/3] md:aspect-square rounded-lg overflow-hidden">
          <Image
            src="/about-coffee.jpg"
            alt="Interior of coffee shop with warm lighting"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
```

### Local Static Image Import (Alternative)
```tsx
// Source: Next.js docs - getting-started/images
import Image from "next/image";
import aboutImage from "@/public/about-coffee.jpg";

export default function About() {
  return (
    <div className="relative aspect-[4/3]">
      <Image
        src={aboutImage}
        alt="Coffee shop interior"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        placeholder="blur" // Auto blur-up with static imports
        className="object-cover"
      />
    </div>
  );
}
```

### Reverse Column Order on Mobile
```tsx
// Source: Tailwind docs - display, order
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Image first in source, but shows second on mobile */}
  <div className="order-2 md:order-1 relative aspect-[4/3]">
    <Image ... />
  </div>

  {/* Text second in source, but shows first on mobile */}
  <div className="order-1 md:order-2">
    <h2>...</h2>
    <p>...</p>
  </div>
</div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `priority` prop on next/image | `preload` prop | Next.js 16 | `priority` deprecated, use `preload` for LCP images |
| padding-bottom aspect ratio hack | `aspect-*` CSS utility | CSS aspect-ratio support | Native browser support, cleaner code |
| `grid-template-columns` in CSS | Tailwind `grid-cols-*` utilities | Tailwind v4 | Theme tokens compile to CSS variables |
| `tailwind.config.js` | `@theme` in CSS | Tailwind v4 | CSS-first configuration |

**Deprecated/outdated:**
- `priority` prop: Use `preload={true}` instead (Next.js 16)
- `next/legacy/image`: Use `next/image` - legacy is fully deprecated
- Padding-bottom hack for aspect ratio: Use `aspect-[4/3]` or `aspect-square`

## Open Questions

Things that couldn't be fully resolved:

1. **Exact image dimensions for about section**
   - What we know: Should be content image, not hero-sized
   - What's unclear: Actual image file not yet sourced
   - Recommendation: Use placeholder image initially; dimensions will be determined by aspect ratio container (4:3 or square recommended)

2. **Brand story copy**
   - What we know: Needs heading + paragraph, coherent narrative
   - What's unclear: Actual copy content not provided
   - Recommendation: Use realistic placeholder copy in implementation, replace with actual content

## Sources

### Primary (HIGH confidence)
- [Next.js Image Component API Reference](https://nextjs.org/docs/app/api-reference/components/image) - fill prop, sizes, preload
- [Next.js Image Optimization Guide](https://nextjs.org/docs/app/getting-started/images) - local vs remote, best practices
- [Tailwind CSS Grid Template Columns](https://tailwindcss.com/docs/grid-template-columns) - grid-cols-*, gap
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design) - mobile-first, breakpoints

### Secondary (MEDIUM confidence)
- Typography best practices aggregated from multiple sources (UXPin, Pimp my Type, Learn UI Design)
- Line length 45-75 characters, line height 1.4-1.5 for body text

### Tertiary (LOW confidence)
- None - all findings verified with official documentation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - next/image and Tailwind Grid are official, documented approaches
- Architecture: HIGH - patterns verified in official docs
- Pitfalls: HIGH - based on documented requirements (position:relative, sizes prop, aspect ratio)

**Research date:** 2026-02-06
**Valid until:** 60 days (stable patterns, not fast-moving)
