import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import Badge from '@/components/Badge';
import ProjectGallery from '@/components/ProjectGallery';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} — Keyou Web`,
    description: project.description,
  };
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  completed: { label: '已完成', color: 'text-green-400 border-green-400/15 bg-green-400/[0.06]' },
  'in-progress': { label: '进行中', color: 'text-yellow-400 border-yellow-400/15 bg-yellow-400/[0.06]' },
  planned: { label: '计划中', color: 'text-blue-400 border-blue-400/15 bg-blue-400/[0.06]' },
};

export default async function ProjectDetail({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  const status = STATUS_MAP[project.status];

  return (
    <article className="relative-z py-20 max-w-3xl mx-auto animate-fade-in">
      {/* Back link */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 font-sans text-[13px] text-muted/70 hover:text-foreground transition-colors duration-200 mb-12"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        返回首页
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-sans text-[11px] text-dim/60 uppercase tracking-widest">
            {project.category}
          </span>
          {status && (
            <span className={`font-sans text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${status.color}`}>
              {status.label}
            </span>
          )}
        </div>

        <h1 className="font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-foreground tracking-[-0.025em] mb-5">
          {project.title}
        </h1>

        <p className="text-[16px] text-muted leading-relaxed">
          {project.description}
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow text-sm"
            >
              查看源码
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
            >
              在线演示
            </a>
          )}
        </div>
      </header>

      {/* MorphGallery — WebGL noise dissolve showcase */}
      <ProjectGallery images={project.images ?? []} />

      {/* Divider */}
      <div className="border-t border-white/[0.04] mb-12" />

      {/* Tech stack */}
      <section className="mb-12">
        <h2 className="font-sans text-lg font-semibold text-foreground mb-5 tracking-[-0.01em]">
          技术栈
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="mb-12">
        <h2 className="font-sans text-lg font-semibold text-foreground mb-5 tracking-[-0.01em]">
          项目亮点
        </h2>
        <ul className="space-y-3.5">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3 text-[14px] text-muted leading-relaxed">
              <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-accent/60 flex-shrink-0" />
              {h}
            </li>
          ))}
        </ul>
      </section>

      {/* Long description */}
      <section className="mb-12">
        <h2 className="font-sans text-lg font-semibold text-foreground mb-5 tracking-[-0.01em]">
          详细介绍
        </h2>
        <div className="text-[14px] text-muted leading-[1.75] space-y-5">
          {project.longDescription.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* Bottom nav */}
      <div className="border-t border-white/[0.04] pt-10 mt-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 font-sans text-[13px] text-accent hover:text-accent-cyan transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          返回所有项目
        </Link>
      </div>
    </article>
  );
}
