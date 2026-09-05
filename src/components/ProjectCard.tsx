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
