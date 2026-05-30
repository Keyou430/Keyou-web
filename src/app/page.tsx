import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  return (
    <>
      {/* ====== Hero ====== */}
      <section className="relative-z flex min-h-[70vh] flex-col justify-center pt-16 pb-12 animate-fade-in">
        <p className="section-label">关于</p>
        <h1 className="font-mono text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          <span className="text-gradient">你好，我是 </span>
          <span className="text-gradient-accent">Keyou</span>
        </h1>
        <p className="mt-6 max-w-xl font-mono text-base text-muted leading-relaxed sm:text-lg">
          全栈开发者。用现代 Web 技术构建高性能、类型安全的软件。
          目前专注于 Rust、TypeScript 和分布式系统。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="btn-glow">
            查看作品
          </a>
          <a href="#contact" className="btn-ghost">
            联系我
          </a>
        </div>
      </section>

      {/* ====== Projects (Large Cards) ====== */}
      <section id="projects" className="relative-z py-20">
        <p className="section-label">作品</p>
        <h2 className="font-mono text-2xl font-bold text-gradient sm:text-3xl">
          精选项目
        </h2>
        <div className="mt-10 flex flex-col gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* ====== Tech Stack ====== */}
      <section id="stack" className="relative-z py-20 animate-slide-up">
        <p className="section-label">技术栈</p>
        <h2 className="font-mono text-2xl font-bold text-gradient sm:text-3xl">
          技术栈
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[
            { name: 'TypeScript', level: '主力' },
            { name: 'Rust', level: '学习中' },
            { name: 'Go', level: '熟练' },
            { name: 'React / Next.js', level: '主力' },
            { name: 'Node.js', level: '主力' },
            { name: 'PostgreSQL', level: '熟练' },
            { name: 'Redis', level: '熟练' },
            { name: 'Docker', level: '日常' },
            { name: 'Kubernetes', level: '学习中' },
            { name: 'GraphQL', level: '熟练' },
            { name: 'Tailwind CSS', level: '日常' },
            { name: 'Git / CI/CD', level: '日常' },
          ].map((tech) => (
            <div
              key={tech.name}
              className="glass-sm p-4 flex items-center justify-between gap-2 transition-all duration-200 hover:border-accent/20"
            >
              <span className="font-mono text-[13px] text-foreground">
                {tech.name}
              </span>
              <span className="font-mono text-[10px] text-dim tracking-wide">
                {tech.level}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ====== Contact ====== */}
      <section id="contact" className="relative-z py-20 animate-slide-up">
        <p className="section-label">联系</p>
        <h2 className="font-mono text-2xl font-bold text-gradient sm:text-3xl">
          联系我
        </h2>
        <p className="mt-4 max-w-lg text-sm text-muted leading-relaxed">
          欢迎交流，可以通过邮件或 GitHub 联系我。
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a href="mailto:2160151721@qq.com" className="btn-glow text-sm">
            2160151721@qq.com
          </a>
          <a
            href="https://github.com/Keyou430"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            GitHub
          </a>
        </div>
      </section>
    </>
  );
}
