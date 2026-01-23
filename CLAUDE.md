# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wedding photography portfolio website and digital invitation platform built with Astro 5. Features photo galleries with WebGL visual effects, smooth scrolling, and AI-powered image descriptions.

## Development Commands

```bash
pnpm install           # Install dependencies
pnpm dev               # Start dev server (localhost:4321)
pnpm build             # Production build → dist/
pnpm preview           # Preview production build
pnpm gen:wedding       # Generate AI descriptions for wedding photos
```

## Architecture

### Framework
- **Astro 5** with TypeScript (strict mode)
- File-based routing: `src/pages/` maps to URL paths
- Server-rendered `.astro` components with optional client-side `<script>` tags
- API endpoints at `src/pages/api/*.ts` (RESTful JSON responses)

### Key Directories
- `src/pages/` - Routes and API endpoints
- `src/components/` - Reusable Astro components
- `src/layouts/` - Base HTML layouts (Layout.astro, GalleryLayout.astro)
- `src/data/` - TypeScript data interfaces
- `public/gallery/wedding/` - Wedding photo assets
- `public/descs/` - AI-generated photo descriptions (markdown)
- `scripts/` - Utility scripts (image description generation)

### Visual Effects
- **WebGL**: WaveDistortion.astro uses custom GLSL shaders
- **CSS**: CSSWaveEffect.astro, MetalStretchEffect.astro for scroll-triggered animations
- **Smooth Scroll**: Lenis library integrated via GalleryLayout

### API Design
All endpoints return `{ data, meta }` structure with `X-API-Version: v1` header. Query params for filtering: `albumId`, `page`, `pageSize`.

### Performance Patterns
- Lazy loading: `loading="lazy" decoding="async"` on images
- IntersectionObserver for reveal animations and lazy component init
- Web Vitals tracking via `/api/metrics` endpoint

## Environment Variables

Required for AI description generation:
- `OPENAI_API_KEY`

## Styling Conventions

- Scoped `<style>` blocks in components
- CSS variables for theming (supports light/dark via color-scheme)
- Responsive breakpoints: 480px, 640px, 768px, 1024px
