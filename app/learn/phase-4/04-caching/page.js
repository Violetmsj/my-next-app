/**
 * Next.js 进阶 - Caching 缓存策略
 *
 * 学习 Next.js 的多层缓存系统：
 * 1. 请求缓存 (Request Memoization)
 * 2. 数据缓存 (Data Cache)
 * 3. 完整页面缓存 (Full-Page Cache)
 */

import Link from 'next/link';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function CachingPage() {
  const navigationItems = [
    { label: 'Phase 4 概览', href: '/learn/phase-4' },
    { label: 'API Routes', href: '/learn/phase-4/01-api-routes' },
    { label: 'Server Actions', href: '/learn/phase-4/02-server-actions' },
    { label: 'Middleware', href: '/learn/phase-4/03-middleware' },
    { label: 'Caching', href: '/learn/phase-4/04-caching' },
    { label: 'Streaming', href: '/learn/phase-4/05-streaming' }
  ];

  const dataCacheCode = `// 数据缓存 - fetch 默认缓存
// app/page.js

export default async function HomePage() {
  // 静态缓存（默认）- 不会在构建后更新
  const staticData = await fetch('https://api.example.com/config');

  // 动态缓存 - 每 60 秒重新验证
  const productData = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 }
  });

  // 不缓存 - 每次请求都获取最新数据
  const liveData = await fetch('https://api.example.com/live-stats', {
    cache: 'no-store'
  });

  return (
    <div>
      <h1>产品列表</h1>
      {/* 渲染数据 */}
    </div>
  );
}

// fetch 缓存选项详解：
// 1. 默认 (cache: 'force-cache')
//    - 永久缓存，直到重新部署
//    - 适用于：配置文件、静态数据
//
// 2. 重新验证 (next: { revalidate: 60 })
//    - 缓存 60 秒，过期后重新获取
//    - 适用于：博客文章、产品列表
//
// 3. 不缓存 (cache: 'no-store')
//    - 每次请求都获取新数据
//    - 适用于：用户数据、实时统计`;

  const revalidateCode = `// 手动重新验证缓存
// import { revalidatePath, revalidateTag } from 'next/cache';

// // 重新验证特定路径
// export async function updateProduct(id, data) {
//   // 更新数据库
//   await db.products.update({ where: { id }, data });

//   // 重新验证缓存
//   revalidatePath('/products');
//   revalidatePath(\`/products/\${id}\`);

// // 使用标签缓存
// export default async function ProductPage() {
//   const products = await fetch('https://api.example.com/products', {
//     next: { tags: ['products'] }
//   });

//   return <div>{/* 渲染产品 */}</div>;
// }

// // 更新时清理标签
// export async function createProduct(data) {
//   await db.products.create({ data });

//   // 清理 products 标签的所有缓存
//   revalidateTag('products');
// }

// // 自动重新验证
// export async function ScheduledUpdate() {
//   const data = await fetch('https://api.example.com/data', {
//     next: { revalidate: 3600 } // 1 小时自动更新
//   });

//   return <div>{/* 渲染数据 */}</div>;
// }`;

  const routeCacheCode = `// 路由缓存 (Router Cache)
// 自动缓存已访问的页面，提升导航速度

// 1. 自动缓存
// 用户访问 /products -> 缓存页面内容
// 用户访问 /products/123 -> 缓存页面内容
// 用户返回 /products -> 使用缓存，无需重新渲染

// 2. 清理路由缓存
import { useRouter } from 'next/navigation';

'use client';

function ProductList({ products }) {
  const router = useRouter();

  const handleUpdate = async (id) => {
    // 更新数据
    await updateProduct(id);

    // 清理缓存，强制重新渲染
    router.refresh();
  };

  return (
    <div>
      {products.map(p => (
        <button key={p.id} onClick={() => handleUpdate(p.id)}>
          更新
        </button>
      ))}
    </div>
  );
}

// 3. 预加载页面
import Link from 'next/link';

function PreloadExample() {
  return (
    <div>
      {/* 鼠标悬停时预加载 */}
      <Link href="/products">
        产品列表
      </Link>

      {/* 预加载特定页面 */}
      <Link href="/products" prefetch={true}>
        产品列表
      </Link>

      {/* 禁用预加载 */}
      <Link href="/products" prefetch={false}>
        产品列表
      </Link>
    </div>
  );
}`;

  const memoizationCode = `// 请求缓存 (Request Memoization)
// 相同请求在单次渲染中只会执行一次

// app/page.js

async function getUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}

export default async function UserPage({ userId }) {
  // 即使调用 3 次，API 也只会被请求 1 次
  const user1 = await getUser(userId);
  const user2 = await getUser(userId);
  const user3 = await getUser(userId);

  return (
    <div>
      <h1>{user1.name}</h1>
      <p>{user2.email}</p>
      <p>{user3.phone}</p>
    </div>
  );
}

// 跨组件共享缓存
// app/page.js

async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  return (
    <div>
      <UserInfo />
      <ProductInfo />
    </div>
  );
}

// app/components/UserInfo.jsx
async function UserInfo() {
  const data = await getData(); // 使用相同请求，不会重复 API 调用
  return <div>{data.user.name}</div>;
}

// app/components/ProductInfo.jsx
async function ProductInfo() {
  const data = await getData(); // 使用相同请求
  return <div>{data.product.name}</div>;
}`;

  const bestPracticesCode = `// 缓存最佳实践

// 1. 选择合适的缓存策略

// 静态内容 - 永久缓存
export default async function StaticPage() {
  const config = await fetch('https://api.example.com/config', {
    // 永久缓存
  });
  // 或
  // next: { revalidate: false }
}

// 半静态内容 - 定期更新
export default async function BlogPost({ slug }) {
  const post = await fetch(\`/api/posts/\${slug}\`, {
    next: { revalidate: 300 } // 5 分钟更新一次
  });
}

// 动态内容 - 不缓存
export default async function Dashboard({ userId }) {
  const stats = await fetch(\`/api/stats/\${userId}\`, {
    cache: 'no-store'
  });
}

// 2. 清理缓存时机

// 数据更新后
export async function createProduct(data) {
  await db.products.create({ data });
  revalidateTag('products'); // 清理产品列表缓存
  revalidatePath('/products'); // 清理产品页面缓存
}

// 定时任务更新
export async function updateHourlyStats() {
  await fetch('/api/update-stats', { method: 'POST' });
  revalidateTag('stats');
}

// 3. 调试缓存

// 在开发模式查看缓存状态
export default async function DebugPage() {
  const start = performance.now();

  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }
  });

  const end = performance.now();

  return (
    <div>
      <p>加载时间: {end - start}ms</p>
      <p>是否使用缓存: {data.headers.get('x-nextjs-cache')}</p>
    </div>
  );
}

// 4. 避免缓存陷阱

// 错误：传递随机值导致缓存失效
export default async function BadExample() {
  // ❌ 错误：每次都生成新 URL
  const data = await fetch(\`https://api.example.com/data?t=\${Date.now()}\`);
}

// 正确：固定 URL + 缓存策略
export default async function GoodExample() {
  // ✅ 正确：使用缓存策略
  const data = await fetch(\`https://api.example.com/data\`, {
    next: { revalidate: 60 }
  });
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            04. Caching - 缓存策略
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Next.js 提供多层缓存系统大幅提升性能：<strong>请求缓存</strong>、
            <strong>数据缓存</strong>、<strong>路由缓存</strong>。
            合理的缓存策略可以显著减少 API 调用和渲染时间。
          </p>
        </div>

        {/* 缓存层级 */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            📊 Next.js 缓存层级（从内到外）
          </h3>
          <ol className="text-sm text-green-800 dark:text-green-400 space-y-2">
            <li>1. <strong>Request Memoization</strong> - 单次渲染中的请求去重</li>
            <li>2. <strong>Data Cache</strong> - fetch 结果的持久化缓存</li>
            <li>3. <strong>Router Cache</strong> - 客户端页面缓存</li>
          </ol>
        </div>

        {/* 数据缓存 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💾 数据缓存 (Data Cache)
          </h2>
          <CodeBlock code={dataCacheCode} language="javascript" />
        </div>

        {/* 重新验证 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔄 重新验证缓存
          </h2>
          <CodeBlock code={revalidateCode} language="javascript" />
        </div>

        {/* 路由缓存 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🛣️ 路由缓存 (Router Cache)
          </h2>
          <CodeBlock code={routeCacheCode} language="javascript" />
        </div>

        {/* 请求缓存 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ⚡ 请求缓存 (Request Memoization)
          </h2>
          <CodeBlock code={memoizationCode} language="javascript" />
        </div>

        {/* 最佳实践 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ⭐ 缓存最佳实践
          </h2>
          <CodeBlock code={bestPracticesCode} language="javascript" />
        </div>

        {/* 缓存策略选择 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            🎯 缓存策略选择指南
          </h3>
          <table className="w-full text-sm mt-4">
            <thead>
              <tr className="border-b border-blue-300 dark:border-blue-700">
                <th className="text-left py-2 text-blue-900 dark:text-blue-300">数据类型</th>
                <th className="text-left py-2 text-blue-900 dark:text-blue-300">缓存策略</th>
                <th className="text-left py-2 text-blue-900 dark:text-blue-300">示例</th>
              </tr>
            </thead>
            <tbody className="text-blue-800 dark:text-blue-400">
              <tr className="border-b border-blue-200 dark:border-blue-800">
                <td className="py-2">静态配置</td>
                <td className="py-2">永久缓存</td>
                <td className="py-2">网站配置、导航菜单</td>
              </tr>
              <tr className="border-b border-blue-200 dark:border-blue-800">
                <td className="py-2">博客文章</td>
                <td className="py-2">定期重新验证</td>
                <td className="py-2">next: {'{ revalidate: 3600 }'}</td>
              </tr>
              <tr className="border-b border-blue-200 dark:border-blue-800">
                <td className="py-2">产品列表</td>
                <td className="py-2">定期重新验证</td>
                <td className="py-2">next: {'{ revalidate: 300 }'}</td>
              </tr>
              <tr>
                <td className="py-2">用户数据</td>
                <td className="py-2">不缓存</td>
                <td className="py-2">cache: 'no-store'</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-4/03-middleware"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: Middleware
          </Link>
          <Link
            href="/learn/phase-4/05-streaming"
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: Streaming →
          </Link>
        </div>
      </div>
    </div>
  );
}
