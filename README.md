# Keyou Web

个人作品集网站，基于 Next.js 14 + TypeScript + Tailwind CSS。

🌐 **线上地址：** [https://web.keyou.ccwu.cc](https://web.keyou.ccwu.cc)

## 技术栈

- **框架：** Next.js 14 (App Router)
- **语言：** TypeScript
- **样式：** Tailwind CSS
- **动画：** Framer Motion
- **部署：** Vercel

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 🚀 快速部署新项目

本项目支持一键式项目部署工作流。只需在配置文件中添加项目路径，运行一条命令即可自动生成详情页并部署上线。

### 查看所有项目

所有项目统一记录在 `projects-config.json` 中，打开即可看到每个项目的状态（`deployed` / `pending`）。

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

然后运行同步命令更新主站数据：

```bash
npm run sync:projects
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
- 🔍 扫描项目目录，提取技术栈和描述
- 📄 生成详情页 HTML
- 📝 更新主站项目数据
- ✅ 更新配置文件状态为 `deployed`

3. 一键部署：

```bash
npm run deploy
```

自动同步 + commit + push，Vercel 会自动部署上线。

### 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 项目唯一标识（URL 友好格式） |
| `name` | 是 | 项目名称 |
| `description` | 否 | 项目简介（待部署时可为空，脚本自动提取） |
| `longDescription` | 否 | 详细介绍（待部署时可为空） |
| `category` | 否 | 分类：嵌入式开发 / 硬件工程 / AI Automation / Full-Stack Development |
| `techStack` | 否 | 技术栈数组（待部署时可为空，脚本自动提取） |
| `status` | 是 | `deployed` 已上线 / `pending` 待部署 |
| `projectStatus` | 否 | 项目状态：completed / in-progress / planned |
| `highlights` | 否 | 项目亮点数组 |
| `githubUrl` | 否 | GitHub 仓库地址 |
| `demoUrl` | 否 | 在线演示地址 |
| `sourcePath` | 否 | 本地项目源码路径（有值时触发自动部署流程） |

### 自动提取逻辑

脚本会从以下来源自动提取项目信息：

- **package.json** — 项目名称、描述、依赖推断技术栈
- **README.md** — 项目描述
- **requirements.txt** — Python 依赖推断技术栈
- **文件类型** — `.ino` → Arduino，`.py` → Python，`.ts` → TypeScript 等

## 项目结构

```
├── projects-config.json          # 项目总清单
├── scripts/
│   ├── sync-projects.js          # 自动化同步脚本
│   └── templates/
│       └── project-detail.html   # 详情页 HTML 模板
├── src/
│   ├── app/
│   │   ├── page.tsx              # 首页
│   │   └── projects/[id]/page.tsx # 项目详情页
│   ├── components/               # 组件
│   └── data/
│       └── projects.ts           # 项目数据（自动生成）
└── public/
    └── project-pages/            # 独立项目详情页（自动生成）
```
