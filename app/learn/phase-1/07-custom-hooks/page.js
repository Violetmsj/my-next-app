/**
 * Custom Hooks 学习页面
 *
 * 自定义Hook允许我们将组件逻辑提取到可复用的函数中
 * 以"use"开头的函数，可以调用其他Hook
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

// 自定义Hook: 计数器
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// 自定义Hook: 本地存储
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

// 自定义Hook: 窗口大小
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// 自定义Hook: 异步数据获取
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(`模拟数据 - ${url}`);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default function CustomHooksPage() {
  // 使用自定义Hook
  const { count, increment, decrement, reset } = useCounter(10);
  const [name, setName] = useLocalStorage('userName', '');
  const windowSize = useWindowSize();
  const { data: fetchData, loading: fetchLoading } = useFetch('/api/data');

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

  const customHookCode = `// 自定义Hook命名约定：以"use"开头
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);

  // 返回状态和操作方法
  return { count, increment, decrement, reset };
}

// 在组件中使用
function MyComponent() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={increment}>增加</button>
      <button onClick={decrement}>减少</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}`;

  const useLocalStorageCode = `// 自定义Hook: 本地存储
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // 从localStorage读取初始值
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    }
    return initialValue;
  });

  // 监听value变化，自动保存到localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

// 使用示例
function UserProfile() {
  const [name, setName] = useLocalStorage('userName', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入姓名"
      />
      <p>存储的姓名: {name}</p>
    </div>
  );
}`;

  const useFetchCode = `// 自定义Hook: 数据获取
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // url变化时重新获取

  return { data, loading, error };
}

// 使用示例
function UserList() {
  const { data, loading, error } = useFetch('/api/users');

  if (loading) return <p>加载中...</p>;
  if (error) return <p>错误: {error}</p>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            07. Custom Hooks - 自定义Hook
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            自定义Hook是将组件逻辑提取到可复用函数的一种方式。
            以"use"开头的函数可以调用其他Hook，让我们能够在组件间共享有状态的行为。
          </p>
        </div>

        {/* useCounter示例 */}
        <DemoContainer
          title="示例 1: useCounter - 复用计数器逻辑"
          description="在多个组件中复用计数器功能"
        >
          <div className="max-w-md mx-auto text-center space-y-4">
            <div className="text-6xl font-bold text-blue-600 dark:text-blue-400">
              {count}
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={decrement}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                - 减少
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                重置
              </button>
              <button
                onClick={increment}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                + 增加
              </button>
            </div>
          </div>
        </DemoContainer>

        {/* useLocalStorage示例 */}
        <DemoContainer
          title="示例 2: useLocalStorage - 本地存储管理"
          description="自动同步数据到localStorage"
        >
          <div className="max-w-md mx-auto">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="输入您的姓名..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4"
            />
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-green-800 dark:text-green-300">
                <strong>当前输入:</strong> {name || '（空）'}
              </p>
              <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                💡 刷新页面后，数据会自动恢复
              </p>
            </div>
          </div>
        </DemoContainer>

        {/* useWindowSize示例 */}
        <DemoContainer
          title="示例 3: useWindowSize - 响应式监听"
          description="监听窗口大小变化"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                窗口尺寸
              </h4>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                {windowSize.width} × {windowSize.height}
              </p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                断点状态
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {windowSize.width < 640 && 'sm 以下'}
                {windowSize.width >= 640 && windowSize.width < 768 && 'md 尺寸'}
                {windowSize.width >= 768 && windowSize.width < 1024 && 'lg 尺寸'}
                {windowSize.width >= 1024 && 'xl 以上'}
              </p>
            </div>
          </div>
        </DemoContainer>

        {/* useFetch示例 */}
        <DemoContainer
          title="示例 4: useFetch - 数据获取"
          description="通用数据获取Hook"
        >
          <div className="text-center py-8">
            {fetchLoading ? (
              <div>
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">加载中...</p>
              </div>
            ) : (
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-green-800 dark:text-green-300 font-medium">
                  {fetchData}
                </p>
              </div>
            )}
          </div>
        </DemoContainer>

        {/* 自定义Hook代码 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 创建自定义Hook
          </h2>
          <CodeBlock code={customHookCode} language="javascript" />
        </div>

        {/* 本地存储示例 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📦 useLocalStorage 示例
          </h2>
          <CodeBlock code={useLocalStorageCode} language="javascript" />
        </div>

        {/* 数据获取示例 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🌐 useFetch 示例
          </h2>
          <CodeBlock code={useFetchCode} language="javascript" />
        </div>

        {/* 使用场景 */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            📌 Custom Hooks 典型场景
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-400 space-y-2">
            <li>✓ 数据获取逻辑封装</li>
            <li>✓ 表单状态管理</li>
            <li>✓ 本地存储交互</li>
            <li>✓ 事件监听器管理</li>
            <li>✓ 动画和定时器</li>
            <li>✓ 跨组件的状态共享逻辑</li>
          </ul>
        </div>

        {/* 底部导航 */}
        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-1/06-use-callback"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: useCallback
          </Link>
          <Link
            href="/learn/phase-2"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
          >
            完成 Phase 1! 进入 Phase 2 →
          </Link>
        </div>
      </div>
    </div>
  );
}
