# -*- coding: utf-8 -*-
"""
向量检索器测试
"""

import os
import shutil
import tempfile
import pytest

from langchain_core.documents import Document

from config import DOMAINS_DIR
from core.retriever import (
    get_vectorstore,
    add_documents,
    search,
    search_with_score,
    list_domains,
    create_domain,
    delete_domain,
    get_domain_stats,
)


@pytest.fixture
def temp_domain():
    """创建临时测试领域，测试后清理"""
    domain_name = "_test_temp_domain_"
    create_domain(domain_name)
    yield domain_name
    # 清理
    domain_path = os.path.join(DOMAINS_DIR, domain_name)
    if os.path.exists(domain_path):
        shutil.rmtree(domain_path)


class TestDomainManagement:
    """领域管理测试"""

    def test_create_domain(self, temp_domain):
        """测试创建领域"""
        # temp_domain 已经创建，验证存在
        domains = list_domains()
        assert temp_domain in domains

    def test_create_duplicate_domain(self, temp_domain):
        """测试创建重复领域"""
        result = create_domain(temp_domain)
        assert result is False

    def test_list_domains(self):
        """测试列出领域"""
        domains = list_domains()
        assert isinstance(domains, list)
        assert "默认" in domains

    def test_delete_domain(self):
        """测试删除领域"""
        test_name = "_test_delete_me_"
        create_domain(test_name)
        assert test_name in list_domains()

        result = delete_domain(test_name)
        assert result is True
        assert test_name not in list_domains()

    def test_delete_nonexistent_domain(self):
        """测试删除不存在的领域"""
        result = delete_domain("_不存在的领域_")
        assert result is False


class TestDocumentOperations:
    """文档操作测试"""

    def test_add_documents(self, temp_domain):
        """测试添加文档"""
        docs = [
            Document(
                page_content="Python 是一种广泛使用的高级编程语言",
                metadata={"source": "test.txt"},
            ),
            Document(
                page_content="机器学习是人工智能的一个子领域",
                metadata={"source": "test2.txt"},
            ),
        ]
        count = add_documents(docs, domain=temp_domain)
        assert count == 2

    def test_add_empty_documents(self, temp_domain):
        """测试添加空文档列表"""
        count = add_documents([], domain=temp_domain)
        assert count == 0

    def test_search(self, temp_domain):
        """测试语义搜索"""
        # 先添加文档
        docs = [
            Document(
                page_content="深度学习是机器学习的一个分支，使用多层神经网络",
                metadata={"source": "dl.txt"},
            ),
            Document(
                page_content="自然语言处理是人工智能的重要方向",
                metadata={"source": "nlp.txt"},
            ),
        ]
        add_documents(docs, domain=temp_domain)

        # 搜索
        results = search("什么是深度学习", domain=temp_domain, top_k=2)
        assert len(results) > 0
        assert len(results) <= 2

    def test_search_with_score(self, temp_domain):
        """测试带分数搜索"""
        docs = [
            Document(
                page_content="知识库系统用于管理和检索文档",
                metadata={"source": "kb.txt"},
            ),
        ]
        add_documents(docs, domain=temp_domain)

        results = search_with_score("知识库是什么", domain=temp_domain, top_k=1)
        assert len(results) > 0
        doc, score = results[0]
        assert isinstance(score, float)

    def test_get_domain_stats(self, temp_domain):
        """测试领域统计"""
        # 添加一些文档
        docs = [
            Document(page_content=f"测试文档 {i}", metadata={"source": f"test{i}.txt"})
            for i in range(3)
        ]
        add_documents(docs, domain=temp_domain)

        stats = get_domain_stats(temp_domain)
        assert stats["domain"] == temp_domain
        assert stats["document_count"] == 3
