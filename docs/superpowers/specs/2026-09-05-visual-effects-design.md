# Visual Effects Enhancement Design

**Date:** 2026-09-05  
**Status:** Approved  
**Author:** Claude Code + Keyou

## Overview

Enhance the Keyou Web portfolio with three visual effects inspired by leading developer portfolios:

1. **Mouse Glow** - Brittany Chiang style radial gradient following cursor
2. **Rauno Cards** - Minimalist project card redesign with generous whitespace
3. **Rainbow Divider** - Josh W Comeau style gradient separators between sections

## Design Goals

- Maintain existing multi-section scrollable layout (Hero → Projects → Tech Stack → Contact)
- Prioritize visual impact over raw performance (user preference)
- Use hybrid approach: CSS for animations, JS for mouse tracking
- Keep the Apple Design aesthetic consistent

---

## 1. Mouse Glow Effect

### Reference
Brittany Chiang (brittanychiang.com) - subtle radial gradient following cursor

### Implementation

**CSS (`globals.css`)**:
```css
:root {
  --mouse-x: 50%;
  --mouse-y: 50%;
}

.mouse-glow {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(41, 151, 255, 0.06),
    transparent 60%
  );
  filter: blur(40px);
}
```

**Component (`MouseGlow.tsx`)**:
- Client component listening to `document.mousemove`
- Updates CSS variables `--mouse-x` and `--mouse-y` on `documentElement`
- Renders a single `<div className="mouse-glow" />`
- No props, no state

**Integration (`layout.tsx`)**:
- Add `<MouseGlow />` inside `<body>`, before `<main>`

### Visual Properties
- Color: `#2997ff` (accent blue) at 6% opacity
- Size: 600px diameter circle
- Blur: 40px for soft edge
- Layer: Fixed, z-index 0, pointer-events none

---

## 2. Rauno-Style Project Cards

### Reference
Rauno.me - minimalist typography, generous whitespace, subtle hover micro-interactions

### Key Changes

| Aspect | Current | New |
|--------|---------|-----|
| Padding | `p-6` | `p-8` |
| Title size | `text-[17px]` | `text-[20px]` |
| Title spacing | `mb-2.5` | `mt-6` |
| Description | `mb-4` | `mt-4 leading-[1.8]` |
| Status badge | Shown | Removed |
| Highlights | 3 items shown | Removed |
| Hover scale | `1.015` | `1.02` |
| Hover shadow | `0_8px_30px` | `0_20px_60px_-15px` |
| Background | `glass` always | `hover:bg-white/[0.02]` only |
| Tech stack | Wrapped badges | Bottom-aligned, `max-4` items |

### Component Structure

```tsx
<Link className="group block p-8 rounded-2xl transition-all duration-500
                 hover:bg-white/[0.02] hover:scale-[1.02]
                 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
  
  {/* Category label */}
  <span className="text-[11px] text-dim/50 uppercase tracking-[0.2em]">
    {project.category}
  </span>
  
  {/* Title */}
  <h3 className="mt-6 text-[20px] font-medium text-foreground tracking-[-0.02em]
                 group-hover:text-accent transition-colors duration-300">
    {project.title}
  </h3>
  
  {/* Description */}
  <p className="mt-4 text-[14px] text-muted/70 leading-[1.8] line-clamp-2">
    {project.description}
  </p>
  
  {/* Tech stack - limited to 4 */}
  <div className="mt-8 flex flex-wrap gap-2">
    {project.techStack.slice(0, 4).map(t => (
      <span key={t} className="text-[11px] text-dim/40 
                               border border-white/[0.04] rounded-full px-3 py-1">
        {t}
      </span>
    ))}
  </div>
</Link>
```

### Grid Layout

```tsx
<div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
  {projects.map(p => <ProjectCard key={p.id} project={p} />)}
</div>
```

- Gap: `gap-5` → `gap-8`
- Mobile: `grid-cols-1` (single column)
- Desktop: `sm:grid-cols-2` (two columns)

---

## 3. Rainbow Divider

### Reference
Josh W Comeau (joshwcomeau.com) - playful rainbow gradients

### Implementation

**CSS (`globals.css`)**:
```css
.rainbow-divider {
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    #ff6b6b 15%,
    #ffd93d 30%,
    #6bcb77 45%,
    #4d96ff 60%,
    #9b59b6 75%,
    transparent
  );
  background-size: 200% 100%;
  animation: rainbow-shift 8s ease infinite;
  opacity: 0.4;
}

@keyframes rainbow-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Component (`RainbowDivider.tsx`)**:
```tsx
export default function RainbowDivider() {
  return (
    <div className="relative-z my-16">
      <div className="rainbow-divider" />
    </div>
  );
}
```

### Usage in `page.tsx`

```tsx
<section id="projects">...</section>
<RainbowDivider />
<section id="stack">...</section>
<RainbowDivider />
<section id="contact">...</section>
```

### Visual Properties
- Colors: Red → Yellow → Green → Blue → Purple
- Animation: 8s cycle, smooth ease
- Opacity: 40% (subtle, not distracting)
- Height: 2px (thin line)

---

## File Changes Summary

| File | Action |
|------|--------|
| `src/components/MouseGlow.tsx` | New |
| `src/components/RainbowDivider.tsx` | New |
| `src/components/ProjectCard.tsx` | Refactor |
| `src/app/layout.tsx` | Add MouseGlow |
| `src/app/page.tsx` | Add RainbowDividers, update grid |
| `src/app/globals.css` | Add mouse-glow, rainbow-divider styles |

---

## Success Criteria

- [ ] Mouse glow follows cursor smoothly across entire page
- [ ] Project cards feel spacious and minimal (Rauno aesthetic)
- [ ] Rainbow dividers visible between sections without being distracting
- [ ] No layout shifts or jank on scroll
- [ ] Mobile responsive (single column cards, glow disabled on touch)
