/**
 * Phase 4 导航页 - Next.js 进阶应用
 *
 * 学习 Next.js 的高级功能，构建生产级应用
 * 包含 API Routes、Server Actions、Middleware、Caching、Streaming
 */

import Link from 'next/link';

export default function Phase4Page() {
  const concepts = [
    {
      id: '01',
      name: 'API Routes - 后端接口',
      description: '学习在 Next.js 中创建 API 路由：GET、POST、动态路由、中间件',
      example: '用户注册登录、数据查询、文件上传',
      difficulty: '中级',
      href: '/learn/phase-4/01-api-routes'
    },
    {
      id: '02',
      name: 'Server Actions - 服务器动作',
      description: '学习 Server Actions：直接在服务器端执行表单提交和数据操作',
      example: '表单提交、数据修改、文件处理',
      difficulty: '高级',
      href: '/learn/phase-4/02-server-actions'
    },
    {
      id: '03',
      name: 'Middleware - 中间件',
      description: '学习 Middleware：请求拦截、认证、国际化、A/B 测试',
      example: '用户认证、请求日志、访问控制',
      difficulty: '高级',
      href: '/learn/phase-4/03-middleware'
    },
    {
      id: '04',
      name: 'Caching - 缓存策略',
      description: '学习 Next.js 缓存系统：数据缓存、路由缓存、全局缓存',
      example: 'API 响应缓存、静态资源缓存、增量静态再生成',
      difficulty: '高级',
      href: '/learn/phase-4/04-caching'
    },
    {
      id: '05',
      name: 'Streaming - 流式渲染',
      description: '学习流式渲染：渐进式渲染、Suspense、流式数据获取',
      example: '大型页面分块加载、实时数据流',
      difficulty: '高级',
      href: '/learn/phase-4/05-streaming'
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
            <span className="text-5xl">⚡</span>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Phase 4: Next.js 进阶应用
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            深入学习 Next.js 的高级功能，包括 API 路由、Server Actions、中间件、
            缓存策略和流式渲染。这些功能将帮助构建生产级别的全栈应用。
          </p>
        </div>

        {/* 特性介绍 */}
        <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-orange-900 dark:text-orange-300 mb-2">
                Next.js 进阶应用特性
              </h3>
              <ul className="text-sm text-orange-800 dark:text-orange-400 space-y-1">
                <li>• <strong>API Routes</strong> - 无需单独后端服务，内置 API 开发</li>
                <li>• <strong>Server Actions</strong> - 服务器端表单提交和操作</li>
                <li>• <strong>Middleware</strong> - 请求拦截和中间件处理</li>
                <li>• <strong>Caching</strong> - 多层缓存系统提升性能</li>
                <li>• <strong>Streaming</strong> - 流式渲染和渐进式加载</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 学习提示 */}
        <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-300 mb-2">
                学习指南
              </h3>
              <ul className="text-sm text-red-800 dark:text-red-400 space-y-1">
                <li>• 需要先完成前三个阶段的学习</li>
                <li>• 这些是高级功能，需要扎实的 React 和 Next.js 基础</li>
                <li>• 适合想要构建生产级应用的开发者</li>
                <li>• 理解这些概念可以显著提升应用性能和可维护性</li>
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
              className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500"
            >
              <div className="p-6">
                {/* 概念头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                      {concept.id}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {concept.name}
                    </h2>
                  </div>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${concept.difficulty === '中级' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                    ${concept.difficulty === '高级' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
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
                <div className="mt-4 flex items-center text-orange-600 dark:text-orange-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  开始学习 →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 底部导航 */}
        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-3"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 返回 Phase 3
          </Link>
          <Link
            href="/learn/phase-4/01-api-routes"
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
          >
            开始学习: API Routes →
          </Link>
        </div>
      </div>
    </div>
  );
}
