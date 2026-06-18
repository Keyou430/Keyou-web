# 🧠 个人知识库系统

基于 RAG（检索增强生成）的多领域个人知识库系统。支持多种文档格式上传，按领域分库管理，AI 问答并标注引用来源。

---

## 📋 项目概览

| 项目 | 说明 |
|------|------|
| 技术栈 | Python + LangChain + Chroma + Streamlit |
| Embedding | BGE-small-zh（中文优化，本地运行） |
| LLM | 小米 MiMo（硅基流动 API） |
| 视觉模型 | Qwen2.5-VL-7B-Instruct（图片理解） |
| OCR | EasyOCR（中英文识别） |

---

## 📁 目录结构

```
L:\knowledge\
├── app.py                      # Streamlit 主入口
├── config.py                   # 全局配置
├── requirements.txt            # Python 依赖
├── README.md                   # 使用说明
├── plan.md                     # 本文档
├── .env                        # API Key（不提交 git）
├── .gitignore                  # Git 忽略规则
├── core/
│   ├── __init__.py
│   ├── loader.py               # 文档加载器（PDF/Word/PPT/TXT/MD/图片）
│   ├── splitter.py             # 文本切分器（中文优化）
│   ├── embedder.py             # Embedding 模型封装
│   ├── retriever.py            # 向量存储与语义检索
│   ├── generator.py            # RAG 问答生成器
│   └── image_processor.py      # 图片处理（OCR + 视觉描述）
├── data/
│   ├── raw/                    # 原始文档存放
│   ├── chroma_db/              # 旧版向量数据库（已弃用）
│   └── domains/                # 多领域知识库
│       ├── 默认/
│       │   └── chroma_db/
│       ├── 医学/
│       │   └── chroma_db/
│       └── 编程/
│           └── chroma_db/
├── tests/
│   ├── __init__.py
│   ├── test_loader.py          # 加载器测试
│   ├── test_splitter.py        # 切分器测试
│   └── test_retriever.py       # 检索器测试
└── docs/
    └── superpowers/
        ├── specs/              # 设计文档
        └── plans/              # 实施计划
```

---

## 🔧 核心模块说明

### 1. config.py — 全局配置

```python
EMBEDDING_MODEL_NAME = "BAAI/bge-small-zh-v1.5"   # Embedding 模型
EMBEDDING_DEVICE = "cpu"                            # 运行设备
CHUNK_SIZE = 500                                    # 文本块大小
CHUNK_OVERLAP = 100                                 # 重叠字符数
RETRIEVAL_TOP_K = 5                                 # 检索返回数量
LLM_MODEL = "XiaomiMiMo/MiMo-7B-RL"               # LLM 模型
LLM_BASE_URL = "https://api.siliconflow.cn/v1"     # API 地址
```

### 2. core/loader.py — 文档加载

支持格式：
- PDF → PyPDFLoader
- Word (.docx) → python-docx
- Word (.doc) → Word COM 转换（需安装 Word）
- PPT (.pptx) → python-pptx
- PPT (.ppt) → PowerPoint COM 转换（需安装 PowerPoint）
- Markdown (.md) → 直接读取
- 纯文本 (.txt) → TextLoader
- 图片 (.jpg/.png/.bmp) → EasyOCR + Qwen-VL

### 3. core/splitter.py — 文本切分

使用 LangChain RecursiveCharacterTextSplitter，中文分隔符优先：
```python
separators = ["\n\n", "\n", "。", "！", "？", " "]
chunk_size = 500
chunk_overlap = 100
```

### 4. core/embedder.py — Embedding 模型

使用 BGE-small-zh-v1.5，首次运行自动下载（~90MB），之后从缓存加载。
通过 HF_ENDPOINT 环境变量使用国内镜像下载。

### 5. core/retriever.py — 向量检索

基于 Chroma 数据库，支持：
- 多领域分库（每个领域独立 collection）
- 语义搜索（similarity_search）
- 带分数搜索（similarity_search_with_score）
- 领域管理（创建/列出/删除）

### 6. core/generator.py — RAG 问答

使用 OpenAI 兼容接口调用 LLM：
```
Prompt: 你是一个知识库助手。基于参考资料回答用户问题。
       只根据参考资料回答，不要编造。
       回答末尾标注引用来源。
```

### 7. core/image_processor.py — 图片处理

双通道处理：
1. EasyOCR 提取文字
2. Qwen-VL 生成图片描述
3. 合并结果存入向量库

---

## 🚀 使用方法

### 安装依赖

```bash
cd L:\knowledge
pip install -r requirements.txt
```

### 配置 API Key

编辑 `.env` 文件：
```
LLM_API_KEY=你的API密钥
LLM_BASE_URL=https://api.siliconflow.cn/v1
LLM_MODEL=XiaomiMiMo/MiMo-7B-RL
HF_ENDPOINT=https://hf-mirror.com
```

### 启动

```bash
streamlit run app.py
```

浏览器打开 http://localhost:8501

### 操作流程

1. **创建领域**：左侧边栏输入领域名称，点击"➕ 创建领域"
2. **上传文档**：选择格式（PDF/Word/PPT/TXT/MD/图片），点击"📥 处理并入库"
3. **提问**：输入问题，点击"🔍 提问"
4. **切换领域**：下拉框选择不同领域，各自独立检索

---

## 📊 支持的文档格式

| 格式 | 后缀 | 处理方式 | 依赖 |
|------|------|----------|------|
| PDF | .pdf | PyPDFLoader | pypdf |
| Word | .docx | python-docx | python-docx |
| Word（旧版）| .doc | COM 转换 | pywin32 + Word |
| PPT | .pptx | python-pptx | python-pptx |
| PPT（旧版）| .ppt | COM 转换 | pywin32 + PowerPoint |
| Markdown | .md | 直接读取 | - |
| 纯文本 | .txt | TextLoader | langchain |
| 图片 | .jpg/.png/.bmp | OCR + 视觉AI | easyocr + httpx |

---

## 🧪 测试

```bash
python -m pytest tests/ -v
```

测试覆盖：
- 文档加载（TXT/MD/不支持格式/目录批量加载）
- 文本切分（短文档/长文档/重叠/元数据/中文分隔符）
- 向量检索（创建/搜索/元数据/持久化加载）

---

## ⚠️ 已知限制

1. **.doc/.ppt 格式**：需要安装 Microsoft Office 才能转换
2. **首次图片上传**：EasyOCR 需要下载模型（~100MB）
3. **网络问题**：Embedding 模型需要通过 HF 镜像下载
4. **Python 版本**：PaddleOCR 不支持 Python 3.14，已改用 EasyOCR
5. **删除领域**：需要先释放内存中的 vectorstore 才能删除文件

---

## 🔄 后续演进方向

- [ ] 多轮对话（对话历史管理）
- [ ] 混合检索（向量 + BM25 关键词）
- [ ] Reranker 重排序
- [ ] 文档管理（删除/更新已有文档）
- [ ] Docker 部署
- [ ] 多用户支持
