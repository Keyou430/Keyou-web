'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const statusLabel: Record<Project['status'], string> = {
  completed: '已完成',
  'in-progress': '进行中',
  planned: '规划中',
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.04, 0.24),
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="rauno-row group grid grid-cols-1 gap-3 border-t border-white/[0.06] py-8 no-underline
                   transition-colors duration-300 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-8"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-dim/50">
              {project.category}
            </span>
            <span className="font-sans text-[11px] text-dim/35">
              {statusLabel[project.status]}
            </span>
          </div>

          <h3 className="mt-3 font-sans text-[22px] font-medium tracking-[-0.02em] text-foreground
                         transition-colors duration-300 group-hover:text-accent md:text-[24px]">
            {project.title}
          </h3>

          <p className="mt-3 max-w-2xl text-[14px] leading-[1.75] text-muted/65 line-clamp-2">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/[0.05] px-3 py-1 font-sans text-[11px] text-dim/45
                           transition-colors duration-300 group-hover:border-white/[0.1] group-hover:text-dim/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-end md:gap-3">
          <span className="font-mono text-[12px] tabular-nums text-dim/40">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08]
                       text-[18px] text-muted/70 transition-all duration-300
                       group-hover:border-accent/40 group-hover:text-accent group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
