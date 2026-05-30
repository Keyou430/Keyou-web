import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import Badge from '@/components/Badge';
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
  completed: { label: '已完成', color: 'text-green-400 border-green-400/20 bg-green-400/5' },
  'in-progress': { label: '进行中', color: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5' },
  planned: { label: '计划中', color: 'text-blue-400 border-blue-400/20 bg-blue-400/5' },
};

export default async function ProjectDetail({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  const status = STATUS_MAP[project.status];

  return (
    <article className="relative-z py-16 max-w-3xl mx-auto animate-fade-in">
      {/* Back link */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 font-mono text-[13px] text-muted hover:text-accent transition-colors mb-10"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        返回首页
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] text-dim uppercase tracking-wider">
            {project.category}
          </span>
          {status && (
            <span className={`font-mono text-[10px] px-2 py-0.5 rounded-sm border ${status.color}`}>
              {status.label}
            </span>
          )}
        </div>

        <h1 className="font-mono text-3xl font-bold text-foreground sm:text-4xl mb-4">
          {project.title}
        </h1>

        <p className="text-base text-muted leading-relaxed">
          {project.description}
        </p>

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
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

      {/* Divider */}
      <div className="border-t border-white/5 mb-10" />

      {/* Tech stack */}
      <section className="mb-10">
        <h2 className="font-mono text-lg font-semibold text-foreground mb-4">
          技术栈
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="mb-10">
        <h2 className="font-mono text-lg font-semibold text-foreground mb-4">
          项目亮点
        </h2>
        <ul className="space-y-3">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              {h}
            </li>
          ))}
        </ul>
      </section>

      {/* Long description */}
      <section className="mb-10">
        <h2 className="font-mono text-lg font-semibold text-foreground mb-4">
          详细介绍
        </h2>
        <div className="text-sm text-muted leading-relaxed space-y-4">
          {project.longDescription.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* Bottom nav */}
      <div className="border-t border-white/5 pt-8 mt-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 font-mono text-[13px] text-accent hover:underline transition-colors"
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
