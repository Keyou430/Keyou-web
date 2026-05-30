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
        className="glass group relative flex flex-col sm:flex-row gap-6 p-6 transition-all duration-300
                   hover:border-accent/40 hover:shadow-[0_0_24px_rgba(6,182,212,0.08)] cursor-pointer block no-underline"
      >
        {/* Left: main info */}
        <div className="flex-1 min-w-0">
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

          <h3 className="font-mono text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>

        {/* Right: highlights preview */}
        <div className="sm:w-64 flex-shrink-0 sm:border-l sm:border-white/5 sm:pl-6">
          <p className="font-mono text-[10px] text-dim uppercase tracking-wider mb-3">
            亮点
          </p>
          <ul className="space-y-2">
            {project.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] text-muted leading-relaxed">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Arrow indicator */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center">
          <svg
            className="w-5 h-5 text-dim opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
            fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
