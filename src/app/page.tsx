import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import RainbowDivider from '@/components/RainbowDivider';
import RainbowOrbs from '@/components/RainbowOrbs';
import ProjectStackSpread from '@/components/ProjectStackSpread';

export default function Home() {
  return (
    <>
      <RainbowOrbs />

      {/* ====== Scatter showcase + HeroSpotlight ====== */}
      <div className="-mx-6 max-md:-mx-4">
        <ProjectStackSpread />
      </div>

      {/* ====== Bio (below scatter) ====== */}
      <section className="relative-z flex flex-col justify-center pb-16 animate-fade-in">
        <p className="section-label">关于</p>
        <p className="max-w-xl font-sans text-[17px] text-muted leading-relaxed">
          电子信息工程在读，专注于嵌入式系统与硬件开发。
          同时实践 Vibe Coding，探索 AI 驱动的软件开发。
        </p>
        <p className="mt-3 max-w-xl font-sans text-[15px] text-dim leading-relaxed">
          曾担任课程助教和一对一辅导老师，具备良好的沟通表达与团队协作能力。
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#projects" className="btn-glow">
            查看作品
          </a>
          <a href="#contact" className="btn-ghost">
            联系我
          </a>
        </div>
      </section>

      <RainbowDivider className="!my-12" />

      {/* ====== Projects (Rauno work list) ====== */}
      <section id="projects" className="relative-z py-20">
        <p className="section-label">作品</p>
        <h2 className="section-title-rainbow font-sans text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold text-gradient tracking-[-0.02em]">
          项目经历
        </h2>
        <div className="mt-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>

      <RainbowDivider />

      {/* ====== Tech Stack ====== */}
      <section id="stack" className="relative-z py-24 animate-slide-up">
        <p className="section-label">技术栈</p>
        <h2 className="section-title-rainbow font-sans text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold text-gradient tracking-[-0.02em]">
          专业技能
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[
            { name: '51 单片机', level: '熟练' },
            { name: 'STM32', level: '熟练' },
            { name: 'C 语言', level: '主力' },
            { name: 'EDA 原理图设计', level: '熟练' },
            { name: 'NI Multisim', level: '日常' },
            { name: '立创 EDA', level: '日常' },
            { name: '硬件焊接', level: '日常' },
            { name: '示波器 / 万用表', level: '日常' },
            { name: 'Keil MDK', level: '主力' },
            { name: 'Node.js', level: '实践' },
            { name: 'Express', level: '实践' },
            { name: 'Python', level: '基础' },
            { name: 'Matlab', level: '基础' },
            { name: 'Vibe Coding', level: '实践' },
          ].map((tech) => (
            <div
              key={tech.name}
              className="glass-sm p-4 flex items-center justify-between gap-2 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.1]"
            >
              <span className="font-sans text-[13px] text-foreground">
                {tech.name}
              </span>
              <span className="font-sans text-[11px] text-dim/70 tracking-wide">
                {tech.level}
              </span>
            </div>
          ))}
        </div>
      </section>

      <RainbowDivider />

      {/* ====== Contact ====== */}
      <section id="contact" className="relative-z py-24 animate-slide-up">
        <p className="section-label">联系</p>
        <h2 className="section-title-rainbow font-sans text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold text-gradient tracking-[-0.02em]">
          联系我
        </h2>
        <p className="mt-5 max-w-lg text-[15px] text-muted leading-relaxed">
          欢迎交流，可以通过邮件或 GitHub 联系我。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
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

      <RainbowDivider strong className="mt-24 !mb-0" />
    </>
  );
}
