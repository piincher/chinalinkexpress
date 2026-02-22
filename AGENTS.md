# ChinaLink Express - Agent Guide

## Project Overview

**ChinaLink Express** is a logistics company website providing sourcing, purchasing, and shipping services from China to Mali and Africa. The website is built as a modern, SEO-optimized landing page with comprehensive service information, contact forms, and company details.

- **Primary Language**: French (fr_FR)
- **Target Market**: Mali and African countries
- **Business Domain**: International logistics, freight forwarding, sourcing
- **Founded**: 2019 (7+ years of experience)

---

## Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js | 15.5.2 |
| React | React / React DOM | 19.1.0 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| State Management | Zustand | ^5.0.11 |
| Build Tool | Turbopack | (via Next.js) |
| Analytics | Vercel Analytics & Speed Insights | ^1.x |

### Key Dependencies

- **clsx** + **tailwind-merge**: Utility for conditional class merging (`cn()` function)
- **@tailwindcss/postcss**: Tailwind CSS v4 PostCSS integration
- **next/font**: Google Fonts (Geist Sans & Mono)

---

## Project Structure

```
chinalinkweb/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── components/         # App-level components
│   │   │   └── StructuredData.tsx    # JSON-LD schema markup
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Home page (delegates to LandingPage)
│   │   ├── favicon.ico
│   │   ├── robots.txt/route.ts # Dynamic robots.txt
│   │   └── sitemap.xml/route.ts # Dynamic sitemap
│   │
│   ├── api/                    # API client layer
│   │   └── client.ts           # HTTP client with fetch
│   │
│   ├── components/             # Shared UI components
│   │   └── common/
│   │       ├── button/         # Button component
│   │       ├── form/           # FormField, Input, TextArea, Select
│   │       └── typography/     # Typography system
│   │
│   ├── config/                 # Configuration files
│   │   ├── api.ts              # API endpoints & config
│   │   └── app.ts              # App metadata & contact info
│   │
│   ├── constants/              # Global constants
│   │   └── appConstants.ts     # Routes, validation, error messages
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useMediaQuery.ts    # Responsive breakpoints
│   │   ├── useScrollTo.ts      # Smooth scrolling
│   │   └── useTypingEffect.ts  # Typing animation
│   │
│   ├── lib/                    # Utility functions
│   │   └── utils.ts            # cn(), formatters, validators
│   │
│   ├── services/               # Business logic layer
│   │   └── contactService.ts   # Contact form operations
│   │
│   ├── store/                  # Global state (Zustand)
│   │   └── useUIStore.ts       # UI state (menu, modals, FAQ)
│   │
│   ├── types/                  # TypeScript definitions
│   │   └── index.ts            # All type definitions
│   │
│   └── views/                  # Page-level feature components
│       └── landing/            # Landing page feature
│           ├── components/     # Section components
│           │   ├── Header.tsx
│           │   ├── HeroSection.tsx
│           │   ├── AboutSection.tsx
│           │   ├── ServicesSection.tsx
│           │   ├── WhyUsSection.tsx
│           │   ├── TestimonialsSection.tsx
│           │   ├── PartnersSection.tsx
│           │   ├── FAQSection.tsx
│           │   ├── ContactSection.tsx
│           │   ├── Footer.tsx
│           │   └── index.ts    # Barrel exports
│           ├── helpers/        # Feature-specific helpers
│           ├── hooks/          # Feature-specific hooks
│           ├── services/       # Feature-specific services
│           ├── constants.ts    # Feature constants (services, FAQs, etc.)
│           ├── LandingPage.tsx # Main landing page composer
│           └── index.ts        # Public export
│
├── public/                     # Static assets
│   └── logistics-animation.svg
│
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript config (path: @/* -> ./src/*)
├── postcss.config.mjs          # PostCSS with Tailwind v4
└── package.json
```

---

## Build & Development Commands

```bash
# Development (with Turbopack)
npm run dev

# Production build (with Turbopack)
npm run build

# Start production server
npm run start
```

### Development Server
- **URL**: http://localhost:3000
- **Features**: Hot reload, Turbopack for fast builds

---

## Code Style Guidelines

### File Organization

1. **Use barrel exports** (`index.ts`) for clean imports:
   ```typescript
   // Good
   import { Header, HeroSection } from './components';
   
   // Avoid
   import { Header } from './components/Header';
   import { HeroSection } from './components/HeroSection';
   ```

2. **File header comments** - Every file should have a JSDoc header:
   ```typescript
   /**
    * Component Name
    * 
    * Brief description of what this file does.
    * Part of which layer/feature.
    */
   ```

3. **'use client' directive** - Add at the top for client components:
   ```typescript
   'use client';
   
   import React from 'react';
   ```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `HeroSection.tsx` |
| Hooks | camelCase, prefix with `use` | `useTypingEffect.ts` |
| Constants | UPPER_SNAKE_CASE | `HERO_TEXTS`, `API_CONFIG` |
| Types/Interfaces | PascalCase | `ContactFormData` |
| Functions | camelCase | `submitContactForm` |
| Files | PascalCase for components, camelCase for others | `Button.tsx`, `utils.ts` |

### Import Order

1. React/Next imports
2. Third-party libraries
3. Absolute imports (`@/...`)
4. Relative imports
5. Types

```typescript
'use client';

import React from 'react';
import Image from 'next/image';
import { create } from 'zustand';

import { cn } from '@/lib/utils';
import { Button } from '@/components/common/button';
import type { ButtonProps } from '@/types';

import { localStyles } from './styles';
```

### Styling Guidelines

1. **Use `cn()` utility** for conditional classes:
   ```typescript
   const classes = cn(
     'base-styles',
     variantStyles[variant],
     condition && 'conditional-class',
     className
   );
   ```

2. **Tailwind class order**: Layout → Sizing → Spacing → Colors → Effects
   ```typescript
   // Good
   className="flex items-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
   ```

3. **Responsive design**: Mobile-first with `sm:`, `md:`, `lg:` prefixes

### TypeScript Guidelines

1. **Use `as const`** for constant objects:
   ```typescript
   export const API_STATUS = {
     IDLE: 'idle',
     PENDING: 'pending',
   } as const;
   ```

2. **Prefer interfaces** for object shapes, **types** for unions:
   ```typescript
   interface User { id: string; name: string; }
   type UserRole = 'admin' | 'customer';
   ```

3. **Path alias**: Use `@/*` for imports from `src/`:
   ```typescript
   import { Button } from '@/components/common/button';
   ```

---

## Key Architectural Patterns

### 1. Feature-Based Organization

The `views/landing/` folder demonstrates the feature pattern:
- Components, constants, helpers, hooks, services colocated
- `index.ts` for public API
- Self-contained feature that can be moved/removed as a unit

### 2. Layered Architecture

```
┌─────────────────────────────────────┐
│  Views (Page Components)            │
├─────────────────────────────────────┤
│  Components (Reusable UI)           │
├─────────────────────────────────────┤
│  Services (Business Logic)          │
├─────────────────────────────────────┤
│  API Client (HTTP Layer)            │
├─────────────────────────────────────┤
│  Hooks, Utils, Constants, Types     │
└─────────────────────────────────────┘
```

### 3. State Management

- **Zustand** for global UI state (menus, modals, scroll position)
- **React state** for local component state
- **Persist middleware** for localStorage persistence

### 4. SEO Strategy

- Server-side metadata in `layout.tsx`
- JSON-LD structured data (LocalBusiness, Organization, FAQPage)
- Dynamic `robots.txt` and `sitemap.xml` routes
- French language targeting (`lang="fr"`, `locale: "fr_FR"`)
- OpenGraph and Twitter card metadata

---

## External Resources

### CDN Images

Images are loaded from DigitalOcean Spaces:
- **Base URL**: `https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/`
- **Logo**: `/logo.png`
- **Flyer**: `/flyer1.png`
- **Partners**: `/maersk.png`, `/cma-cgm.png`, etc.

Configured in `next.config.ts`:
```typescript
images: {
  remotePatterns: [{
    protocol: 'https',
    hostname: 'chinalinkexpress.nyc3.cdn.digitaloceanspaces.com'
  }]
}
```

### Contact Information

| Type | Value |
|------|-------|
| Email | contact@chinalinkexpress.com |
| China Phone | +86 188 5172 5957 |
| Mali Phone 1 | +223 5100 50 42 |
| Mali Phone 2 | +223 7669 61 77 |
| WhatsApp China | +8618851725957 |
| WhatsApp Mali | +22376696177 |
| Address | Kalaban Coura, près du lycée Birgo, Bamako, Mali |

### Business Hours

- **Weekdays**: 08:00 - 20:00
- **Saturday**: 09:00 - 17:00
- **Sunday**: 10:00 - 15:00

---

## Testing & Quality

### Current Status
- **No test framework** is currently configured
- **No ESLint/Prettier** config files present
- TypeScript strict mode is enabled

### Recommended Additions
```bash
# For testing
npm install -D vitest @testing-library/react @testing-library/jest-dom

# For linting/formatting
npm install -D eslint prettier eslint-config-next
```

---

## Deployment

### Platform
Optimized for **Vercel** deployment:
- Vercel Analytics integrated
- Vercel Speed Insights integrated
- Next.js native support

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | API base URL | `https://api.chinalinkexpress.com` |
| `NEXT_PUBLIC_APP_VERSION` | App version | `1.0.0` |
| `NODE_ENV` | Environment | `development` |

### Build Output
- Static export is NOT configured (SSR enabled)
- Output directory: `.next/`

---

## Security Considerations

1. **API URLs** are exposed to client via `NEXT_PUBLIC_` prefix
2. **No authentication** is currently implemented
3. **Contact form** submits to external API endpoint
4. **Images** are loaded from trusted CDN (DigitalOcean Spaces)

---

## Common Tasks

### Adding a New Section to Landing Page

1. Create component in `src/views/landing/components/NewSection.tsx`
2. Export from `src/views/landing/components/index.ts`
3. Add section ID to `SECTION_IDS` in `constants.ts`
4. Import and add to `LandingPage.tsx` component

### Adding a New API Endpoint

1. Add endpoint to `API_ENDPOINTS` in `src/config/api.ts`
2. Create service function in `src/services/`
3. Use `apiClient` from `src/api/client.ts`

### Adding a New Hook

1. Create file in `src/hooks/useHookName.ts`
2. Add JSDoc header explaining purpose
3. Export from file (default or named)
4. Use `'use client'` directive if using browser APIs

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Images not loading | Check `next.config.ts` remotePatterns |
| Styles not applying | Ensure `globals.css` is imported in layout |
| Build fails | Check TypeScript errors with `npx tsc --noEmit` |
| Client/server mismatch | Check for `window` usage without `'use client'` |

---

---

## Hero Animation System

The **"Pulse of Trade"** animation system is a tiered, enterprise-grade animation architecture that visualizes the China-Africa logistics network.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ANIMATION TIER SYSTEM                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Tier 1: CSS-Only (Minimal)                                        │
│  ├── CSSParticleField - CSS keyframe particles                     │
│  ├── SVGRouteNetwork - SVG routes with SMIL/CSS                    │
│  └── Fallback - Static SVG for no-JS                               │
│                                                                     │
│  Tier 2: Canvas 2D (Low-Medium)                                    │
│  ├── CanvasParticleSystem - 500-3000 particles                     │
│  └── SVGRouteNetwork - Animated transport nodes                    │
│                                                                     │
│  Tier 3: WebGL (High)                                              │
│  ├── WebGLParticleSystem - 3000+ particles (Three.js)              │
│  ├── RouteCurves - GLSL shaders                                    │
│  └── SVGRouteNetwork - Full effects                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Automatic Tier Selection

The system automatically detects device capabilities and selects the appropriate tier:

| Tier | Trigger | Particle Count | Features |
|------|---------|----------------|----------|
| **High** | Desktop, WebGL2, 60fps | 3000 | WebGL, glow effects, mouse interaction |
| **Medium** | Mobile/tablet, WebGL1 | 800 | Canvas 2D, connections |
| **Low** | Low FPS, no WebGL | 150 | CSS particles, simple routes |
| **Minimal** | Reduced motion, low power | 0 | Static SVG only |

### Key Components

```
src/features/hero-animation/
├── components/
│   ├── HeroAnimation.tsx          # Main orchestrator
│   # Classic Tiered System
│   ├── CSSParticleField.tsx       # Tier 1: CSS particles
│   ├── SVGRouteNetwork.tsx        # SVG routes + transport nodes
│   ├── CanvasParticleSystem.tsx   # Tier 2: Canvas 2D
│   ├── WebGLParticleSystem.tsx    # Tier 3: WebGL/Three.js
│   ├── Fallback.tsx               # Static fallback
│   # 🔥 Mind-Blowing Effects
│   ├── HolographicGlobe.tsx       # 3D cyberpunk Earth
│   ├── LiquidBackground.tsx       # WebGL fluid simulation
│   ├── MorphingConstellations.tsx # Shape-shifting particles
│   ├── HolographicCards.tsx       # 3D glassmorphism cards
│   ├── KineticTypography.tsx      # Physics-based text
│   └── QuantumTeleport.tsx        # Quantum teleport effect
├── hooks/
│   ├── usePerformanceTier.ts      # Device capability detection
│   ├── useReducedMotion.ts        # Accessibility
│   ├── useScrollProgress.ts       # Scroll-linked animations
│   └── useIntersectionObserver.ts # Visibility optimization
├── store/
│   └── useAnimationStore.ts       # Global animation state
├── lib/
│   └── pathCalculator.ts          # Bézier curve calculations
├── constants.ts                   # Routes, cities, transport nodes
└── types.ts                       # TypeScript definitions
```

### Route Visualization

The animation displays key logistics routes:
- **Maritime**: Shanghai → Bamako, Shenzhen → Lagos, Guangzhou → Dakar
- **Air**: Shanghai → Addis Ababa → Bamako, Shenzhen → Dubai → Bamako

Cities are positioned on a stylized world map with normalized coordinates.

### Performance Optimizations

1. **Adaptive Quality**: Particle count and effects scale with device capability
2. **Visibility Pause**: Animations pause when off-screen
3. **Page Visibility**: RAF pauses when tab is hidden
4. **Connection Awareness**: Reduces quality on slow connections
5. **Battery Awareness**: Reduces effects in low-power mode

### Accessibility

- Respects `prefers-reduced-motion`
- Static fallback for screen readers
- Semantic HTML structure preserved
- Keyboard navigation unaffected

### 🔥 NEW: Mind-Blowing Effects (2026)

These effects have **NEVER BEEN DONE BEFORE** by a logistics company:

| Effect | Description | Tech Stack |
|--------|-------------|------------|
| **HolographicGlobe** | 3D cyberpunk Earth with data streams, holographic rings, and bloom effects | Three.js + R3F + Postprocessing |
| **LiquidBackground** | WebGL fluid simulation that responds to mouse movement | Canvas 2D + Fluid Dynamics |
| **MorphingConstellations** | Particles that shape-shift: globe→ship→plane→truck→package | Three.js + Spring Physics |
| **HolographicCards** | 3D glassmorphism cards with parallax and scanning effects | Framer Motion + CSS |
| **KineticTypography** | Physics-based text with character-level animations | Framer Motion |
| **QuantumTeleport** | Packages dissolve into particles, travel through quantum tunnel, reassemble | Three.js |

### Effect Modes

```tsx
// Combined mode (all effects layered - DEFAULT)
<HeroAnimation effectMode="combined" />

// Individual modes
<HeroAnimation effectMode="globe" />      // 3D holographic globe
<HeroAnimation effectMode="liquid" />     // Fluid simulation
<HeroAnimation effectMode="morphing" />   // Shape-shifting particles
<HeroAnimation effectMode="teleport" />   // Quantum teleport
<HeroAnimation effectMode="classic" />    // Original tiered animation

// Disable mind-blowing effects
<HeroAnimation enableMindBlowing={false} />
```

### Usage

```tsx
import { HeroAnimation } from '@/features/hero-animation';

function HeroSection() {
  return (
    <section className="relative">
      <HeroAnimation className="z-0" />
      <div className="relative z-10">
        {/* Content */}
      </div>
    </section>
  );
}
```

---

*Last updated: 2026-02-22*
