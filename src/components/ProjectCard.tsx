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
