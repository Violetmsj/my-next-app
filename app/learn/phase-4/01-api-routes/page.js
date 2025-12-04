/**
 * Next.js 进阶 - API Routes 学习
 *
 * 学习在 Next.js 中创建 API 路由：
 * 1. 基础 API 路由（GET、POST、PUT、DELETE）
 * 2. 动态路由 API
 * 3. 中间件
 * 4. 请求处理和响应
 */

import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function ApiRoutesPage() {
  const navigationItems = [
    { label: 'Phase 4 概览', href: '/learn/phase-4' },
    { label: 'API Routes', href: '/learn/phase-4/01-api-routes' },
    { label: 'Server Actions', href: '/learn/phase-4/02-server-actions' },
    { label: 'Middleware', href: '/learn/phase-4/03-middleware' },
    { label: 'Caching', href: '/learn/phase-4/04-caching' },
    { label: 'Streaming', href: '/learn/phase-4/05-streaming' }
  ];

  const basicApiCode = `// 基础 GET 请求 - app/api/users/route.js
import { NextResponse } from 'next/server';

// 模拟数据库
const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' },
  { id: 3, name: '王五', email: 'wangwu@example.com' }
];

// GET 方法处理
export async function GET() {
  // 可以在这里访问数据库
  return NextResponse.json(users);
}

// POST 方法处理
export async function POST(request) {
  const body = await request.json();

  const newUser = {
    id: users.length + 1,
    name: body.name,
    email: body.email
  };

  users.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}

// 文件路径: app/api/users/route.js
// 访问: GET /api/users (获取所有用户)
// 访问: POST /api/users (创建新用户)`;

  const dynamicApiCode = `// 动态 API 路由 - app/api/users/[id]/route.js
import { NextResponse } from 'next/server';

const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' }
];

// 根据 ID 获取用户
export async function GET(request, { params }) {
  const { id } = params;

  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return NextResponse.json(
      { error: '用户不存在' },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

// 更新用户
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  const userIndex = users.findIndex(u => u.id === parseInt(id));

  if (userIndex === -1) {
    return NextResponse.json(
      { error: '用户不存在' },
      { status: 404 }
    );
  }

  users[userIndex] = {
    ...users[userIndex],
    ...body
  };

  return NextResponse.json(users[userIndex]);
}

// 删除用户
export async function DELETE(request, { params }) {
  const { id } = params;

  const userIndex = users.findIndex(u => u.id === parseInt(id));

  if (userIndex === -1) {
    return NextResponse.json(
      { error: '用户不存在' },
      { status: 404 }
    );
  }

  users.splice(userIndex, 1);

  return NextResponse.json({ message: '用户已删除' });
}

// 文件路径: app/api/users/[id]/route.js
// 访问: GET /api/users/1 (获取 ID 为 1 的用户)
// 访问: PUT /api/users/1 (更新用户)
// 访问: DELETE /api/users/1 (删除用户)`;

  const queryParamsCode = `// 处理查询参数 - app/api/search/route.js
import { NextResponse } from 'next/server';

const products = [
  { id: 1, name: 'iPhone 15', price: 7999, category: '手机' },
  { id: 2, name: 'MacBook Pro', price: 19999, category: '电脑' },
  { id: 3, name: 'iPad', price: 5999, category: '平板' }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const category = searchParams.get('category');
  const minPrice = parseInt(searchParams.get('minPrice')) || 0;
  const maxPrice = parseInt(searchParams.get('maxPrice')) || Infinity;

  let filteredProducts = products;

  // 按关键词搜索
  if (query) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // 按分类过滤
  if (category) {
    filteredProducts = filteredProducts.filter(p =>
      p.category === category
    );
  }

  // 按价格范围过滤
  filteredProducts = filteredProducts.filter(p =>
    p.price >= minPrice && p.price <= maxPrice
  );

  return NextResponse.json(filteredProducts);
}

// 访问示例:
// /api/search?q=iphone
// /api/search?category=电脑
// /api/search?minPrice=5000&maxPrice=10000`;

  const clientSideCode = `// 在客户端调用 API - app/page.js
'use client';

import { useState } from 'react';

export default function ApiDemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 获取用户列表
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/users');
      if (!res.ok) {
        throw new Error('获取数据失败');
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 创建新用户
  const createUser = async () => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: '新用户',
          email: 'newuser@example.com'
        })
      });

      if (!res.ok) {
        throw new Error('创建用户失败');
      }

      const newUser = await res.json();
      setUsers(prev => [...prev, newUser]);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>API 调用示例</h1>

      <div className="flex gap-2 mb-4">
        <button onClick={fetchUsers}>
          获取用户
        </button>
        <button onClick={createUser}>
          创建用户
        </button>
      </div>

      {loading && <p>加载中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            01. API Routes - 后端接口
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Next.js App Router 支持在 <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">app/api</code>
            目录中创建 API 路由，无需额外配置服务器或数据库。可以在同一项目中同时拥有前端页面和后端 API。
          </p>
        </div>

        {/* API Routes 结构 */}
        <DemoContainer
          title="API Routes 目录结构"
          description="API 路由的文件结构自动映射为 URL 路径"
        >
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`app/
├── api/
│   ├── users/
│   │   ├── route.js         # /api/users (GET, POST)
│   │   └── [id]/
│   │       └── route.js     # /api/users/123 (GET, PUT, DELETE)
│   ├── search/
│   │   └── route.js         # /api/search?q=keyword
│   └── products/
│       └── route.js         # /api/products`}</pre>
          </div>
        </DemoContainer>

        {/* 基础 API */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 基础 API 路由
          </h2>
          <CodeBlock code={basicApiCode} language="javascript" />
        </div>

        {/* 动态 API */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔄 动态 API 路由
          </h2>
          <CodeBlock code={dynamicApiCode} language="javascript" />
        </div>

        {/* 查询参数 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔍 处理查询参数
          </h2>
          <CodeBlock code={queryParamsCode} language="javascript" />
        </div>

        {/* 客户端调用 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💻 客户端调用 API
          </h2>
          <CodeBlock code={clientSideCode} language="javascript" />
        </div>

        {/* 最佳实践 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            📌 API Routes 最佳实践
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
            <li>✓ 使用有意义的文件名和目录结构</li>
            <li>✓ 正确设置 HTTP 状态码（200、201、404、500 等）</li>
            <li>✓ 验证请求数据（验证必填字段、数据格式）</li>
            <li>✓ 返回一致的 JSON 响应格式</li>
            <li>✓ 处理错误情况（提供有用的错误信息）</li>
            <li>✓ 使用 NextResponse.json() 而不是 Response</li>
            <li>✓ 避免在 API 路由中进行大计算（使用缓存或队列）</li>
          </ul>
        </div>

        {/* 使用场景 */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            🎯 API Routes 适用场景
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-400 space-y-2">
            <li>✅ 表单提交和数据处理</li>
            <li>✅ 用户认证（登录、注册、JWT 验证）</li>
            <li>✅ 数据库操作（CRUD 操作）</li>
            <li>✅ 文件上传和下载</li>
            <li>✅ 第三方 API 集成（作为代理）</li>
            <li>✅ Webhook 接收（支付、订阅）</li>
            <li>✅ 简单的后端逻辑（小规模应用）</li>
            <li>❌ 大规模复杂后端应用（建议使用专门后端）</li>
          </ul>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-4"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 返回 Phase 4
          </Link>
          <Link
            href="/learn/phase-4/02-server-actions"
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: Server Actions →
          </Link>
        </div>
      </div>
    </div>
  );
}
