# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server (http://localhost:5173, or next available port)
npm run build    # production build to dist/
npm run preview  # preview production build locally
```

No test runner or linter is configured.

## Stack

React 18 + Vite 6, CSS puro, sem bibliotecas de componentes, sem React Router.

## Architecture

This is the EXP Marketing agency site, built **section by section** in stages. Only the first stage (Header + Hero) is implemented. Remaining sections (TimelineIntro, Manifesto, Method, SolutionsPreview, FinalCTA, Footer) are planned for future iterations.

**Flat structure — no nested component folders:**
```
src/
  assets/          # logo-branca.jpeg, logo.jpeg, hero.png
  components/      # one .jsx file per component, no subfolders
  App.jsx          # imports styles.css + composes components
  main.jsx
  styles.css       # single CSS file: design system → reset → per-section styles
```

All CSS lives in `src/styles.css`, organized in sections with `/* === SECTION NAME === */` comments. There are no per-component CSS files.

## Design System

CSS custom properties defined in `:root` at the top of `styles.css`:

| Token | Value |
|---|---|
| `--off-white` | `#F7F7F5` (default background) |
| `--champagne` | `#D8B98C` (accent: buttons, lines, hover) |
| `--graphite` | `#171717` (primary text/dark bg) |
| `--font-display` | Cormorant Garamond (serif, editorial headlines) |
| `--font-body` | Inter (sans-serif, UI text) |
| `--container` | `1280px` max-width |
| `--gutter` | `clamp(24px, 5vw, 64px)` |

Fonts are loaded via `<link>` in `index.html` (Google Fonts). No npm font packages.

## Assets

| File | Usage |
|---|---|
| `src/assets/logo-branca.jpeg` | EXP wordmark (black on white) — Header on light bg |
| `src/assets/logo.jpeg` | EXP X-icon (white on black) — reserved for dark bg (Footer) |
| `src/assets/hero.png` | Editorial hero photo — right column of Hero section |

## Key CSS Patterns

**Hero bleed layout** — the hero image column bleeds to the right viewport edge without padding:
```css
.hero { display: grid; grid-template-columns: 1fr 1fr; }
.hero__content {
  /* aligns text with global container, respects max-width */
  padding-left: max(var(--gutter), calc((100vw - var(--container)) / 2 + var(--gutter)));
}
.hero__image-wrap { position: relative; overflow: hidden; }
.hero__image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
```

**Mobile breakpoint** — `860px` for both Header and Hero (collapses nav to hamburger, hero to single column).

## Conventions

- Copy/UI language is **Spanish** throughout.
- Nav links point to `href="#"` with `aria-disabled="true"` until internal pages are built.
- No gradients, no blobs, no neon, no ícones decorativos. Accent color (champagne) used only on buttons, thin lines, and hover states.
- Animations: only `transform` and `opacity`. All transitions respect `prefers-reduced-motion`.
- The X motif from the EXP logo is reused as a subtle SVG background decoration (`opacity ≈ 0.05`, champagne stroke).
