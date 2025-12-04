/**
 * Next.js App Router - 数据获取学习
 *
 * 学习 Server Components 和 Client Components 的数据获取策略
 * 了解 fetch API、缓存、异步数据处理
 */

import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

// 模拟数据 - 在 Server Component 中可以直接使用
const serverData = {
  timestamp: new Date().toLocaleString('zh-CN'),
  message: '这是服务器端渲染的数据'
};

export default function DataFetchingPage() {
  const navigationItems = [
    { label: '概览', href: '/learn/phase-2' },
    { label: '基础路由', href: '/learn/phase-2/01-routing' },
    { label: 'Layouts', href: '/learn/phase-2/02-layouts' },
    { label: '动态路由', href: '/learn/phase-2/03-dynamic-routing' },
    { label: '数据获取', href: '/learn/phase-2/04-data-fetching' },
    { label: '导航', href: '/learn/phase-2/05-navigation' },
    { label: 'Metadata', href: '/learn/phase-2/06-metadata' }
  ];

  const serverFetchCode = `// Server Component 中可以直接获取数据
// app/page.js

// 方式 1: 直接在 Server Component 中使用 fetch
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    // 可以设置缓存策略
    cache: 'no-store' // 不缓存，实时获取
    // cache: 'force-cache' // 缓存（默认）
    // next: { revalidate: 3600 } // 1小时重新验证
  });

  if (!res.ok) {
    throw new Error('获取数据失败');
  }

  return res.json();
}

export default async function HomePage() {
  // 等待数据获取完成
  const data = await getData();

  return (
    <div>
      <h1>首页</h1>
      <p>{data.message}</p>
    </div>
  );
}

// 方式 2: 使用 fetch 的快捷选项
export default async function UserPage() {
  const res = await fetch('https://api.example.com/users/1', {
    next: { revalidate: 60 } // 每60秒重新获取
  });

  const user = await res.json();

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`;

  const clientFetchCode = `// Client Component 中使用 useEffect 获取数据
// app/users/page.js
'use client';

import { useState, useEffect } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) {
          throw new Error('获取失败');
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>错误: {error}</div>;
  }

  return (
    <div>
      <h1>用户列表</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`;

  const cachingCode = `// 缓存策略示例
// 1. 静态数据 - 长期缓存
export default async function StaticPage() {
  const res = await fetch('https://api.example.com/config', {
    next: { revalidate: 86400 } // 24小时缓存
  });
  const data = await res.json();
  return <div>{data.version}</div>;
}

// 2. 动态数据 - 不缓存
export default async function DynamicPage() {
  const res = await fetch('https://api.example.com/live-stats', {
    cache: 'no-store' // 每次请求都重新获取
  });
  const data = await res.json();
  return <div>在线人数: {data.online}</div>;
}

// 3. 按需重新验证
export default async function IncrementalPage() {
  const res = await fetch('https://api.example.com/news', {
    next: { revalidate: 300 } // 5分钟缓存，5分钟后更新
  });
  const news = await res.json();
  return <div>{news.title}</div>;
}`;

  const asyncPatternsCode = `// 异步数据处理模式
// 1. 数据获取与错误处理
async function fetchWithErrorHandling(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(\`HTTP 错误: \${res.status}\`);
    }

    return await res.json();
  } catch (error) {
    console.error('数据获取失败:', error);
    throw error;
  }
}

// 2. 并行数据获取
export default async function ProductPage({ params }) {
  // 并行获取多个数据源
  const [product, reviews, recommendations] = await Promise.all([
    fetch(\`/api/products/\${params.id}\`).then(r => r.json()),
    fetch(\`/api/products/\${params.id}/reviews\`).then(r => r.json()),
    fetch('/api/recommendations').then(r => r.json())
  ]);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <h2>评论</h2>
      <ul>{reviews.map(r => <li key={r.id}>{r.content}</li>)}</ul>
      <h2>推荐</h2>
      <ul>{recommendations.map(p => <li key={p.id}>{p.name}</li>)}</ul>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            04. 数据获取
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Next.js App Router 支持 Server Components 和 Client Components 两种数据获取方式。
            Server Components 默认在服务器端渲染，性能更优；Client Components 需要通过 Hooks 获取数据。
          </p>
        </div>

        {/* Server Component 数据获取 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🖥️ Server Components 数据获取
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            默认情况下，App Router 中的页面是 Server Components。可以在组件内部直接使用 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">fetch</code> 获取数据，无需额外配置。
          </p>
          <DemoContainer
            title="服务器端数据示例"
            description="当前页面本身就是 Server Component，展示服务器渲染的数据"
          >
            <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm">
              <pre>{JSON.stringify(serverData, null, 2)}</pre>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              💡 这个数据在服务器端生成，时间戳为服务器时间
            </p>
          </DemoContainer>
          <CodeBlock code={serverFetchCode} language="javascript" />
        </div>

        {/* Client Component 数据获取 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💻 Client Components 数据获取
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            需要用户交互或实时更新的页面可以使用 Client Components。通过 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">useEffect</code> Hook 在组件挂载后获取数据。
          </p>
          <CodeBlock code={clientFetchCode} language="javascript" />
        </div>

        {/* 缓存策略 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ⚡ 缓存策略
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Next.js 提供灵活的缓存控制，可根据数据特性选择合适的缓存策略。
          </p>
          <CodeBlock code={cachingCode} language="javascript" />
        </div>

        {/* 异步模式 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔄 异步数据处理模式
          </h2>
          <CodeBlock code={asyncPatternsCode} language="javascript" />
        </div>

        {/* 使用场景 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            📌 数据获取最佳实践
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
            <li>✓ 优先使用 Server Components（性能更好）</li>
            <li>✓ 静态内容使用 <code>next: {'{ revalidate: ... }'}</code> 缓存</li>
            <li>✓ 实时数据使用 <code>cache: 'no-store'</code></li>
            <li>✓ 使用 <code>Promise.all</code> 并行获取多个数据源</li>
            <li>✓ Client Components 中添加加载和错误状态</li>
            <li>✓ 敏感数据（如 API Key）不要暴露给 Client Components</li>
          </ul>
        </div>

        {/* 选择指南 */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            🎯 何时使用 Server vs Client Components
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">Server Components 适用于：</h4>
              <ul className="text-green-800 dark:text-green-400 space-y-1">
                <li>• 博客文章、文档页面</li>
                <li>• 产品详情、电商页面</li>
                <li>• 数据展示页面（无需交互）</li>
                <li>• SEO 优化页面</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">Client Components 适用于：</h4>
              <ul className="text-green-800 dark:text-green-400 space-y-1">
                <li>• 需要交互的表单</li>
                <li>• 实时更新的数据</li>
                <li>• 用户输入处理</li>
                <li>• 浏览器 API 依赖</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-2/03-dynamic-routing"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: 动态路由
          </Link>
          <Link
            href="/learn/phase-2/05-navigation"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: 导航与链接 →
          </Link>
        </div>
      </div>
    </div>
  );
}
