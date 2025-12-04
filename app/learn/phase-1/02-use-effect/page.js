/**
 * useEffect Hook 学习页面
 *
 * useEffect用于处理副作用，如数据获取、订阅、手动修改DOM等
 * 相当于类组件的生命周期方法（componentDidMount、componentDidUpdate、componentWillUnmount）
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function UseEffectPage() {
  // 示例1: 基础定时器
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  // 示例2: 窗口大小
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // 示例3: 数据获取
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 示例4: 本地存储
  const [theme, setTheme] = useState('light');

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

  // Effect 1: 定时器 - 每次count变化时重新设置定时器
  useEffect(() => {
    if (count > 0) {
      timerRef.current = setInterval(() => {
        setCount(prev => prev - 1);
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [count]);

  // Effect 2: 监听窗口大小变化
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

  // Effect 3: 数据获取（模拟）
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUsers = [
          { id: 1, name: '张三', email: 'zhangsan@example.com' },
          { id: 2, name: '李四', email: 'lisi@example.com' },
          { id: 3, name: '王五', email: 'wangwu@example.com' }
        ];
        setUsers(mockUsers);
      } catch (err) {
        setError('获取数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Effect 4: 本地存储
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 代码示例
  const basicCode = `import { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log('组件已挂载或count已更新:', count);

    // 返回清理函数（相当于 componentWillUnmount）
    return () => {
      console.log('清理副作用');
    };
  }, [count]); // 依赖数组 - 只有count变化时才执行

  return (
    <button onClick={() => setCount(count + 1)}>
      点击次数: {count}
    </button>
  );
}`;

  const advancedCode = `// 1. 无依赖数组 - 每次渲染都执行
useEffect(() => {
  console.log('每次渲染都执行');
});

// 2. 空依赖数组 - 只在首次挂载时执行一次
useEffect(() => {
  console.log('只执行一次（类似componentDidMount）');
}, []);

// 3. 有依赖 - 依赖变化时执行
useEffect(() => {
  console.log('count或name变化时执行');
}, [count, name]);

// 4. 清理函数
useEffect(() => {
  const timer = setInterval(() => {
    console.log('定时器执行');
  }, 1000);

  // 组件卸载或下次effect执行前清理
  return () => {
    clearInterval(timer);
  };
}, []);`;

  const fetchCode = `// 数据获取示例
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/users');
        const data = await response.json();

        // 防止组件卸载后设置状态
        if (!isCancelled) {
          setUsers(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    // 清理函数：组件卸载时取消请求
    return () => {
      isCancelled = true;
    };
  }, []);

  if (loading) return <p>加载中...</p>;
  if (error) return <p>错误: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 导航 */}
        <Navigation items={navigationItems} />

        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            02. useEffect - 副作用处理
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            useEffect是处理副作用的Hook，用于执行数据获取、设置定时器、添加事件监听器、
            修改DOM等操作。它统一了类组件中多个生命周期方法的功能。
          </p>
        </div>

        {/* 示例1: 定时器倒计时 */}
        <DemoContainer
          title="示例 1: 定时器倒计时"
          description="使用useEffect实现定时器，注意清理函数的使用"
        >
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {count > 0 ? count : '完成!'}
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setCount(10)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                开始倒计时 (10秒)
              </button>
              <button
                onClick={() => setCount(0)}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                停止
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              useEffect会在count变化时重新设置定时器，并在组件卸载时清理
            </p>
          </div>
        </DemoContainer>

        {/* 示例2: 窗口大小 */}
        <DemoContainer
          title="示例 2: 监听窗口大小变化"
          description="在useEffect中添加和清理事件监听器"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                当前窗口尺寸
              </h4>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                {windowSize.width} × {windowSize.height}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-500 mt-2">
                调整浏览器窗口大小查看变化
              </p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                响应式断点
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {windowSize.width < 640 && '< 640px (sm)'}
                {windowSize.width >= 640 && windowSize.width < 768 && '640px - 768px (md)'}
                {windowSize.width >= 768 && windowSize.width < 1024 && '768px - 1024px (lg)'}
                {windowSize.width >= 1024 && '> 1024px (xl)'}
              </p>
            </div>
          </div>
        </DemoContainer>

        {/* 示例3: 数据获取 */}
        <DemoContainer
          title="示例 3: 数据获取"
          description="使用useEffect在组件挂载时获取数据"
        >
          <div>
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">加载中...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {users.map(user => (
                  <div key={user.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {user.email}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DemoContainer>

        {/* 示例4: 本地存储 */}
        <DemoContainer
          title="示例 4: 本地存储同步"
          description="使用useEffect同步数据到localStorage"
        >
          <div className="max-w-md mx-auto text-center">
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => setTheme('light')}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-colors
                  ${theme === 'light'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }
                `}
              >
                浅色主题
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-colors
                  ${theme === 'dark'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }
                `}
              >
                深色主题
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              主题设置已保存到localStorage: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                {theme}
              </code>
            </p>
          </div>
        </DemoContainer>

        {/* 基础代码示例 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 基础用法
          </h2>
          <CodeBlock code={basicCode} language="javascript" />
        </div>

        {/* 高级用法 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📚 依赖数组的3种用法
          </h2>
          <CodeBlock code={advancedCode} language="javascript" />
        </div>

        {/* 数据获取示例 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🌐 数据获取完整示例
          </h2>
          <CodeBlock code={fetchCode} language="javascript" />
        </div>

        {/* 使用场景总结 */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            📌 useEffect 典型使用场景
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-400 space-y-2">
            <li>✓ 数据获取（API调用）</li>
            <li>✓ 设置定时器、延迟执行</li>
            <li>✓ 添加/移除事件监听器</li>
            <li>✓ 手动修改DOM（如果需要）</li>
            <li>✓ 订阅外部数据源（如WebSocket）</li>
            <li>✓ 与localStorage、sessionStorage交互</li>
          </ul>
        </div>

        {/* 注意事项 */}
        <div className="mt-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-3">
            ⚠️ 重要提示
          </h3>
          <ul className="text-sm text-yellow-800 dark:text-yellow-400 space-y-2">
            <li>• 每次Effect执行后，返回的清理函数会在下次Effect执行前执行</li>
            <li>• 组件卸载时，所有Effect的清理函数都会被执行</li>
            <li>• 依赖数组中的值必须是effect中使用到的所有值</li>
            <li>• 空数组[]表示effect只在首次挂载时执行一次</li>
            <li>• 无依赖数组表示effect在每次渲染后都执行</li>
            <li>• 数据获取时注意组件卸载后避免设置状态（内存泄漏）</li>
          </ul>
        </div>

        {/* 底部导航 */}
        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-1/01-use-state"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: useState
          </Link>
          <Link
            href="/learn/phase-1/03-use-context"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: useContext →
          </Link>
        </div>
      </div>
    </div>
  );
}
