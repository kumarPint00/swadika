# Swadika GhareluDelights - AI Coding Assistant Guide

## Project Overview
Next.js 15 restaurant website with Material-UI (v7), TypeScript, Firebase integration, and Sentry monitoring. Uses App Router architecture with client-side interactivity.

## Architecture Patterns

### Client-Side First Approach
- **All components default to `"use client"`** - This is a client-heavy app. Components like [Header.tsx](../components/Header.tsx), [Hero.tsx](../components/Hero.tsx), and pages use client-side features (state, hooks, animations).
- Root [layout.tsx](../app/layout.tsx) is client-side to enable MUI theming and context providers globally.
- Use `"use client"` directive at top of all new components unless purely static.

### Context Architecture
Two main contexts wrap the entire app in [layout.tsx](../app/layout.tsx):
- **ColorModeProvider**: [context/ColorModeContent.tsx](../context/ColorModeContent.tsx) - Handles dark/light mode with localStorage persistence. Creates a dynamic MUI theme based on mode.
- **CartProvider**: [context/CartContext.tsx](../context/CartContext.tsx) - Simple cart state (add/remove/clear). Use `useCart()` hook in components.

**Pattern**: Access context via custom hooks (`useColorMode()`, `useCart()`) not raw `useContext()`.

### Styling & Theming
- **MUI Components Only**: All UI uses `@mui/material` components (Box, Typography, Card, etc.). No native HTML elements except in rare cases.
- **Theme**: [mui/theme.ts](../mui/theme.ts) defines brand colors (warm orange #D35400, earthy brown), Playfair Display for headings, Poppins for body.
- **CSS Modules**: Used sparingly for animations (see [FlipUnit.module.css](../components/FlipUnit.module.css)). Prefer MUI's `sx` prop for styling.
- **MUI v7**: Uses latest Material-UI. Check version compatibility when adding new MUI components.

### Component Patterns
- **LottieIcon Pattern**: [components/LottieIcon.tsx](../components/LottieIcon.tsx) shows how to load Lottie animations from `/public/lottties/` using `@lottiefiles/react-lottie-player`.
- **Page Composition**: [app/page.tsx](../app/page.tsx) demonstrates component composition - pages import and stack pre-built sections (Hero, USPSection, AboutUs, etc.).
- **API Integration**: [lib/api.ts](../lib/api.ts) centralizes all API calls. Use these functions rather than inline fetches.

## Development Workflow

### Running the App
```bash
npm run dev  # Uses --turbopack flag for faster HMR
npm run build
npm run lint
```

### Build Configuration
- **Linting Disabled**: [next.config.ts](../next.config.ts) sets `ignoreDuringBuilds: true` - production builds ignore ESLint/TS errors.
- **MDX Support**: `pageExtensions: ["ts", "tsx", "md", "mdx"]` enabled. Can create `.mdx` pages in `app/`.
- **Path Aliases**: Use `@/` prefix ([tsconfig.json](../tsconfig.json)) - e.g., `import Header from "@/components/Header"`.

### Critical Dependencies
- **Firebase**: For backend services (check [lib/api.ts](../lib/api.ts) patterns).
- **Sentry**: Error tracking configured in [lib/sentry.ts](../lib/sentry.ts).
- **Framer Motion**: For animations (check existing components for patterns).
- **React Slick**: Carousel component - load CSS in component, not layout to avoid SSR issues.
- **Google Maps**: `@react-google-maps/api` for [MapSection.tsx](../components/MapSection.tsx).

## Code Conventions

### TypeScript Usage
- **Inline Types**: Simple component props use inline types: `{json:string}`, `{children:ReactNode}`.
- **No Strict Enforcement**: Build allows TS errors. Add types for clarity but don't block on type perfection.
- **`// @ts-nocheck`**: Used in [next.config.ts](../next.config.ts) when needed for config files.

### File Organization
```
app/           # Next.js pages (page.tsx, layout.tsx)
components/    # Reusable UI components (PascalCase)
context/       # React context providers
hooks/         # Custom hooks (use* prefix)
lib/           # Utilities (api, sentry, calendar)
mui/           # MUI theme configuration
public/        # Static assets, Lottie JSON files
```

### Component Structure
1. `"use client"` directive (if needed)
2. Imports (MUI components, local components, contexts)
3. Component definition (arrow function for simple, function declaration for complex)
4. Export default (always default export)

## Integration Points

### State Management
- **Cart**: Global cart state via CartContext. Use `useCart()` to access `{cart, add, remove, clear}`.
- **Theme**: Color mode toggle in [Header.tsx](../components/Header.tsx) calls `toggle()` from ColorModeProvider.
- **Order Tracking**: [hooks/useOrderStatus.ts](../hooks/useOrderStatus.ts) polls API every 5s - pattern for real-time updates.

### External Services
- **Analytics**: Google Analytics setup in [layout.tsx](../app/layout.tsx) head with placeholder ID.
- **SEO**: Meta tags, OpenGraph, Schema.org structured data all in root layout.
- **Performance**: Vercel Speed Insights imported in layout.

## When Adding Features

### New Components
1. Create in `components/` with PascalCase name matching file name
2. Add `"use client"` unless purely static
3. Use MUI components exclusively
4. Import theme via `useTheme()` hook if dynamic styling needed
5. Follow existing pattern: minimal props, self-contained logic

### New Pages
1. Create folder in `app/` with `page.tsx`
2. Compose from existing components in [components/](../components/)
3. Use client-side features freely (already wrapped in providers)

### Styling Guidelines
- Use `sx` prop for component-specific styles
- Reference theme colors via `theme.palette.primary.main`, etc.
- For animations, create CSS module (`.module.css`) next to component
- Maintain warm, earthy color palette (#D35400 orange, #4B2E05 brown)
