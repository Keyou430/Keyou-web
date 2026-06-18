# 快速部署工作流 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现一键式项目部署工作流——用户只需在配置文件中添加项目路径，运行一条命令即可自动生成详情页并部署上线。

**Architecture:** 通过 `projects-config.json` 作为项目总清单，配合 `scripts/sync-projects.js` 脚本自动扫描项目目录、提取信息、生成详情页 HTML、更新主站数据，最后 git push 触发 Vercel 自动部署。

**Tech Stack:** Node.js (脚本), Next.js 14 (主站), TypeScript, Vercel (部署)

---

## File Structure

| 文件 | 操作 | 用途 |
|------|------|------|
| `projects-config.json` | 创建 | 项目总清单，所有项目的统一配置 |
| `scripts/sync-projects.js` | 创建 | 自动化同步脚本，扫描项目并生成详情页 |
| `scripts/templates/project-detail.html` | 创建 | 项目详情页 HTML 模板 |
| `src/data/projects.ts` | 已有 | 主站项目数据（脚本自动维护） |
| `package.json` | 修改 | 添加 npm scripts |

---

### Task 1: 创建 `projects-config.json` 项目总清单

**Files:**
- Create: `projects-config.json`

将现有 `src/data/projects.ts` 中的所有项目信息整理到配置文件中。

- [ ] **Step 1: 创建配置文件**

```json
{
  "projects": [
    {
      "id": "led-flow-light",
      "name": "LED 流水灯控制系统",
      "description": "基于 51 单片机的 LED 流水灯控制系统，使用 C 语言和 Keil MDK 完成编程、烧录与调试，实现多种点灯与流水模式。",
      "longDescription": "一个基于 51 单片机的 LED 流水灯控制系统，是嵌入式开发的入门实践项目。通过 C 语言编写控制程序，使用 Keil MDK 进行编译和仿真，最终烧录到单片机中运行。\n\n项目实现了多种 LED 显示模式，包括流水灯、呼吸灯、闪烁等效果，通过按键可在不同模式间切换。过程中掌握了单片机 GPIO 控制、定时器中断、按键消抖等基础知识，建立了对嵌入式开发流程的完整认知。\n\n该项目为独立完成（复刻学习），通过动手实践加深了对硬件编程的理解。",
      "category": "嵌入式开发",
      "techStack": ["51 单片机", "C 语言", "Keil MDK", "GPIO", "定时器中断"],
      "status": "deployed",
      "projectStatus": "completed",
      "highlights": [
        "基于 51 单片机，C 语言编程实现",
        "多种 LED 显示模式（流水、呼吸、闪烁等）",
        "掌握 GPIO 控制、定时器中断、按键消抖",
        "独立完成从编程到烧录调试的完整流程"
      ],
      "githubUrl": null,
      "demoUrl": null,
      "sourcePath": null
    },
    {
      "id": "smart-desk-lamp",
      "name": "智能台灯系统",
      "description": "基于 STM32 的智能台灯系统，实现光敏自动控制 + 按键手动调光 + OLED 显示阈值调节。担任硬件电路负责人，完成原理图设计与元器件选型采购。",
      "longDescription": "一个基于 STM32 的智能台灯系统，融合了传感器采集、嵌入式控制和人机交互。系统通过光敏传感器实时检测环境光照强度，当光线低于设定阈值时自动开启 LED 灯；用户也可通过按键手动调节亮度，OLED 显示屏实时显示当前光照值和阈值，支持按键调节阈值。\n\n在项目中担任硬件电路负责人，主要工作包括：\n• 根据系统功能需求，设计主控电路、电源管理电路、传感器接口电路及 LED 驱动电路\n• 使用 EDA 软件绘制系统原理图（Schematic）\n• 负责元器件清单（BOM）的整理，进行元件选型与购买，确保元件参数符合设计要求\n\n项目锻炼了从需求分析到硬件落地的全流程能力，特别是在电路设计、元器件选型和团队协作方面积累了实践经验。",
      "category": "嵌入式开发",
      "techStack": ["STM32", "C 语言", "光敏传感器", "OLED", "EDA 原理图设计", "BOM 管理"],
      "status": "deployed",
      "projectStatus": "completed",
      "highlights": [
        "基于 STM32 主控，光敏传感器自动检测环境光",
        "OLED 实时显示光照值与阈值，支持按键调节",
        "担任硬件电路负责人，完成原理图设计与 BOM 管理",
        "设计主控电路、电源管理、传感器接口及 LED 驱动电路",
        "从需求分析到硬件落地的全流程实践"
      ],
      "githubUrl": null,
      "demoUrl": null,
      "sourcePath": null
    },
    {
      "id": "digital-freq-meter",
      "name": "数字频率计设计与实现",
      "description": "课程设计项目，完成电路搭建、硬件焊接、仪器操作与故障排查，顺利通过验收。掌握硬件实操与调试技能。",
      "longDescription": "数字频率计是电子技术课程设计的核心项目，目标是设计并制作一个能够测量信号频率的数字电路系统。\n\n项目过程中完成了完整的硬件实操流程：电路搭建、元器件焊接、仪器操作（示波器、万用表）以及故障排查与调试。通过反复测试和调整，最终顺利通过课程验收。\n\n该项目重点锻炼了硬件动手能力，包括焊接技术、电路故障定位与排除、测试仪器的熟练使用等，是硬件工程师必备的基础技能训练。",
      "category": "硬件工程",
      "techStack": ["数字电路", "硬件焊接", "示波器", "万用表", "故障排查"],
      "status": "deployed",
      "projectStatus": "completed",
      "highlights": [
        "完成电路搭建与元器件焊接",
        "熟练使用示波器、万用表等测试仪器",
        "掌握硬件故障排查与调试方法",
        "顺利通过课程验收"
      ],
      "githubUrl": null,
      "demoUrl": null,
      "sourcePath": null
    },
    {
      "id": "personal-knowledge-base",
      "name": "个人知识库系统",
      "description": "基于 RAG（检索增强生成）的本地知识库系统。支持多格式文档导入（PDF/Markdown/TXT），通过向量检索与大语言模型实现智能问答，所有数据本地存储，保护隐私。",
      "longDescription": "一个基于 RAG（Retrieval-Augmented Generation）架构的本地个人知识库系统，目标是让用户能够对自己的文档集合进行自然语言提问，获得基于文档内容的精准回答。\n\n系统核心流程：文档加载 → 文本分块 → 向量嵌入 → 向量存储 → 语义检索 → LLM 生成回答。支持 PDF、Markdown、TXT 等多种文档格式的导入与解析。\n\n技术实现上，采用 Python 构建后端服务，使用 LangChain 框架编排 RAG 流程，FAISS 进行高效向量检索，支持对接 OpenAI、本地模型等多种 LLM 后端。前端提供简洁的交互界面，用户可上传文档、管理知识库、进行对话式问答。\n\n项目采用模块化设计，文档加载器、分块策略、嵌入模型、检索器、生成器各组件可独立替换和扩展，便于根据需求灵活配置。",
      "category": "AI Automation",
      "techStack": ["Python", "LangChain", "FAISS", "RAG", "OpenAI API", "向量检索"],
      "status": "deployed",
      "projectStatus": "in-progress",
      "highlights": [
        "RAG 架构，基于文档内容的精准问答",
        "支持 PDF / Markdown / TXT 多格式文档导入",
        "FAISS 向量检索，毫秒级语义匹配",
        "模块化设计，各组件可独立替换扩展",
        "本地数据存储，隐私安全可控"
      ],
      "githubUrl": "https://github.com/Keyou430/Personal-knowledge-base-system",
      "demoUrl": null,
      "sourcePath": null
    },
    {
      "id": "feishu-maintenance-system",
      "name": "飞书设备维修管理系统",
      "description": "基于飞书开放平台的设备维修工单管理系统。员工通过 Web 页面或飞书审批流提交报修，系统自动创建工单并发送群消息卡片通知，维修人员通过卡片按钮一键接单、标记完成，全流程在飞书内闭环。",
      "longDescription": "一个面向企业内部的设备维修工单管理系统，深度集成飞书开放平台，实现从报修到维修完成的全流程自动化。\n\n核心功能包括：Web 表单报修与飞书审批流双入口、自动生成工单编号（WX-YYYYMMDD-001）、飞书消息卡片实时通知（支持按优先级显示不同颜色）、维修人员一键接单与标记完成、多维表格数据存储、30 秒轮询自动发现新工单。\n\n技术实现上，使用 Express 构建 RESTful API，通过飞书官方 Node SDK 操作多维表格和发送消息卡片，利用飞书 Webhook 实现审批流回调和卡片按钮交互回调，采用防重复提交机制和先响应后处理策略优化用户体验。\n\n项目采用 Vibe Coding 方式开发，从需求分析到部署上线全程借助 AI 辅助完成。",
      "category": "Full-Stack Development",
      "techStack": ["Node.js", "Express", "飞书 SDK", "多维表格 API", "Webhook", "Vibe Coding"],
      "status": "deployed",
      "projectStatus": "completed",
      "highlights": [
        "Web 报修 + 飞书审批流双入口，全流程飞书内闭环",
        "飞书消息卡片通知，按优先级（紧急/高/中/低）显示不同颜色",
        "维修人员通过卡片按钮一键接单、标记完成",
        "自动轮询多维表格发现新工单，防重复通知机制",
        "Webhook 审批回调 + 卡片交互回调，先响应后处理优化体验"
      ],
      "githubUrl": "https://github.com/Keyou430/feishu-maintenance-system",
      "demoUrl": null,
      "sourcePath": null
    },
    {
      "id": "keyou-web",
      "name": "Keyou Web",
      "description": "个人作品集网站，基于 Next.js 14 + TypeScript + Tailwind CSS。以 GitHub Issues 作为后端数据源实现动态内容管理，GitHub Actions 自动构建部署，零服务器成本。",
      "longDescription": "一个现代化的个人技术作品集网站，用于展示项目经验和技术能力。采用 Next.js 14 App Router 架构，结合 TypeScript 提供类型安全，Tailwind CSS 实现响应式暗色主题设计。\n\n网站以 GitHub Issues 作为轻量级 CMS，通过 GitHub API 动态拉取内容，实现零后端服务器的动态内容管理。配合 GitHub Actions 实现 CI/CD，每次推送自动构建并部署到 GitHub Pages，全程零成本运维。\n\n前端采用毛玻璃（Glassmorphism）设计语言，配合 Framer Motion 实现流畅的滚动入场动画，打造沉浸式的浏览体验。\n\n该项目通过 Vibe Coding 方式完成，探索了 AI 辅助开发在实际工程中的应用。",
      "category": "Full-Stack Development",
      "techStack": ["Next.js", "TypeScript", "Tailwind CSS", "GitHub API", "Framer Motion", "Vibe Coding"],
      "status": "deployed",
      "projectStatus": "completed",
      "highlights": [
        "基于 Next.js 14 App Router，支持静态导出与服务端渲染",
        "GitHub Issues 作为 CMS，零后端成本实现动态内容管理",
        "GitHub Actions 自动化 CI/CD，推送即部署",
        "毛玻璃暗色主题 + Framer Motion 滚动动画",
        "通过 Vibe Coding 方式完成，探索 AI 辅助开发"
      ],
      "githubUrl": "https://github.com/Keyou430/Keyou-web",
      "demoUrl": "https://web.keyou.ccwu.cc",
      "sourcePath": null
    },
    {
      "id": "ai-social-aggregator",
      "name": "AI 社交媒体聚合与播客生成器",
      "description": "自动抓取多平台社交媒体内容，通过 LLM 进行语义聚合与摘要，将热点话题转化为可播报的播客脚本并自动合成音频。实现从数据采集到内容分发的全链路自动化。",
      "longDescription": "一个端到端的 AI 自动化内容生产系统，解决社交媒体信息过载问题。系统通过 Telethon 等工具自动抓取多个社交平台的内容，利用大语言模型进行语义分析、主题聚合和内容摘要。\n\n核心创新在于将聚合后的内容自动转化为播客脚本：LLM 根据热点话题的关联性和重要性进行排序，生成自然流畅的播报文案，再通过 TTS 引擎合成为音频文件，实现从原始社交数据到可分发音频内容的全自动流水线。\n\n整个系统采用模块化设计，数据采集、内容分析、脚本生成、音频合成各环节可独立扩展和替换。",
      "category": "AI Automation",
      "techStack": ["Python", "Telethon", "LLM API", "TTS", "自动化脚本"],
      "status": "deployed",
      "projectStatus": "completed",
      "highlights": [
        "多平台社交媒体内容自动抓取与解析",
        "LLM 驱动的语义聚合与热点话题提取",
        "自动将聚合内容转化为播客脚本",
        "TTS 引擎自动合成音频",
        "全链路自动化，从数据采集到内容分发"
      ],
      "githubUrl": "https://github.com/Keyou430/ai-social-aggregator",
      "demoUrl": null,
      "sourcePath": null
    },
    {
      "id": "worldquant-alpha-optimization",
      "name": "WorldQuant BRAIN Alpha 因子优化研究",
      "description": "基于 WorldQuant BRAIN 平台的量化因子挖掘与优化系统。通过多因子组合分析、夏普比率最大化算法和回测框架，筛选并优化高信噪比的 Alpha 信号。",
      "longDescription": "基于 WorldQuant BRAIN 量化研究平台的 Alpha 因子挖掘与优化项目。目标是系统性地发现、评估和优化具有预测能力的量化因子（Alpha Signals）。\n\n项目构建了一套完整的因子研究框架：从原始数据的特征工程出发，通过多因子组合分析探索因子间的交互效应；引入夏普比率最大化作为核心优化目标，在收益与风险之间寻找最优平衡；最终通过严格的回测验证因子的稳健性和衰减特性。\n\n研究过程中特别关注因子的信噪比和过拟合风险，采用样本外验证、滚动回测等方法确保因子在真实市场环境中的可用性。",
      "category": "Full-Stack Development",
      "techStack": ["Python", "Pandas", "NumPy", "因子挖掘", "回测框架"],
      "status": "deployed",
      "projectStatus": "completed",
      "highlights": [
        "系统性的 Alpha 因子挖掘方法论",
        "多因子组合分析与交互效应研究",
        "夏普比率最大化优化算法",
        "严格的样本外回测验证",
        "因子信噪比评估与过拟合防控"
      ],
      "githubUrl": "https://github.com/Keyou430/worldquant-alpha",
      "demoUrl": null,
      "sourcePath": null
    }
  ]
}
```

- [ ] **Step 2: 验证配置文件格式**

```bash
node -e "const c = require('./projects-config.json'); console.log('项目数量:', c.projects.length); c.projects.forEach(p => console.log('-', p.name, '(' + p.status + ')'))"
```

Expected: 输出 8 个项目，全部为 `deployed` 状态。

- [ ] **Step 3: 提交**

```bash
git add projects-config.json
git commit -m "feat: add projects-config.json with all existing projects"
```

---

### Task 2: 创建项目详情页 HTML 模板

**Files:**
- Create: `scripts/templates/project-detail.html`

创建一个与现有项目详情页风格一致的 HTML 模板，用于独立项目的详情页展示。

- [ ] **Step 1: 创建模板目录**

```bash
mkdir -p scripts/templates
```

- [ ] **Step 2: 创建 HTML 模板**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} — Keyou Web</title>
  <meta name="description" content="{{DESCRIPTION}}">
  <style>
    :root {
      --bg: #0a0a0b;
      --surface: #141416;
      --border: rgba(255, 255, 255, 0.06);
      --text: #e8e8ed;
      --text-muted: #8a8a95;
      --text-dim: #5a5a65;
      --accent: #6366f1;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      background: var(--bg);
      color: var(--text);
      line-height: 1.7;
      min-height: 100vh;
    }
    .container { max-width: 768px; margin: 0 auto; padding: 4rem 1.5rem; }
    .back-link {
      display: inline-flex; align-items: center; gap: 0.375rem;
      font-size: 13px; color: var(--text-muted); text-decoration: none;
      margin-bottom: 2.5rem; transition: color 0.2s;
    }
    .back-link:hover { color: var(--accent); }
    .category { font-size: 10px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.1em; }
    h1 { font-size: 2rem; font-weight: 700; margin: 1rem 0; }
    .description { color: var(--text-muted); font-size: 15px; }
    .divider { border: none; border-top: 1px solid var(--border); margin: 2.5rem 0; }
    h2 { font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem; }
    .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tag {
      font-size: 12px; padding: 0.25rem 0.75rem;
      border: 1px solid var(--border); border-radius: 4px;
      color: var(--text-muted); background: rgba(255,255,255,0.02);
    }
    .highlights { list-style: none; }
    .highlights li {
      display: flex; align-items: flex-start; gap: 0.75rem;
      font-size: 14px; color: var(--text-muted); margin-bottom: 0.75rem;
    }
    .highlights li::before {
      content: ''; display: block; width: 6px; height: 6px;
      border-radius: 50%; background: var(--accent); margin-top: 0.5rem; flex-shrink: 0;
    }
    .long-desc { font-size: 14px; color: var(--text-muted); }
    .long-desc p { margin-bottom: 1rem; }
    .btn {
      display: inline-block; padding: 0.5rem 1.25rem; font-size: 13px;
      font-family: inherit; border-radius: 6px; text-decoration: none;
      transition: all 0.2s; margin-right: 0.75rem;
    }
    .btn-primary { background: var(--accent); color: #fff; }
    .btn-primary:hover { opacity: 0.9; }
    .btn-ghost { border: 1px solid var(--border); color: var(--text-muted); }
    .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
    .actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap; }
  </style>
</head>
<body>
  <div class="container">
    <a href="https://web.keyou.ccwu.cc/#projects" class="back-link">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
      </svg>
      返回首页
    </a>

    <header>
      <span class="category">{{CATEGORY}}</span>
      <h1>{{TITLE}}</h1>
      <p class="description">{{DESCRIPTION}}</p>
      <div class="actions">
        {{GITHUB_BUTTON}}
        {{DEMO_BUTTON}}
      </div>
    </header>

    <hr class="divider">

    <section>
      <h2>技术栈</h2>
      <div class="tags">{{TECH_STACK_TAGS}}</div>
    </section>

    <hr class="divider">

    <section>
      <h2>项目亮点</h2>
      <ul class="highlights">{{HIGHLIGHTS_LIST}}</ul>
    </section>

    <hr class="divider">

    <section>
      <h2>详细介绍</h2>
      <div class="long-desc">{{LONG_DESCRIPTION}}</div>
    </section>

    <hr class="divider">

    <a href="https://web.keyou.ccwu.cc/#projects" class="back-link" style="margin-top:2rem;">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
      </svg>
      返回所有项目
    </a>
  </div>
</body>
</html>
```

- [ ] **Step 3: 提交**

```bash
git add scripts/templates/project-detail.html
git commit -m "feat: add project detail HTML template"
```

---

### Task 3: 创建同步脚本核心逻辑

**Files:**
- Create: `scripts/sync-projects.js`

创建自动化同步脚本，实现从 `projects-config.json` 到 `src/data/projects.ts` 的自动同步。

- [ ] **Step 1: 创建脚本文件**

```javascript
#!/usr/bin/env node

/**
 * sync-projects.js
 *
 * 读取 projects-config.json，对于 status 为 "pending" 且有 sourcePath 的项目：
 *   1. 扫描项目目录，自动提取信息
 *   2. 生成详情页 HTML
 *   3. 更新 projects-config.json 状态为 "deployed"
 *   4. 更新 src/data/projects.ts
 *
 * 用法：node scripts/sync-projects.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'projects-config.json');
const PROJECTS_TS_PATH = path.join(ROOT, 'src', 'data', 'projects.ts');
const TEMPLATE_PATH = path.join(ROOT, 'scripts', 'templates', 'project-detail.html');
const PUBLIC_DIR = path.join(ROOT, 'public');

// ========== 工具函数 ==========

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf-8');
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// ========== 项目信息提取 ==========

/**
 * 扫描项目目录，自动提取项目信息
 */
function extractProjectInfo(sourcePath) {
  const info = {
    name: path.basename(sourcePath),
    description: '',
    techStack: [],
    category: 'Full-Stack Development',
    projectStatus: 'completed',
    highlights: [],
  };

  // 1. 尝试读取 package.json
  const pkgPath = path.join(sourcePath, 'package.json');
  if (fileExists(pkgPath)) {
    try {
      const pkg = JSON.parse(readFile(pkgPath));
      if (pkg.name) info.name = pkg.name;
      if (pkg.description) info.description = pkg.description;

      // 从 dependencies 推断技术栈
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const techMap = {
        'react': 'React', 'vue': 'Vue', 'next': 'Next.js', 'nuxt': 'Nuxt.js',
        'express': 'Express', 'fastify': 'Fastify', 'koa': 'Koa',
        'typescript': 'TypeScript', 'tailwindcss': 'Tailwind CSS',
        'framer-motion': 'Framer Motion', 'electron': 'Electron',
        'socket.io': 'Socket.IO', 'mongoose': 'MongoDB', 'prisma': 'Prisma',
      };
      for (const [dep, tech] of Object.entries(techMap)) {
        if (deps[dep]) info.techStack.push(tech);
      }
    } catch (e) {
      console.warn(`  ⚠ 无法解析 package.json: ${e.message}`);
    }
  }

  // 2. 尝试读取 README.md
  const readmePath = path.join(sourcePath, 'README.md');
  if (fileExists(readmePath)) {
    try {
      const readme = readFile(readmePath);
      // 提取第一段作为描述（跳过标题行）
      const lines = readme.split('\n').filter(l => l.trim() && !l.startsWith('#'));
      if (lines.length > 0 && !info.description) {
        info.description = lines[0].slice(0, 200);
      }
    } catch (e) {
      console.warn(`  ⚠ 无法读取 README.md: ${e.message}`);
    }
  }

  // 3. 扫描文件类型推断技术栈和分类
  const files = listFilesRecursive(sourcePath);
  const extensions = new Set(files.map(f => path.extname(f).toLowerCase()));

  if (extensions.has('.ino')) {
    info.category = '嵌入式开发';
    if (!info.techStack.includes('Arduino')) info.techStack.push('Arduino');
  }
  if (extensions.has('.c') || extensions.has('.h')) {
    if (!info.techStack.includes('C')) info.techStack.push('C');
  }
  if (extensions.has('.py')) {
    if (!info.techStack.includes('Python')) info.techStack.push('Python');
    if (info.category === 'Full-Stack Development') info.category = 'AI Automation';
  }
  if (extensions.has('.ts') || extensions.has('.tsx')) {
    if (!info.techStack.includes('TypeScript')) info.techStack.push('TypeScript');
  }

  // 4. 生成默认描述
  if (!info.description) {
    info.description = `${info.name} 项目`;
  }

  // 5. 生成默认亮点
  if (info.highlights.length === 0) {
    info.highlights = info.techStack.slice(0, 3).map(t => `基于 ${t} 技术栈`);
  }

  return info;
}

/**
 * 递归列出目录下的文件（限制深度，忽略 node_modules 等）
 */
function listFilesRecursive(dir, maxDepth = 3, currentDepth = 0) {
  const results = [];
  if (currentDepth >= maxDepth) return results;

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (['node_modules', '.git', '.next', 'dist', 'build', '__pycache__'].includes(entry.name)) continue;

      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...listFilesRecursive(fullPath, maxDepth, currentDepth + 1));
      } else {
        results.push(fullPath);
      }
    }
  } catch (e) {
    // 忽略无权限的目录
  }

  return results;
}

// ========== HTML 生成 ==========

function generateDetailPage(project, template) {
  let html = template;

  html = html.replace(/\{\{TITLE\}\}/g, project.name);
  html = html.replace(/\{\{DESCRIPTION\}\}/g, project.description);
  html = html.replace(/\{\{CATEGORY\}\}/g, project.category || '');

  // 技术栈标签
  const techTags = (project.techStack || [])
    .map(t => `<span class="tag">${t}</span>`)
    .join('\n        ');
  html = html.replace(/\{\{TECH_STACK_TAGS\}\}/g, techTags);

  // 亮点列表
  const highlightsList = (project.highlights || [])
    .map(h => `<li>${h}</li>`)
    .join('\n        ');
  html = html.replace(/\{\{HIGHLIGHTS_LIST\}\}/g, highlightsList);

  // 长描述
  const longDesc = (project.longDescription || project.description || '')
    .split('\n\n')
    .map(p => `<p>${p}</p>`)
    .join('\n        ');
  html = html.replace(/\{\{LONG_DESCRIPTION\}\}/g, longDesc);

  // GitHub 按钮
  const githubBtn = project.githubUrl
    ? `<a href="${project.githubUrl}" class="btn btn-primary" target="_blank">查看源码</a>`
    : '';
  html = html.replace(/\{\{GITHUB_BUTTON\}\}/g, githubBtn);

  // Demo 按钮
  const demoBtn = project.demoUrl
    ? `<a href="${project.demoUrl}" class="btn btn-ghost" target="_blank">在线演示</a>`
    : '';
  html = html.replace(/\{\{DEMO_BUTTON\}\}/g, demoBtn);

  return html;
}

// ========== projects.ts 生成 ==========

function generateProjectsTs(projects) {
  const deployed = projects.filter(p => p.status === 'deployed');

  const projectEntries = deployed.map(p => {
    const escapeStr = (s) => (s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');

    return `  {
    id: '${p.id}',
    title: '${escapeStr(p.name)}',
    description: '${escapeStr(p.description)}',
    longDescription: '${escapeStr(p.longDescription || p.description)}',
    category: '${p.category || 'Full-Stack Development'}',
    techStack: [${(p.techStack || []).map(t => `'${escapeStr(t)}'`).join(', ')}],
    status: '${p.projectStatus || 'completed'}',
    highlights: [${(p.highlights || []).map(h => `'${escapeStr(h)}'`).join(', ')}],${p.githubUrl ? `\n    githubUrl: '${p.githubUrl}',` : ''}${p.demoUrl ? `\n    demoUrl: '${p.demoUrl}',` : ''}
  }`;
  });

  return `export interface Project {
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
${projectEntries.join(',\n')}
];
`;
}

// ========== 主流程 ==========

function main() {
  console.log('🔄 读取 projects-config.json ...');
  const config = readJSON(CONFIG_PATH);
  const template = readFile(TEMPLATE_PATH);

  let updated = false;

  for (const project of config.projects) {
    if (project.status === 'pending' && project.sourcePath) {
      console.log(`\n📦 处理新项目: ${project.name || path.basename(project.sourcePath)}`);
      console.log(`   源码路径: ${project.sourcePath}`);

      // 1. 检查源码路径是否存在
      if (!fileExists(project.sourcePath)) {
        console.error(`   ❌ 路径不存在: ${project.sourcePath}`);
        continue;
      }

      // 2. 自动提取信息
      console.log('   🔍 扫描项目信息 ...');
      const info = extractProjectInfo(project.sourcePath);

      // 更新项目信息（保留手动填写的字段）
      project.name = project.name || info.name;
      project.description = project.description || info.description;
      project.longDescription = project.longDescription || info.description;
      project.category = project.category || info.category;
      project.techStack = project.techStack.length > 0 ? project.techStack : info.techStack;
      project.projectStatus = project.projectStatus || info.projectStatus;
      project.highlights = project.highlights.length > 0 ? project.highlights : info.highlights;

      // 3. 生成详情页
      if (!project.id) {
        project.id = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      }

      const detailPageDir = path.join(PUBLIC_DIR, 'project-pages');
      if (!fs.existsSync(detailPageDir)) {
        fs.mkdirSync(detailPageDir, { recursive: true });
      }

      const detailPagePath = path.join(detailPageDir, `${project.id}.html`);
      console.log(`   📄 生成详情页: ${detailPagePath}`);
      const html = generateDetailPage(project, template);
      writeFile(detailPagePath, html);
      project.detailPage = `/project-pages/${project.id}.html`;

      // 4. 更新状态
      project.status = 'deployed';
      updated = true;

      console.log(`   ✅ 项目 "${project.name}" 处理完成`);
      console.log(`      技术栈: ${project.techStack.join(', ')}`);
      console.log(`      分类: ${project.category}`);
    }
  }

  // 5. 写回配置文件
  if (updated) {
    console.log('\n💾 更新 projects-config.json ...');
    writeJSON(CONFIG_PATH, config);
  }

  // 6. 生成 projects.ts
  console.log('📝 生成 src/data/projects.ts ...');
  const tsContent = generateProjectsTs(config.projects);
  writeFile(PROJECTS_TS_PATH, tsContent);

  // 7. 统计
  const total = config.projects.length;
  const deployed = config.projects.filter(p => p.status === 'deployed').length;
  const pending = total - deployed;

  console.log('\n📊 统计:');
  console.log(`   总项目数: ${total}`);
  console.log(`   已部署: ${deployed}`);
  console.log(`   待部署: ${pending}`);
  console.log('\n✅ 同步完成！');
}

main();
```

- [ ] **Step 4: 测试脚本运行（无新项目时应直接同步已有数据）**

```bash
node scripts/sync-projects.js
```

Expected: 输出读取配置、生成 projects.ts、统计信息，所有项目为 deployed 状态。

- [ ] **Step 5: 验证生成的 projects.ts 与原文件一致**

```bash
git diff src/data/projects.ts
```

Expected: 差异应仅为格式差异，内容一致。

- [ ] **Step 6: 提交**

```bash
git add scripts/sync-projects.js
git commit -m "feat: add sync-projects script for automated deployment workflow"
```

---

### Task 4: 添加 npm scripts 到 package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 添加脚本命令**

在 `package.json` 的 `scripts` 中添加：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "sync:projects": "node scripts/sync-projects.js",
    "deploy": "node scripts/sync-projects.js && git add -A && git commit -m \"feat: sync projects and deploy\" && git push"
  }
}
```

- [ ] **Step 2: 测试 sync:projects 命令**

```bash
npm run sync:projects
```

Expected: 与直接运行 `node scripts/sync-projects.js` 输出一致。

- [ ] **Step 3: 提交**

```bash
git add package.json
git commit -m "feat: add sync:projects and deploy npm scripts"
```

---

### Task 5: 端到端测试 — 模拟添加新项目

**Files:**
- Modify: `projects-config.json`

验证完整的「添加路径 → 同步 → 生成」流程。

- [ ] **Step 1: 在 projects-config.json 中添加一个测试项目**

在 `projects` 数组末尾添加：

```json
{
  "id": "test-project",
  "name": "测试项目",
  "description": null,
  "longDescription": null,
  "category": null,
  "techStack": [],
  "status": "pending",
  "projectStatus": null,
  "highlights": [],
  "githubUrl": null,
  "demoUrl": null,
  "sourcePath": "E:/code/web"
}
```

- [ ] **Step 2: 运行同步脚本**

```bash
node scripts/sync-projects.js
```

Expected: 输出处理测试项目，自动提取信息（Next.js, TypeScript, Tailwind CSS 等），生成详情页。

- [ ] **Step 3: 验证生成的详情页存在**

```bash
ls public/project-pages/test-project.html
```

Expected: 文件存在。

- [ ] **Step 4: 验证 projects-config.json 已更新为 deployed**

```bash
node -e "const c = require('./projects-config.json'); const tp = c.projects.find(p => p.id === 'test-project'); console.log('status:', tp.status, 'techStack:', tp.techStack)"
```

Expected: status 为 deployed，techStack 包含自动提取的技术栈。

- [ ] **Step 5: 验证 projects.ts 已更新**

```bash
grep "测试项目" src/data/projects.ts
```

Expected: 包含测试项目的记录。

- [ ] **Step 6: 清理测试数据**

从 `projects-config.json` 中删除测试项目条目。

从 `src/data/projects.ts` 中确认测试项目记录存在（或手动删除）。

删除生成的测试详情页：

```bash
rm public/project-pages/test-project.html
```

- [ ] **Step 7: 重新同步恢复原始状态**

```bash
node scripts/sync-projects.js
```

- [ ] **Step 8: 提交最终状态**

```bash
git add -A
git commit -m "feat: complete deployment workflow with sync script and template"
```

---

### Task 6: 更新 README 文档

**Files:**
- Modify: `README.md`

在 README 中添加快速部署工作流的使用说明。

- [ ] **Step 1: 添加「快速部署」章节**

在 README.md 的适当位置添加：

```markdown
## 🚀 快速部署新项目

### 添加已有项目到清单

在 `projects-config.json` 的 `projects` 数组中添加一条记录：

```json
{
  "id": "your-project-id",
  "name": "项目名称",
  "description": "项目描述",
  "status": "deployed",
  "techStack": ["技术1", "技术2"],
  "category": "Full-Stack Development",
  "projectStatus": "completed",
  "highlights": ["亮点1", "亮点2"],
  "githubUrl": "https://github.com/...",
  "demoUrl": null,
  "sourcePath": null
}
```

### 自动部署新项目

1. 在 `projects-config.json` 中添加新项目，只需填写 `sourcePath`：

```json
{
  "id": "my-new-project",
  "name": "我的新项目",
  "status": "pending",
  "sourcePath": "E:/code/my-new-project",
  "techStack": [],
  "highlights": []
}
```

2. 运行同步命令：

```bash
npm run sync:projects
```

脚本会自动：
- 扫描项目目录，提取技术栈和描述
- 生成详情页 HTML
- 更新主站项目数据
- 更新配置文件状态

3. 一键部署：

```bash
npm run deploy
```

自动同步 + commit + push，Vercel 会自动部署上线。
```

- [ ] **Step 2: 提交**

```bash
git add README.md
git commit -m "docs: add quick deployment workflow guide to README"
```
