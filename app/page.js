/**
 * 学习路径主页
 *
 * 展示5个学习阶段的导航卡片
 * 包含React Hooks、Next.js App Router和Tailwind CSS
 */

import Link from 'next/link';

export default function HomePage() {
  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: 'Phase 1: React Hooks 基础',
      description: '掌握React 19的核心Hooks：useState、useEffect、useContext等7个基础概念',
      icon: '⚛️',
      color: 'from-blue-500 to-blue-600',
      concepts: '7个概念',
      estimatedTime: '3-5天',
      href: '/learn/phase-1'
    },
    {
      id: 2,
      title: 'Phase 2: Next.js App Router',
      description: '学习Next.js 15的App Router架构：路由、Layouts、数据获取等核心功能',
      icon: '🚀',
      color: 'from-purple-500 to-purple-600',
      concepts: '6个概念',
      estimatedTime: '4-6天',
      href: '/learn/phase-2'
    },
    {
      id: 3,
      title: 'Phase 3: React 进阶技术',
      description: '深入理解React进阶Hooks：useRef、useImperativeHandle、useLayoutEffect等',
      icon: '📚',
      color: 'from-green-500 to-green-600',
      concepts: '4个概念',
      estimatedTime: '3-4天',
      href: '/learn/phase-3'
    },
    {
      id: 4,
      title: 'Phase 4: Next.js 进阶应用',
      description: '掌握Next.js高级特性：API Routes、Server Actions、Middleware等',
      icon: '⚡',
      color: 'from-orange-500 to-orange-600',
      concepts: '5个概念',
      estimatedTime: '5-7天',
      href: '/learn/phase-4'
    },
    {
      id: 5,
      title: 'Phase 5: Tailwind CSS',
      description: '学习Tailwind CSS 4：工具类、响应式设计、深色模式等实用技能',
      icon: '🎨',
      color: 'from-cyan-500 to-cyan-600',
      concepts: '5个概念',
      estimatedTime: '2-3天',
      href: '/learn/phase-5'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* 头部区域 */}
      <header className="pt-16 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            React + Next.js 学习路径
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            由简入深，掌握现代前端开发
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            基于 React 19 Hooks • Next.js 15 App Router • Tailwind CSS 4
          </p>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* 阶段卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phases.map((phase) => (
              <Link
                key={phase.id}
                href={phase.href}
                className="group block transform transition-all duration-200 hover:scale-105"
              >
                <div className="h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
                  {/* 卡片头部（渐变色） */}
                  <div className={`h-32 bg-gradient-to-br ${phase.color} p-6 flex items-center justify-between`}>
                    <div className="text-white">
                      <div className="text-4xl mb-2">{phase.icon}</div>
                      <div className="text-sm font-medium opacity-90">
                        {phase.concepts}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/90 text-sm">
                        {phase.estimatedTime}
                      </div>
                    </div>
                  </div>

                  {/* 卡片内容 */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {phase.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {phase.description}
                    </p>

                    {/* 开始学习按钮 */}
                    <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                      开始学习 →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 底部信息 */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
              <span className="text-2xl">💡</span>
              <p className="text-gray-700 dark:text-gray-300">
                总计 <span className="font-bold text-blue-600">27个核心概念</span> •
                预计学习时间 <span className="font-bold text-green-600">17-25天</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
