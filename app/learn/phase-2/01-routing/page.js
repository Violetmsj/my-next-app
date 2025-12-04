/**
 * Next.js App Router - 基础路由学习
 *
 * 了解Next.js的文件即路由系统
 * 学习app目录结构、页面创建、路由映射
 */

import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function RoutingPage() {
  const navigationItems = [
    { label: '概览', href: '/learn/phase-2' },
    { label: '基础路由', href: '/learn/phase-2/01-routing' },
    { label: 'Layouts', href: '/learn/phase-2/02-layouts' },
    { label: '动态路由', href: '/learn/phase-2/03-dynamic-routing' },
    { label: '数据获取', href: '/learn/phase-2/04-data-fetching' },
    { label: '导航', href: '/learn/phase-2/05-navigation' },
    { label: 'Metadata', href: '/learn/phase-2/06-metadata' }
  ];

  const fileStructureCode = `app/
├── layout.js           # 根布局
├── page.js             # 首页 (/)
├── globals.css         # 全局样式
├── about/
│   ├── page.js         # /about
│   └── [id]/
│       └── page.js     # /about/[id]
├── blog/
│   ├── page.js         # /blog
│   ├── [slug]/
│   │   └── page.js     # /blog/[slug]
│   └── page.js         # /blog
└── api/
    └── users/
        └── route.js    # /api/users

# 目录结构自动映射为路由路径`;

  const basicPageCode = `// app/page.js - 首页
export default function HomePage() {
  return (
    <div>
      <h1>欢迎来到首页</h1>
      <p>这是 Next.js App Router 示例</p>
    </div>
  );
}

// app/about/page.js - 关于页
export default function AboutPage() {
  return (
    <div>
      <h1>关于我们</h1>
      <p>这里介绍我们的产品或服务</p>
    </div>
  );
}`;

  const serverComponentCode = `// 默认情况下，App Router 中的页面是 Server Components
// app/page.js - 服务器组件（默认）
export default function HomePage() {
  // 可以在此处直接访问数据库、API等
  const data = fetch('https://api.example.com/data');

  return (
    <div>
      <h1>首页</h1>
      <p>这是一个服务器组件</p>
    </div>
  );
}

// 如果需要客户端交互，添加 "use client" 指令
// app/counter/page.js
'use client';

import { useState } from 'react';

export default function CounterPage() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>计数器</h1>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}`;

  const routeParamsCode = `// app/blog/[slug]/page.js - 动态路由参数
// 获取 URL 参数: /blog/hello-world
export default function BlogPost({ params }) {
  const { slug } = params;

  return (
    <article>
      <h1>博客文章: {slug}</h1>
      <p>这是文章内容...</p>
    </article>
  );
}

// app/users/[id]/page.js - 用户详情页
// 获取 URL 参数: /users/123
export default function UserPage({ params }) {
  const { id } = params;

  return (
    <div>
      <h1>用户 ID: {id}</h1>
      <p>用户详情信息...</p>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            01. 基础路由
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Next.js App Router的核心概念：<strong>文件即路由</strong>。
            app目录中的文件结构直接映射为URL路径，无需额外配置路由表。
          </p>
        </div>

        {/* 目录结构 */}
        <DemoContainer
          title="文件结构与路由映射"
          description="app目录中的文件自动映射为对应的URL路径"
        >
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{fileStructureCode}</pre>
          </div>
        </DemoContainer>

        {/* 基础页面 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 创建基础页面
          </h2>
          <CodeBlock code={basicPageCode} language="javascript" />
        </div>

        {/* 服务器组件 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🖥️ Server Components vs Client Components
          </h2>
          <CodeBlock code={serverComponentCode} language="javascript" />
        </div>

        {/* 路由参数 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔗 获取路由参数
          </h2>
          <CodeBlock code={routeParamsCode} language="javascript" />
        </div>

        {/* 重要提示 */}
        <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-3">
            ⚠️ 重要提示
          </h3>
          <ul className="text-sm text-yellow-800 dark:text-yellow-400 space-y-2">
            <li>• app目录是Next.js 13+的新特性，替代了pages目录</li>
            <li>• 默认情况下，组件是Server Components，性能更优</li>
            <li>• 需要交互的组件必须添加"use client"指令</li>
            <li>• 文件名page.js自动映射为路由，无需额外配置</li>
            <li>• 目录名即URL路径，文件名不影响路径</li>
          </ul>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-2"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 返回 Phase 2
          </Link>
          <Link
            href="/learn/phase-2/02-layouts"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: Layouts →
          </Link>
        </div>
      </div>
    </div>
  );
}
