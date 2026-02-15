# Craft Coffee Landing Page

A modern, minimalist landing page for a specialty coffee brand. Built with Next.js, React, and Tailwind CSS.

**Live site:** [coffee-landing-delta.vercel.app](https://coffee-landing-delta.vercel.app)

## About

This is a design-forward landing page for "Craft Coffee," a specialty coffee brand. The site focuses on aesthetic appeal and brand identity through clean typography, intentional spacing, and a warm color palette inspired by coffee tones.

### Sections

- **Hero** -- Full-viewport introduction with the tagline "Craft Coffee, Elevated" and responsive typography scaling from mobile to desktop.
- **About** -- Brand story presented in a responsive two-column grid with an accompanying illustration.
- **Footer** -- Minimal copyright bar.

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://reactjs.org) 19
- [TypeScript](https://www.typescriptlang.org) 5
- [Tailwind CSS](https://tailwindcss.com) 4
- [Inter](https://rsms.me/inter/) + [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) via `next/font`

## Getting Started

### Prerequisites

- Node.js 18+

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
app/
├── components/
│   ├── About.tsx        # About/story section
│   └── Footer.tsx       # Site footer
├── globals.css          # Tailwind theme & design tokens
├── layout.tsx           # Root layout, fonts, metadata
├── page.tsx             # Home page with hero section
└── opengraph-image.jpg  # Social sharing image
public/
└── about-coffee.svg     # About section illustration
scripts/
└── generate-og-image.mjs  # OG image generation script
```

## Design Tokens

The brand palette and spacing are defined as Tailwind theme variables in `app/globals.css`:

| Token | Value | Usage |
|---|---|---|
| `brand-cream` | `oklch(0.95 0.03 90)` | Background, light surfaces |
| `brand-espresso` | `oklch(0.25 0.05 30)` | Text, dark surfaces |
| `font-sans` | Inter | Body text |
| `font-display` | Playfair Display | Headings |

## Deployment

The site is deployed on [Vercel](https://vercel.com). Pushing to the main branch triggers a production deployment automatically.
