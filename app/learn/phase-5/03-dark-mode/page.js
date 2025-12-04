/**
 * Tailwind CSS - 深色模式
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function DarkModePage() {
  const navigationItems = [
    { label: 'Phase 5 概览', href: '/learn/phase-5' },
    { label: '工具类基础', href: '/learn/phase-5/01-utilities' },
    { label: '响应式设计', href: '/learn/phase-5/02-responsive' },
    { label: '深色模式', href: '/learn/phase-5/03-dark-mode' },
    { label: '自定义配置', href: '/learn/phase-5/04-custom-config' },
    { label: '布局模式', href: '/learn/phase-5/05-layouts' }
  ];

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const autoModeCode = `// 1. 自动检测系统主题（推荐）
// tailwind.config.js
module.exports = {
  darkMode: 'media',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}

// 使用方式 - 只需在工具类前加 dark: 前缀
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  自动切换深色模式
</div>

// 解释：
// - bg-white：浅色模式下背景白色
// - dark:bg-gray-800：深色模式下背景深灰色
// - text-gray-900：浅色模式下文字黑色
// - dark:text-white：深色模式下文字白色`;

  const classModeCode = `// 2. 手动控制主题
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}

// 在 HTML 上手动添加/移除 dark 类
// <html class="dark"> 或 <html>

// 切换按钮示例
'use client';

import { useState } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button onClick={toggleTheme}>
      {darkMode ? '切换到浅色模式' : '切换到深色模式'}
    </button>
  );
}

// 持久化主题（本地存储）
const toggleTheme = () => {
  const isDark = document.documentElement.classList.contains('dark');
  const newTheme = isDark ? 'light' : 'dark';

  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

// 页面加载时恢复主题
useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
}, []);`;

  const colorSchemeCode = `// 3. 深色模式专用颜色
// 浅色模式颜色
<div className="bg-blue-500 text-white p-4 rounded">
  蓝色背景（固定颜色）
</div>

// 自动适应深色模式
<div className="bg-blue-500 dark:bg-blue-600 text-white p-4 rounded">
  蓝色背景（深色模式下稍深）
</div>

// 语义化颜色（推荐）
<div className="bg-primary text-primary-foreground p-4 rounded">
  主要颜色（自动适应主题）
</div>

<div className="bg-secondary text-secondary-foreground p-4 rounded">
  次要颜色（自动适应主题）
</div>

<div className="bg-accent text-accent-foreground p-4 rounded">
  强调色（自动适应主题）
</div>

<div className="bg-muted text-muted-foreground p-4 rounded">
  辅助色（自动适应主题）
</div>

// 边框和阴影
<div className="border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none">
  边框和阴影也支持深色模式
</div>`;

  const darkModeExamplesCode = `// 完整深色模式组件示例

// 卡片组件
export default function Card({ children }) {
  return (
    <div className="
      bg-white
      dark:bg-gray-800
      text-gray-900
      dark:text-gray-100
      rounded-lg
      shadow-md
      dark:shadow-gray-900/20
      border
      border-gray-200
      dark:border-gray-700
      p-6
      transition-colors
      duration-200
    ">
      {children}
    </div>
  );
}

// 按钮组件
export default function Button({ children }) {
  return (
    <button className="
      px-4
      py-2
      bg-blue-600
      hover:bg-blue-700
      dark:bg-blue-500
      dark:hover:bg-blue-600
      text-white
      rounded-lg
      shadow
      hover:shadow-lg
      dark:shadow-blue-900/30
      transition-all
      duration-200
    ">
      {children}
    </button>
  );
}

// 导航栏
export default function Navbar() {
  return (
    <nav className="
      bg-white
      dark:bg-gray-900
      border-b
      border-gray-200
      dark:border-gray-800
      px-4
      py-3
    ">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          Logo
        </div>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">首页</a></li>
          <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">关于</a></li>
          <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">联系</a></li>
        </ul>
      </div>
    </nav>
  );
}

// 表格
<table className="
  w-full
  bg-white
  dark:bg-gray-800
  border-collapse
">
  <thead>
    <tr className="bg-gray-50 dark:bg-gray-900">
      <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
        标题
      </th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-gray-200 dark:border-gray-700">
      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
        内容
      </td>
    </tr>
  </tbody>
</table>`;

  const bestPracticesCode = `// 深色模式最佳实践

// 1. 使用语义化颜色
❌ 不推荐：硬编码颜色
<div className="bg-gray-900">...</div>
<div className="text-white">...</div>

✅ 推荐：使用深色模式工具类
<div className="dark:bg-gray-900">...</div>
<div className="dark:text-white">...</div>

// 2. 所有元素都需要深色模式样式
❌ 不推荐：只设置部分元素
<div className="bg-white dark:bg-gray-800 text-gray-900">
  <h1>标题</h1>
  <p>描述</p>
</div>

✅ 推荐：所有元素都设置
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
  <h1 className="text-gray-900 dark:text-gray-100">标题</h1>
  <p className="text-gray-600 dark:text-gray-400">描述</p>
</div>

// 3. 颜色对比度
// 确保深色模式下文字仍然可读
✅ 推荐：使用足够的对比度
<div className="text-gray-900 dark:text-gray-100">...</div>
<div className="text-gray-600 dark:text-gray-300">...</div>
<div className="text-gray-500 dark:text-gray-400">...</div>

❌ 不推荐：对比度不足
<div className="text-gray-600 dark:text-gray-500">...</div>

// 4. 动画过渡
// 添加 transition-colors 使主题切换更流畅
<div className="
  bg-white
  dark:bg-gray-800
  transition-colors
  duration-200
">...</div>

// 5. 图片处理
// 深色模式下图片可能过亮，需要调整
<img
  src="/image.jpg"
  className="
    brightness-100
    dark:brightness-75
    transition-all
    duration-200
  "
/>`;

  return (
    <div className={`min-h-screen py-12 px-4 transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            03. 深色模式
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Tailwind CSS 原生支持深色模式，通过 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">dark:</code>
            前缀轻松实现深色主题。支持自动检测系统偏好或手动控制。
          </p>
        </div>

        {/* 切换按钮 */}
        <div className="mb-6">
          <button
            onClick={toggleDarkMode}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            {darkMode ? '切换到浅色模式' : '切换到深色模式'}
          </button>
        </div>

        {/* 深色模式演示 */}
        <DemoContainer
          title="深色模式演示"
          description="当前为浅色模式，切换按钮体验深色主题"
        >
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2">白色卡片（浅色）/ 深灰卡片（深色）</h3>
              <p className="text-gray-600 dark:text-gray-400">灰色文字（浅色）/ 浅灰文字（深色）</p>
            </div>

            <div className="flex gap-4">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
                主要按钮
              </button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg">
                次要按钮
              </button>
            </div>

            <div className="bg-blue-500 dark:bg-blue-600 text-white p-4 rounded-lg">
              蓝色背景（深色模式下稍深）
            </div>
          </div>
        </DemoContainer>

        {/* 自动模式 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🌙 自动检测系统主题
          </h2>
          <CodeBlock code={autoModeCode} language="javascript" />
        </div>

        {/* 手动模式 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🎮 手动控制主题
          </h2>
          <CodeBlock code={classModeCode} language="javascript" />
        </div>

        {/* 颜色方案 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🎨 深色模式颜色
          </h2>
          <CodeBlock code={colorSchemeCode} language="jsx" />
        </div>

        {/* 示例组件 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💎 完整组件示例
          </h2>
          <CodeBlock code={darkModeExamplesCode} language="jsx" />
        </div>

        {/* 最佳实践 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ⭐ 最佳实践
          </h2>
          <CodeBlock code={bestPracticesCode} language="javascript" />
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-5/02-responsive"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: 响应式设计
          </Link>
          <Link
            href="/learn/phase-5/04-custom-config"
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: 自定义配置 →
          </Link>
        </div>
      </div>
    </div>
  );
}
