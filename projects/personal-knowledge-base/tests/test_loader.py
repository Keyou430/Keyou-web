# -*- coding: utf-8 -*-
"""
文档加载器测试
"""

import os
import tempfile
import pytest

from core.loader import load_document, load_directory, load_text, load_markdown


class TestLoadText:
    """纯文本加载测试"""

    def test_load_simple_text(self):
        """测试加载简单文本文件"""
        with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False, encoding="utf-8") as f:
            f.write("这是第一行\n这是第二行\n这是第三行")
            tmp_path = f.name

        try:
            docs = load_document(tmp_path)
            assert len(docs) > 0
            assert "第一行" in docs[0].page_content
        finally:
            os.unlink(tmp_path)

    def test_load_empty_text(self):
        """测试加载空文本文件"""
        with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False, encoding="utf-8") as f:
            f.write("")
            tmp_path = f.name

        try:
            docs = load_document(tmp_path)
            # 空文件也应返回文档对象
            assert isinstance(docs, list)
        finally:
            os.unlink(tmp_path)

    def test_load_chinese_text(self):
        """测试加载中文文本"""
        with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False, encoding="utf-8") as f:
            f.write("知识库系统测试\n支持中文内容\n包含标点符号！")
            tmp_path = f.name

        try:
            docs = load_document(tmp_path)
            assert len(docs) > 0
            assert "知识库" in docs[0].page_content
        finally:
            os.unlink(tmp_path)


class TestLoadMarkdown:
    """Markdown 加载测试"""

    def test_load_markdown(self):
        """测试加载 Markdown 文件"""
        with tempfile.NamedTemporaryFile(mode="w", suffix=".md", delete=False, encoding="utf-8") as f:
            f.write("# 标题\n\n这是正文内容\n\n## 子标题\n\n详细说明")
            tmp_path = f.name

        try:
            docs = load_document(tmp_path)
            assert len(docs) > 0
        finally:
            os.unlink(tmp_path)


class TestLoadUnsupported:
    """不支持格式测试"""

    def test_unsupported_format(self):
        """测试不支持的文件格式"""
        with tempfile.NamedTemporaryFile(suffix=".xyz", delete=False) as f:
            tmp_path = f.name

        try:
            with pytest.raises(ValueError, match="不支持的文件格式"):
                load_document(tmp_path)
        finally:
            os.unlink(tmp_path)

    def test_file_not_found(self):
        """测试文件不存在"""
        with pytest.raises(FileNotFoundError):
            load_document("/不存在的文件.txt")


class TestLoadDirectory:
    """目录批量加载测试"""

    def test_load_directory(self):
        """测试加载目录下所有支持的文件"""
        with tempfile.TemporaryDirectory() as tmp_dir:
            # 创建测试文件
            for i in range(3):
                path = os.path.join(tmp_dir, f"test_{i}.txt")
                with open(path, "w", encoding="utf-8") as f:
                    f.write(f"这是第 {i} 个测试文件的内容")

            docs = load_directory(tmp_dir)
            assert len(docs) == 3

    def test_load_empty_directory(self):
        """测试加载空目录"""
        with tempfile.TemporaryDirectory() as tmp_dir:
            docs = load_directory(tmp_dir)
            assert len(docs) == 0
