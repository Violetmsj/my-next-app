/**
 * 学习导航页
 *
 * 显示所有学习阶段的概览和快速导航
 */

import Link from 'next/link';

export default function LearnPage() {
  const phases = [
    {
      id: 1,
      title: 'React Hooks 基础',
      description: '掌握React 19的核心Hooks，为后续学习打下坚实基础',
      icon: '⚛️',
      concepts: [
        { id: '01', name: 'useState', description: '基础状态管理' },
        { id: '02', name: 'useEffect', description: '副作用处理' },
        { id: '03', name: 'useContext', description: '全局状态管理' },
        { id: '04', name: 'useReducer', description: '复杂状态逻辑' },
        { id: '05', name: 'useMemo', description: '性能优化' },
        { id: '06', name: 'useCallback', description: '函数缓存' },
        { id: '07', name: 'Custom Hooks', description: '自定义Hook' }
      ],
      href: '/learn/phase-1'
    },
    {
      id: 2,
      title: 'Next.js App Router',
      description: '学习Next.js 15的App Router架构，掌握现代全栈开发',
      icon: '🚀',
      concepts: [
        { id: '01', name: '基础路由', description: '页面和路由基础' },
        { id: '02', name: 'Layouts', description: '布局系统' },
        { id: '03', name: '动态路由', description: '[id]参数路由' },
        { id: '04', name: '数据获取', description: 'Server/Client组件' },
        { id: '05', name: 'Navigation', description: '导航与链接' },
        { id: '06', name: 'Metadata', description: '元数据管理' }
      ],
      href: '/learn/phase-2'
    },
    {
      id: 3,
      title: 'React 进阶技术',
      description: '深入理解React高级特性，提升代码质量和性能',
      icon: '📚',
      concepts: [
        { id: '01', name: 'useRef', description: 'DOM引用和可变值' },
        { id: '02', name: 'useImperativeHandle', description: '暴露方法给父组件' },
        { id: '03', name: 'useLayoutEffect', description: '同步副作用' },
        { id: '04', name: 'Complex State', description: '复杂状态管理模式' }
      ],
      href: '/learn/phase-3'
    },
    {
      id: 4,
      title: 'Next.js 进阶应用',
      description: '掌握Next.js高级功能，构建生产级应用',
      icon: '⚡',
      concepts: [
        { id: '01', name: 'API Routes', description: '后端接口开发' },
        { id: '02', name: 'Server Actions', description: '服务器动作' },
        { id: '03', name: 'Middleware', description: '中间件' },
        { id: '04', name: 'Caching', description: '缓存策略' },
        { id: '05', name: 'Streaming', description: '流式渲染' }
      ],
      href: '/learn/phase-4'
    },
    {
      id: 5,
      title: 'Tailwind CSS',
      description: '学习Tailwind CSS，快速构建现代化UI',
      icon: '🎨',
      concepts: [
        { id: '01', name: '工具类', description: '基础工具类使用' },
        { id: '02', name: '响应式', description: '响应式设计' },
        { id: '03', name: '深色模式', description: '深色模式实现' },
        { id: '04', name: '自定义配置', description: '自定义样式' },
        { id: '05', name: '布局模式', description: '常用布局模式' }
      ],
      href: '/learn/phase-5'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4"
          >
            ← 返回主页
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            选择学习阶段
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            点击任意阶段开始学习，建议按顺序进行
          </p>
        </div>

        {/* 阶段列表 */}
        <div className="space-y-8">
          {phases.map((phase) => (
            <div
              key={phase.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                {/* 阶段头部 */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-5xl">{phase.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Phase {phase.id}: {phase.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {phase.description}
                    </p>
                  </div>
                  <Link
                    href={phase.href}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    开始学习
                  </Link>
                </div>

                {/* 概念列表 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {phase.concepts.map((concept) => (
                    <Link
                      key={concept.id}
                      href={`${phase.href}/${concept.id}-${concept.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {phase.id}.{concept.id}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {concept.name}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {concept.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 学习提示 */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                学习建议
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                <li>• 建议按顺序学习，每个阶段都建立在前一个阶段的基础上</li>
                <li>• 每个概念页面都有交互式Demo，先体验再学习代码</li>
                <li>• 页面底部有代码示例和详细注释，帮助理解实现原理</li>
                <li>• 遇到问题时，可以查看对应的文档说明（/docs目录）</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
