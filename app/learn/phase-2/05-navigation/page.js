/**
 * Next.js App Router - 导航与链接学习
 *
 * 学习 Next.js 的导航系统：Link 组件、编程式导航、导航状态管理
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function NavigationPage() {
  const navigationItems = [
    { label: '概览', href: '/learn/phase-2' },
    { label: '基础路由', href: '/learn/phase-2/01-routing' },
    { label: 'Layouts', href: '/learn/phase-2/02-layouts' },
    { label: '动态路由', href: '/learn/phase-2/03-dynamic-routing' },
    { label: '数据获取', href: '/learn/phase-2/04-data-fetching' },
    { label: '导航', href: '/learn/phase-2/05-navigation' },
    { label: 'Metadata', href: '/learn/phase-2/06-metadata' }
  ];

  const [currentPath, setCurrentPath] = useState('/learn/phase-2/05-navigation');

  const basicLinkCode = `// 基础 Link 组件用法
import Link from 'next/link';

// 1. 基础链接
<Link href="/">
  首页
</Link>

// 2. 带查询参数的链接
<Link href="/products?category=electronics">
  电子产品
</Link>

// 3. 链接到动态路由
<Link href="/blog/nextjs-guide">
  Next.js 指南
</Link>

// 4. 带状态数据的链接
<Link
  href={{
    pathname: '/search',
    query: { q: 'react', sort: 'latest' }
  }}
>
  搜索 React 最新文章
</Link>`;

  const programmaticCode = `// 编程式导航
'use client';

import { useRouter } from 'next/navigation';

export default function SearchForm() {
  const router = useRouter();

  const handleSearch = (query) => {
    // 方法 1: 使用 push 方法跳转
    router.push(\`/search?q=\${query}\`);

    // 方法 2: 带状态跳转
    router.push({
      pathname: '/results',
      query: { q: query, filter: 'recent' }
    });

    // 方法 3: 替换当前历史记录
    router.replace('/home');

    // 方法 4: 返回上一页
    router.back();

    // 方法 5: 刷新当前页面
    router.refresh();

    // 方法 6: 预加载页面
    router.prefetch('/about');
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSearch(e.target.search.value);
    }}>
      <input name="search" placeholder="搜索..." />
      <button type="submit">搜索</button>
    </form>
  );
}`;

  const activeLinksCode = `// 高亮当前页面链接
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavMenu() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <nav className="flex gap-4">
      <Link
        href="/"
        className={\`px-4 py-2 rounded \${isActive('/') ? 'bg-blue-600 text-white' : 'text-gray-700'}\`}
      >
        首页
      </Link>

      <Link
        href="/about"
        className={\`px-4 py-2 rounded \${isActive('/about') ? 'bg-blue-600 text-white' : 'text-gray-700'}\`}
      >
        关于
      </Link>

      <Link
        href="/blog"
        className={\`px-4 py-2 rounded \${pathname.startsWith('/blog') ? 'bg-blue-600 text-white' : 'text-gray-700'}\`}
      >
        博客
      </Link>
    </nav>
  );
}`;

  const anchorLinksCode = `// 锚点跳转和滚动
import Link from 'next/link';

// 1. 页面内锚点跳转
<Link href="/docs#installation">
  跳转到安装说明
</Link>

// 2. 同一页面内的锚点
<Link href="#section-1">
  跳转到第一部分
</Link>

// 3. 滚动到指定元素
<Link href="/page#comments" scroll={false}>
  直接跳转到评论区域
</Link>

// 4. 使用 replace 避免锚点添加到历史记录
<Link href="/page#section" replace>
  跳转到部分（不保留历史）
</Link>`;

  const prefetchCode = `// Link 组件自动预加载
import Link from 'next/link';

// 1. 预加载已启用（默认）
// 鼠标悬停时自动预加载页面
<Link href="/dashboard">
  仪表盘
</Link>

// 2. 禁用预加载
<Link href="/dashboard" prefetch={false}>
  仪表盘
</Link>

// 3. 编程式预加载
'use client';

import { useRouter } from 'next/navigation';

export default function PrefetchButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        // 预加载页面
        router.prefetch('/slow-page');
        // 延迟跳转（用户可能还在浏览）
        setTimeout(() => {
          router.push('/slow-page');
        }, 2000);
      }}
    >
      预加载并跳转
    </button>
  );
}

// 4. 在组件挂载时预加载
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function PrefetchOnMount() {
  const router = useRouter();

  useEffect(() => {
    // 组件加载完成后预加载常用页面
    router.prefetch('/products');
    router.prefetch('/pricing');
  }, [router]);

  return <div>内容</div>;
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            05. 导航与链接
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Next.js 提供强大的导航系统，包括 Link 组件进行声明式导航、
            useRouter Hook 实现编程式导航，以及自动预加载优化用户体验。
          </p>
        </div>

        {/* 基础链接 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔗 基础 Link 组件
          </h2>
          <DemoContainer
            title="Link 组件演示"
            description="点击下面的链接体验导航功能"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">基础导航：</h4>
                <div className="flex gap-2 flex-wrap">
                  <Link
                    href="/learn/phase-2"
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                  >
                    返回 Phase 2
                  </Link>
                  <Link
                    href="/learn/phase-1"
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    前往 Phase 1
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">当前路径：</h4>
                <code className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                  {currentPath}
                </code>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">带查询参数的链接：</h4>
                <Link
                  href="/learn/phase-2?tab=overview"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  带参数导航（查看地址栏）
                </Link>
              </div>
            </div>
          </DemoContainer>
          <CodeBlock code={basicLinkCode} language="javascript" />
        </div>

        {/* 编程式导航 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🎯 编程式导航
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            使用 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">useRouter</code> Hook 可以在代码中实现页面跳转。
          </p>
          <CodeBlock code={programmaticCode} language="javascript" />
        </div>

        {/* 活动链接状态 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ✨ 高亮当前页面
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            使用 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">usePathname</code> Hook 可以获取当前路径，实现导航高亮效果。
          </p>
          <CodeBlock code={activeLinksCode} language="javascript" />
        </div>

        {/* 锚点链接 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ⚓ 锚点跳转
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Link 组件支持跳转到页面内的特定位置（锚点）。
          </p>
          <CodeBlock code={anchorLinksCode} language="javascript" />
        </div>

        {/* 预加载 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ⚡ 预加载优化
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Next.js 自动预加载用户可能访问的页面，大幅提升页面加载速度。
          </p>
          <CodeBlock code={prefetchCode} language="javascript" />
        </div>

        {/* 最佳实践 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            📌 导航最佳实践
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
            <li>✓ 优先使用 Link 组件（支持预加载和优化）</li>
            <li>✓ 使用 useRouter 进行编程式导航</li>
            <li>✓ 使用 usePathname 实现导航高亮</li>
            <li>✓ 利用自动预加载提升用户体验</li>
            <li>✓ 表单提交后使用 router.push() 跳转</li>
            <li>✓ 避免在 useEffect 中使用 router.push()（可能导致无限循环）</li>
          </ul>
        </div>

        {/* 使用场景 */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            🎯 导航场景对比
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">Link 组件适用于：</h4>
              <ul className="text-green-800 dark:text-green-400 space-y-1">
                <li>• 页面内的常规导航</li>
                <li>• 菜单、按钮、卡片等 UI 元素</li>
                <li>• 需要预加载的链接</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">useRouter 适用于：</h4>
              <ul className="text-green-800 dark:text-green-400 space-y-1">
                <li>• 表单提交后跳转</li>
                <li>• 条件判断后跳转</li>
                <li>• 需要延迟或动态跳转的场景</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-2/04-data-fetching"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: 数据获取
          </Link>
          <Link
            href="/learn/phase-2/06-metadata"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: Metadata →
          </Link>
        </div>
      </div>
    </div>
  );
}
