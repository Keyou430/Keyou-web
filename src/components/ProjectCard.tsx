'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Project } from '@/data/projects';
import Badge from '@/components/Badge';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass group relative flex flex-col p-6 transition-all duration-300
                 hover:border-accent/40 hover:shadow-[0_0_24px_rgba(6,182,212,0.08)]"
    >
      {/* Category tag */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="font-mono text-[10px] text-dim uppercase tracking-wider">
          {project.category}
        </span>
        {/* External link icon */}
        <svg
          className="w-4 h-4 text-dim opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          fill="none" stroke="currentColor" strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </div>

      {/* Title */}
      <h3 className={`font-mono font-semibold text-foreground mb-2 ${featured ? 'text-lg' : 'text-base'}`}>
        {project.title}
      </h3>

      {/* Description */}
      <p className={`text-sm text-muted leading-relaxed flex-1 ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}>
        {project.description}
      </p>

      {/* Tech stack badges */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.techStack.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      {/* Links */}
      <div className="mt-4 flex gap-4 pt-3 border-t border-white/5">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[12px] text-accent hover:underline transition-colors"
        >
          &lt;源码 /&gt;
        </a>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12px] text-accent hover:underline transition-colors"
          >
            &lt;演示 /&gt;
          </a>
        )}
      </div>
    </motion.div>
  );
}
