export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'AI Automation' | 'Quantitative Research' | 'Hardware Engineering' | 'Full-Stack Development';
  techStack: string[];
  status: 'completed' | 'in-progress' | 'planned';
  highlights: string[];
  githubUrl: string;
  demoUrl?: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    id: 'keyou-web',
    title: 'Keyou Web',
    description:
      '个人作品集网站，基于 Next.js 14 + TypeScript + Tailwind CSS。以 GitHub Issues 作为后端数据源实现动态内容管理，GitHub Actions 自动构建部署，零服务器成本。',
    longDescription:
      '一个现代化的个人技术作品集网站，用于展示项目经验和技术能力。采用 Next.js 14 App Router 架构，结合 TypeScript 提供类型安全，Tailwind CSS 实现响应式暗色主题设计。\n\n' +
      '网站以 GitHub Issues 作为轻量级 CMS，通过 GitHub API 动态拉取内容，实现零后端服务器的动态内容管理。配合 GitHub Actions 实现 CI/CD，每次推送自动构建并部署到 GitHub Pages，全程零成本运维。\n\n' +
      '前端采用毛玻璃（Glassmorphism）设计语言，配合 Framer Motion 实现流畅的滚动入场动画，打造沉浸式的浏览体验。',
    category: 'Full-Stack Development',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GitHub API', 'Framer Motion'],
    status: 'completed',
    highlights: [
      '基于 Next.js 14 App Router，支持静态导出与服务端渲染',
      'GitHub Issues 作为 CMS，零后端成本实现动态内容管理',
      'GitHub Actions 自动化 CI/CD，推送即部署',
      '毛玻璃暗色主题 + Framer Motion 滚动动画',
      '响应式设计，移动端完整适配',
    ],
    githubUrl: 'https://github.com/Keyou430/Keyou-web',
    demoUrl: 'https://web.keyou.ccwu.cc',
  },
  {
    id: 'ai-social-aggregator',
    title: 'AI 社交媒体聚合与播客生成器',
    description:
      '自动抓取多平台社交媒体内容，通过 LLM 进行语义聚合与摘要，将热点话题转化为可播报的播客脚本并自动合成音频。实现从数据采集到内容分发的全链路自动化。',
    longDescription:
      '一个端到端的 AI 自动化内容生产系统，解决社交媒体信息过载问题。系统通过 Telethon 等工具自动抓取多个社交平台的内容，利用大语言模型进行语义分析、主题聚合和内容摘要。\n\n' +
      '核心创新在于将聚合后的内容自动转化为播客脚本：LLM 根据热点话题的关联性和重要性进行排序，生成自然流畅的播报文案，再通过 TTS 引擎合成为音频文件，实现从原始社交数据到可分发音频内容的全自动流水线。\n\n' +
      '整个系统采用模块化设计，数据采集、内容分析、脚本生成、音频合成各环节可独立扩展和替换。',
    category: 'AI Automation',
    techStack: ['Python', 'Telethon', 'LLM API', 'TTS', '自动化脚本'],
    status: 'completed',
    highlights: [
      '多平台社交媒体内容自动抓取与解析',
      'LLM 驱动的语义聚合与热点话题提取',
      '自动将聚合内容转化为播客脚本',
      'TTS 引擎自动合成音频',
      '全链路自动化，从数据采集到内容分发',
    ],
    githubUrl: 'https://github.com/Keyou430/ai-social-aggregator',
  },
  {
    id: 'worldquant-alpha-optimization',
    title: 'WorldQuant BRAIN Alpha 因子优化研究',
    description:
      '基于 WorldQuant BRAIN 平台的量化因子挖掘与优化系统。通过多因子组合分析、夏普比率最大化算法和回测框架，筛选并优化高信噪比的 Alpha 信号。',
    longDescription:
      '基于 WorldQuant BRAIN 量化研究平台的 Alpha 因子挖掘与优化项目。目标是系统性地发现、评估和优化具有预测能力的量化因子（Alpha Signals）。\n\n' +
      '项目构建了一套完整的因子研究框架：从原始数据的特征工程出发，通过多因子组合分析探索因子间的交互效应；引入夏普比率最大化作为核心优化目标，在收益与风险之间寻找最优平衡；最终通过严格的回测验证因子的稳健性和衰减特性。\n\n' +
      '研究过程中特别关注因子的信噪比和过拟合风险，采用样本外验证、滚动回测等方法确保因子在真实市场环境中的可用性。',
    category: 'Quantitative Research',
    techStack: ['Python', 'Pandas', 'NumPy', '因子挖掘', '回测框架'],
    status: 'completed',
    highlights: [
      '系统性的 Alpha 因子挖掘方法论',
      '多因子组合分析与交互效应研究',
      '夏普比率最大化优化算法',
      '严格的样本外回测验证',
      '因子信噪比评估与过拟合防控',
    ],
    githubUrl: 'https://github.com/Keyou430/worldquant-alpha',
  },
];
