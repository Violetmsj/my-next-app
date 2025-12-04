/**
 * useState Hook 学习页面
 *
 * useState是React Hooks中最基础的Hook，用于在函数组件中添加状态管理
 * 本页面展示3个示例：计数器、表单输入、开关切换
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function UseStatePage() {
  // 示例1: 基础计数器
  const [count, setCount] = useState(0);

  // 示例2: 表单输入
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // 示例3: 开关切换
  const [isEnabled, setIsEnabled] = useState(false);

  // 导航项
  const navigationItems = [
    { label: '概览', href: '/learn/phase-1' },
    { label: 'useState', href: '/learn/phase-1/01-use-state' },
    { label: 'useEffect', href: '/learn/phase-1/02-use-effect' },
    { label: 'useContext', href: '/learn/phase-1/03-use-context' },
    { label: 'useReducer', href: '/learn/phase-1/04-use-reducer' },
    { label: 'useMemo', href: '/learn/phase-1/05-use-memo' },
    { label: 'useCallback', href: '/learn/phase-1/06-use-callback' },
    { label: 'Custom Hooks', href: '/learn/phase-1/07-custom-hooks' }
  ];

  // 完整代码示例
  const fullCode = `import { useState } from 'react';

export default function UseStateExample() {
  // 1. 基础状态 - 数字类型
  const [count, setCount] = useState(0);

  // 2. 字符串状态 - 用于表单输入
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // 3. 布尔值状态 - 用于开关切换
  const [isEnabled, setIsEnabled] = useState(false);

  // 4. 对象状态 - 管理复杂数据
  const [user, setUser] = useState({
    name: '',
    age: 0,
    isActive: false
  });

  // 5. 数组状态 - 管理列表数据
  const [items, setItems] = useState([]);

  return (
    <div>
      {/* 使用状态值 */}
      <p>当前计数: {count}</p>

      {/* 更新状态 */}
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>

      {/* 表单输入 */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入姓名"
      />

      {/* 条件渲染 */}
      {isEnabled ? <p>已启用</p> : <p>已禁用</p>}

      {/* 切换状态 */}
      <button onClick={() => setIsEnabled(!isEnabled)}>
        切换
      </button>
    </div>
  );
}`;

  // useState详解
  const explainCode = `// useState 语法
const [state, setState] = useState(initialValue);

// 参数说明：
// - state: 当前状态值
// - setState: 更新状态的函数
// - initialValue: 状态的初始值（只在首次渲染时使用）

// 多种使用方式：
const [count, setCount] = useState(0);           // 数字
const [name, setName] = useState('');            // 字符串
const [isVisible, setIsVisible] = useState(false); // 布尔值
const [user, setUser] = useState({});            // 对象
const [items, setItems] = useState([]);          // 数组

// 更新状态的方式：
setCount(5);                    // 直接设置新值
setCount(prev => prev + 1);     // 基于之前的状态计算新值

// 重要提示：
// 1. 状态更新是异步的
// 2. 状态值不可直接修改，必须通过setState
// 3. 每次状态更新都会触发组件重新渲染
// 4. useState只在组件首次渲染时执行一次
`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 导航 */}
        <Navigation items={navigationItems} />

        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            01. useState - 基础状态管理
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            useState是React Hooks中最基础的Hook，允许我们在函数组件中添加状态管理。
            状态就像是组件的"记忆"，可以让组件记住并响应用户交互。
          </p>
        </div>

        {/* 示例1: 计数器 */}
        <DemoContainer
          title="示例 1: 计数器"
          description="最基础的useState用法，点击按钮增加计数"
        >
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {count}
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setCount(count - 1)}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                - 减少
              </button>
              <button
                onClick={() => setCount(0)}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                重置
              </button>
              <button
                onClick={() => setCount(count + 1)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                + 增加
              </button>
            </div>
          </div>
        </DemoContainer>

        {/* 示例2: 表单输入 */}
        <DemoContainer
          title="示例 2: 表单输入"
          description="使用useState管理表单输入值"
        >
          <div className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                姓名
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入您的姓名"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入您的邮箱"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {name && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">您输入的信息：</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  姓名: {name} | 邮箱: {email || '未输入'}
                </p>
              </div>
            )}
          </div>
        </DemoContainer>

        {/* 示例3: 开关切换 */}
        <DemoContainer
          title="示例 3: 开关切换"
          description="使用useState管理布尔值状态"
        >
          <div className="flex flex-col items-center gap-4">
            <div className={`
              relative w-20 h-10 rounded-full transition-colors duration-200 cursor-pointer
              ${isEnabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}
            `}
              onClick={() => setIsEnabled(!isEnabled)}
            >
              <div className={`
                absolute top-1 w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-200
                ${isEnabled ? 'translate-x-10' : 'translate-x-1'}
              `} />
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              状态: {isEnabled ? '已开启 ✅' : '已关闭 ❌'}
            </p>
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              切换状态
            </button>
          </div>
        </DemoContainer>

        {/* 代码说明 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 代码说明
          </h2>
          <CodeBlock code={explainCode} language="javascript" />
        </div>

        {/* 完整代码示例 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📝 完整代码示例
          </h2>
          <CodeBlock code={fullCode} language="javascript" />
        </div>

        {/* 使用场景总结 */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            📌 useState 典型使用场景
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-400 space-y-2">
            <li>✓ 表单输入管理（输入框、下拉框、复选框等）</li>
            <li>✓ 计数器、开关切换等交互状态</li>
            <li>✓ 控制UI显示/隐藏的条件状态</li>
            <li>✓ 组件内部的临时数据存储</li>
            <li>✓ 列表数据的添加、删除、修改操作</li>
          </ul>
        </div>

        {/* 注意事项 */}
        <div className="mt-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-3">
            ⚠️ 注意事项
          </h3>
          <ul className="text-sm text-yellow-800 dark:text-yellow-400 space-y-2">
            <li>• 状态更新是异步的，不会立即生效</li>
            <li>• 状态值不可直接修改，必须使用setState函数</li>
            <li>• 每次状态更新都会触发组件重新渲染</li>
            <li>• 如果新状态基于之前的状态，使用函数式更新：{"setCount(prev => prev + 1)"}</li>
            <li>• useState只在组件首次渲染时执行一次</li>
          </ul>
        </div>

        {/* 底部导航 */}
        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-1"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 返回Phase 1
          </Link>
          <Link
            href="/learn/phase-1/02-use-effect"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: useEffect →
          </Link>
        </div>
      </div>
    </div>
  );
}
