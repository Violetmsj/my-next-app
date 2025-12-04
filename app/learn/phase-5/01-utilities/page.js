/**
 * Tailwind CSS - 工具类基础
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function UtilitiesPage() {
  const navigationItems = [
    { label: 'Phase 5 概览', href: '/learn/phase-5' },
    { label: '工具类基础', href: '/learn/phase-5/01-utilities' },
    { label: '响应式设计', href: '/learn/phase-5/02-responsive' },
    { label: '深色模式', href: '/learn/phase-5/03-dark-mode' },
    { label: '自定义配置', href: '/learn/phase-5/04-custom-config' },
    { label: '布局模式', href: '/learn/phase-5/05-layouts' }
  ];

  const [activeTab, setActiveTab] = useState('spacing');

  const spacingCode = `// 间距 (Spacing)
// 边距和内边距

// 快捷方式：
// m - margin
// p - padding
// t - top, r - right, b - bottom, l - left
// x - horizontal (left + right)
// y - vertical (top + bottom)

// 例子：
<div className="m-4">margin: 1rem</div>
<div className="mx-8">margin-left & margin-right: 2rem</div>
<div className="my-4">margin-top & margin-bottom: 1rem</div>

<div className="p-4">padding: 1rem</div>
<div className="px-8">padding-left & padding-right: 2rem</div>
<div className="py-4">padding-top & padding-bottom: 1rem</div>

// 数值对应：
// 0 = 0px, 1 = 0.25rem, 2 = 0.5rem, 4 = 1rem
// 8 = 2rem, 12 = 3rem, 16 = 4rem, 20 = 5rem`;

  const typographyCode = `// 字体 (Typography)
// 字体大小、字重、行高

// 字体大小
<p className="text-xs">extra small (12px)</p>
<p className="text-sm">small (14px)</p>
<p className="text-base">base (16px)</p>
<p className="text-lg">large (18px)</p>
<p className="text-xl">extra large (20px)</p>
<p className="text-2xl">2xl (24px)</p>
<p className="text-4xl">4xl (36px)</p>
<p className="text-6xl">6xl (48px)</p>

// 字重
<p className="font-thin">thin (100)</p>
<p className="font-light">light (300)</p>
<p className="font-normal">normal (400)</p>
<p className="font-medium">medium (500)</p>
<p className="font-semibold">semibold (600)</p>
<p className="font-bold">bold (700)</p>
<p className="font-black">black (900)</p>

// 行高
<p className="leading-none">leading-none</p>
<p className="leading-tight">leading-tight</p>
<p className="leading-normal">leading-normal</p>
<p className="leading-loose">leading-loose</p>

// 文本对齐
<p className="text-left">左对齐</p>
<p className="text-center">居中</p>
<p className="text-right">右对齐</p>

// 文本装饰
<p className="underline">下划线</p>
<p className="line-through">删除线</p>
<p className="no-underline">无装饰</p>`;

  const colorsCode = `// 颜色 (Colors)
// 文本色、背景色、边框色

// 文本颜色
<p className="text-red-500">text-red-500</p>
<p className="text-blue-600">text-blue-600</p>
<p className="text-green-700">text-green-700</p>

// 背景颜色
<div className="bg-red-500">bg-red-500</div>
<div className="bg-blue-600">bg-blue-600</div>
<div className="bg-green-700">bg-green-700</div>

// 边框颜色
<div className="border-2 border-gray-300">border-gray-300</div>
<div className="border-2 border-blue-500">border-blue-500</div>

// 透明度
<p className="text-red-500/50">text-red-500/50 (50% 透明)</p>
<div className="bg-blue-500/30">bg-blue-500/30</div>

// 语义化颜色
<p className="text-primary">text-primary</p>
<p className="text-secondary">text-secondary</p>
<div className="bg-success">bg-success</div>
<div className="bg-warning">bg-warning</div>
<div className="bg-error">bg-error</div>`;

  const borderCode = `// 边框 (Border)
// 边框宽度、圆角、阴影

// 边框宽度
<div className="border">border (1px)</div>
<div className="border-2">border-2</div>
<div className="border-4">border-4</div>
<div className="border-8">border-8</div>

// 单侧边框
<div className="border-t">border-top</div>
<div className="border-r">border-right</div>
<div className="border-b">border-bottom</div>
<div className="border-l">border-left</div>

// 圆角 (Border Radius)
<div className="rounded">rounded (0.25rem)</div>
<div className="rounded-md">rounded-md (0.375rem)</div>
<div className="rounded-lg">rounded-lg (0.5rem)</div>
<div className="rounded-xl">rounded-xl (0.75rem)</div>
<div className="rounded-full">rounded-full (9999px)</div>

// 阴影 (Shadow)
<div className="shadow-sm">shadow-sm</div>
<div className="shadow">shadow</div>
<div className="shadow-md">shadow-md</div>
<div className="shadow-lg">shadow-lg</div>
<div className="shadow-xl">shadow-xl</div>

// 组合示例
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
  按钮示例
</button>`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            01. 工具类基础
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Tailwind CSS 提供大量工具类，覆盖间距、字体、颜色、边框、阴影等所有常见样式。
            熟练掌握这些工具类是使用 Tailwind 的基础。
          </p>
        </div>

        {/* 导航标签 */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { id: 'spacing', label: '间距' },
            { id: 'typography', label: '字体' },
            { id: 'colors', label: '颜色' },
            { id: 'borders', label: '边框' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-cyan-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 间距演示 */}
        <DemoContainer
          title="间距演示"
          description="margin 和 padding 工具类"
        >
          <div className="space-y-4">
            <div className="bg-blue-500 text-white p-4">
              p-4 (padding: 1rem)
            </div>
            <div className="bg-green-500 text-white px-8 py-4">
              px-8 py-4
            </div>
            <div className="bg-purple-500 text-white mx-auto w-1/2 text-center">
              mx-auto (水平居中)
            </div>
          </div>
        </DemoContainer>

        {/* 字体演示 */}
        <DemoContainer
          title="字体演示"
          description="字体大小和字重"
        >
          <div className="space-y-3">
            <p className="text-6xl font-bold">Text 6xl Bold</p>
            <p className="text-4xl font-semibold">Text 4xl Semibold</p>
            <p className="text-2xl font-medium">Text 2xl Medium</p>
            <p className="text-xl font-normal">Text xl Normal</p>
            <p className="text-base">Text base</p>
            <p className="text-sm text-gray-600">Text sm (灰色)</p>
            <p className="text-xs text-center">Text xs (居中)</p>
          </div>
        </DemoContainer>

        {/* 颜色演示 */}
        <DemoContainer
          title="颜色演示"
          description="文本色、背景色、边框色"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-red-500 text-white p-4 rounded">Red 500</div>
            <div className="bg-blue-500 text-white p-4 rounded">Blue 500</div>
            <div className="bg-green-500 text-white p-4 rounded">Green 500</div>
            <div className="bg-yellow-500 text-white p-4 rounded">Yellow 500</div>
            <div className="bg-purple-500 text-white p-4 rounded">Purple 500</div>
            <div className="bg-pink-500 text-white p-4 rounded">Pink 500</div>
            <div className="bg-indigo-500 text-white p-4 rounded">Indigo 500</div>
            <div className="bg-gray-500 text-white p-4 rounded">Gray 500</div>
          </div>
        </DemoContainer>

        {/* 按钮组合演示 */}
        <DemoContainer
          title="按钮样式组合"
          description="使用多个工具类构建按钮"
        >
          <div className="flex gap-4 flex-wrap">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">
              Primary
            </button>
            <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Secondary
            </button>
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all hover:shadow-xl">
              Danger
            </button>
            <button className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
              Outline
            </button>
          </div>
        </DemoContainer>

        {/* 代码示例 */}
        {activeTab === 'spacing' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              💡 间距工具类
            </h2>
            <CodeBlock code={spacingCode} language="css" />
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📝 字体工具类
            </h2>
            <CodeBlock code={typographyCode} language="css" />
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🎨 颜色工具类
            </h2>
            <CodeBlock code={colorsCode} language="css" />
          </div>
        )}

        {activeTab === 'borders' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ⬛ 边框和阴影
            </h2>
            <CodeBlock code={borderCode} language="css" />
          </div>
        )}

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-5"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 返回 Phase 5
          </Link>
          <Link
            href="/learn/phase-5/02-responsive"
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: 响应式设计 →
          </Link>
        </div>
      </div>
    </div>
  );
}
