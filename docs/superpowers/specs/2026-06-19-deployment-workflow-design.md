# 快速部署工作流设计方案

## 背景

当前项目部署流程存在两个痛点：
1. **独立项目接入困难** — 新写的独立项目不知道该放在哪里、怎么接入主站
2. **部署流程手动** — 本地改完后需要手动 build + push 到 Vercel 才能上线

## 目标

实现一句话工作流：「新项目做完后，往配置文件加一行路径，运行一条命令，搞定。」

## 设计方案

### 1. 项目总清单 — `projects-config.json`

在项目根目录创建 `projects-config.json`，作为所有项目的统一清单。包含已部署和待部署的项目。

#### 结构

```json
{
  "projects": [
    {
      "name": "项目名称",
      "description": "项目描述",
      "techStack": ["技术1", "技术2"],
      "type": "embedded | web | tool | fullstack",
      "status": "deployed | pending",
      "detailPage": "/project-pages/xxx.html",
      "liveUrl": "https://xxx.vercel.app",
      "sourcePath": "E:/code/project-folder"
    }
  ]
}
```

#### 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 项目名称 |
| `description` | 否 | 项目简介（待部署时可为空，脚本自动提取） |
| `techStack` | 否 | 技术栈数组（待部署时可为空，脚本自动提取） |
| `type` | 否 | 项目类型：embedded/web/tool/fullstack（脚本自动判断） |
| `status` | 是 | `deployed` 已上线 / `pending` 待部署 |
| `detailPage` | 否 | 项目详情页路径（自动生成后填入） |
| `liveUrl` | 否 | 独立部署的线上地址 |
| `sourcePath` | 否 | 本地项目源码路径（有值时触发自动部署流程） |

### 2. 自动化脚本 — `npm run sync:projects`

#### 运行逻辑

扫描 `projects-config.json`，对每个项目：

1. **已部署项目**（`status: "deployed"`）：跳过，不做任何操作
2. **待部署项目**（`status: "pending"` 且有 `sourcePath`）：
   - 扫描项目目录，自动提取信息
   - 生成详情页 HTML
   - 更新 `projects-config.json` 状态为 `deployed`
   - 更新主站 `src/data/projects.ts`
   - Git commit + push（触发 Vercel 自动部署）

#### 信息自动提取逻辑

**项目名称**：
- 优先从 `package.json` 的 `name` 字段读取
- 其次从 `README.md` 标题提取
- 最后使用目录名

**项目描述**：
- 优先从 `README.md` 的第一段提取
- 其次从 `package.json` 的 `description` 字段读取
- 最后生成默认描述

**技术栈**：
- 扫描文件类型：`.ino`/`.c`/`.h` → Arduino/C，`.py` → Python，`.ts`/`.tsx` → TypeScript
- 分析 `package.json` 的 `dependencies` 列表
- 分析 `#include` 语句推断嵌入式库

**项目类型**：
- 存在 `.ino` 文件 → `embedded`
- 存在 `package.json` 且有前端框架 → `web`
- 存在后端框架（Express/FastAPI 等）→ `fullstack`
- 其他 → `tool`

### 3. 详情页模板

创建 `templates/project-detail.html`，包含：
- 统一的页面结构（标题区、功能区、技术栈区、截图区）
- 与现有详情页一致的视觉风格（玻璃拟态、渐变背景、毛玻璃效果）
- 使用 `{{TITLE}}`、`{{DESCRIPTION}}` 等占位符，脚本生成时替换

### 4. 主站数据同步

脚本会自动维护 `src/data/projects.ts`，确保主站项目卡片展示最新数据。每个项目条目包含：
- `title`：项目名称
- `description`：项目描述
- `techStack`：技术栈标签
- `detailPageUrl`：详情页链接
- `liveUrl`：线上地址（可选）
- `githubUrl`：仓库地址（可选）

## 用户工作流

### 查看所有项目

打开 `projects-config.json`，一眼看到所有项目及其状态。

### 添加新项目

1. 在 `projects-config.json` 中添加一条记录，填入 `sourcePath`
2. 运行 `npm run sync:projects`
3. 完成

### 添加已有项目到清单

在 `projects-config.json` 中添加记录，`status` 设为 `deployed`，填入已有信息。

## 文件清单

| 文件 | 用途 |
|------|------|
| `projects-config.json` | 项目总清单 |
| `templates/project-detail.html` | 详情页模板 |
| `scripts/sync-projects.js` | 自动化同步脚本 |
| `src/data/projects.ts` | 主站项目数据（自动生成） |
| `public/project-pages/*.html` | 项目详情页（自动生成） |
