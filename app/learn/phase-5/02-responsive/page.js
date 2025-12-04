/**
 * Tailwind CSS - 响应式设计
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function ResponsivePage() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const navigationItems = [
    { label: 'Phase 5 概览', href: '/learn/phase-5' },
    { label: '工具类基础', href: '/learn/phase-5/01-utilities' },
    { label: '响应式设计', href: '/learn/phase-5/02-responsive' },
    { label: '深色模式', href: '/learn/phase-5/03-dark-mode' },
    { label: '自定义配置', href: '/learn/phase-5/04-custom-config' },
    { label: '布局模式', href: '/learn/phase-5/05-layouts' }
  ];

  const breakpointsCode = `// Tailwind 断点 (Breakpoints)
// 默认断点：

// sm: 640px  (小屏幕，平板竖屏)
// md: 768px  (中等屏幕，平板横屏)
// lg: 1024px (大屏幕，笔记本)
// xl: 1280px (超大屏幕，台式机)
// 2xl: 1536px (超超大屏幕)

<div className="
  text-sm          // 默认：小屏幕
  sm:text-base     // ≥640px
  md:text-lg       // ≥768px
  lg:text-xl       // ≥1024px
  xl:text-2xl      // ≥1280px
  2xl:text-3xl     // ≥1536px
">
  在不同屏幕上显示不同大小
</div>

// 使用断点前缀的语法：
[断点]:[工具类]

// 例子：
// 默认隐藏，移动端显示
<div className="hidden sm:block">sm 及以上显示</div>

// 默认显示，移动端隐藏
<div className="block sm:hidden">小屏幕隐藏</div>`;

  const gridSystemCode = `// 网格系统 (Grid System)
// 使用 col-span 控制列数

<div className="
  grid
  grid-cols-1      // 移动端：1 列
  sm:grid-cols-2   // 小屏幕：2 列
  md:grid-cols-3   // 中等屏幕：3 列
  lg:grid-cols-4   // 大屏幕：4 列
  gap-4            // 间距
">
  <div className="bg-blue-500 p-4 text-white">Item 1</div>
  <div className="bg-blue-500 p-4 text-white">Item 2</div>
  <div className="bg-blue-500 p-4 text-white">Item 3</div>
  <div className="bg-blue-500 p-4 text-white">Item 4</div>
  <div className="bg-blue-500 p-4 text-white">Item 5</div>
  <div className="bg-blue-500 p-4 text-white">Item 6</div>
</div>

// 间距响应式
<div className="
  p-2             // 默认：padding 0.5rem
  md:p-4          // ≥768px：padding 1rem
  lg:p-6          // ≥1024px：padding 1.5rem
  lg:px-8         // ≥1024px：padding-left & right 2rem
  lg:py-8         // ≥1024px：padding-top & bottom 2rem
">
  响应式间距
</div>

// 字体响应式
<h1 className="
  text-2xl         // 移动端：24px
  sm:text-3xl      // 小屏幕：30px
  md:text-4xl      // 中等屏幕：36px
  lg:text-5xl      // 大屏幕：48px
  font-bold
">
  响应式标题
</h1>`;

  const hiddenVisibleCode = `// 显示/隐藏控制

// 基础显示工具类
<div className="block">block (显示)</div>
<div className="inline">inline (行内)</div>
<div className="inline-block">inline-block</div>
<div className="flex">flex (弹性盒子)</div>
<div className="grid">grid (网格)</div>
<div className="hidden">hidden (隐藏)</div>

// 响应式显示/隐藏
<div className="
  block            // 默认显示
  sm:hidden        // ≥640px 隐藏
  lg:block         // ≥1024px 显示
">
  移动端显示，sm 隐藏，lg 显示
</div>

<div className="
  hidden           // 默认隐藏
  sm:block         // ≥640px 显示
  md:hidden        // ≥768px 隐藏
  lg:block         // ≥1024px 显示
">
  移动端隐藏，sm 显示，md 隐藏，lg 显示
</div>

// 实际应用：导航菜单
<nav className="bg-white shadow">
  {/* 移动端：汉堡菜单按钮 */}
  <button className="sm:hidden p-4">菜单</button>

  {/* 移动端隐藏，桌面端显示 */}
  <ul className="hidden sm:flex space-x-4">
    <li><a href="#">首页</a></li>
    <li><a href="#">关于</a></li>
    <li><a href="#">联系</a></li>
  </ul>
</nav>`;

  const spacingCode = `// 响应式间距和尺寸

// 宽度响应式
<div className="
  w-full           // 默认：宽度 100%
  sm:w-1/2         // ≥640px：宽度 50%
  md:w-1/3         // ≥768px：宽度 33.33%
  lg:w-1/4         // ≥1024px：宽度 25%
">
  宽度逐渐缩小
</div>

// 最大宽度
<div className="
  w-full           // 宽度 100%
  max-w-sm         // 最大宽度 384px
  sm:max-w-md      // ≥640px：最大宽度 448px
  md:max-w-lg      // ≥768px：最大宽度 512px
  lg:max-w-2xl     // ≥1024px：最大宽度 672px
  xl:max-w-6xl     // ≥1280px：最大宽度 1152px
  mx-auto          // 水平居中
">
  内容居中，最大宽度随屏幕增大
</div>

// 高度响应式
<div className="
  h-32            // 默认：高度 128px
  md:h-48         // ≥768px：高度 192px
  lg:h-64         // ≥1024px：高度 256px
">
  高度随屏幕增大
</div>`;

  const responsiveCardCode = `// 响应式卡片组件示例

<div className="
  p-4             // 默认：内边距 1rem
  md:p-6          // ≥768px：内边距 1.5rem
  lg:p-8          // ≥1024px：内边距 2rem

  text-sm         // 默认：文字小号
  md:text-base    // ≥768px：文字中号
  lg:text-lg      // ≥1024px：文字大号

  rounded-lg      // 圆角
  shadow-sm       // 阴影

  bg-white        // 背景白色
  dark:bg-gray-800 // 深色模式：背景深灰
">
  <h3 className="
    text-xl        // 默认：标题 20px
    md:text-2xl    // ≥768px：标题 24px
    lg:text-3xl    // ≥1024px：标题 30px
    font-bold
    mb-2
  ">
    响应式卡片
  </h3>

  <p className="
    text-gray-600  // 默认：灰色文字
    dark:text-gray-300 // 深色模式：浅灰文字
    mb-4
  ">
    这个卡片会根据屏幕大小调整间距、字体大小等内容
  </p>

  <button className="
    w-full          // 默认：按钮宽度 100%
    sm:w-auto       // ≥640px：按钮宽度自动
    px-4
    py-2
    bg-blue-600
    text-white
    rounded
    hover:bg-blue-700
    transition-colors
  ">
    按钮
  </button>
</div>`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            02. 响应式设计
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Tailwind CSS 提供简单直观的响应式工具类，通过前缀 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">sm:</code>、
            <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">md:</code>、
            <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">lg:</code> 等实现响应式设计。
            只需在工具类前添加断点前缀，即可针对不同屏幕尺寸应用不同样式。
          </p>
        </div>

        {/* 断点演示 */}
        <DemoContainer
          title="断点响应演示"
          description="调整浏览器窗口大小观察变化"
        >
          <div className="
            bg-gradient-to-r from-purple-500 to-pink-500
            text-white
            p-4
            sm:p-6
            md:p-8
            lg:p-12
            xl:p-16
            text-center
            rounded-lg
            transition-all
          ">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">
              内边距和字体大小随屏幕增大
            </p>
            <p className="text-xs sm:text-sm md:text-base mt-2">
              当前屏幕 ≥ {windowWidth}px
            </p>
          </div>
        </DemoContainer>

        {/* 网格演示 */}
        <DemoContainer
          title="响应式网格"
          description="列数随屏幕大小变化：移动端 1 列 → 小屏幕 2 列 → 中等屏幕 3 列 → 大屏幕 4 列"
        >
          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-4
          ">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <div key={item} className="bg-cyan-500 text-white p-4 rounded-lg text-center">
                Item {item}
              </div>
            ))}
          </div>
        </DemoContainer>

        {/* 布局切换演示 */}
        <DemoContainer
          title="响应式布局切换"
          description="移动端垂直堆叠 → 桌面端水平排列"
        >
          <div className="
            flex
            flex-col
            sm:flex-row
            gap-4
          ">
            <div className="bg-green-500 text-white p-6 rounded-lg flex-1">
              <h3 className="font-bold text-lg mb-2">左侧内容</h3>
              <p className="text-sm">在移动端显示在上方，桌面端显示在左侧</p>
            </div>
            <div className="bg-blue-500 text-white p-6 rounded-lg flex-1">
              <h3 className="font-bold text-lg mb-2">右侧内容</h3>
              <p className="text-sm">在移动端显示在下方，桌面端显示在右侧</p>
            </div>
          </div>
        </DemoContainer>

        {/* 断点代码 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📱 Tailwind 断点
          </h2>
          <CodeBlock code={breakpointsCode} language="css" />
        </div>

        {/* 网格系统 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📐 响应式网格
          </h2>
          <CodeBlock code={gridSystemCode} language="jsx" />
        </div>

        {/* 显示隐藏 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            👁️ 显示/隐藏控制
          </h2>
          <CodeBlock code={hiddenVisibleCode} language="jsx" />
        </div>

        {/* 间距响应 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📏 响应式间距
          </h2>
          <CodeBlock code={spacingCode} language="jsx" />
        </div>

        {/* 综合示例 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💎 综合响应式卡片
          </h2>
          <CodeBlock code={responsiveCardCode} language="jsx" />
        </div>

        {/* 最佳实践 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            📌 响应式设计最佳实践
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
            <li>✓ 移动端优先设计（从最小屏幕开始）</li>
            <li>✓ 合理使用断点，不要过度细分</li>
            <li>✓ 内容优先，考虑在小屏幕上的可读性</li>
            <li>✓ 测试所有断点，确保样式正确</li>
            <li>✓ 使用隐藏/显示工具类优化移动端体验</li>
            <li>✓ 图片和视频也要响应式（使用 max-w-full h-auto）</li>
          </ul>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-5/01-utilities"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: 工具类基础
          </Link>
          <Link
            href="/learn/phase-5/03-dark-mode"
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: 深色模式 →
          </Link>
        </div>
      </div>
    </div>
  );
}
