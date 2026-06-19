# Project Card Grid Layout Design

**Date:** 2026-06-19
**Status:** Approved
**Author:** Claude (Brainstorming Session)

## Overview

Redesign the project experience cards from a single-column horizontal layout to a two-column grid layout, optimizing for better space utilization and visual hierarchy.

## Design Decisions

### 1. Layout Structure

**Decision:** Two-column grid layout for both desktop and mobile.

**Rationale:**
- Current single-column layout wastes horizontal space
- 8 projects benefit from a more compact presentation
- Two columns provide good balance between content density and readability

**Implementation:**
```css
/* Desktop & Mobile */
.project-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem; /* 16px */
}

/* Responsive breakpoints */
@media (max-width: 640px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem; /* 12px for mobile */
  }
}
```

### 2. Card Content Organization

**Decision:** Each card contains:
- Category label (top-left)
- Status badge (top-right of category)
- Project title
- Description (2 lines max, truncated)
- Tech stack badges (bottom)

**Desktop:** Highlights displayed on the right side of the card (current style)
**Mobile:** Highlights hidden, accessible via detail page

### 3. Hover Effects

**Decision:** Scale transform + border glow (both desktop and mobile)

**Implementation:**
```css
.project-card {
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.project-card:hover {
  transform: scale(1.02);
  border-color: rgba(6, 182, 212, 0.4);
  box-shadow: 0 0 24px rgba(6, 182, 212, 0.08);
}
```

### 4. Click Behavior

**Decision:** Maintain current behavior - click navigates to `/projects/[id]` detail page.

**Rationale:**
- Detail page provides comprehensive project information
- Consistent with existing user flow
- No need for inline expansion (would complicate grid layout)

### 5. Highlights Display Strategy

**Desktop:**
- Highlights shown on the right side of the card (140px width)
- Vertical separator line between main content and highlights
- Display up to 3 highlight items with cyan bullet points

**Mobile:**
- Highlights hidden to save space
- Accessible via clicking into detail page
- Keeps mobile cards clean and compact

## Component Changes

### ProjectCard.tsx

**Current Structure:**
```tsx
<motion.div>
  <Link className="glass group flex flex-col sm:flex-row gap-6 p-6">
    {/* Left: main info */}
    <div className="flex-1">...</div>
    {/* Right: highlights */}
    <div className="sm:w-64">...</div>
    {/* Arrow indicator */}
    <div className="absolute right-4">...</div>
  </Link>
</motion.div>
```

**New Structure:**
```tsx
<motion.div>
  <Link className="glass group p-5 hover:scale-[1.02]">
    {/* Header: category + status */}
    <div className="flex items-center gap-2 mb-3">...</div>
    {/* Title */}
    <h3 className="font-mono text-base font-semibold mb-2">...</h3>
    {/* Description */}
    <p className="text-sm text-muted line-clamp-2 mb-3">...</p>
    {/* Tech stack */}
    <div className="flex flex-wrap gap-1.5 mb-3">...</div>
    {/* Highlights - Desktop only */}
    <div className="hidden sm:block border-t border-white/5 pt-3 mt-3">
      <ul className="space-y-1.5">
        {project.highlights.slice(0, 3).map(...)}
      </ul>
    </div>
  </Link>
</motion.div>
```

### page.tsx

**Current:**
```tsx
<div className="mt-10 flex flex-col gap-4">
  {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
</div>
```

**New:**
```tsx
<div className="mt-10 grid grid-cols-2 gap-4">
  {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
</div>
```

## Visual Design

### Card Appearance
- Background: `bg-white/5` (glassmorphism)
- Border: `border-white/10`
- Border radius: `rounded-lg`
- Padding: `p-5` (20px)
- Backdrop blur: `backdrop-blur-md`

### Typography
- Category: `font-mono text-[10px] text-dim uppercase tracking-wider`
- Title: `font-mono text-base font-semibold text-foreground`
- Description: `text-sm text-muted leading-relaxed`
- Tech badges: `font-mono text-[11px]`
- Highlights: `text-[12px] text-muted`

### Colors
- Status completed: `text-green-400 border-green-400/20 bg-green-400/5`
- Status in-progress: `text-yellow-400 border-yellow-400/20 bg-yellow-400/5`
- Status planned: `text-blue-400 border-blue-400/20 bg-blue-400/5`
- Highlight bullet: `bg-accent` (cyan #06b6d4)

### Animation
- Entry: Fade in + translateY (existing Framer Motion)
- Hover: Scale 1.02x + border glow (CSS transition)

## Responsive Behavior

| Breakpoint | Columns | Gap | Card Padding | Highlights |
|------------|---------|-----|--------------|------------|
| Desktop (≥640px) | 2 | 16px | 20px | Visible (right side) |
| Mobile (<640px) | 2 | 12px | 16px | Hidden |

## Implementation Notes

1. **Remove arrow indicator** - Grid cards don't need directional cues
2. **Adjust card padding** - Reduce from `p-6` to `p-5` for better fit
3. **Truncate description** - Keep `line-clamp-2` for consistency
4. **Mobile highlights** - Use `hidden sm:block` to hide on mobile
5. **Grid responsiveness** - Both breakpoints use 2 columns, just adjust gap

## Success Criteria

- [ ] Cards display in 2-column grid on all screen sizes
- [ ] Each card shows: category, status, title, description, tech stack
- [ ] Desktop: highlights visible on right side
- [ ] Mobile: highlights hidden, accessible via detail page
- [ ] Hover effect: scale 1.02x + border glow
- [ ] Click navigates to detail page
- [ ] Animation: smooth entry (existing Framer Motion)
- [ ] No layout shift or overflow issues
- [ ] Maintain glassmorphism design language

## Files to Modify

1. `src/components/ProjectCard.tsx` - Card component redesign
2. `src/app/page.tsx` - Grid layout container
3. `src/app/globals.css` - Add grid-specific styles (if needed)

## Dependencies

- No new dependencies required
- Uses existing Tailwind CSS utilities
- Uses existing Framer Motion for animations
- Pure CSS for hover effects
