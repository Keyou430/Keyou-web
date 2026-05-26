export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'AI Automation' | 'Quantitative Research' | 'Hardware Engineering' | 'Full-Stack Development';
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'keyou-web',
    title: 'Keyou Web',
    description:
      '个人作品集网站，基于 Next.js 14 + TypeScript + Tailwind CSS。以 GitHub Issues 作为后端数据源实现动态内容管理，GitHub Actions 自动构建部署，零服务器成本。',
    category: 'Full-Stack Development',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GitHub API'],
    githubUrl: 'https://github.com/Keyou430/Keyou-web',
    demoUrl: 'https://web.keyou.ccwu.cc',
  },
  {
    id: 'ai-social-aggregator',
    title: 'AI 社交媒体聚合与播客生成器',
    description:
      '自动抓取多平台社交媒体内容，通过 LLM 进行语义聚合与摘要，将热点话题转化为可播报的播客脚本并自动合成音频。实现从数据采集到内容分发的全链路自动化。',
    category: 'AI Automation',
    techStack: ['Python', 'Telethon', 'LLM API', '自动化'],
    githubUrl: 'https://github.com/Keyou430/ai-social-aggregator',
  },
  {
    id: 'worldquant-alpha-optimization',
    title: 'WorldQuant BRAIN Alpha 因子优化研究',
    description:
      '基于 WorldQuant BRAIN 平台的量化因子挖掘与优化系统。通过多因子组合分析、夏普比率最大化算法和回测框架，筛选并优化高信噪比的 Alpha 信号。',
    category: 'Quantitative Research',
    techStack: ['Python', '因子挖掘', '夏普比率优化'],
    githubUrl: 'https://github.com/Keyou430/worldquant-alpha',
  },
];
