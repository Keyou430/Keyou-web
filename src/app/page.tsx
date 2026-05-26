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

      {/* ====== Projects ====== */}
      <section id="projects" className="relative-z py-20 animate-slide-up">
        <p className="section-label">作品</p>
        <h2 className="font-mono text-2xl font-bold text-gradient sm:text-3xl">
          精选项目
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: 'Keyou Web',
              desc: '个人作品集 + 微博客，以 GitHub Issues 作为后端数据源。纯静态导出，零服务器成本。',
              tags: ['Next.js', 'TypeScript', 'GitHub API'],
            },
            {
              title: '分布式任务队列',
              desc: '基于 Rust 和 Redis 的高吞吐任务队列。支持优先级调度、自动重试和死信队列。',
              tags: ['Rust', 'Redis', 'gRPC'],
            },
            {
              title: 'CLI 工具箱',
              desc: '命令行工具合集，涵盖代码生成、脚手架和构建工具。Go 编写，Homebrew 分发。',
              tags: ['Go', 'Cobra', 'GitHub Actions'],
            },
            {
              title: '实时仪表盘',
              desc: '基于 WebSocket 的毫秒级分析面板。SSE + React + D3 数据可视化。',
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
