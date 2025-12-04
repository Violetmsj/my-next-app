# Next.js App Router - 基础路由

## 概述

Next.js 15 的 App Router 是基于文件的路由系统，它使用 `app` 目录和文件约定来自动创建路由。文件结构和 URL 路径一一对应，无需额外配置。

## 路由基础

### 文件夹即路由

```
app/
  ├── page.js              → /
  ├── about/
  │   └── page.js          → /about
  ├── contact/
  │   └── page.js          → /contact
  └── blog/
      ├── page.js          → /blog
      └── [slug]/
          └── page.js      → /blog/[slug]
```

### 页面文件

每个路由目录需要一个 `page.js` 文件：

```javascript
// app/page.js - 首页
export default function HomePage() {
  return (
    <div>
      <h1>欢迎来到首页</h1>
      <p>这是根路径 /</p>
    </div>
  );
}

// app/about/page.js - 关于页面
export default function AboutPage() {
  return (
    <div>
      <h1>关于我们</h1>
      <p>这是 /about 路径</p>
    </div>
  );
}
```

## 服务器组件和客户端组件

### 服务器组件（默认）

```javascript
// app/page.js - 服务器组件（默认）
export default function HomePage() {
  // 可以直接访问数据库、文件系统等
  const data = await fetchDataFromDatabase();

  return (
    <div>
      <h1>首页</h1>
      <p>{data.message}</p>
    </div>
  );
}
```

### 客户端组件

使用 `"use client"` 指令：

```javascript
// app/counter/page.js
'use client';

import { useState } from 'react';

export default function CounterPage() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>计数器</h1>
      <p>当前值: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}
```

## 路由层级

### 嵌套路由

```
app/
  ├── page.js              → /
  ├── dashboard/
  │   ├── page.js          → /dashboard
  │   ├── settings/
  │   │   └── page.js      → /dashboard/settings
  │   └── analytics/
  │       └── page.js      → /dashboard/analytics
  └── profile/
      └── page.js          → /profile
```

### 根布局

`app/layout.js` 是根布局，所有页面的外层容器：

```javascript
// app/layout.js
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <nav>
          <Link href="/">首页</Link>
          <Link href="/dashboard">仪表盘</Link>
          <Link href="/profile">个人资料</Link>
        </nav>
        <main>{children}</main>
        <footer>
          <p>&copy; 2024 我的网站</p>
        </footer>
      </body>
    </html>
  );
}
```

### 嵌套布局

```javascript
// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <aside>
        <nav>
          <Link href="/dashboard">概览</Link>
          <Link href="/dashboard/settings">设置</Link>
          <Link href="/dashboard/analytics">分析</Link>
        </nav>
      </aside>
      <div className="content">
        {children}
      </div>
    </div>
  );
}

// app/dashboard/page.js
export default function DashboardPage() {
  return (
    <div>
      <h1>仪表盘概览</h1>
      <p>这是仪表盘主页</p>
    </div>
  );
}
```

## 页面元数据

### 基础元数据

```javascript
// app/page.js
export const metadata = {
  title: '首页 - 我的网站',
  description: '欢迎访问我的网站，了解更多内容'
};

export default function HomePage() {
  return (
    <div>
      <h1>欢迎来到首页</h1>
    </div>
  );
}
```

### 动态元数据

```javascript
// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.images
    }
  };
}
```

## 样式导入

### 全局样式

```javascript
// app/layout.js
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```

### 组件样式

```javascript
// app/components/MyComponent.js
import styles from './MyComponent.module.css';

export default function MyComponent() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>组件标题</h1>
    </div>
  );
}
```

## 导入和组织

### 路径别名

使用 `jsconfig.json` 配置：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

使用别名：

```javascript
// app/page.js
import MyComponent from '@/components/MyComponent';
import { utils } from '@/lib/utils';
```

### 文件组织建议

```
app/
├── layout.js              # 根布局
├── page.js                # 首页
├── globals.css            # 全局样式
├── loading.js             # 加载页面
├── error.js               # 错误页面
├── not-found.js           # 404 页面
├── (auth)/
│   ├── layout.js          # 认证布局
│   ├── login/
│   │   └── page.js        # /login
│   └── register/
│       └── page.js        # /register
├── dashboard/
│   ├── layout.js          # 仪表盘布局
│   ├── page.js            # /dashboard
│   ├── loading.js         # /dashboard 加载
│   ├── error.js           # /dashboard 错误
│   ├── settings/
│   │   └── page.js        # /dashboard/settings
│   └── analytics/
│       └── page.js        # /dashboard/analytics
└── blog/
    ├── page.js            # /blog
    ├── loading.js         # /blog 加载
    ├── error.js           # /blog 错误
    ├── [slug]/
    │   ├── page.js        # /blog/[slug]
    │   ├── loading.js     # /blog/[slug] 加载
    │   └── error.js       # /blog/[slug] 错误
    └── new/
        └── page.js        # /blog/new
```

## 特殊文件

### loading.js

```javascript
// app/blog/loading.js
export default function Loading() {
  return (
    <div>
      <div className="animate-pulse">加载中...</div>
    </div>
  );
}
```

### error.js

```javascript
// app/dashboard/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>出错了！</h2>
      <p>{error.message}</p>
      <button onClick={reset}>
        重试
      </button>
    </div>
  );
}
```

### not-found.js

```javascript
// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>404 - 页面未找到</h1>
      <p>抱歉，您访问的页面不存在。</p>
      <Link href="/">
        返回首页
      </Link>
    </div>
  );
}
```

### global-error.js

```javascript
// app/global-error.js
'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>应用程序出错了</h2>
        <p>{error.message}</p>
        <button onClick={reset}>
          重试
        </button>
      </body>
    </html>
  );
}
```

## 对比 Pages Router

### App Router

```javascript
// app/page.js
export default function HomePage() {
  return <h1>首页</h1>;
}
```

### Pages Router

```javascript
// pages/index.js
export default function HomePage() {
  return <h1>首页</h1>;
}
```

### 区别对比

| 特性 | App Router | Pages Router |
|------|-----------|--------------|
| 目录结构 | `app/` | `pages/` |
| 默认组件类型 | 服务器组件 | 客户端组件 |
| 布局 | 内置 `layout.js` | 需要 `pages/_app.js` |
| 元数据 | 直接导出 `metadata` | 使用 `Head` 组件 |
| 加载状态 | `loading.js` | 自定义实现 |
| 错误处理 | `error.js` | `pages/_error.js` |
| 服务端渲染 | 默认 | 需要配置 |

## 性能优化

### 服务器组件优势

```javascript
// app/page.js - 服务器组件
export default async function OptimizedPage() {
  // 数据获取在服务器完成，客户端无需等待
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // 1小时缓存
  });

  // 客户端只接收渲染好的结果
  return (
    <div>
      <h1>{data.title}</h1>
      {/* 大型列表自动优化 */}
      <ul>
        {data.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 客户端组件优化

```javascript
// app/counter/page.js - 客户端组件
'use client';

import { useState, useMemo, useCallback } from 'react';

export default function OptimizedCounter() {
  const [count, setCount] = useState(0);

  // 使用 useCallback 优化函数
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  // 使用 useMemo 优化计算
  const expensiveValue = useMemo(() => {
    return count * 1000; // 昂贵计算
  }, [count]);

  return (
    <div>
      <p>计数: {count}</p>
      <p>计算值: {expensiveValue}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}
```

## 最佳实践

1. **优先使用服务器组件**：性能更好，减少客户端代码
2. **只在需要交互时使用客户端组件**：表单、动画、状态管理等
3. **使用内置的特殊文件**：loading、error、not-found 等
4. **合理组织文件结构**：按功能模块分组
5. **利用缓存**：使用 revalidate 优化性能
6. **导出 metadata**：为每个页面设置标题和描述
7. **保持组件简洁**：避免过深的嵌套

## 学习路径

- 上一课：[Custom Hooks - 自定义 Hook](../phase-1/07-custom-hooks.md)
- 下一课：[Layouts - 布局系统](02-layouts.md)
- 返回：[Next.js App Router](README.md)
