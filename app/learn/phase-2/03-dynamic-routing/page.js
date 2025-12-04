/**
 * Next.js App Router - 动态路由学习
 *
 * 学习动态路由段、参数获取、路由组、捕获所有路由等高级路由功能
 */

import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

// 模拟数据
const posts = [
  { id: 1, slug: 'react-hooks-guide', title: 'React Hooks 完整指南', content: '这是关于React Hooks的详细内容...' },
  { id: 2, slug: 'nextjs-app-router', title: 'Next.js App Router 详解', content: '学习Next.js 15的新路由系统...' },
  { id: 3, slug: 'typescript-best-practices', title: 'TypeScript 最佳实践', content: '掌握TypeScript的高级技巧...' }
];

export default function DynamicRoutingPage({ params }) {
  const navigationItems = [
    { label: '概览', href: '/learn/phase-2' },
    { label: '基础路由', href: '/learn/phase-2/01-routing' },
    { label: 'Layouts', href: '/learn/phase-2/02-layouts' },
    { label: '动态路由', href: '/learn/phase-2/03-dynamic-routing' },
    { label: '数据获取', href: '/learn/phase-2/04-data-fetching' },
    { label: '导航', href: '/learn/phase-2/05-navigation' },
    { label: 'Metadata', href: '/learn/phase-2/06-metadata' }
  ];

  const basicDynamicCode = `// app/blog/[slug]/page.js
// 访问: /blog/hello-world
// 参数: { slug: 'hello-world' }

export default function BlogPost({ params }) {
  const { slug } = params;

  return (
    <article>
      <h1>文章标题: {slug}</h1>
      <p>这里是文章内容...</p>
    </article>
  );
}

// app/users/[userId]/page.js
// 访问: /users/123
// 参数: { userId: '123' }

export default function UserPage({ params }) {
  const { userId } = params;

  return (
    <div>
      <h1>用户 ID: {userId}</h1>
      <p>用户信息...</p>
    </div>
  );
}`;

  const multipleParamsCode = `// app/blog/[category]/[slug]/page.js
// 访问: /blog/react/hooks
// 参数: { category: 'react', slug: 'hooks' }

export default function BlogPost({ params }) {
  const { category, slug } = params;

  return (
    <article>
      <p>分类: {category}</p>
      <h1>标题: {slug}</h1>
      <p>内容...</p>
    </article>
  );
}

// app/products/[category]/[id]/page.js
// 访问: /products/electronics/456
// 参数: { category: 'electronics', id: '456' }

export default function ProductPage({ params }) {
  const { category, id } = params;

  return (
    <div>
      <p>分类: {category}</p>
      <p>产品ID: {id}</p>
    </div>
  );
}`;

  const catchAllCode = `// app/docs/[...slug]/page.js
// 访问: /docs/guides/react/getting-started
// 参数: { slug: ['guides', 'react', 'getting-started'] }

export default function DocPage({ params }) {
  const { slug } = params;

  return (
    <article>
      <h1>文档路径: {slug.join(' / ')}</h1>
      <p>文档内容...</p>
    </article>
  );
}

// app/shop/[...category]/page.js
// 访问: /shop/electronics/computers/laptops
// 参数: { category: ['electronics', 'computers', 'laptops'] }

export default function CategoryPage({ params }) {
  const { category } = params;

  return (
    <div>
      <h1>商品分类</h1>
      <p>路径: {category.join(' > ')}</p>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            03. 动态路由
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            动态路由允许URL中包含参数，实现灵活的页面结构。
            Next.js支持单参数、多参数、捕获所有路由等高级模式。
          </p>
        </div>

        {/* 当前参数展示 */}
        <DemoContainer
          title="当前路由参数"
          description="当前页面的params对象内容"
        >
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{JSON.stringify(params, null, 2)}</pre>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            💡 这是从URL中解析出的动态参数，可以用于获取数据
          </p>
        </DemoContainer>

        {/* 示例页面列表 */}
        <DemoContainer
          title="动态路由示例"
          description="点击链接查看不同参数值的页面效果"
        >
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              博客文章页面：
            </h4>
            {posts.map(post => (
              <Link
                key={post.id}
                href={`/learn/phase-2/03-dynamic-routing/${post.slug}`}
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📝</span>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {post.title}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      /learn/phase-2/03-dynamic-routing/{post.slug}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              通用动态页面：
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['hello', 'world', 'nextjs', 'react'].map(item => (
                <Link
                  key={item}
                  href={`/learn/phase-2/03-dynamic-routing/${item}`}
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-center text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  /{item}
                </Link>
              ))}
            </div>
          </div>
        </DemoContainer>

        {/* 基础动态路由 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 单参数动态路由
          </h2>
          <CodeBlock code={basicDynamicCode} language="javascript" />
        </div>

        {/* 多参数 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📚 多参数动态路由
          </h2>
          <CodeBlock code={multipleParamsCode} language="javascript" />
        </div>

        {/* 捕获所有路由 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🌐 捕获所有路由
          </h2>
          <CodeBlock code={catchAllCode} language="javascript" />
        </div>

        {/* 使用场景 */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            📌 动态路由使用场景
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-400 space-y-2">
            <li>✓ 博客文章页面：/blog/[slug]</li>
            <li>✓ 电商商品页面：/products/[id]</li>
            <li>✓ 用户个人页面：/users/[username]</li>
            <li>✓ 分类页面：/category/[type]/[item]</li>
            <li>✓ 文档页面：/docs/[...slug]</li>
            <li>✓ 多语言支持：/[lang]/about</li>
          </ul>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-2/02-layouts"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: Layouts
          </Link>
          <Link
            href="/learn/phase-2/04-data-fetching"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: 数据获取 →
          </Link>
        </div>
      </div>
    </div>
  );
}
