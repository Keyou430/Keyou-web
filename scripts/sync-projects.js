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
 * 递归列出目录下的文件（限制深度，忽略 node_modules 等）
 */
function listFilesRecursive(dir, maxDepth = 3, currentDepth = 0) {
  const results = [];
  if (currentDepth >= maxDepth) return results;

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (['node_modules', '.git', '.next', 'dist', 'build', '__pycache__', '.venv', 'venv'].includes(entry.name)) continue;

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
        'three': 'Three.js', 'd3': 'D3.js', 'chart.js': 'Chart.js',
        'axios': 'Axios', 'zustand': 'Zustand', 'redux': 'Redux',
        'vite': 'Vite', 'webpack': 'Webpack', 'esbuild': 'esbuild',
        'jest': 'Jest', 'vitest': 'Vitest', 'cypress': 'Cypress',
        'docker': 'Docker', 'graphql': 'GraphQL', 'apollo': 'Apollo',
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
      // 提取第一段作为描述（跳过标题行和空行）
      const lines = readme.split('\n').filter(l => l.trim() && !l.startsWith('#'));
      if (lines.length > 0 && !info.description) {
        info.description = lines[0].slice(0, 200);
      }
    } catch (e) {
      console.warn(`  ⚠ 无法读取 README.md: ${e.message}`);
    }
  }

  // 3. 尝试读取 requirements.txt (Python 项目)
  const reqPath = path.join(sourcePath, 'requirements.txt');
  if (fileExists(reqPath)) {
    try {
      const reqs = readFile(reqPath).toLowerCase();
      const pyTechMap = {
        'flask': 'Flask', 'django': 'Django', 'fastapi': 'FastAPI',
        'langchain': 'LangChain', 'openai': 'OpenAI API',
        'torch': 'PyTorch', 'tensorflow': 'TensorFlow',
        'pandas': 'Pandas', 'numpy': 'NumPy', 'scipy': 'SciPy',
        'requests': 'Requests', 'beautifulsoup4': 'BeautifulSoup',
        'selenium': 'Selenium', 'celery': 'Celery', 'redis': 'Redis',
        'sqlalchemy': 'SQLAlchemy', 'pydantic': 'Pydantic',
      };
      for (const [dep, tech] of Object.entries(pyTechMap)) {
        if (reqs.includes(dep) && !info.techStack.includes(tech)) {
          info.techStack.push(tech);
        }
      }
    } catch (e) {
      // 忽略
    }
  }

  // 4. 扫描文件类型推断技术栈和分类
  const files = listFilesRecursive(sourcePath);
  const extensions = new Set(files.map(f => path.extname(f).toLowerCase()));

  if (extensions.has('.ino')) {
    info.category = '嵌入式开发';
    if (!info.techStack.includes('Arduino')) info.techStack.push('Arduino');
  }
  if (extensions.has('.c') || extensions.has('.h')) {
    if (!info.techStack.includes('C')) info.techStack.push('C');
    if (extensions.has('.ino')) info.category = '嵌入式开发';
  }
  if (extensions.has('.py')) {
    if (!info.techStack.includes('Python')) info.techStack.push('Python');
    if (info.category === 'Full-Stack Development') info.category = 'AI Automation';
  }
  if (extensions.has('.ts') || extensions.has('.tsx')) {
    if (!info.techStack.includes('TypeScript')) info.techStack.push('TypeScript');
  }
  if (extensions.has('.rs')) {
    if (!info.techStack.includes('Rust')) info.techStack.push('Rust');
  }
  if (extensions.has('.go')) {
    if (!info.techStack.includes('Go')) info.techStack.push('Go');
  }
  if (extensions.has('.java')) {
    if (!info.techStack.includes('Java')) info.techStack.push('Java');
  }
  if (extensions.has('.swift')) {
    if (!info.techStack.includes('Swift')) info.techStack.push('Swift');
  }
  if (extensions.has('.kt') || extensions.has('.kts')) {
    if (!info.techStack.includes('Kotlin')) info.techStack.push('Kotlin');
  }

  // 5. 生成默认描述
  if (!info.description) {
    info.description = `${info.name} 项目`;
  }

  // 6. 生成默认亮点
  if (info.highlights.length === 0) {
    info.highlights = info.techStack.slice(0, 3).map(t => `基于 ${t} 技术栈`);
    if (info.highlights.length === 0) {
      info.highlights = ['项目开发中'];
    }
  }

  return info;
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
