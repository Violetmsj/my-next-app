/**
 * CodeBlock - 代码展示组件
 *
 * 用于展示带有语法高亮的代码块
 * 支持一键复制功能
 *
 * @param {Object} props
 * @param {string} props.code - 代码内容
 * @param {string} props.language - 编程语言 (默认: 'javascript')
 */

'use client';

import { useState } from 'react';

export default function CodeBlock({ code, language = 'javascript' }) {
  const [copied, setCopied] = useState(false);

  // 复制代码到剪贴板
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-900 dark:bg-gray-950 border border-gray-700">
      {/* 工具栏 */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
        <span className="text-sm text-gray-400 font-mono">{language}</span>
        <button
          onClick={copyToClipboard}
          className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors"
        >
          {copied ? '✓ 已复制' : '复制代码'}
        </button>
      </div>

      {/* 代码内容 */}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-gray-300 font-mono whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}
