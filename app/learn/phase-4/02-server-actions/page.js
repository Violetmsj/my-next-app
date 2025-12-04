/**
 * Next.js 进阶 - Server Actions 学习
 *
 * 学习 Server Actions：直接在服务器端执行表单提交和数据操作
 */

import Link from 'next/link';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

// 这个页面主要展示概念和代码，Server Actions 需要实际表单来演示

export default function ServerActionsPage() {
  const navigationItems = [
    { label: 'Phase 4 概览', href: '/learn/phase-4' },
    { label: 'API Routes', href: '/learn/phase-4/01-api-routes' },
    { label: 'Server Actions', href: '/learn/phase-4/02-server-actions' },
    { label: 'Middleware', href: '/learn/phase-4/03-middleware' },
    { label: 'Caching', href: '/learn/phase-4/04-caching' },
    { label: 'Streaming', href: '/learn/phase-4/05-streaming' }
  ];

  const basicServerActionCode = `// 基础 Server Action - app/actions/userActions.js
import { revalidatePath } from 'next/cache';

// 在服务器端执行的操作
export async function createUser(formData) {
  // 可以直接访问数据库
  const name = formData.get('name');
  const email = formData.get('email');

  // 验证数据
  if (!name || !email) {
    return { error: '姓名和邮箱是必填项' };
  }

  // 创建用户（模拟）
  const newUser = {
    id: Date.now(),
    name,
    email,
    createdAt: new Date().toISOString()
  };

  // 可以执行数据库操作
  // await db.users.create({ data: newUser });

  // 清除缓存，触发重新获取数据
  revalidatePath('/users');

  return { success: true, user: newUser };
}

// 更新用户
export async function updateUser(id, formData) {
  const name = formData.get('name');
  const email = formData.get('email');

  // 验证
  if (!name || !email) {
    return { error: '姓名和邮箱是必填项' };
  }

  // 更新数据库
  // await db.users.update({
  //   where: { id },
  //   data: { name, email }
  // });

  revalidatePath('/users');
  revalidatePath(\`/users/\${id}\`);

  return { success: true };
}

// 删除用户
export async function deleteUser(id) {
  // 从数据库删除
  // await db.users.delete({ where: { id } });

  revalidatePath('/users');

  return { success: true };
}`;

  const usageExampleCode = `// 使用 Server Action - app/users/page.js
import { createUser } from '../actions/userActions';

export default function UsersPage() {
  async function createUserAction(formData) {
    'use server';
    // 调用 Server Action
    return await createUser(formData);
  }

  return (
    <div>
      <h1>用户管理</h1>

      {/* 创建用户表单 */}
      <form action={createUserAction}>
        <div>
          <label>姓名:</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>邮箱:</label>
          <input type="email" name="email" required />
        </div>
        <button type="submit">创建用户</button>
      </form>

      {/* 用户列表 */}
      <UserList />
    </div>
  );
}

// 使用 useFormState 获取 Server Action 的结果
'use client';

import { useFormState } from 'react-dom';
import { createUser } from '../actions/userActions';

function UserForm() {
  const [state, formAction] = useFormState(createUser, null);

  return (
    <form action={formAction}>
      <div>
        <label>姓名:</label>
        <input type="text" name="name" required />
      </div>
      <div>
        <label>邮箱:</label>
        <input type="email" name="email" required />
      </div>

      {state?.error && (
        <p style={{ color: 'red' }}>{state.error}</p>
      )}

      {state?.success && (
        <p style={{ color: 'green' }}>用户创建成功!</p>
      )}

      <button type="submit">创建</button>
    </form>
  );
}`;

  const apiComparisonCode = `// API Routes vs Server Actions 对比

// 方式 1: 使用 API Routes
// app/api/users/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  // 创建用户
  // const user = await db.users.create({ data: body });

  return NextResponse.json(user, { status: 201 });
}

// app/users/page.js
'use client';

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: { 'Content-Type': 'application/json' }
  });

  const user = await res.json();
}

// 方式 2: 使用 Server Actions（更简单）
// app/users/actions.js
export async function createUser(formData) {
  const name = formData.get('name');
  const email = formData.get('email');

  // 直接操作数据库，无需 HTTP 请求

  return { success: true };
}

// app/users/page.js
async function handleSubmit(formData) {
  'use server';

  return await createUser(formData);
}

// 直接在 form 中使用
// <form action={handleSubmit}>

// 区别总结：
// API Routes:
//   - 需要客户端 fetch 调用
//   - 独立的后端接口
//   - 支持 GET、POST 等 HTTP 方法
//   - 可以被任何前端调用
//
// Server Actions:
//   - 直接从表单调用
//   - 无需 HTTP 请求
//   - 只能从 Server Components 调用
//   - 更简洁，性能更好`;

  const bestPracticesCode = `// Server Actions 最佳实践

// 1. 导出 async 函数
export async function myAction(formData) {
  // 必须 async
}

// 2. 在函数顶部使用 'use server'
'use server';

export async function createPost(formData) {
  // 处理逻辑
}

// 3. 返回可序列化的数据
export async function saveData(formData) {
  const result = await processData(formData);

  // 返回 JSON 可序列化的对象
  return {
    success: true,
    id: result.id,
    message: '保存成功'
  };
}

// 4. 使用 revalidatePath 清理缓存
import { revalidatePath } from 'next/cache';

export async function updateProduct(id, formData) {
  // 更新数据库

  // 清理相关页面的缓存
  revalidatePath('/products');
  revalidatePath(\`/products/\${id}\`);
}

// 5. 验证输入数据
export async function submitForm(formData) {
  const name = formData.get('name');

  // 验证
  if (!name || typeof name !== 'string') {
    return { error: '姓名无效' };
  }

  if (name.length < 2) {
    return { error: '姓名至少 2 个字符' };
  }

  // 处理
  // ...
}

// 6. 错误处理
export async function riskyOperation(formData) {
  try {
    // 可能失败的操作
    await db.transaction(async (tx) => {
      await tx.users.create({ data: formData });
    });

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}`;

  const useCasesCode = `// Server Actions 适用场景

// 1. 表单提交（最常用）
export async function handleContactForm(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // 发送到数据库或邮件服务
  await db.contactMessages.create({
    data: { name, email, message }
  });

  return { success: true, message: '消息已发送' };
}

// 2. 数据更新操作
export async function updateProfile(formData) {
  const userId = formData.get('userId');
  const bio = formData.get('bio');

  await db.users.update({
    where: { id: userId },
    data: { bio }
  });

  revalidatePath('/profile');
  revalidatePath(\`/users/\${userId}\`);

  return { success: true };
}

// 3. 文件上传
export async function uploadFile(formData) {
  const file = formData.get('file');

  if (!file) {
    return { error: '请选择文件' };
  }

  // 上传到云存储
  const uploadedFile = await uploadToS3(file);

  return { success: true, url: uploadedFile.url };
}

// 4. 搜索和过滤
export async function searchProducts(formData) {
  const query = formData.get('query');
  const category = formData.get('category');

  const products = await db.products.findMany({
    where: {
      AND: [
        query ? { name: { contains: query } } : {},
        category ? { category } : {}
      ]
    }
  });

  return { products };
}

// 5. 批量操作
export async function deleteMultipleItems(formData) {
  const ids = formData.getAll('selectedIds');

  await db.items.deleteMany({
    where: { id: { in: ids } }
  });

  revalidatePath('/items');

  return { success: true, deletedCount: ids.length };
};

// 注意：Server Actions 适用于数据操作，
// 不适合需要客户端实时交互的场景`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            02. Server Actions - 服务器动作
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Server Actions</code> 允许
            直接在服务器端执行表单提交和数据操作，无需创建 API 路由或使用 fetch。
            大幅简化了表单处理流程，提升了开发体验和性能。
          </p>
        </div>

        {/* 核心特性 */}
        <div className="mt-8 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
          <h3 className="font-semibold text-orange-900 dark:text-orange-300 mb-3">
            ✨ Server Actions 核心特性
          </h3>
          <ul className="text-sm text-orange-800 dark:text-orange-400 space-y-2">
            <li>• <strong>无需 API 路由</strong> - 直接在组件中定义服务器操作</li>
            <li>• <strong>表单即 API</strong> - 表单 action 属性直接调用 Server Action</li>
            <li>• <strong>无 HTTP 请求</strong> - 数据操作直接在服务器执行</li>
            <li>• <strong>自动验证</strong> - 内置表单数据验证和转换</li>
            <li>• <strong>缓存管理</strong> - 自动清理相关页面的缓存</li>
            <li>• <strong>性能优化</strong> - 减少客户端代码和网络请求</li>
          </ul>
        </div>

        {/* 基础用法 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 基础 Server Actions
          </h2>
          <CodeBlock code={basicServerActionCode} language="javascript" />
        </div>

        {/* 使用示例 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📝 使用示例
          </h2>
          <CodeBlock code={usageExampleCode} language="javascript" />
        </div>

        {/* 对比 API Routes */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔄 API Routes vs Server Actions
          </h2>
          <CodeBlock code={apiComparisonCode} language="javascript" />
        </div>

        {/* 最佳实践 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ⭐ 最佳实践
          </h2>
          <CodeBlock code={bestPracticesCode} language="javascript" />
        </div>

        {/* 适用场景 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🎯 适用场景
          </h2>
          <CodeBlock code={useCasesCode} language="javascript" />
        </div>

        {/* 选择指南 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            📊 如何选择 Server Actions 或 API Routes
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                使用 Server Actions 当：
              </h4>
              <ul className="text-blue-800 dark:text-blue-400 space-y-1">
                <li>• 表单提交（95% 的场景）</li>
                <li>• 数据创建、修改、删除</li>
                <li>• 需要缓存自动清理</li>
                <li>• 简单的后端逻辑</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                使用 API Routes 当：
              </h4>
              <ul className="text-blue-800 dark:text-blue-400 space-y-1">
                <li>• 需要从客户端 JavaScript 调用</li>
                <li>• 需要第三方服务集成</li>
                <li>• Webhook 接收</li>
                <li>• 复杂的后端逻辑</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-4/01-api-routes"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: API Routes
          </Link>
          <Link
            href="/learn/phase-4/03-middleware"
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: Middleware →
          </Link>
        </div>
      </div>
    </div>
  );
}
