/**
 * Tailwind CSS - 自定义配置
 */

import Link from 'next/link';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function CustomConfigPage() {
  const navigationItems = [
    { label: 'Phase 5 概览', href: '/learn/phase-5' },
    { label: '工具类基础', href: '/learn/phase-5/01-utilities' },
    { label: '响应式设计', href: '/learn/phase-5/02-responsive' },
    { label: '深色模式', href: '/learn/phase-5/03-dark-mode' },
    { label: '自定义配置', href: '/learn/phase-5/04-custom-config' },
    { label: '布局模式', href: '/learn/phase-5/05-layouts' }
  ];

  const configCode = `// tailwind.config.js - 基础配置

module.exports = {
  content: [
    // 指定哪些文件需要 Tailwind 处理
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 自定义断点
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },

      // 自定义颜色
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
        brand: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
        },
      },

      // 自定义字体
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },

      // 自定义间距
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },

      // 自定义圆角
      borderRadius: {
        '4xl': '2rem',
      },

      // 自定义动画
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [
    // 添加插件
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};`;

  const customColorsCode = `// 自定义品牌颜色

// 1. 定义颜色
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',  // 主色
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
}

// 2. 使用自定义颜色
<div className="bg-brand-500 text-white">
  使用品牌主色
</div>

<div className="bg-brand-100 text-brand-900">
  浅色背景，深色文字
</div>

<div className="bg-brand-600 hover:bg-brand-700">
  悬停变深
</div>

// 3. 语义化颜色
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#64748b',
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff',
        },
        error: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
      },
    },
  },
}

// 使用语义化颜色
<button className="bg-primary text-primary-foreground">
  主要按钮
</button>
<button className="bg-success text-success-foreground">
  成功按钮
</button>`;

  const customSpacingCode = `// 自定义间距和尺寸

module.exports = {
  theme: {
    extend: {
      // 自定义间距
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },

      // 自定义高度
      height: {
        '128': '32rem',
        '144': '36rem',
      },

      // 自定义宽度
      width: {
        '128': '32rem',
        '144': '36rem',
      },

      // 容器最大宽度
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },

      // 最小高度
      minHeight: {
        'screen-75': '75vh',
        'screen-50': '50vh',
      },
    },
  },
}

// 使用自定义间距
<div className="p-72">超大内边距</div>
<div className="h-128">超高容器</div>
<div className="w-96">超宽容器</div>`;

  const utilitiesCode = `// 自定义工具类

module.exports = {
  theme: {
    extend: {
      // 自定义阴影
      boxShadow: {
        'brand': '0 4px 14px 0 rgba(99, 102, 241, 0.2)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },

      // 自定义 z-index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // 自定义变换
      scale: {
        '102': '1.02',
        '103': '1.03',
      },

      // 自定义透明度
      opacity: {
        '2': '0.02',
        '3': '0.03',
        '97': '0.97',
        '98': '0.98',
      },
    },
  },
}

// 使用自定义工具类
<div className="shadow-brand">品牌阴影</div>
<div className="z-60">自定义层级</div>
<div className="scale-102">放大 102%</div>
<div className="opacity-97">97% 透明</div>`;

  const pluginsCode = `// Tailwind 插件

// 1. 安装插件
npm install @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio

// 2. 配置 plugins
module.exports = {
  plugins: [
    require('@tailwindcss/forms'),      // 表单样式
    require('@tailwindcss/typography'), // 排版样式
    require('@tailwindcss/aspect-ratio'), // 宽高比
  ],
}

// 3. 插件功能

// @tailwindcss/forms
// 自动样式化表单元素
<input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />

// @tailwindcss/typography
// 美化文章内容
<article className="prose prose-lg dark:prose-invert">
  <h1>标题</h1>
  <p>段落内容...</p>
  <ul>
    <li>列表项</li>
  </ul>
</article>

// @tailwindcss/aspect-ratio
// 设置宽高比
<div className="aspect-video">16:9</div>
<div className="aspect-square">1:1</div>
<div className="aspect-[4/3]">4:3</div>

// 4. 自定义插件
function addUtilities({ addUtilities }) {
  const newUtilities = {
    '.text-shadow-sm': {
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    },
    '.text-shadow': {
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    '.text-shadow-lg': {
      textShadow: '4px 4px 8px rgba(0, 0, 0, 0.12)',
    },
  }

  addUtilities(newUtilities)
}

module.exports = {
  plugins: [
    addUtilities,
  ],
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            04. 自定义配置
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Tailwind CSS 提供强大的配置系统，可以自定义颜色、字体、断点、间距、
            动画等所有内容。通过 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">tailwind.config.js</code>
            创建定制化的设计系统。
          </p>
        </div>

        {/* 基础配置 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ⚙️ 基础配置
          </h2>
          <CodeBlock code={configCode} language="javascript" />
        </div>

        {/* 自定义颜色 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🎨 自定义颜色
          </h2>
          <CodeBlock code={customColorsCode} language="javascript" />
        </div>

        {/* 自定义间距 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📏 自定义间距和尺寸
          </h2>
          <CodeBlock code={customSpacingCode} language="javascript" />
        </div>

        {/* 自定义工具类 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🛠️ 自定义工具类
          </h2>
          <CodeBlock code={utilitiesCode} language="javascript" />
        </div>

        {/* 插件 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔌 插件使用
          </h2>
          <CodeBlock code={pluginsCode} language="javascript" />
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-5/03-dark-mode"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: 深色模式
          </Link>
          <Link
            href="/learn/phase-5/05-layouts"
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: 布局模式 →
          </Link>
        </div>
      </div>
    </div>
  );
}
