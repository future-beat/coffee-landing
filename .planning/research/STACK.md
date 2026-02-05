# STACK — Coffee Shop Landing Page

**Research date:** 2026-02-05
**Researcher:** Claude (Sonnet 4.5)
**Project:** Coffee Shop Landing Page (brand-presence, two-section, minimal)
**Version verification:** Next.js and Tailwind CSS versions confirmed via official docs (nextjs.org, tailwindcss.com) on 2026-02-05. Remaining packages use `@latest` semver ranges — pin at install time.

---

## Decision Summary

| Layer | Choice | Version | Confidence |
|-------|--------|---------|------------|
| Framework | Next.js (App Router) | 16.1.6 | HIGH |
| Runtime | React | 19.2 | HIGH |
| Styling | Tailwind CSS | v4.1 | HIGH |
| Animation | Motion (formerly Framer Motion) | 12.x (`@latest`) | HIGH |
| Icons | Lucide React | `@latest` | HIGH |
| Utility | clsx + tailwind-merge | `@latest` | HIGH |
| SEO | Next.js built-in metadata API | (built-in) | HIGH |
| Fonts | Next.js `next/font` | (built-in) | HIGH |

---

## Core Stack

### Next.js 16.1.6 — Application Framework

**Install:** `npx create-next-app@latest my-app --yes`

This bootstraps Next.js 16 with App Router, TypeScript, Tailwind CSS, ESLint, Turbopack, and the `@/*` import alias — all enabled by default. No manual config required for any of these.

**Why Next.js 16 (not 15.x):**
- Turbopack is stable and default in 16 — dev startup and HMR are significantly faster than webpack.
- `use cache` and Partial Pre-Rendering (PPR) are production-ready. Not needed for a static landing page, but they mean zero penalty for choosing Next.js if the project ever grows.
- React Compiler support is stable — automatic memoization with no opt-in required.
- Next.js 16 requires Node.js >= 20.9. This is the baseline in 2026; not a constraint.

**Why App Router (not Pages Router):**
- Pages Router is legacy. App Router is the only router receiving new features in Next.js 16.
- Server Components are the default — a two-section static landing page renders with zero client-side JS unless you opt into `"use client"` explicitly.

---

### React 19.2 — UI Runtime

Shipped with Next.js 16. No separate version decision needed. `create-next-app` installs the correct React version.

**Why React 19.2 (not 18.x):**
- Server Components are first-class in React 19. The landing page hero and about sections are pure Server Components — no hydration cost.
- View Transitions API support (`startTransition`) is built in if page-level transitions are ever added.

---

### Tailwind CSS v4.1 — Styling

**Install:** Included automatically by `create-next-app@latest`. No additional package install or config file needed.

**Why Tailwind v4 (not v3.x):**
- Zero-config setup. No `tailwind.config.js` required. Theme customization is done in CSS via the `@theme` directive — cleaner for a small project.
- CSS-variable-first design. All theme tokens compile to native CSS custom properties. This is ideal for a brand-presence page where the design system is small (2-3 brand colors, 1-2 type scales) and needs to be consistent across the page.
- v4 is the version bundled by `create-next-app` in Next.js 16. Using v3 would require opting out of the default setup — unnecessary friction.

**Theme setup example (in globals.css):**
```css
@import "tailwindcss";

@theme {
  --color-brand-cream: oklch(0.95 0.03 90);
  --color-brand-espresso: oklch(0.25 0.05 30);
  --font-sans: 'Inter', sans-serif;
  --font-display: 'Playfair Display', serif;
}
```

---

## Animation

### Motion 12.x — Page-Level Animations

**Install:** `npm install motion`

Note: The package name is now `motion`, not `framer-motion`. The `framer-motion` package still exists as a re-export for backward compatibility, but `motion` is the canonical import going forward.

**Why Motion (not CSS-only, not GSAP, not React Spring):**
- This landing page has one animation need: a subtle entrance effect on the hero (fade + slight vertical shift) to give the page life on load. Motion handles this in 3 lines of JSX with no configuration.
- Motion's `AnimatePresence` and `motion.div` work inside `"use client"` components seamlessly in Next.js App Router.
- GSAP is overkill — it is a full timeline engine. CSS animations (`@keyframes`) lack the declarative ergonomics of Motion for component-scoped entrance effects.
- React Spring is a physics-based library. The landing page animations are simple easing curves, not spring-based. Motion supports both; React Spring is spring-only.

**Usage pattern for this project:**
```tsx
"use client";
import { motion } from "motion/react";

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* hero tagline */}
    </motion.div>
  );
}
```

---

## Icons

### Lucide React — Icon Set

**Install:** `npm install lucide-react`

**Why Lucide (not Heroicons, not React Icons, not Font Awesome):**
- Lucide is the default icon set used by shadcn/ui, which is the dominant component ecosystem in the Next.js community. Using Lucide now means zero friction if UI components are added later.
- Tree-shakeable. Only the icons actually imported are bundled. For a landing page with 0-3 icons, bundle impact is negligible.
- Heroicons is Tailwind Labs' icon set and is a fine alternative, but Lucide has broader coverage and is the de facto standard in the Next.js/shadcn ecosystem as of 2025-2026.
- React Icons is a massive monorepo of icon sets — good for large apps, unnecessary complexity for a two-section landing page.

**Note:** This landing page may not need any icons at all. Include Lucide only if the about/story section uses an accent icon. Do not add it speculatively — it can be installed in 10 seconds when needed.

---

## Utilities

### clsx + tailwind-merge — Class Name Composition

**Install:** `npm install clsx tailwind-merge`

**Why both (not just clsx, not just cn from shadcn):**
- `clsx` handles conditional class strings: `clsx("base", { active: isActive })`.
- `tailwind-merge` resolves Tailwind class conflicts: `twMerge("p-4", "p-6")` correctly produces `p-6`. Without it, class order determines the winner — a subtle, hard-to-debug source of style bugs.
- The standard pattern in the Next.js ecosystem is a `cn()` utility that composes both:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This is the single most-copied utility in the Next.js/React ecosystem. Include it from day one.

---

## SEO and Fonts (Built-In — No Extra Packages)

### Next.js Metadata API

Next.js 16 App Router has a built-in metadata system. No `next-sitemap` or `react-helmet` needed for a single-page landing page.

```tsx
// app/layout.tsx or app/page.tsx
export const metadata = {
  title: "Brand Name — Specialty Coffee",
  description: "A short, evocative description of the coffee shop.",
  openGraph: {
    images: ["/og.jpg"],
  },
};
```

**Why not next-sitemap:** A single-page landing page does not need a sitemap. If pages are added later, `next-sitemap` can be added then.

**Why not react-helmet:** Deprecated pattern in App Router. The `metadata` export is the idiomatic, zero-overhead replacement.

### next/font — Custom Typography

Next.js 16 includes `next/font` built-in. It self-hosts Google Fonts with zero layout shift (CLS = 0) and no third-party requests.

```tsx
import { Playfair_Display, Inter } from "next/font/google";

const serif = Playfair_Display({ subsets: ["latin"], weight: [400, 700] });
const sans = Inter({ subsets: ["latin"], weight: [300, 400, 500] });
```

**Why this (not a link tag to Google Fonts):**
- Zero layout shift. Fonts are inlined or served from the same origin.
- No external DNS lookup on page load — meaningful for a brand-presence page where first paint speed is the entire user experience.

**Font recommendation for this project:** Playfair Display (serif, for headlines — editorial, premium feel) + Inter (sans-serif, for body — clean, modern, highly legible). This combination is the canonical "modern minimal" pairing.

---

## What NOT to Use — and Why

| Library / Approach | Why Not |
|---|---|
| styled-components / Emotion | CSS-in-JS adds runtime overhead and bundle size. Tailwind v4 with static CSS handles everything this project needs. No dynamic styles required. |
| shadcn/ui | It is a component library for interactive UIs (forms, modals, dropdowns). A two-section landing page has no interactive components. Adding shadcn adds complexity with zero payoff here. |
| GSAP | Full timeline animation engine. Massive overkill for a single entrance animation. Adds ~70KB to the bundle. |
| Next.js Pages Router | Legacy. No new features. Server Components don't work. |
| react-helmet | Deprecated in App Router. Use the metadata export. |
| Font Awesome | Not tree-shakeable in its default form. Lucide or no icons at all. |
| next-sitemap | Unnecessary for a single-page site. Add only if pages are added. |
| Redux / Zustand / state management | Zero shared state in a two-section static landing page. Add state management only when state exists. |
| TypeScript strict false | create-next-app enables strict mode by default. Disabling it is a footgun. Keep it on. |

---

## Bootstrap Command (Copy-Paste Ready)

```bash
npx create-next-app@latest coffee-landing --yes
cd coffee-landing
npm install motion lucide-react clsx tailwind-merge
```

That is the complete install. Next.js 16, React 19, Tailwind v4, TypeScript, ESLint, and Turbopack are all included in the first command. The second command adds the three optional layers (animation, icons, utilities).

---

## Confidence Notes

- HIGH confidence: Next.js 16.1.6, React 19.2, Tailwind CSS v4.1 — versions verified against official documentation (nextjs.org blog, tailwindcss.com) on 2026-02-05.
- HIGH confidence: Motion, Lucide React, clsx, tailwind-merge — these are stable, actively maintained packages. Exact patch versions should be pinned at install time via `npm install <package>@latest`. The ecosystem around these has been stable for 12+ months.
- Architectural decisions (App Router, Server Components, no state management, no shadcn): These are determined by the project scope (static, two-section, brand-presence). If scope changes, revisit.

---

*Last updated: 2026-02-05*
