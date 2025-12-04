/**
 * Next.js 进阶 - Streaming 流式渲染
 *
 * 学习流式渲染：渐进式渲染、Suspense、流式数据获取
 */

import Link from 'next/link';
import { Suspense } from 'react';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

// 模拟慢速数据获取
async function fetchSlowData() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { data: '这是慢速数据', timestamp: Date.now() };
}

async function fetchProductData() {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { products: ['产品 A', '产品 B', '产品 C'] };
}

async function fetchUserStats() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { views: 1234, likes: 567, shares: 89 };
}

// 流式组件 - 使用 Suspense
function SlowData() {
  const data = fetchSlowData();
  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
      <p className="text-blue-800 dark:text-blue-400">{data.data}</p>
    </div>
  );
}

export default function StreamingPage() {
  const navigationItems = [
    { label: 'Phase 4 概览', href: '/learn/phase-4' },
    { label: 'API Routes', href: '/learn/phase-4/01-api-routes' },
    { label: 'Server Actions', href: '/learn/phase-4/02-server-actions' },
    { label: 'Middleware', href: '/learn/phase-4/03-middleware' },
    { label: 'Caching', href: '/learn/phase-4/04-caching' },
    { label: 'Streaming', href: '/learn/phase-4/05-streaming' }
  ];

  const streamingCode = `// Streaming Server Components
// app/page.js

import { Suspense } from 'react';

// 模拟慢速数据获取
async function getSlowData() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return { message: '慢速数据加载完成' };
}

async function getFastData() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { message: '快速数据加载完成' };
}

// 流式组件 - 先渲染快的数据
function FastComponent() {
  return <div>快速数据: {(new Date()).toLocaleTimeString()}</div>;
}

// 阻塞组件 - 等待慢速数据
async function SlowComponent() {
  const data = await getSlowData();
  return <div>{data.message}</div>;
}

// 使用 Suspense 实现流式渲染
export default async function Page() {
  return (
    <div>
      <h1>Streaming 示例</h1>

      {/* 快数据立即显示 */}
      <FastComponent />

      {/* 慢数据异步加载 */}
      <Suspense fallback={<p>加载中...</p>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}

// 流式渲染优势：
// - 用户可以立即看到快的内容
// - 慢的内容加载时显示 loading 状态
// - 提升首次内容绘制 (FCP) 速度
// - 更好的用户体验`;

  const suspenseCode = `// Suspense 进阶用法

// 1. 多个异步组件
import { Suspense } from 'react';

function UserProfile({ userId }) {
  const user = fetchUser(userId); // 模拟 API 调用
  return <div>{user.name}</div>;
}

function UserPosts({ userId }) {
  const posts = fetchUserPosts(userId); // 模拟 API 调用
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}

function UserStats({ userId }) {
  const stats = fetchUserStats(userId);
  return <div>关注者: {stats.followers}</div>;
}

export default async function UserPage({ userId }) {
  return (
    <div>
      <UserProfile userId={userId} />

      <Suspense fallback={<div>加载文章中...</div>}>
        <UserPosts userId={userId} />
      </Suspense>

      <Suspense fallback={<div>加载统计中...</div>}>
        <UserStats userId={userId} />
      </Suspense>
    </div>
  );
}

// 2. 错误边界
import { Suspense } from 'react';

function ErrorBoundary({ children }) {
  return (
    <div>
      {children}
      <p>组件出错时显示</p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <ErrorBoundary>
        <SlowComponent />
      </ErrorBoundary>
    </Suspense>
  );
}

// 3. 流式页面布局
// app/layout.js

import { Suspense } from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        <header>头部导航</header>

        <Suspense fallback={<div>加载主要内容...</div>}>
          {children}
        </Suspense>

        <footer>页脚</footer>
      </body>
    </html>
  );
}`;

  const streamingApiCode = `// 流式数据获取 API

// 1. 生成器函数
async function* generateItems() {
  for (let i = 1; i <= 10; i++) {
    await new Promise(resolve => setTimeout(resolve, 500));
    yield { id: i, value: \`Item \${i}\` };
  }
}

// 流式渲染列表
async function StreamingList() {
  return (
    <div>
      {/* 异步生成器不会阻塞渲染 */}
      <ul>
        {generateItems()}
      </ul>
    </div>
  );
}

// 2. ReadableStream API
import { NextResponse } from 'next/server';

// 流式 API 响应
export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      // 发送数据
      controller.enqueue('data: 第一批数据\\n\\n');

      setTimeout(() => {
        controller.enqueue('data: 第二批数据\\n\\n');
      }, 1000);

      setTimeout(() => {
        controller.enqueue('data: 完成\\n\\n');
        controller.close();
      }, 2000);
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

// 客户端消费流式数据
'use client';

import { useEffect, useState } from 'react';

function StreamingData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/streaming');

    eventSource.onmessage = (event) => {
      setData(prev => [...prev, event.data]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// 3. 流式 JSON
import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    users: [
      { id: 1, name: '用户 1' },
      { id: 2, name: '用户 2' },
      { id: 3, name: '用户 3' }
    ]
  };

  return NextResponse.json(data);
}`;

  const useCasesCode = `// Streaming 使用场景

// 1. 大型页面分块加载
async function LargeDashboard() {
  return (
    <div>
      {/* 快数据立即显示 */}
      <div className="stats-grid">
        <QuickStats />
      </div>

      {/* 慢数据分块加载 */}
      <div className="content-grid">
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<TableSkeleton />}>
          <RecentOrders />
        </Suspense>

        <Suspense fallback={<Skeleton />}>
          <UserActivity />
        </Suspense>
      </div>
    </div>
  );
}

// 2. 实时数据流
function RealTimeData() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/real-time');

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages(prev => [newMessage, ...prev]);
    };

    return () => eventSource.close();
  }, []);

  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}>{msg.text}</div>
      ))}
    </div>
  );
}

// 3. 渐进式图片加载
function ProgressiveImage({ src, placeholder }) {
  return (
    <div>
      {placeholder && (
        <img src={placeholder} className="blur-sm" />
      )}
      <img
        src={src}
        onLoad={(e) => {
          e.target.classList.remove('blur-sm');
        }}
        className="transition-all duration-300"
      />
    </div>
  );
}

// 4. 无限滚动
'use client';

import { useEffect, useState } from 'react';

function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    const newItems = await fetchMoreItems(items.length);
    setItems(prev => [...prev, ...newItems]);
    if (newItems.length < 10) setHasMore(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop
          >= document.documentElement.offsetHeight - 1000) {
        if (hasMore) loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  return (
    <div>
      {items.map(item => <div key={item.id}>{item.title}</div>)}
      {hasMore && <div>加载中...</div>}
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            05. Streaming - 流式渲染
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            流式渲染允许页面内容分块逐步加载，用户可以立即看到快的数据，
            慢的数据异步加载后追加显示。大幅提升页面首次渲染速度。
          </p>
        </div>

        {/* Streaming 演示 */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            ⚡ Streaming 优势
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-400 space-y-2">
            <li>• <strong>更快的内容可见时间</strong> - 快数据立即显示</li>
            <li>• <strong>更好的用户体验</strong> - 无需等待整个页面加载</li>
            <li>• <strong>服务器资源优化</strong> - 并行处理多个数据请求</li>
            <li>• <strong>自动优化</strong> - 基于 Suspense 边界自动流式传输</li>
          </ul>
        </div>

        {/* 基础 Streaming */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 基础 Streaming
          </h2>
          <CodeBlock code={streamingCode} language="javascript" />
        </div>

        {/* Suspense 进阶 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🎣 Suspense 进阶用法
          </h2>
          <CodeBlock code={suspenseCode} language="javascript" />
        </div>

        {/* 流式 API */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔌 流式数据获取 API
          </h2>
          <CodeBlock code={streamingApiCode} language="javascript" />
        </div>

        {/* 使用场景 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🎯 使用场景
          </h2>
          <CodeBlock code={useCasesCode} language="javascript" />
        </div>

        {/* 选择指南 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            📊 渲染策略选择
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">使用 Streaming 当：</h4>
              <ul className="text-blue-800 dark:text-blue-400 space-y-1">
                <li>• 页面有快慢混合内容</li>
                <li>• 大型仪表盘和数据密集型页面</li>
                <li>• 需要渐进式加载体验</li>
                <li>• 多块独立内容可以并行加载</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">使用静态渲染当：</h4>
              <ul className="text-blue-800 dark:text-blue-400 space-y-1">
                <li>• 页面内容相对简单</li>
                <li>• 所有内容加载速度相近</li>
                <li>• 需要完全加载后显示</li>
                <li>• SEO 需要完整内容</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-4/04-caching"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: Caching
          </Link>
          <Link
            href="/learn/phase-5"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            下一阶段: Tailwind CSS →
          </Link>
        </div>
      </div>
    </div>
  );
}
