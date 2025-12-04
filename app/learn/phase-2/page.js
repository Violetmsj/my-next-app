/**
 * Phase 2 导航页 - Next.js App Router
 *
 * 学习Next.js 15的App Router架构
 * 包含路由、Layouts、动态路由、数据获取等核心概念
 */

import Link from 'next/link';

export default function Phase2Page() {
  const concepts = [
    {
      id: '01',
      name: '基础路由',
      description: '学习Next.js App Router的基础概念：页面、路由、目录结构',
      example: '了解app目录结构、文件即路由的概念',
      difficulty: '入门',
      href: '/learn/phase-2/01-routing'
    },
    {
      id: '02',
      name: 'Layouts 布局',
      description: '学习Next.js 15的Layout系统：根布局、嵌套布局、布局共享',
      example: '创建导航栏、侧边栏、页脚等共享布局',
      difficulty: '入门',
      href: '/learn/phase-2/02-layouts'
    },
    {
      id: '03',
      name: '动态路由',
      description: '学习动态路由段：[id]参数、路由组、捕获所有路由',
      example: '博客文章详情页、产品页面、用户个人页面',
      difficulty: '中级',
      href: '/learn/phase-2/03-dynamic-routing'
    },
    {
      id: '04',
      name: '数据获取',
      description: '学习Server Components和Client Components、数据获取策略',
      example: 'fetch API、数据库查询、API调用',
      difficulty: '中级',
      href: '/learn/phase-2/04-data-fetching'
    },
    {
      id: '05',
      name: '导航与链接',
      description: '学习Next.js的导航系统：Link组件、编程式导航、导航状态',
      example: '页面跳转、锚点跳转、导航高亮',
      difficulty: '入门',
      href: '/learn/phase-2/05-navigation'
    },
    {
      id: '06',
      name: 'Metadata 元数据',
      description: '学习页面元数据管理：SEO优化、社交媒体卡片、favicon',
      example: '动态生成页面标题、描述、Open Graph',
      difficulty: '中级',
      href: '/learn/phase-2/06-metadata'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 页面头部 */}
        <div className="text-center mb-12">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4"
          >
            ← 返回学习导航
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">🚀</span>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Phase 2: Next.js App Router
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Next.js 15采用全新的App Router架构，基于React Server Components构建，
            提供更强大的路由系统、布局管理、数据获取能力。本阶段将学习6个核心概念。
          </p>
        </div>

        {/* 特性介绍 */}
        <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                Next.js App Router 特性
              </h3>
              <ul className="text-sm text-purple-800 dark:text-purple-400 space-y-1">
                <li>• <strong>文件即路由</strong> - app目录中的文件自动映射为路由</li>
                <li>• <strong>布局系统</strong> - 支持嵌套布局和布局共享</li>
                <li>• <strong>Server Components</strong> - 默认服务器组件，性能更优</li>
                <li>• <strong>流式渲染</strong> - 支持渐进式页面渲染</li>
                <li>• <strong>内置SEO优化</strong> - 更容易实现搜索引擎优化</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 学习提示 */}
        <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                学习指南
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                <li>• 需要先完成 Phase 1 的 React Hooks 基础</li>
                <li>• 建议按顺序学习，每个概念都建立在前面的基础上</li>
                <li>• 每个页面都有实际代码示例和交互演示</li>
                <li>• 注意 Server Components 和 Client Components 的区别</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 概念列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {concepts.map((concept) => (
            <Link
              key={concept.id}
              href={concept.href}
              className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500"
            >
              <div className="p-6">
                {/* 概念头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                      {concept.id}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {concept.name}
                    </h2>
                  </div>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${concept.difficulty === '入门' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                    ${concept.difficulty === '中级' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                  `}>
                    {concept.difficulty}
                  </span>
                </div>

                {/* 描述 */}
                <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm leading-relaxed">
                  {concept.description}
                </p>

                {/* 示例 */}
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                  <span className="text-gray-400">💡</span>
                  <span>典型场景：</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 ml-6">
                  {concept.example}
                </p>

                {/* 学习链接 */}
                <div className="mt-4 flex items-center text-purple-600 dark:text-purple-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  开始学习 →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 底部导航 */}
        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-1"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 返回 Phase 1
          </Link>
          <Link
            href="/learn/phase-2/01-routing"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
          >
            开始学习: 基础路由 →
          </Link>
        </div>
      </div>
    </div>
  );
}
