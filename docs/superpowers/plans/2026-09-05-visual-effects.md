# Visual Effects Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add mouse glow, Rauno-style project cards, and rainbow dividers to the Keyou Web portfolio.

**Architecture:** Three independent visual enhancements: (1) a global mouse-following radial gradient, (2) minimalist project card redesign with generous whitespace, (3) animated rainbow gradient dividers between sections.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS 3, Framer Motion 12

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/MouseGlow.tsx` | Create | Mouse-following radial gradient overlay |
| `src/components/RainbowDivider.tsx` | Create | Animated rainbow gradient separator |
| `src/components/ProjectCard.tsx` | Modify | Rauno-style minimalist card redesign |
| `src/app/layout.tsx` | Modify | Add MouseGlow to global layout |
| `src/app/page.tsx` | Modify | Add RainbowDividers, update grid spacing |
| `src/app/globals.css` | Modify | Add mouse-glow and rainbow-divider styles |

---

### Task 1: Add Mouse Glow CSS Styles

**Files:**
- Modify: `src/app/globals.css:6-74` (after `@layer base` block)

- [ ] **Step 1: Add CSS variables and mouse-glow class**

Open `src/app/globals.css` and add the following after the `@layer base` closing brace (after line 74):

```css
/* ====== Mouse Glow ====== */
:root {
  --mouse-x: 50%;
  --mouse-y: 50%;
}

@media (hover: hover) and (pointer: fine) {
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
    transition: background 0.3s ease;
  }
}
```

- [ ] **Step 2: Verify CSS compiles**

Run: `npm run build`
Expected: Build succeeds with no CSS errors

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add mouse glow CSS styles"
```

---

### Task 2: Create MouseGlow Component

**Files:**
- Create: `src/components/MouseGlow.tsx`

- [ ] **Step 1: Create MouseGlow component**

Create `src/components/MouseGlow.tsx`:

```tsx
'use client';

import { useEffect } from 'react';

export default function MouseGlow() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div className="mouse-glow" aria-hidden="true" />;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/MouseGlow.tsx
git commit -m "feat: create MouseGlow component"
```

---

### Task 3: Integrate MouseGlow into Layout

**Files:**
- Modify: `src/app/layout.tsx:1-29`

- [ ] **Step 1: Import MouseGlow**

Open `src/app/layout.tsx` and add the import after line 2:

```tsx
import MouseGlow from '@/components/MouseGlow';
```

- [ ] **Step 2: Add MouseGlow to body**

In `layout.tsx`, add `<MouseGlow />` inside `<body>` before `<Navbar />` (after line 16):

```tsx
<body>
  <MouseGlow />
  <Navbar />
  {/* ... rest of body */}
</body>
```

- [ ] **Step 3: Verify dev server runs**

Run: `npm run dev`
Expected: Page loads, mouse glow visible on desktop

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: integrate MouseGlow into layout"
```

---

### Task 4: Add Rainbow Divider CSS Styles

**Files:**
- Modify: `src/app/globals.css` (after mouse-glow styles)

- [ ] **Step 1: Add rainbow-divider styles**

Open `src/app/globals.css` and add after the mouse-glow block:

```css
/* ====== Rainbow Divider ====== */
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

- [ ] **Step 2: Verify CSS compiles**

Run: `npm run build`
Expected: Build succeeds with no CSS errors

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add rainbow divider CSS styles"
```

---

### Task 5: Create RainbowDivider Component

**Files:**
- Create: `src/components/RainbowDivider.tsx`

- [ ] **Step 1: Create RainbowDivider component**

Create `src/components/RainbowDivider.tsx`:

```tsx
export default function RainbowDivider() {
  return (
    <div className="relative-z my-16">
      <div className="rainbow-divider" />
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/RainbowDivider.tsx
git commit -m "feat: create RainbowDivider component"
```

---

### Task 6: Refactor ProjectCard to Rauno Style

**Files:**
- Modify: `src/components/ProjectCard.tsx:1-82`

- [ ] **Step 1: Rewrite ProjectCard component**

Replace the entire contents of `src/components/ProjectCard.tsx`:

```tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="group block p-8 rounded-2xl no-underline
                   transition-all duration-500
                   hover:bg-white/[0.02] hover:scale-[1.02]
                   hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
      >
        {/* Category */}
        <span className="font-sans text-[11px] text-dim/50 uppercase tracking-[0.2em]">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="mt-6 font-sans text-[20px] font-medium text-foreground
                       tracking-[-0.02em] group-hover:text-accent
                       transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-4 text-[14px] text-muted/70 leading-[1.8] line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-sans text-[11px] text-dim/40
                         border border-white/[0.04] rounded-full px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "refactor: redesign ProjectCard with Rauno minimalist style"
```

---

### Task 7: Update Page Layout with Rainbow Dividers

**Files:**
- Modify: `src/app/page.tsx:1-107`

- [ ] **Step 1: Import RainbowDivider**

Open `src/app/page.tsx` and add the import after line 2:

```tsx
import RainbowDivider from '@/components/RainbowDivider';
```

- [ ] **Step 2: Add RainbowDividers between sections**

In `page.tsx`, add `<RainbowDivider />` between each section:

After the Projects section closing `</section>` (after line 42):
```tsx
</section>

<RainbowDivider />
```

After the Tech Stack section closing `</section>` (after line 80):
```tsx
</section>

<RainbowDivider />
```

- [ ] **Step 3: Update project grid spacing**

In `page.tsx`, change the grid container (line 37) from:
```tsx
<div className="mt-12 grid grid-cols-2 gap-5">
```
to:
```tsx
<div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
```

- [ ] **Step 4: Verify dev server runs**

Run: `npm run dev`
Expected: Page loads with rainbow dividers visible between sections

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add RainbowDividers and update project grid spacing"
```

---

### Task 8: Final Verification

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Visual verification**

Run: `npm run dev` and open http://localhost:3000

Verify:
- Mouse glow follows cursor across the entire page
- Project cards have generous whitespace and minimal design
- Hover over cards shows subtle scale and shadow
- Rainbow dividers visible between Projects/Tech Stack and Tech Stack/Contact
- Rainbow dividers animate smoothly
- Mobile: cards are single column, glow is disabled

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete visual effects enhancement"
```
