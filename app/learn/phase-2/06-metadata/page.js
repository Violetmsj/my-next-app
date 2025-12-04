/**
 * Next.js App Router - Metadata 元数据学习
 *
 * 学习页面元数据管理：SEO优化、社交媒体卡片、favicon 等
 */

import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export const metadata = {
  title: '06. Metadata 元数据 | Next.js 学习路径',
  description: '学习 Next.js App Router 的 Metadata API，用于管理页面元数据、SEO 优化和社交媒体卡片',
  openGraph: {
    title: 'Metadata 元数据 - Next.js 学习路径',
    description: '掌握 Next.js 15 的 Metadata API',
    type: 'article',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metadata 元数据 - Next.js 学习路径',
    description: '掌握 Next.js 15 的 Metadata API',
  },
  keywords: ['Next.js', 'Metadata', 'SEO', 'App Router'],
};

export default function MetadataPage() {
  const navigationItems = [
    { label: '概览', href: '/learn/phase-2' },
    { label: '基础路由', href: '/learn/phase-2/01-routing' },
    { label: 'Layouts', href: '/learn/phase-2/02-layouts' },
    { label: '动态路由', href: '/learn/phase-2/03-dynamic-routing' },
    { label: '数据获取', href: '/learn/phase-2/04-data-fetching' },
    { label: '导航', href: '/learn/phase-2/05-navigation' },
    { label: 'Metadata', href: '/learn/phase-2/06-metadata' }
  ];

  const staticMetadataCode = `// 静态 Metadata - 在页面组件外部导出
import type { Metadata } from 'next';

// 基础元数据
export const metadata: Metadata = {
  title: {
    default: '我的网站 - 主页',
    template: '%s | 我的网站'
  },
  description: '这是一个使用 Next.js 构建的现代化网站',
  keywords: ['Next.js', 'React', 'Web 开发'],
  authors: [{ name: '张三' }],
  creator: '张三',
  publisher: '我的公司',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// 或导出独立的 metadata 对象
export const metadata = {
  title: '关于页面',
  description: '了解我们的公司历史和团队',
} as Metadata;`;

  const dynamicMetadataCode = `// 动态 Metadata - 基于路由参数
import type { Metadata } from 'next';

type Props = {
  params: { id: string };
};

// 根据 params 生成动态 metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await fetchProduct(params.id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await fetchProduct(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}

// API 参考示例
async function fetchProduct(id: string) {
  return {
    id,
    name: '产品名称',
    description: '产品详细描述',
    images: ['/product.jpg']
  };
}`;

  const openGraphCode = `// Open Graph - 社交媒体卡片
export const metadata: Metadata = {
  title: '精彩文章 - Next.js 完整指南',
  description: '学习 Next.js 15 的所有核心功能',
  openGraph: {
    title: 'Next.js 完整指南',
    description: '从入门到精通的 Next.js 教程',
    url: 'https://example.com',
    siteName: '我的博客',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Next.js 指南封面',
      },
    ],
    locale: 'zh_CN',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    authors: ['张三'],
    tags: ['Next.js', 'React', '前端开发'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js 完整指南',
    description: '从入门到精通的 Next.js 教程',
    creator: '@zhangsan',
    images: ['https://example.com/og-image.jpg'],
  },
}`;

  const iconsCode = `// 图标配置
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '我的网站',
  description: '网站描述',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

// 目录结构示例
public/
├── favicon.ico              # 浏览器图标
├── icon.svg                 # SVG 图标
├── icon.png                 # PNG 图标
├── apple-icon.png           # Apple 设备图标
├── safari-pinned-tab.svg    # Safari 固定标签页图标
└── site.webmanifest         # Web App 清单文件`;

const robotsCode = `// robots.txt 和站点地图
// import type { Metadata } from 'next';

// // robots 指令
// export const metadata: Metadata = {
//   robots: {
//     index: true,              // 允许索引
//     follow: true,             // 允许跟踪链接
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
// };

// // robots.ts 文件 - 生成 robots.txt
// import type { MetadataRoute } from 'next';

// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: [
//       {
//         userAgent: '*',
//         allow: '/',
//         disallow: '/admin/',
//       },
//     ],
//     sitemap: 'https://example.com/sitemap.xml',
//   };
// }

// // sitemap.ts 文件 - 生成站点地图
// import type { MetadataRoute } from 'next';

// export default function sitemap(): MetadataRoute.Sitemap {
//   return [
//     {
//       url: 'https://example.com',
//       lastModified: new Date(),
//       changeFrequency: 'yearly',
//       priority: 1,
//     },
//     {
//       url: 'https://example.com/blog',
//       lastModified: new Date(),
//       changeFrequency: 'weekly',
//       priority: 0.8,
//     },
//     {
//       url: 'https://example.com/blog/[slug]',
//       lastModified: new Date(),
//       changeFrequency: 'weekly',
//       priority: 0.7,
//     },
//   ];
// }`;

  const layoutMetadataCode = `// Layout 中的共享 metadata
// app/layout.tsx - 根布局
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '我的网站',
    template: '%s | 我的网站'
  },
  description: '网站描述',
  metadataBase: new URL('https://example.com'),
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/zh-cn',
      'en-US': '/en-us',
    },
  },
  openGraph: {
    siteName: '我的网站',
    locale: 'zh_CN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

// app/(marketing)/layout.tsx - 嵌套布局
export const metadata: Metadata = {
  title: '营销页面',
  description: '产品介绍和营销内容',
};

// 页面可以覆盖布局的 metadata
// app/(marketing)/about/page.tsx
export const metadata: Metadata = {
  title: '关于我们',
  description: '了解我们的团队和历史',
};`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            06. Metadata 元数据
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Next.js App Router 提供强大的 Metadata API，用于管理页面标题、描述、
            Open Graph 卡片等元数据，让 SEO 优化变得简单。
          </p>
        </div>

        {/* 当前页面 Metadata */}
        <DemoContainer
          title="当前页面 Metadata"
          description="查看页面源代码中的 head 标签"
        >
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{JSON.stringify({
              title: '06. Metadata 元数据 | Next.js 学习路径',
              description: '学习 Next.js App Router 的 Metadata API，用于管理页面元数据、SEO 优化和社交媒体卡片',
              keywords: ['Next.js', 'Metadata', 'SEO', 'App Router']
            }, null, 2)}</pre>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            💡 这些元数据会在 HTML 的 &lt;head&gt; 标签中自动生成
          </p>
        </DemoContainer>

        {/* 静态 Metadata */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📄 静态 Metadata
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            在页面组件外部导出 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">metadata</code> 对象，可以是静态对象或 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Metadata</code> 类型。
          </p>
          <CodeBlock code={staticMetadataCode} language="javascript" />
        </div>

        {/* 动态 Metadata */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔄 动态 Metadata
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            导出 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">generateMetadata</code> 函数，可以根据路由参数或外部数据生成动态元数据。
          </p>
          <CodeBlock code={dynamicMetadataCode} language="javascript" />
        </div>

        {/* Open Graph */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📱 Open Graph 和 Twitter Cards
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            配置 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">openGraph</code> 和 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">twitter</code> 字段，让页面在社交媒体分享时显示精美的卡片。
          </p>
          <CodeBlock code={openGraphCode} language="javascript" />
        </div>

        {/* 图标 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🎨 图标配置
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            配置各种尺寸和类型的图标，支持 favicon、Apple touch icon、PWA 图标等。
          </p>
          <CodeBlock code={iconsCode} language="javascript" />
        </div>

        {/* Robots 和站点地图 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🕷️ robots.txt 和站点地图
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            创建 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">robots.ts</code> 和 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">sitemap.ts</code> 文件，自动生成 robots.txt 和 XML 站点地图。
          </p>
          <CodeBlock code={robotsCode} language="javascript" />
        </div>

        {/* Layout Metadata */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🏗️ Layout 中的共享 Metadata
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            在 Layout 中定义的 metadata 会被所有子页面继承，子页面可以覆盖部分或全部元数据。
          </p>
          <CodeBlock code={layoutMetadataCode} language="javascript" />
        </div>

        {/* 最佳实践 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            📌 Metadata 最佳实践
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
            <li>✓ 使用 <code>title.template</code> 为所有页面设置统一标题格式</li>
            <li>✓ 在根布局中设置基础 metadata（description、keywords 等）</li>
            <li>✓ 为每个页面提供独特的标题和描述</li>
            <li>✓ 配置 Open Graph 图片提升社交分享效果</li>
            <li>✓ 使用动态元数据展示个性化内容（产品页、文章页）</li>
            <li>✓ 创建 robots.txt 和 sitemap.xml 辅助 SEO</li>
            <li>✓ 为多语言网站配置 <code>alternates</code></li>
          </ul>
        </div>

        {/* 使用场景 */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            🎯 Metadata 核心作用
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">SEO 优化：</h4>
              <ul className="text-green-800 dark:text-green-400 space-y-1">
                <li>• 页面标题和描述</li>
                <li>• 关键词标签</li>
                <li>• robots 指令</li>
                <li>• 站点地图</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">社交分享：</h4>
              <ul className="text-green-800 dark:text-green-400 space-y-1">
                <li>• Open Graph 卡片</li>
                <li>• Twitter Cards</li>
                <li>• 分享图片</li>
                <li>• 社交元数据</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">PWA 支持：</h4>
              <ul className="text-green-800 dark:text-green-400 space-y-1">
                <li>• Web App 清单</li>
                <li>• 各类图标</li>
                <li>• Theme Color</li>
                <li>• 设备适配</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-2/05-navigation"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: 导航与链接
          </Link>
          <Link
            href="/learn/phase-3"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            下一阶段: React 进阶 →
          </Link>
        </div>
      </div>
    </div>
  );
}
