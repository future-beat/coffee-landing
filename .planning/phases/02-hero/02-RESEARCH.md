# Phase 2: Hero Section - Research

**Researched:** 2026-02-06
**Domain:** Full-viewport hero sections, next/image optimization, responsive layout, text accessibility
**Confidence:** HIGH

## Summary

This research covers best practices for implementing a full-viewport hero section in Next.js 16 with Tailwind CSS v4. The phase requires a bold hero that fills the viewport, displays a punchy tagline with proper contrast, and includes a background visual that renders without layout shift while staying under 200KB.

The standard approach combines: (1) modern CSS viewport units (`dvh`) to prevent mobile browser layout shifts, (2) Next.js Image component with `fill` and `priority` props for optimized background loading, (3) semi-transparent overlay gradients to ensure WCAG-compliant text contrast, and (4) Tailwind's mobile-first responsive utilities for clean adaptation across breakpoints.

**Primary recommendation:** Use `min-h-dvh` for viewport height (avoids mobile browser chrome issues), next/image with `fill` and `priority` for the background, and a dark gradient overlay to guarantee tagline readability at 4.5:1 contrast ratio.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next/image | 16.x (built-in) | Optimized image loading | Automatic format conversion, responsive sizing, priority preloading |
| Tailwind CSS | 4.x | Responsive styling | Mobile-first utilities, @theme for tokens, dvh support |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Squoosh/TinyPNG | N/A (tools) | Image compression | Pre-compress hero images to WebP/AVIF under 200KB |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next/image fill | CSS background-image | Loses automatic optimization, format conversion, preloading |
| Gradient overlay | Text shadow | Shadows alone may not guarantee sufficient contrast on all image areas |
| dvh units | vh units | vh causes layout shift on mobile when browser chrome shows/hides |

**Installation:**
```bash
# No additional packages needed - all built into Next.js 16 + Tailwind 4
```

## Architecture Patterns

### Recommended Component Structure
```
app/
├── page.tsx                 # Home page with Hero section
└── components/
    └── Hero.tsx             # Hero component (optional extraction)
public/
└── images/
    └── hero-bg.webp         # Pre-optimized hero background (<200KB)
```

### Pattern 1: Full-Viewport Hero with Background Image
**What:** A section that fills the viewport height using modern CSS units, with an optimized background image and overlay
**When to use:** Hero sections that need to make immediate visual impact on landing
**Example:**
```typescript
// Source: Next.js Image docs + modern viewport research
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center">
      {/* Background image with fill */}
      <Image
        src="/images/hero-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark gradient overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-8">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white">
          Tagline Here
        </h1>
      </div>
    </section>
  );
}
```

### Pattern 2: Color-Based Hero (No Image)
**What:** Full-viewport section using brand colors and optional gradient instead of an image
**When to use:** When a cleaner aesthetic is preferred or image isn't available
**Example:**
```typescript
// Source: Tailwind responsive design patterns
export default function Hero() {
  return (
    <section className="min-h-dvh flex items-center justify-center bg-brand-espresso">
      <div className="text-center px-4 md:px-8">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-cream">
          Tagline Here
        </h1>
      </div>
    </section>
  );
}
```

### Pattern 3: Responsive Text Scaling
**What:** Typography that scales smoothly across mobile, tablet, and desktop
**When to use:** All hero taglines
**Example:**
```typescript
// Source: Tailwind responsive design docs
// Mobile-first: base size, then larger at breakpoints
<h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
  Craft Coffee, Elevated
</h1>

// Subheadline with proportional scaling
<p className="text-lg sm:text-xl md:text-2xl mt-4 md:mt-6">
  Every cup tells a story
</p>
```

### Anti-Patterns to Avoid
- **Using `h-screen` or `100vh` alone:** Causes layout shift on mobile browsers when address bar shows/hides. Use `min-h-dvh` instead.
- **Missing `priority` on hero images:** Hero images are LCP elements and must load immediately, not lazy-load.
- **Omitting `sizes` prop:** Without sizes, Next.js cannot optimize responsive image delivery.
- **Text directly on variable images:** Without overlay, some areas may fail contrast requirements.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Manual resize/compress pipeline | next/image with WebP source | Automatic format selection (AVIF/WebP/JPEG), responsive srcset, lazy loading |
| Viewport height on mobile | JavaScript resize listeners | CSS `dvh` unit | Browser-native, no JS, handles address bar changes |
| Image preloading | Custom `<link rel="preload">` | next/image `priority` prop | Next.js handles preload injection automatically |
| Layout shift prevention | Complex aspect-ratio hacks | next/image `fill` with parent dimensions | Built-in placeholder and sizing |

**Key insight:** next/image handles the complexity of responsive image loading, format conversion, and LCP optimization that would take hundreds of lines of custom code to replicate poorly.

## Common Pitfalls

### Pitfall 1: Mobile Viewport Height Shift
**What goes wrong:** Hero appears to "jump" when scrolling begins on mobile as browser chrome hides
**Why it happens:** `100vh` is calculated based on the viewport with full browser chrome, but scrolling hides the address bar
**How to avoid:** Use `min-h-dvh` (dynamic viewport height) or `min-h-svh` (small viewport height) instead of `h-screen`
**Warning signs:** Hero content gets cut off or shifts during first scroll on mobile Safari/Chrome

### Pitfall 2: Hero Image Lazy Loading
**What goes wrong:** Hero shows blank/placeholder while image loads, poor LCP score
**Why it happens:** next/image lazy-loads by default; hero images need immediate loading
**How to avoid:** Always add `priority` prop to hero images
**Warning signs:** Lighthouse LCP warning, visible image pop-in on page load

### Pitfall 3: Insufficient Text Contrast
**What goes wrong:** Tagline is unreadable in some areas of the hero image
**Why it happens:** Background images have variable light/dark areas; text may pass contrast in some spots but fail in others
**How to avoid:** Use a consistent overlay (gradient or solid) that guarantees 4.5:1 contrast for normal text (3:1 for large text)
**Warning signs:** WCAG contrast checker fails, text hard to read on certain background areas

### Pitfall 4: Missing `sizes` Prop Causing Large Downloads
**What goes wrong:** Mobile devices download desktop-sized images
**Why it happens:** Without `sizes`, browser cannot determine which responsive image to fetch
**How to avoid:** Add `sizes="100vw"` for full-width hero images
**Warning signs:** Network tab shows large image downloads on mobile, slow mobile load times

### Pitfall 5: Hero Image Over 200KB
**What goes wrong:** Slow page load, poor Core Web Vitals
**Why it happens:** Using uncompressed JPEG/PNG instead of optimized WebP/AVIF
**How to avoid:** Pre-compress source images using Squoosh or TinyPNG to WebP format, target 150-180KB for 1920px hero
**Warning signs:** Image file > 200KB in public folder, Lighthouse performance warnings

## Code Examples

Verified patterns from official sources:

### Full Hero Implementation
```typescript
// Source: Next.js Image docs, Tailwind responsive design
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-bg.webp"
        alt="" // Decorative, screen readers skip
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
      />

      {/* Gradient Overlay - ensures text contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-16 max-w-4xl">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
          Craft Coffee, Elevated
        </h1>
        <p className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
          Where every cup is a journey
        </p>
      </div>
    </section>
  );
}
```

### Color-Based Hero (No Image)
```typescript
// Source: Tailwind docs, existing project tokens
export default function Hero() {
  return (
    <section className="min-h-dvh flex items-center justify-center bg-brand-espresso px-4 sm:px-6 md:px-8">
      <div className="text-center max-w-4xl">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-cream leading-tight">
          Craft Coffee, Elevated
        </h1>
        <p className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl text-brand-cream/80 max-w-2xl mx-auto">
          Where every cup is a journey
        </p>
      </div>
    </section>
  );
}
```

### Responsive Padding Pattern
```typescript
// Source: Tailwind responsive design docs
// Mobile-first padding that grows with screen size
<div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
  {/* Content */}
</div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `100vh` for full viewport | `dvh/svh/lvh` viewport units | 2022-2023 | Eliminates mobile browser chrome layout shift |
| `layout="fill"` on Image | `fill` prop (boolean) | Next.js 13+ | Cleaner API, same functionality |
| `priority` for preload | `priority` (still current, but `loading="eager"` + `fetchPriority="high"` also work) | Next.js 16 | `priority` remains recommended for hero images |
| JavaScript viewport fixes | CSS-only solution | 2023 | No JS needed for mobile viewport handling |

**Deprecated/outdated:**
- `h-screen` for heroes: Use `min-h-dvh` to avoid mobile issues
- `layout` prop on Image: Replaced with `fill` boolean prop
- Manual image preload tags: Let `priority` prop handle it

## Open Questions

Things that couldn't be fully resolved:

1. **Image vs. Color-Only Hero**
   - What we know: Both patterns are valid; image adds visual impact, color is simpler/faster
   - What's unclear: User preference not specified in requirements
   - Recommendation: Default to color-based hero (brand-espresso background with brand-cream text) which is guaranteed to meet contrast and size requirements. Can add image in future iteration.

2. **Exact Tagline Copy**
   - What we know: Requirements say "punchy, differentiated tagline"
   - What's unclear: Specific copy not provided
   - Recommendation: Use placeholder like "Craft Coffee, Elevated" that can be updated. Focus on typography and layout.

## Sources

### Primary (HIGH confidence)
- [Next.js Image Component docs](https://nextjs.org/docs/app/api-reference/components/image) - fill, priority, sizes props
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design) - breakpoint system, mobile-first approach
- [Modern CSS Viewport Units (Medium)](https://medium.com/@tharunbalaji110/understanding-mobile-viewport-units-a-complete-guide-to-svh-lvh-and-dvh-0c905d96e21a) - dvh/svh/lvh explanation

### Secondary (MEDIUM confidence)
- [Smashing Magazine - Accessible Text Over Images](https://www.smashingmagazine.com/2023/08/designing-accessible-text-over-images-part1/) - overlay techniques, WCAG contrast
- [DebugBear - Next.js Image Optimization](https://www.debugbear.com/blog/nextjs-image-optimization) - LCP optimization patterns
- [Handling Text Over Images (Ahmad Shadeed)](https://ishadeed.com/article/handling-text-over-image-css/) - CSS overlay patterns
- [WebAIM Contrast Guidelines](https://webaim.org/articles/contrast/) - 4.5:1 and 3:1 contrast requirements

### Tertiary (LOW confidence)
- [Hero Section Design Best Practices 2026](https://www.perfectafternoon.com/2025/hero-section-design/) - general design guidance
- [Image Size Optimization Guide](https://tiny-img.com/blog/best-image-size-for-website/) - 200KB target, WebP compression ratios

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Next.js Image and Tailwind are documented, verified patterns
- Architecture: HIGH - Patterns derived from official Next.js and Tailwind docs
- Pitfalls: HIGH - Well-documented issues (mobile vh, lazy loading, contrast) with official solutions
- Code examples: HIGH - Based on official docs, tested patterns

**Research date:** 2026-02-06
**Valid until:** 2026-03-06 (30 days - stable stack, no rapid changes expected)
