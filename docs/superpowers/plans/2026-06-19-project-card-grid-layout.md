# Project Card Grid Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign project cards from single-column horizontal layout to two-column grid layout with responsive highlights display.

**Architecture:** Modify ProjectCard component to vertical card layout, update page.tsx container to CSS grid, adjust hover effects and highlights visibility per breakpoint.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/ProjectCard.tsx` | Modify | Card component: vertical layout, responsive highlights |
| `src/app/page.tsx` | Modify | Grid container: `grid grid-cols-2 gap-4` |

No new files needed. No CSS file changes required (using Tailwind utilities).

---

### Task 1: Update page.tsx Grid Container

**Files:**
- Modify: `src/app/page.tsx:37`

- [ ] **Step 1: Change flex container to grid**

```tsx
// src/app/page.tsx:37
// Before:
<div className="mt-10 flex flex-col gap-4">

// After:
<div className="mt-10 grid grid-cols-2 gap-4">
```

- [ ] **Step 2: Verify dev server runs**

Run: `npm run dev`
Expected: Server starts without errors on http://localhost:3000

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: change project cards container to 2-column grid"
```

---

### Task 2: Redesign ProjectCard Component

**Files:**
- Modify: `src/components/ProjectCard.tsx`

- [ ] **Step 1: Rewrite ProjectCard with new layout**

Replace the entire `ProjectCard.tsx` content:

```tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import type { Project } from '@/data/projects';
import Badge from '@/components/Badge';

interface ProjectCardProps {
  project: Project;
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  completed: { label: '已完成', color: 'text-green-400 border-green-400/20 bg-green-400/5' },
  'in-progress': { label: '进行中', color: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5' },
  planned: { label: '计划中', color: 'text-blue-400 border-blue-400/20 bg-blue-400/5' },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const status = STATUS_MAP[project.status];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="glass group block p-5 no-underline transition-all duration-200
                   hover:scale-[1.02] hover:border-accent/40
                   hover:shadow-[0_0_24px_rgba(6,182,212,0.08)]"
      >
        {/* Header: category + status */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] text-dim uppercase tracking-wider">
            {project.category}
          </span>
          {status && (
            <span className={`font-mono text-[10px] px-2 py-0.5 rounded-sm border ${status.color}`}>
              {status.label}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-mono text-base font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        {/* Highlights - Desktop only */}
        <div className="hidden sm:block border-t border-white/5 pt-3 mt-3">
          <ul className="space-y-1.5">
            {project.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] text-muted leading-relaxed">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Verify visual result**

Run: `npm run dev`
Open: http://localhost:3000
Expected:
- Cards display in 2-column grid
- Desktop: highlights visible below tech stack
- Mobile (<640px): highlights hidden
- Hover: card scales 1.02x with border glow

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: redesign ProjectCard for grid layout with responsive highlights"
```

---

### Task 3: Visual Verification & Cleanup

**Files:**
- None (verification only)

- [ ] **Step 1: Test responsive behavior**

Open: http://localhost:3000
- Resize browser to verify:
  - Desktop (≥640px): 2 columns, highlights visible
  - Mobile (<640px): 2 columns, highlights hidden

- [ ] **Step 2: Test interactions**

- Hover over cards: verify scale + glow effect
- Click card: verify navigation to `/projects/[id]`
- Check all 8 project cards render correctly

- [ ] **Step 3: Run build to catch errors**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 4: Final commit if needed**

If any fixes were made:
```bash
git add -A
git commit -m "fix: address grid layout issues from visual testing"
```

---

## Summary

| Task | Description | Files Changed |
|------|-------------|---------------|
| 1 | Grid container in page.tsx | `src/app/page.tsx` |
| 2 | ProjectCard component redesign | `src/components/ProjectCard.tsx` |
| 3 | Visual verification | None |

**Total commits:** 2-3
**Estimated time:** 10-15 minutes
