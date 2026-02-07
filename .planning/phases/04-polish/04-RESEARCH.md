# Phase 4: Polish and Launch - Research

**Researched:** 2026-02-07
**Domain:** SEO metadata, Open Graph images, footer design, visual cohesion
**Confidence:** HIGH

## Summary

This phase focuses on making the coffee shop landing page production-ready through three key areas: SEO metadata, a minimal footer, and visual cohesion verification. The research confirms that Next.js 16 provides a comprehensive Metadata API that handles title, description, and Open Graph configuration through static exports in layout.tsx. For the Open Graph image, the simplest approach is placing a static `opengraph-image.jpg` file in the app directory, which Next.js automatically detects and generates appropriate meta tags.

The footer should follow the "utility-only" minimal pattern - a simple copyright notice is sufficient for a brand presence page. Nielsen Norman Group research confirms that minimal footers work well when the site's primary navigation needs are simple. Visual cohesion review involves checking consistent spacing, color application, and typography across all sections using systematic scrolling and breakpoint verification.

**Primary recommendation:** Use Next.js static metadata export in layout.tsx with a static opengraph-image.jpg file, add a minimal centered copyright footer using existing design tokens, and verify spacing consistency at all breakpoints.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js Metadata API | 16.1.6 | SEO metadata management | Built into Next.js, no dependencies needed |
| next/og ImageResponse | 16.1.6 | Dynamic OG image generation | Native Next.js feature for programmatic images |
| Static opengraph-image | N/A | Simple OG image file | Zero-config, Next.js auto-detects |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Tailwind CSS | 4.x | Footer styling | Already in project, consistent with existing patterns |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static opengraph-image.jpg | opengraph-image.tsx with ImageResponse | Dynamic generation adds complexity; static file sufficient for single-page site |
| Custom meta component | next/head | Metadata API is the modern approach; next/head is legacy pattern |

**Installation:**
```bash
# No additional packages needed - all capabilities built into existing Next.js 16 + Tailwind 4 stack
```

## Architecture Patterns

### Recommended Project Structure
```
app/
├── layout.tsx           # metadata export lives here
├── page.tsx             # main page with hero + about + footer
├── opengraph-image.jpg  # static OG image (1200x630px)
├── opengraph-image.alt.txt  # alt text for OG image
├── globals.css          # existing design tokens
└── components/
    ├── About.tsx        # existing
    └── Footer.tsx       # new minimal footer
```

### Pattern 1: Static Metadata Export
**What:** Export a `metadata` object from layout.tsx with all SEO and Open Graph configuration
**When to use:** Single-page sites with static content (like this landing page)
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Craft Coffee | Modern Specialty Coffee Experience',
  description: 'Where every cup is a journey. Discover our modern, design-forward approach to specialty coffee.',
  metadataBase: new URL('https://example.com'), // replace with actual domain
  openGraph: {
    title: 'Craft Coffee | Modern Specialty Coffee Experience',
    description: 'Where every cup is a journey. Discover our modern, design-forward approach to specialty coffee.',
    url: 'https://example.com',
    siteName: 'Craft Coffee',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Craft Coffee - Modern specialty coffee shop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Craft Coffee | Modern Specialty Coffee Experience',
    description: 'Where every cup is a journey.',
    images: ['/opengraph-image.jpg'],
  },
}
```

### Pattern 2: Static Open Graph Image Convention
**What:** Place opengraph-image.jpg in app directory; Next.js auto-generates meta tags
**When to use:** When you have a static brand image for social sharing
**Example:**
```
# File: app/opengraph-image.jpg
# - Dimensions: 1200 x 630 pixels
# - Format: JPEG or PNG
# - Size: Under 200KB recommended (max 8MB)

# Optional: app/opengraph-image.alt.txt
Craft Coffee - Modern specialty coffee shop with cream and espresso aesthetic

# Next.js automatically generates:
<meta property="og:image" content="/opengraph-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="1200" />
<meta property="og:image:type" content="image/jpeg" />
```

### Pattern 3: Minimal Utility Footer
**What:** Simple centered footer with copyright, using existing design tokens
**When to use:** Brand presence pages without complex navigation needs
**Example:**
```typescript
// Source: Adapted from Flowbite patterns + NN/g utility footer guidance
export default function Footer() {
  return (
    <footer className="py-8 px-4 text-center">
      <p className="text-sm text-brand-espresso/60">
        &copy; {new Date().getFullYear()} Craft Coffee. All rights reserved.
      </p>
    </footer>
  )
}
```

### Anti-Patterns to Avoid
- **Heavy embedded social feeds:** Facebook like boxes or Instagram feeds hurt performance; use simple icon links if needed
- **Accordions/collapsed content in footer:** Users expect footer content visible, not hidden
- **Inconsistent footer across pages:** For single-page site this is N/A, but footer should match site aesthetic
- **Dynamic year fetch:** Use `new Date().getFullYear()` for copyright year, not hardcoded year

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Meta tag generation | Custom meta tags in head | Next.js Metadata API | Handles all edge cases, proper escaping, merging |
| OG image meta tags | Manual meta property tags | Static opengraph-image.jpg file | Zero-config, Next.js generates correct format/dimensions |
| Dynamic copyright year | Hardcoded year string | `{new Date().getFullYear()}` | Auto-updates, standard JavaScript pattern |
| Social sharing preview | Custom share buttons | Native browser/OS share | Works everywhere, no JS bundles needed |

**Key insight:** Next.js 16's Metadata API and file conventions handle all the complexity of SEO meta tags. Manual meta tag construction leads to missed edge cases and inconsistent output across crawlers.

## Common Pitfalls

### Pitfall 1: Missing metadataBase for Relative URLs
**What goes wrong:** Open Graph images fail to load on social platforms because URLs are relative, not absolute
**Why it happens:** OG image URLs must be absolute; relative paths don't work when shared externally
**How to avoid:** Always define `metadataBase` in root layout.tsx metadata export
**Warning signs:** OG image not appearing in Twitter/LinkedIn preview tools

### Pitfall 2: OG Image Too Large
**What goes wrong:** Slow page loads, failed social previews, or build failures
**Why it happens:** OG images can be beautiful but massive; social platforms have size limits
**How to avoid:** Keep OG images under 200KB, use JPEG for photos, PNG for graphics with text
**Warning signs:** Build warnings about image size, slow preview loading in debuggers

### Pitfall 3: Footer Breaking Visual Flow
**What goes wrong:** Footer feels disconnected or jarring after scrolling through cohesive sections
**Why it happens:** Different spacing, colors, or typography from rest of site
**How to avoid:** Use same design tokens (brand-cream, brand-espresso), consistent spacing scale
**Warning signs:** Visual "snap" when footer comes into view during scroll

### Pitfall 4: Hardcoded Copyright Year
**What goes wrong:** Copyright shows outdated year after January 1st
**Why it happens:** Year was typed as string literal instead of computed
**How to avoid:** Use `{new Date().getFullYear()}` in JSX
**Warning signs:** Code review shows hardcoded "2025" or "2026" string

### Pitfall 5: Inconsistent Section Spacing
**What goes wrong:** Page feels unpolished, transitions between sections feel abrupt
**Why it happens:** Different padding/margin values used in each section without system
**How to avoid:** Use consistent spacing tokens (py-16 md:py-24 matches existing About section)
**Warning signs:** Different vertical gaps between hero-about and about-footer

## Code Examples

Verified patterns from official sources:

### Complete Metadata Configuration
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// File: app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Craft Coffee | Modern Specialty Coffee Experience",
  description: "Where every cup is a journey. Discover our modern, design-forward approach to specialty coffee.",
  metadataBase: new URL('https://craftcoffee.example.com'), // Update with real domain
  keywords: ['coffee shop', 'specialty coffee', 'craft coffee'],
  authors: [{ name: 'Craft Coffee' }],
  openGraph: {
    title: "Craft Coffee | Modern Specialty Coffee Experience",
    description: "Where every cup is a journey. Discover our modern, design-forward approach to specialty coffee.",
    url: '/',
    siteName: 'Craft Coffee',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Craft Coffee - Modern specialty coffee shop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Craft Coffee | Modern Specialty Coffee Experience",
    description: "Where every cup is a journey.",
    images: ['/opengraph-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-brand-cream text-brand-espresso font-sans">
        {children}
      </body>
    </html>
  );
}
```

### Minimal Footer Component
```typescript
// File: app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="py-8 md:py-12 px-4 bg-brand-cream border-t border-brand-espresso/10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-brand-espresso/60">
          &copy; {new Date().getFullYear()} Craft Coffee. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

### Visual Cohesion Checklist
```markdown
## Visual Cohesion Review Checklist

### Spacing Consistency
- [ ] Hero section: consistent padding (px-4 sm:px-6 md:px-8 lg:px-16)
- [ ] About section: py-16 md:py-24 (matches design system)
- [ ] Footer: py-8 md:py-12 (proportional to about section)
- [ ] Max-width containers: max-w-6xl used consistently

### Color Application
- [ ] Background: brand-cream used consistently
- [ ] Text: brand-espresso for primary, brand-espresso/80 or /60 for secondary
- [ ] Hero inverts: brand-espresso bg, brand-cream text
- [ ] No arbitrary color values outside tokens

### Typography
- [ ] Headings: font-display (Playfair Display)
- [ ] Body: font-sans (Inter) - default
- [ ] Consistent size scale across sections

### Breakpoint Behavior
- [ ] Mobile (< 640px): Single column, adequate touch targets
- [ ] Tablet (640-1024px): Transitions handled smoothly
- [ ] Desktop (> 1024px): Multi-column where appropriate
- [ ] No horizontal overflow at any size
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| next/head for meta | Metadata API export | Next.js 13+ (App Router) | Simpler, type-safe, auto-merging |
| @vercel/og package | next/og (ImageResponse) | Next.js 14+ | Built-in, no extra dependency |
| Manual OG meta tags | opengraph-image.jpg file convention | Next.js 13+ | Zero-config, auto-generated |
| Static copyright year | Dynamic year with getFullYear() | Always | Maintenance-free |

**Deprecated/outdated:**
- **next/head:** Still works but Metadata API is preferred in App Router
- **@vercel/og:** Replaced by next/og in Next.js 14+; still functional but redundant

## Open Questions

Things that couldn't be fully resolved:

1. **Actual Production Domain**
   - What we know: metadataBase needs a URL; OG images need absolute paths
   - What's unclear: What will the actual production domain be?
   - Recommendation: Use placeholder URL (https://craftcoffee.example.com), update before deployment

2. **OG Image Design Content**
   - What we know: Dimensions should be 1200x630, brand colors cream/espresso
   - What's unclear: Exact visual design for OG image (photo vs. branded graphic)
   - Recommendation: Create simple branded graphic with tagline "Craft Coffee, Elevated" using brand colors

## Sources

### Primary (HIGH confidence)
- [Next.js Metadata API Reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - Complete API documentation
- [Next.js Metadata and OG Images Guide](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) - Getting started guide
- [Next.js opengraph-image File Convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) - File-based approach

### Secondary (MEDIUM confidence)
- [Nielsen Norman Group Footer Patterns](https://www.nngroup.com/articles/footers/) - UX research on footer design
- [Flowbite Tailwind Footer Components](https://flowbite.com/docs/components/footer/) - Tailwind CSS patterns
- [OG Image Size Guide 2026](https://myogimage.com/blog/og-image-size-meta-tags-complete-guide) - Current dimension standards

### Tertiary (LOW confidence)
- [Visual Consistency Guide](https://medium.com/@lenaztyson/visual-consistency-everything-you-need-to-know-157f2ece7cd7) - General design principles

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Next.js official documentation verified
- Architecture: HIGH - File conventions and Metadata API well-documented
- Pitfalls: MEDIUM - Combination of official docs and community experience

**Research date:** 2026-02-07
**Valid until:** 2026-03-07 (30 days - stable domain)
