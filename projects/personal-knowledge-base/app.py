# -*- coding: utf-8 -*-
"""
个人知识库系统 — Streamlit 主入口
支持多领域管理、多格式文档上传、RAG 智能问答
"""

import os
import sys
import logging
import tempfile

import streamlit as st

# 将项目根目录加入 Python 路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from config import RAW_DIR, RETRIEVAL_TOP_K
from core.loader import load_document
from core.splitter import split_documents
from core.retriever import (
    add_documents,
    search_with_score,
    list_domains,
    create_domain,
    delete_domain,
    get_domain_stats,
)
from core.generator import generate_answer_stream

# 对话历史上限条数
MAX_CHAT_HISTORY = 50

# 日志配置
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# ============================================================
# 页面配置
# ============================================================
st.set_page_config(
    page_title="🧠 个人知识库系统",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ============================================================
# 自定义样式
# ============================================================
st.markdown("""
<style>
    .stApp {
        max-width: 1200px;
        margin: 0 auto;
    }
    .source-box {
        background-color: #f0f2f6;
        border-radius: 8px;
        padding: 12px;
        margin: 4px 0;
        font-size: 0.9em;
    }
    .domain-badge {
        background-color: #e8f4fd;
        border-radius: 4px;
        padding: 2px 8px;
        font-size: 0.85em;
    }
</style>
""", unsafe_allow_html=True)


# ============================================================
# Session State 初始化
# ============================================================
def init_session_state():
    """初始化 Streamlit 会话状态"""
    if "current_domain" not in st.session_state:
        st.session_state.current_domain = "默认"
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = []


init_session_state()


# ============================================================
# 侧边栏 — 领域管理
# ============================================================
def render_sidebar():
    """渲染侧边栏：领域管理 + 系统信息"""
    with st.sidebar:
        st.title("🧠 知识库管理")
        st.divider()

        # --- 领域选择 ---
        st.subheader("📂 领域切换")
        domains = list_domains()

        # 如果没有领域，自动创建默认领域
        if not domains:
            create_domain("默认")
            domains = ["默认"]

        current_domain = st.selectbox(
            "选择领域",
            options=domains,
            index=domains.index(st.session_state.current_domain)
            if st.session_state.current_domain in domains
            else 0,
            key="domain_selector",
        )
        st.session_state.current_domain = current_domain

        # 显示领域统计
        stats = get_domain_stats(current_domain)
        st.caption(f"📊 文档片段数: **{stats['document_count']}**")

        st.divider()

        # --- 创建领域 ---
        st.subheader("➕ 创建新领域")
        new_domain_name = st.text_input("领域名称", placeholder="例如：医学、编程、历史...")
        if st.button("➕ 创建领域", use_container_width=True, type="primary"):
            if new_domain_name.strip():
                if create_domain(new_domain_name.strip()):
                    st.success(f"领域 '{new_domain_name}' 创建成功！")
                    st.rerun()
                else:
                    st.warning(f"领域 '{new_domain_name}' 已存在")
            else:
                st.error("请输入领域名称")

        st.divider()

        # --- 删除领域 ---
        st.subheader("🗑️ 删除领域")
        if len(domains) > 1:
            domain_to_delete = st.selectbox(
                "选择要删除的领域",
                options=[d for d in domains if d != "默认"],
                key="delete_domain_selector",
            )
            if st.button("🗑️ 删除", use_container_width=True, type="secondary"):
                if domain_to_delete:
                    delete_domain(domain_to_delete)
                    if st.session_state.current_domain == domain_to_delete:
                        st.session_state.current_domain = "默认"
                    st.success(f"领域 '{domain_to_delete}' 已删除")
                    st.rerun()
        else:
            st.caption("至少保留一个领域")

        st.divider()

        # --- 系统信息 ---
        st.subheader("ℹ️ 系统信息")
        st.caption(f"当前领域: **{current_domain}**")
        st.caption(f"检索数量: **Top-{RETRIEVAL_TOP_K}**")
        st.caption(f"数据目录: `data/domains/`")


# ============================================================
# 主界面 — 文档上传
# ============================================================
def render_upload_section():
    """渲染文档上传区域"""
    st.header("📥 文档上传")

    col1, col2 = st.columns([2, 1])

    with col1:
        uploaded_file = st.file_uploader(
            "选择文件",
            type=["pdf", "docx", "doc", "pptx", "ppt", "md", "txt", "jpg", "jpeg", "png", "bmp"],
            help="支持 PDF、Word、PPT、Markdown、TXT、图片格式",
        )

    with col2:
        st.write("")
        st.write("")
        process_btn = st.button("📥 处理并入库", use_container_width=True, type="primary", disabled=uploaded_file is None)

    if uploaded_file is not None and process_btn:
        with st.spinner("正在处理文档..."):
            tmp_path = None
            try:
                # 保存上传文件到临时目录
                ext = os.path.splitext(uploaded_file.name)[1]
                with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
                    tmp.write(uploaded_file.getbuffer())
                    tmp_path = tmp.name

                # 同时保存到 raw 目录
                raw_path = os.path.join(RAW_DIR, st.session_state.current_domain, uploaded_file.name)
                os.makedirs(os.path.dirname(raw_path), exist_ok=True)
                with open(raw_path, "wb") as f:
                    f.write(uploaded_file.getbuffer())

                # 加载文档
                docs = load_document(tmp_path)
                if not docs:
                    st.warning("未能从文档中提取内容")
                    return

                # 切分文本
                chunks = split_documents(docs)
                if not chunks:
                    st.warning("文本切分后无内容")
                    return

                # 添加到向量库
                count = add_documents(chunks, domain=st.session_state.current_domain)

                st.success(f"✅ 文档处理完成！共添加 **{count}** 个文本片段到领域「{st.session_state.current_domain}」")

            except Exception as e:
                st.error(f"❌ 文档处理失败: {e}")
                logger.exception("文档处理异常")
            finally:
                # 无论成功或失败，都清理临时文件
                if tmp_path and os.path.exists(tmp_path):
                    os.unlink(tmp_path)


# ============================================================
# 主界面 — 智能问答
# ============================================================
def render_qa_section():
    """渲染智能问答区域"""
    st.header("💬 智能问答")

    # 问题输入
    question = st.text_area(
        "输入你的问题",
        placeholder="例如：这份文档的主要内容是什么？",
        height=80,
    )

    col1, col2, col3 = st.columns([1, 1, 4])
    with col1:
        ask_btn = st.button("🔍 提问", use_container_width=True, type="primary", disabled=not question.strip())
    with col2:
        clear_btn = st.button("🗑️ 清空对话", use_container_width=True)
        if clear_btn:
            st.session_state.chat_history = []
            st.rerun()

    if ask_btn and question.strip():
        with st.spinner("正在检索相关文档..."):
            # 检索相关文档
            retrieved_docs = search_with_score(
                question,
                domain=st.session_state.current_domain,
                top_k=RETRIEVAL_TOP_K,
            )

        if not retrieved_docs:
            st.warning("未找到相关文档，请先上传文档到当前领域")
            return

        # 显示检索结果
        with st.expander("📋 检索到的相关文档", expanded=False):
            for i, (doc, score) in enumerate(retrieved_docs, 1):
                source = doc.metadata.get("source", "未知来源")
                st.markdown(f"**[{i}] 来源:** `{os.path.basename(source)}` (相似度: {1 - score:.4f})")
                st.markdown(f"> {doc.page_content[:300]}...")
                st.divider()

        # 生成回答（流式）
        st.subheader("📝 回答")
        docs_only = [doc for doc, _ in retrieved_docs]

        # 流式输出
        answer_container = st.empty()
        full_answer = ""
        for chunk in generate_answer_stream(question, docs_only):
            full_answer += chunk
            answer_container.markdown(full_answer)

        # 保存到对话历史（保留最近 MAX_CHAT_HISTORY 条）
        st.session_state.chat_history.append({
            "question": question,
            "answer": full_answer,
            "sources": [(doc.metadata.get("source", ""), doc.page_content[:200]) for doc in docs_only],
        })
        if len(st.session_state.chat_history) > MAX_CHAT_HISTORY:
            st.session_state.chat_history = st.session_state.chat_history[-MAX_CHAT_HISTORY:]

    # 显示对话历史
    if st.session_state.chat_history:
        st.divider()
        st.subheader("📜 对话历史")
        for i, chat in enumerate(reversed(st.session_state.chat_history), 1):
            with st.chat_message("user"):
                st.write(chat["question"])
            with st.chat_message("assistant"):
                st.write(chat["answer"])


# ============================================================
# 主界面布局
# ============================================================
def main():
    """主函数"""
    # 侧边栏
    render_sidebar()

    # 主页面标签页
    tab1, tab2 = st.tabs(["💬 智能问答", "📥 文档上传"])

    with tab1:
        render_qa_section()

    with tab2:
        render_upload_section()


if __name__ == "__main__":
    main()
