export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: '嵌入式开发' | '硬件工程' | 'AI Automation' | 'Full-Stack Development';
  techStack: string[];
  status: 'completed' | 'in-progress' | 'planned';
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  images?: string[];
}

export const projects: Project[] = [
  // ====== 硬件 / 嵌入式项目（优先展示） ======
  {
    id: 'led-flow-light',
    title: 'LED 流水灯控制系统',
    description:
      '基于 51 单片机的 LED 流水灯控制系统，使用 C 语言和 Keil MDK 完成编程、烧录与调试，实现多种点灯与流水模式。',
    longDescription:
      '一个基于 51 单片机的 LED 流水灯控制系统，是嵌入式开发的入门实践项目。通过 C 语言编写控制程序，使用 Keil MDK 进行编译和仿真，最终烧录到单片机中运行。\n\n' +
      '项目实现了多种 LED 显示模式，包括流水灯、呼吸灯、闪烁等效果，通过按键可在不同模式间切换。过程中掌握了单片机 GPIO 控制、定时器中断、按键消抖等基础知识，建立了对嵌入式开发流程的完整认知。\n\n' +
      '该项目为独立完成（复刻学习），通过动手实践加深了对硬件编程的理解。',
    category: '嵌入式开发',
    techStack: ['51 单片机', 'C 语言', 'Keil MDK', 'GPIO', '定时器中断'],
    status: 'completed',
    highlights: [
      '基于 51 单片机，C 语言编程实现',
      '多种 LED 显示模式（流水、呼吸、闪烁等）',
      '掌握 GPIO 控制、定时器中断、按键消抖',
      '独立完成从编程到烧录调试的完整流程',
    ],
  },
  {
    id: 'smart-desk-lamp',
    title: '智能台灯系统',
    description:
      '基于 STM32 的智能台灯系统，实现光敏自动控制 + 按键手动调光 + OLED 显示阈值调节。担任硬件电路负责人，完成原理图设计与元器件选型采购。',
    longDescription:
      '一个基于 STM32 的智能台灯系统，融合了传感器采集、嵌入式控制和人机交互。系统通过光敏传感器实时检测环境光照强度，当光线低于设定阈值时自动开启 LED 灯；用户也可通过按键手动调节亮度，OLED 显示屏实时显示当前光照值和阈值，支持按键调节阈值。\n\n' +
      '在项目中担任硬件电路负责人，主要工作包括：\n' +
      '• 根据系统功能需求，设计主控电路、电源管理电路、传感器接口电路及 LED 驱动电路\n' +
      '• 使用 EDA 软件绘制系统原理图（Schematic）\n' +
      '• 负责元器件清单（BOM）的整理，进行元件选型与购买，确保元件参数符合设计要求\n\n' +
      '项目锻炼了从需求分析到硬件落地的全流程能力，特别是在电路设计、元器件选型和团队协作方面积累了实践经验。',
    category: '嵌入式开发',
    techStack: ['STM32', 'C 语言', '光敏传感器', 'OLED', 'EDA 原理图设计', 'BOM 管理'],
    status: 'completed',
    highlights: [
      '基于 STM32 主控，光敏传感器自动检测环境光',
      'OLED 实时显示光照值与阈值，支持按键调节',
      '担任硬件电路负责人，完成原理图设计与 BOM 管理',
      '设计主控电路、电源管理、传感器接口及 LED 驱动电路',
      '从需求分析到硬件落地的全流程实践',
    ],
  },
  {
    id: 'digital-freq-meter',
    title: '数字频率计设计与实现',
    description:
      '课程设计项目，完成电路搭建、硬件焊接、仪器操作与故障排查，顺利通过验收。掌握硬件实操与调试技能。',
    longDescription:
      '数字频率计是电子技术课程设计的核心项目，目标是设计并制作一个能够测量信号频率的数字电路系统。\n\n' +
      '项目过程中完成了完整的硬件实操流程：电路搭建、元器件焊接、仪器操作（示波器、万用表）以及故障排查与调试。通过反复测试和调整，最终顺利通过课程验收。\n\n' +
      '该项目重点锻炼了硬件动手能力，包括焊接技术、电路故障定位与排除、测试仪器的熟练使用等，是硬件工程师必备的基础技能训练。',
    category: '硬件工程',
    techStack: ['数字电路', '硬件焊接', '示波器', '万用表', '故障排查'],
    status: 'completed',
    highlights: [
      '完成电路搭建与元器件焊接',
      '熟练使用示波器、万用表等测试仪器',
      '掌握硬件故障排查与调试方法',
      '顺利通过课程验收',
    ],
  },
  // ====== 软件项目 ======
  {
    id: 'keyou-web',
    title: 'Keyou Web',
    description:
      '个人作品集网站，基于 Next.js 14 + TypeScript + Tailwind CSS。以 GitHub Issues 作为后端数据源实现动态内容管理，GitHub Actions 自动构建部署，零服务器成本。',
    longDescription:
      '一个现代化的个人技术作品集网站，用于展示项目经验和技术能力。采用 Next.js 14 App Router 架构，结合 TypeScript 提供类型安全，Tailwind CSS 实现响应式暗色主题设计。\n\n' +
      '网站以 GitHub Issues 作为轻量级 CMS，通过 GitHub API 动态拉取内容，实现零后端服务器的动态内容管理。配合 GitHub Actions 实现 CI/CD，每次推送自动构建并部署到 GitHub Pages，全程零成本运维。\n\n' +
      '前端采用毛玻璃（Glassmorphism）设计语言，配合 Framer Motion 实现流畅的滚动入场动画，打造沉浸式的浏览体验。\n\n' +
      '该项目通过 Vibe Coding 方式完成，探索了 AI 辅助开发在实际工程中的应用。',
    category: 'Full-Stack Development',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GitHub API', 'Framer Motion', 'Vibe Coding'],
    status: 'completed',
    highlights: [
      '基于 Next.js 14 App Router，支持静态导出与服务端渲染',
      'GitHub Issues 作为 CMS，零后端成本实现动态内容管理',
      'GitHub Actions 自动化 CI/CD，推送即部署',
      '毛玻璃暗色主题 + Framer Motion 滚动动画',
      '通过 Vibe Coding 方式完成，探索 AI 辅助开发',
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
    category: 'Full-Stack Development',
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
