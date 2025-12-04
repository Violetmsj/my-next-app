/**
 * useCallback Hook 学习页面
 *
 * useCallback用于缓存函数实例，在组件重新渲染时保持函数引用不变
 * 防止子组件不必要的重新渲染
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function UseCallbackPage() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([
    { id: 1, text: '学习React Hooks', completed: true },
    { id: 2, text: '构建React应用', completed: false },
    { id: 3, text: '部署项目', completed: false }
  ]);

  // 使用useCallback缓存函数
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, {
      id: Date.now(),
      text,
      completed: false
    }]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const expensiveValue = useMemo(() => {
    console.log('执行计算...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(count);
    }
    return result;
  }, [count]);

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

  const basicCode = `import { useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  // 不使用useCallback - 每次渲染都创建新函数
  const increment1 = () => {
    setCount(prev => prev + 1);
  };

  // 使用useCallback - 缓存函数实例
  const increment2 = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // 空依赖数组，函数只创建一次

  const incrementWithValue = useCallback((value) => {
    setCount(prev => prev + value);
  }, []); // 依赖为空，函数引用保持不变

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment1}>增加 (新函数)</button>
      <button onClick={increment2}>增加 (缓存函数)</button>
      <button onClick={() => incrementWithValue(5)}>增加5</button>
    </div>
  );
}`;

  const childComponentCode = `// 子组件 - 接收回调函数作为props
function ChildComponent({ onClick, title }) {
  console.log('ChildComponent 渲染了:', title);

  return (
    <button onClick={onClick}>
      {title}
    </button>
  );
}

// 使用React.memo包装子组件，防止不必要的渲染
const MemoizedChild = React.memo(ChildComponent);

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  // 不使用useCallback - 每次父组件渲染都会创建新函数
  const handleClick1 = () => {
    setCount(prev => prev + 1);
  };

  // 使用useCallback - 函数引用保持不变
  const handleClick2 = useCallback(() => {
    setChildCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <button onClick={handleClick1}>
        父组件按钮 (会触发子组件重新渲染)
      </button>
      <MemoizedChild
        onClick={handleClick2}
        title="子组件按钮 (不会触发重新渲染)"
      />
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            06. useCallback - 函数缓存
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            useCallback用于缓存函数实例，在组件重新渲染时保持函数引用不变。
            它接收一个函数和依赖数组，返回该函数的缓存版本，只有依赖变化时才创建新函数。
          </p>
        </div>

        {/* 计数器示例 */}
        <DemoContainer
          title="示例 1: 基础函数缓存"
          description="useCallback保证函数引用在多次渲染中保持不变"
        >
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-2">
                {count}
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-500">
                点击按钮测试函数缓存
              </p>
            </div>

            <button
              onClick={increment}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              增加计数
            </button>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                💡 每次点击时，检查控制台是否输出"执行计算..."
              </p>
              <p className="text-sm text-yellow-800 dark:text-yellow-300 mt-1">
                计算结果: {expensiveValue.toFixed(2)}
              </p>
            </div>
          </div>
        </DemoContainer>

        {/* Todo表示例 */}
        <DemoContainer
          title="示例 2: Todo应用 - 多个回调函数"
          description="使用useCallback管理多个回调函数"
        >
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.elements.todoInput;
                const value = input.value.trim();
                if (value) {
                  addTodo(value);
                  input.value = '';
                }
              }}
              className="flex gap-2 mb-4"
            >
              <input
                name="todoInput"
                placeholder="添加新的待办事项..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                添加
              </button>
            </form>

            <div className="space-y-2">
              {todos.map(todo => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span
                    className={`flex-1 ${
                      todo.completed
                        ? 'text-gray-500 dark:text-gray-500 line-through'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              共 {todos.length} 项待办事项
            </div>
          </div>
        </DemoContainer>

        {/* 基础用法 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 基础用法
          </h2>
          <CodeBlock code={basicCode} language="javascript" />
        </div>

        {/* 子组件示例 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📚 与子组件配合使用
          </h2>
          <CodeBlock code={childComponentCode} language="javascript" />
        </div>

        {/* 使用场景 */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            📌 useCallback 适用场景
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-400 space-y-2">
            <li>✓ 传递给子组件的回调函数</li>
            <li>✓ 配合React.memo防止子组件不必要的重新渲染</li>
            <li>✓ 在useEffect中使用函数时（避免无限循环）</li>
            <li>✓ 事件处理函数，特别是依赖其他状态的函数</li>
            <li>✓ 复杂对象作为props时，与useMemo配合使用</li>
          </ul>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-1/05-use-memo"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: useMemo
          </Link>
          <Link
            href="/learn/phase-1/07-custom-hooks"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: Custom Hooks →
          </Link>
        </div>
      </div>
    </div>
  );
}
