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
  completed: { label: '已完成', color: 'text-green-400 border-green-400/15 bg-green-400/[0.06]' },
  'in-progress': { label: '进行中', color: 'text-yellow-400 border-yellow-400/15 bg-yellow-400/[0.06]' },
  planned: { label: '计划中', color: 'text-blue-400 border-blue-400/15 bg-blue-400/[0.06]' },
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
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="glass group block p-6 no-underline transition-all duration-300
                   hover:scale-[1.015] hover:border-white/[0.1]
                   hover:bg-white/[0.045]
                   hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
      >
        {/* Header: category + status */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-sans text-[11px] text-dim/60 uppercase tracking-widest">
            {project.category}
          </span>
          {status && (
            <span className={`font-sans text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${status.color}`}>
              {status.label}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-sans text-[17px] font-semibold text-foreground mb-2.5 tracking-[-0.01em] group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[14px] text-muted leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        {/* Highlights - Desktop only */}
        <div className="hidden sm:block border-t border-white/[0.04] pt-4 mt-4">
          <ul className="space-y-2">
            {project.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[12px] text-muted/80 leading-relaxed">
                <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-accent/60 flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.div>
  );
}
