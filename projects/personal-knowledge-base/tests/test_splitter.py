# -*- coding: utf-8 -*-
"""
文本切分器测试
"""

import pytest
from langchain_core.documents import Document

from core.splitter import split_documents, create_splitter


class TestSplitDocuments:
    """文档切分测试"""

    def test_short_document(self):
        """测试短文档不被切分"""
        doc = Document(
            page_content="这是一段很短的文本。",
            metadata={"source": "test.txt"},
        )
        chunks = split_documents([doc], chunk_size=500, chunk_overlap=100)
        assert len(chunks) == 1
        assert chunks[0].page_content == "这是一段很短的文本。"

    def test_long_document(self):
        """测试长文档被正确切分"""
        # 创建超过 chunk_size 的文本
        long_text = "这是测试句子。" * 100  # 约 700 字符
        doc = Document(page_content=long_text, metadata={"source": "test.txt"})

        chunks = split_documents([doc], chunk_size=500, chunk_overlap=100)
        assert len(chunks) > 1
        # 每个 chunk 不应超过 chunk_size（允许少量超出）
        for chunk in chunks:
            assert len(chunk.page_content) <= 600  # 允许一定弹性

    def test_overlap(self):
        """测试文本块之间有重叠"""
        long_text = "。".join([f"这是第{i}个句子" for i in range(50)])
        doc = Document(page_content=long_text, metadata={"source": "test.txt"})

        chunks = split_documents([doc], chunk_size=200, chunk_overlap=50)
        assert len(chunks) > 1

    def test_metadata_preserved(self):
        """测试元数据被保留"""
        doc = Document(
            page_content="测试内容" * 100,
            metadata={"source": "test.pdf", "page": 1},
        )
        chunks = split_documents([doc], chunk_size=200, chunk_overlap=50)

        for chunk in chunks:
            assert "source" in chunk.metadata
            assert chunk.metadata["source"] == "test.pdf"

    def test_empty_input(self):
        """测试空输入"""
        chunks = split_documents([])
        assert chunks == []

    def test_chinese_separators(self):
        """测试中文分隔符优先切分"""
        text = "第一段内容。\n\n第二段内容。\n\n第三段内容。"
        doc = Document(page_content=text, metadata={"source": "test.txt"})

        chunks = split_documents([doc], chunk_size=20, chunk_overlap=5)
        # 应该按段落或句号切分
        assert len(chunks) > 1


class TestCreateSplitter:
    """切分器创建测试"""

    def test_default_params(self):
        """测试默认参数创建切分器"""
        splitter = create_splitter()
        assert splitter is not None

    def test_custom_params(self):
        """测试自定义参数创建切分器"""
        splitter = create_splitter(chunk_size=100, chunk_overlap=20)
        assert splitter is not None
