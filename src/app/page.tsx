export default function Home() {
  return (
    <>
      {/* ====== Hero ====== */}
      <section className="relative-z flex min-h-[70vh] flex-col justify-center pt-16 pb-12 animate-fade-in">
        <p className="section-label">intro</p>
        <h1 className="font-mono text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          <span className="text-gradient">Hi, I&apos;m </span>
          <span className="text-gradient-accent">Keyou</span>
        </h1>
        <p className="mt-6 max-w-xl font-mono text-base text-muted leading-relaxed sm:text-lg">
          Full-stack developer. I build performant, type-safe software with
          modern web technologies. Currently focused on Rust, TypeScript, and
          distributed systems.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="btn-glow">
            View Projects
          </a>
          <a href="#contact" className="btn-ghost">
            Get in Touch
          </a>
        </div>
      </section>

      {/* ====== Projects ====== */}
      <section id="projects" className="relative-z py-20 animate-slide-up">
        <p className="section-label">projects</p>
        <h2 className="font-mono text-2xl font-bold text-gradient sm:text-3xl">
          Selected Work
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: 'Keyou Web',
              desc: 'Personal portfolio + micro-blog powered by GitHub Issues as a headless CMS. Static export, zero hosting cost.',
              tags: ['Next.js', 'TypeScript', 'GitHub API'],
            },
            {
              title: 'Distributed Task Queue',
              desc: 'High-throughput task queue built with Rust and Redis. Supports priority scheduling, retries, and dead-letter queues.',
              tags: ['Rust', 'Redis', 'gRPC'],
            },
            {
              title: 'CLI Toolkit',
              desc: 'Monorepo of command-line utilities for codegen, scaffolding, and build tooling. Written in Go, distributed via Homebrew.',
              tags: ['Go', 'Cobra', 'GitHub Actions'],
            },
            {
              title: 'Real-time Dashboard',
              desc: 'WebSocket-powered analytics dashboard with sub-100ms latency. Server-sent events + React + D3 visualizations.',
              tags: ['React', 'D3', 'WebSocket'],
            },
          ].map((p) => (
            <div key={p.title} className="glass p-6 group transition-all duration-200 hover:border-white/20">
              <h3 className="font-mono text-base font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {p.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-white/5 text-dim border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== Tech Stack ====== */}
      <section id="stack" className="relative-z py-20 animate-slide-up">
        <p className="section-label">stack</p>
        <h2 className="font-mono text-2xl font-bold text-gradient sm:text-3xl">
          Tech Stack
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[
            { name: 'TypeScript', level: 'Primary' },
            { name: 'Rust', level: 'Learning' },
            { name: 'Go', level: 'Proficient' },
            { name: 'React / Next.js', level: 'Primary' },
            { name: 'Node.js', level: 'Primary' },
            { name: 'PostgreSQL', level: 'Proficient' },
            { name: 'Redis', level: 'Proficient' },
            { name: 'Docker', level: 'Everyday' },
            { name: 'Kubernetes', level: 'Learning' },
            { name: 'GraphQL', level: 'Proficient' },
            { name: 'Tailwind CSS', level: 'Everyday' },
            { name: 'Git / CI/CD', level: 'Everyday' },
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
        <p className="section-label">contact</p>
        <h2 className="font-mono text-2xl font-bold text-gradient sm:text-3xl">
          Get in Touch
        </h2>
        <p className="mt-4 max-w-lg text-sm text-muted leading-relaxed">
          Always open to interesting conversations. Reach out via email or find
          me on GitHub.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a href="mailto:keyou@ccwu.cc" className="btn-glow text-sm">
            keyou@ccwu.cc
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
