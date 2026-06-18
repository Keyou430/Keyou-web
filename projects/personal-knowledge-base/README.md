# 🧠 个人知识库系统

基于 RAG（检索增强生成）的多领域个人知识库系统。支持多种文档格式上传，按领域分库管理，AI 问答并标注引用来源。

## ✨ 特性

- **多格式支持**：PDF、Word、PPT、Markdown、TXT、图片（OCR + 视觉AI）
- **多领域管理**：按领域分库，独立检索，互不干扰
- **中文优化**：BGE-small-zh Embedding + 中文分隔符切分
- **智能问答**：RAG 架构，回答附带引用来源
- **本地运行**：Embedding 模型本地推理，无需 GPU

## 📋 技术栈

| 组件 | 选型 | 说明 |
|------|------|------|
| 前端 | Streamlit | 交互式 Web 界面 |
| 后端 | Python + LangChain | RAG 流水线编排 |
| 向量数据库 | Chroma | 本地持久化存储 |
| Embedding | BGE-small-zh-v1.5 | 中文优化，90MB |
| LLM | 小米 MiMo（硅基流动 API） | OpenAI 兼容接口 |
| 视觉模型 | Qwen2.5-VL-7B-Instruct | 图片理解 |
| OCR | EasyOCR | 中英文识别 |

## 🚀 快速开始

### 1. 安装依赖

```bash
cd L:\个人知识库系统
pip install -r requirements.txt
```

### 2. 配置 API Key

编辑 `.env` 文件，填入你的硅基流动 API Key：

```
LLM_API_KEY=你的API密钥
```

### 3. 启动系统

```bash
streamlit run app.py
```

浏览器打开 http://localhost:8501 即可使用。

## 📖 使用流程

1. **创建领域** — 左侧边栏输入领域名称，点击"➕ 创建领域"
2. **上传文档** — 选择格式，上传文件，点击"📥 处理并入库"
3. **智能提问** — 输入问题，系统自动检索相关文档并生成回答
4. **切换领域** — 下拉框切换不同领域的知识库

## 🧪 运行测试

```bash
python -m pytest tests/ -v
```

## 📁 项目结构

```
├── app.py                  # Streamlit 主入口
├── config.py               # 全局配置
├── requirements.txt        # Python 依赖
├── .env                    # API Key（不提交 git）
├── core/
│   ├── loader.py           # 文档加载器
│   ├── splitter.py         # 文本切分器
│   ├── embedder.py         # Embedding 模型封装
│   ├── retriever.py        # 向量存储与检索
│   ├── generator.py        # RAG 问答生成器
│   └── image_processor.py  # 图片处理
├── data/
│   ├── raw/                # 原始文档
│   └── domains/            # 多领域向量库
└── tests/                  # 测试用例
```

## ⚠️ 注意事项

- `.doc` / `.ppt` 格式需要安装 Microsoft Office
- 首次上传图片时 EasyOCR 会自动下载模型（约 100MB）
- Embedding 模型首次运行会通过 HF 镜像下载（约 90MB）
