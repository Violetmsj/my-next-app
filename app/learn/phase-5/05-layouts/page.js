/**
 * Tailwind CSS - 布局模式
 */

'use client';

import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function LayoutsPage() {
  const navigationItems = [
    { label: 'Phase 5 概览', href: '/learn/phase-5' },
    { label: '工具类基础', href: '/learn/phase-5/01-utilities' },
    { label: '响应式设计', href: '/learn/phase-5/02-responsive' },
    { label: '深色模式', href: '/learn/phase-5/03-dark-mode' },
    { label: '自定义配置', href: '/learn/phase-5/04-custom-config' },
    { label: '布局模式', href: '/learn/phase-5/05-layouts' }
  ];

  const flexboxCode = `// 1. Flexbox 布局

// 基础 flex 容器
<div className="flex">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// 方向
<div className="flex flex-col">        // 垂直排列
<div className="flex flex-row">        // 水平排列（默认）
<div className="flex flex-col-reverse"> // 反向垂直

// 对齐
<div className="flex justify-center">        // 水平居中
<div className="flex justify-start">        // 水平起始
<div className="flex justify-end">          // 水平末尾
<div className="flex justify-between">      // 两端对齐
<div className="flex justify-around">       // 环绕对齐

<div className="flex items-center">         // 垂直居中
<div className="flex items-start">          // 顶部对齐
<div className="flex items-end">            // 底部对齐
<div className="flex items-stretch">        // 拉伸对齐（默认）

// 换行
<div className="flex flex-wrap">        // 允许换行
<div className="flex flex-nowrap">      // 不换行（默认）
<div className="flex flex-wrap-reverse"> // 反向换行

// 子元素弹性
<div className="flex">
  <div className="flex-1">占据剩余空间</div>
  <div className="w-32">固定宽度</div>
  <div className="flex-1">占据剩余空间</div>
</div>

// 完整示例：导航栏
<nav className="flex items-center justify-between px-4 py-3 bg-white shadow">
  <div className="text-xl font-bold">Logo</div>
  <ul className="flex space-x-4">
    <li><a href="#">首页</a></li>
    <li><a href="#">关于</a></li>
    <li><a href="#">联系</a></li>
  </ul>
</nav>`;

  const gridCode = `// 2. Grid 布局

// 基础网格
<div className="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

// 响应式网格
<div className="
  grid
  grid-cols-1      // 移动端：1 列
  sm:grid-cols-2   // 小屏幕：2 列
  md:grid-cols-3   // 中等屏幕：3 列
  lg:grid-cols-4   // 大屏幕：4 列
  gap-4
">
  {/* 12 个项目 */}
  {Array.from({ length: 12 }).map((_, i) => (
    <div key={i}>{i + 1}</div>
  ))}
</div>

// 网格跨度
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-12 md:col-span-8">
    // 占据 8 列（在中等屏幕及以上）
  </div>
  <div className="col-span-12 md:col-span-4">
    // 占据 4 列（在中等屏幕及以上）
  </div>
</div>

// 网格列和行大小
<div className="grid grid-cols-[200px_1fr_100px]">
  // 指定列宽度
</div>

<div className="grid grid-rows-[auto_1fr_auto]">
  // 指定行高度：auto 内容高度 1fr 占据剩余 auto 内容高度
</div>

// Grid 示例：卡片布局
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-2">卡片 {i + 1}</h3>
      <p className="text-gray-600">卡片内容...</p>
    </div>
  ))}
</div>`;

  const positioningCode = `// 3. 定位

// 静态定位（默认）
<div className="static">静态定位</div>

// 相对定位
<div className="relative">
  <div className="absolute top-0 left-0">绝对定位子元素</div>
</div>

// 绝对定位
<div className="relative">
  <div className="absolute top-0 right-0">右上角</div>
  <div className="absolute bottom-0 left-0">左下角</div>
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    居中
  </div>
</div>

// 固定定位
<div className="fixed top-0 left-0 right-0">固定在顶部</div>
<div className="fixed bottom-4 right-4">固定在右下角</div>

// 粘性定位
<div className="sticky top-0">滚动到这个位置时固定在顶部</div>

// 层级
<div className="relative z-10">层级 10</div>
<div className="relative z-20">层级 20</div>

// 示例：模态框
<div className="fixed inset-0 z-50 bg-black bg-opacity-50">
  <div className="flex items-center justify-center min-h-screen p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2">模态框标题</h3>
        <p className="text-gray-600 mb-4">模态框内容</p>
      </div>
    </div>
  </div>
</div>`;

  const containerCode = `// 4. 容器

// 固定宽度容器（推荐用于桌面应用）
<div className="container mx-auto px-4">
  <h1 className="text-3xl font-bold">标题</h1>
  <p className="mt-4">内容...</p>
</div>

// 全宽度容器（适合移动端或全屏布局）
<div className="w-full">
  <h1 className="text-3xl font-bold px-4">标题</h1>
  <p className="mt-4 px-4">内容...</p>
</div>

// 响应式容器
<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  // 最大宽度 7xl，在小屏幕和中等屏幕上有不同内边距
</div>`;

  const layoutPatternsCode = `// 5. 常用布局模式

// 头部-内容-底部布局
<div className="min-h-screen flex flex-col">
  <header className="bg-blue-600 text-white p-4">
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">网站标题</h1>
    </div>
  </header>

  <main className="flex-1 container mx-auto p-4">
    <h2 className="text-xl font-bold mb-4">主要内容</h2>
    <p>页面内容...</p>
  </main>

  <footer className="bg-gray-800 text-white p-4">
    <div className="container mx-auto text-center">
      <p>&copy; 2024 我的网站</p>
    </div>
  </footer>
</div>

// 侧边栏布局
<div className="flex min-h-screen">
  <aside className="w-64 bg-gray-200 p-4 hidden md:block">
    <nav>
      <ul className="space-y-2">
        <li><a href="#" className="block py-2">导航项 1</a></li>
        <li><a href="#" className="block py-2">导航项 2</a></li>
        <li><a href="#" className="block py-2">导航项 3</a></li>
      </ul>
    </nav>
  </aside>

  <main className="flex-1 p-4">
    <h2 className="text-xl font-bold mb-4">主要内容</h2>
    <p>内容区域...</p>
  </main>
</div>

// 卡片网格布局
<div className="container mx-auto p-4">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">卡片标题 {i + 1}</h3>
          <p className="text-gray-600 text-sm">卡片描述文本...</p>
        </div>
      </div>
    ))}
  </div>
</div>`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            05. 布局模式
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Tailwind CSS 提供完整的布局工具，包括 <strong>Flexbox</strong>、
            <strong>Grid</strong>、<strong>定位</strong> 和 <strong>容器</strong>。
            掌握这些布局模式，可以快速构建各种页面布局。
          </p>
        </div>

        {/* Flexbox 演示 */}
        <DemoContainer
          title="Flexbox 演示"
          description="响应式水平布局：移动端堆叠 → 桌面端同行"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-blue-500 text-white p-4 rounded-lg">
              <h3 className="font-bold mb-2">左侧内容</h3>
              <p className="text-sm">占据剩余空间</p>
            </div>
            <div className="flex-1 bg-green-500 text-white p-4 rounded-lg">
              <h3 className="font-bold mb-2">中间内容</h3>
              <p className="text-sm">占据剩余空间</p>
            </div>
            <div className="flex-1 bg-purple-500 text-white p-4 rounded-lg">
              <h3 className="font-bold mb-2">右侧内容</h3>
              <p className="text-sm">占据剩余空间</p>
            </div>
          </div>
        </DemoContainer>

        {/* Grid 演示 */}
        <DemoContainer
          title="Grid 演示"
          description="响应式网格：1 列 → 2 列 → 3 列 → 4 列"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white p-6 rounded-lg text-center">
                <div className="text-2xl font-bold">{i + 1}</div>
                <div className="text-sm mt-2">项目</div>
              </div>
            ))}
          </div>
        </DemoContainer>

        {/* 定位演示 */}
        <DemoContainer
          title="定位演示"
          description="相对定位和绝对定位组合"
        >
          <div className="relative h-64 bg-gray-200 rounded-lg">
            <div className="absolute top-4 left-4 bg-blue-500 text-white p-3 rounded">
              绝对定位 (top-4 left-4)
            </div>
            <div className="absolute top-4 right-4 bg-green-500 text-white p-3 rounded">
              绝对定位 (top-4 right-4)
            </div>
            <div className="absolute bottom-4 left-4 bg-purple-500 text-white p-3 rounded">
              绝对定位 (bottom-4 left-4)
            </div>
            <div className="absolute bottom-4 right-4 bg-pink-500 text-white p-3 rounded">
              绝对定位 (bottom-4 right-4)
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white p-4 rounded-lg">
              居中 (top-1/2 left-1/2)
            </div>
          </div>
        </DemoContainer>

        {/* Flexbox 代码 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📦 Flexbox 布局
          </h2>
          <CodeBlock code={flexboxCode} language="jsx" />
        </div>

        {/* Grid 代码 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📐 Grid 布局
          </h2>
          <CodeBlock code={gridCode} language="jsx" />
        </div>

        {/* 定位代码 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📍 定位系统
          </h2>
          <CodeBlock code={positioningCode} language="jsx" />
        </div>

        {/* 容器代码 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📦 容器布局
          </h2>
          <CodeBlock code={containerCode} language="jsx" />
        </div>

        {/* 布局模式代码 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🎨 常用布局模式
          </h2>
          <CodeBlock code={layoutPatternsCode} language="jsx" />
        </div>

        {/* 选择指南 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            📊 布局方案选择指南
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                使用 Flexbox 当：
              </h4>
              <ul className="text-blue-800 dark:text-blue-400 space-y-1">
                <li>• 一维布局（行或列）</li>
                <li>• 导航栏、按钮组</li>
                <li>• 子元素等分布局</li>
                <li>• 居中对齐</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                使用 Grid 当：
              </h4>
              <ul className="text-blue-800 dark:text-blue-400 space-y-1">
                <li>• 二维布局（行和列）</li>
                <li>• 卡片网格、相册布局</li>
                <li>• 需要精确控制行列</li>
                <li>• 复杂页面布局</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-5/04-custom-config"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: 自定义配置
          </Link>
          <Link
            href="/learn"
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
          >
            返回学习导航 →
          </Link>
        </div>
      </div>
    </div>
  );
}
