/**
 * Phase 3 导航页 - React 进阶技术
 *
 * 学习 React 高级 Hooks 和复杂状态管理模式
 * 包含 useRef、useImperativeHandle、useLayoutEffect 等
 */

import Link from 'next/link';

export default function Phase3Page() {
  const concepts = [
    {
      id: '01',
      name: 'useRef - DOM 引用',
      description: '学习 useRef Hook：访问 DOM 元素、保存可变值、实例变量管理',
      example: '输入框聚焦、视频播放器、canvas 操作',
      difficulty: '中级',
      href: '/learn/phase-3/01-use-ref'
    },
    {
      id: '02',
      name: 'useImperativeHandle - 暴露方法',
      description: '学习 useImperativeHandle：向父组件暴露自定义方法',
      example: '表单验证、媒体控制、动画触发',
      difficulty: '高级',
      href: '/learn/phase-3/02-use-imperative-handle'
    },
    {
      id: '03',
      name: 'useLayoutEffect - 同步副作用',
      description: '学习 useLayoutEffect：同步 DOM 更新后的副作用处理',
      example: '测量 DOM 元素、滚动位置同步',
      difficulty: '高级',
      href: '/learn/phase-3/03-use-layout-effect'
    },
    {
      id: '04',
      name: '复杂状态管理模式',
      description: '学习复杂状态管理：状态提升、Context 模式、状态机',
      example: '表单状态、购物车、编辑器状态',
      difficulty: '高级',
      href: '/learn/phase-3/04-complex-state'
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
            <span className="text-5xl">📚</span>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Phase 3: React 进阶技术
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            深入理解 React 的高级特性，包括 DOM 引用、组件方法暴露、
            同步副作用处理和复杂状态管理模式。本阶段将学习 4 个高级概念。
          </p>
        </div>

        {/* 特性介绍 */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                React 进阶技术特性
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                <li>• <strong>useRef</strong> - 访问 DOM、保存可变值、实例变量管理</li>
                <li>• <strong>useImperativeHandle</strong> - 向父组件暴露自定义方法接口</li>
                <li>• <strong>useLayoutEffect</strong> - 在 DOM 同步更新后执行副作用</li>
                <li>• <strong>状态管理</strong> - 处理复杂业务逻辑的多种模式</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 学习提示 */}
        <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
                学习指南
              </h3>
              <ul className="text-sm text-yellow-800 dark:text-yellow-400 space-y-1">
                <li>• 需要先完成 Phase 1 和 Phase 2 的学习</li>
                <li>• 这些是更高级的概念，需要扎实的 React 基础</li>
                <li>• 适合有一定项目经验的开发者深入学习</li>
                <li>• 理解这些概念可以解决复杂的开发场景</li>
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
              className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
            >
              <div className="p-6">
                {/* 概念头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {concept.id}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
                <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  开始学习 →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 底部导航 */}
        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-2"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 返回 Phase 2
          </Link>
          <Link
            href="/learn/phase-3/01-use-ref"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
          >
            开始学习: useRef →
          </Link>
        </div>
      </div>
    </div>
  );
}
