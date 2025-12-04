/**
 * Phase 5 导航页 - Tailwind CSS
 *
 * 学习 Tailwind CSS 4，快速构建现代化 UI
 * 包含工具类、响应式设计、深色模式、自定义配置、布局模式
 */

import Link from 'next/link';

export default function Phase5Page() {
  const concepts = [
    {
      id: '01',
      name: '工具类基础',
      description: '学习 Tailwind 工具类：间距、字体、颜色、边框、阴影等',
      example: '快速构建按钮、卡片、导航栏',
      difficulty: '初级',
      href: '/learn/phase-5/01-utilities'
    },
    {
      id: '02',
      name: '响应式设计',
      description: '学习 Tailwind 响应式工具类：sm、md、lg、xl、2xl 断点',
      example: '移动端适配、平板适配、桌面端优化',
      difficulty: '初级',
      href: '/learn/phase-5/02-responsive'
    },
    {
      id: '03',
      name: '深色模式',
      description: '学习 Tailwind 深色模式：自动切换、手动切换、深色主题',
      example: '支持深色/浅色主题、用户偏好设置',
      difficulty: '初级',
      href: '/learn/phase-5/03-dark-mode'
    },
    {
      id: '04',
      name: '自定义配置',
      description: '学习 Tailwind 配置：自定义颜色、字体、断点、插件',
      example: '品牌定制、企业级配置、特殊需求',
      difficulty: '中级',
      href: '/learn/phase-5/04-custom-config'
    },
    {
      id: '05',
      name: '布局模式',
      description: '学习 Tailwind 布局系统：Flexbox、Grid、Container、Position',
      example: '居中对齐、两栏布局、网格系统',
      difficulty: '中级',
      href: '/learn/phase-5/05-layouts'
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
            <span className="text-5xl">🎨</span>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Phase 5: Tailwind CSS
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tailwind CSS 是一个实用优先的 CSS 框架，通过工具类快速构建现代化 UI。
            本阶段将学习 5 个核心概念，掌握 Tailwind CSS 4 的所有功能。
          </p>
        </div>

        {/* 特性介绍 */}
        <div className="mb-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-cyan-900 dark:text-cyan-300 mb-2">
                Tailwind CSS 特性
              </h3>
              <ul className="text-sm text-cyan-800 dark:text-cyan-400 space-y-1">
                <li>• <strong>工具类优先</strong> - 通过工具类快速构建 UI，无需写 CSS</li>
                <li>• <strong>原子化</strong> - 每个类只做一件事，高度可复用</li>
                <li>• <strong>响应式</strong> - 内置响应式断点，移动端友好</li>
                <li>• <strong>深色模式</strong> - 原生支持深色主题切换</li>
                <li>• <strong>高度定制</strong> - 灵活配置颜色、字体、断点等</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 学习提示 */}
        <div className="mb-8 p-6 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <h3 className="font-semibold text-cyan-900 dark:text-cyan-300 mb-2">
                学习指南
              </h3>
              <ul className="text-sm text-cyan-800 dark:text-cyan-400 space-y-1">
                <li>• Tailwind CSS 相对简单，适合初学者快速上手</li>
                <li>• 重点掌握常用工具类，无需死记硬背所有类</li>
                <li>• 建议边学边练，多动手构建实际 UI 组件</li>
                <li>• 配合文档查询，遇到不熟悉的类及时查阅</li>
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
              className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-500"
            >
              <div className="p-6">
                {/* 概念头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                      {concept.id}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {concept.name}
                    </h2>
                  </div>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${concept.difficulty === '初级' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
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
                <div className="mt-4 flex items-center text-cyan-600 dark:text-cyan-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  开始学习 →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 底部导航 */}
        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-4"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 返回 Phase 4
          </Link>
          <Link
            href="/learn/phase-5/01-utilities"
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
          >
            开始学习: 工具类基础 →
          </Link>
        </div>
      </div>
    </div>
  );
}
