/**
 * Phase 1 导航页 - React Hooks 基础
 *
 * 展示React Hooks的7个基础概念
 * 包含useState、useEffect、useContext、useReducer、useMemo、useCallback和Custom Hooks
 */

import Link from 'next/link';

export default function Phase1Page() {
  const hooks = [
    {
      id: '01',
      name: 'useState',
      description: '在函数组件中添加状态管理，是React Hooks中最基础也是最常用的Hook',
      example: '用于管理计数器、表单输入、开关状态等',
      difficulty: '入门',
      href: '/learn/phase-1/01-use-state'
    },
    {
      id: '02',
      name: 'useEffect',
      description: '处理副作用，如数据获取、订阅、手动修改DOM等，相当于类组件的生命周期方法',
      example: '用于数据获取、设置定时器、添加事件监听器等',
      difficulty: '入门',
      href: '/learn/phase-1/02-use-effect'
    },
    {
      id: '03',
      name: 'useContext',
      description: '在组件树中共享数据，避免props drilling，实现全局状态管理',
      example: '用于用户信息、主题设置、语言偏好等全局数据',
      difficulty: '中级',
      href: '/learn/phase-1/03-use-context'
    },
    {
      id: '04',
      name: 'useReducer',
      description: '管理复杂状态逻辑，类似于Redux，用于状态逻辑复杂的场景',
      example: '用于购物车、待办事项列表、表单状态管理等',
      difficulty: '中级',
      href: '/learn/phase-1/04-use-reducer'
    },
    {
      id: '05',
      name: 'useMemo',
      description: '缓存计算结果，在组件重新渲染时避免不必要的昂贵计算',
      example: '用于大数据列表过滤、复杂计算、避免子组件不必要渲染',
      difficulty: '中级',
      href: '/learn/phase-1/05-use-memo'
    },
    {
      id: '06',
      name: 'useCallback',
      description: '缓存函数实例，在组件重新渲染时保持函数引用不变',
      example: '用于传递给子组件的回调函数，避免子组件不必要渲染',
      difficulty: '中级',
      href: '/learn/phase-1/06-use-callback'
    },
    {
      id: '07',
      name: 'Custom Hooks',
      description: '创建自定义Hook，将组件逻辑提取到可复用的函数中',
      example: '用于数据获取、表单处理、本地存储等功能封装',
      difficulty: '高级',
      href: '/learn/phase-1/07-custom-hooks'
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
            <span className="text-5xl">⚛️</span>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Phase 1: React Hooks 基础
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            React Hooks是React 16.8引入的新特性，让我们能在函数组件中使用状态和其他React特性。
            本阶段将学习7个核心Hook，掌握现代React开发的基础。
          </p>
        </div>

        {/* 学习提示 */}
        <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📝</span>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                学习指南
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                <li>• 建议按顺序学习，每个Hook都建立在前面的基础上</li>
                <li>• 每个Hook都有交互式Demo，先体验功能再学习代码</li>
                <li>• 仔细阅读代码注释，理解每个概念的使用场景</li>
                <li>• 难度标识：入门 → 中级 → 高级</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Hooks列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hooks.map((hook) => (
            <Link
              key={hook.id}
              href={hook.href}
              className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
            >
              <div className="p-6">
                {/* Hook头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {hook.id}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {hook.name}
                    </h2>
                  </div>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${hook.difficulty === '入门' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                    ${hook.difficulty === '中级' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                    ${hook.difficulty === '高级' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                  `}>
                    {hook.difficulty}
                  </span>
                </div>

                {/* 描述 */}
                <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm leading-relaxed">
                  {hook.description}
                </p>

                {/* 示例 */}
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                  <span className="text-gray-400">💡</span>
                  <span>典型场景：</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 ml-6">
                  {hook.example}
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
        <div className="mt-12 flex justify-center">
          <Link
            href="/learn/phase-2"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            下一阶段：Next.js App Router →
          </Link>
        </div>
      </div>
    </div>
  );
}
