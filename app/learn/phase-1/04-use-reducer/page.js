/**
 * useReducer Hook 学习页面
 *
 * useReducer用于管理复杂的状态逻辑
 * 类似于Redux，适用于状态逻辑复杂的场景
 */

'use client';

import { useReducer } from 'react';
import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

// Reducer函数 - 纯函数，根据action更新state
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
    default:
      return state;
  }
}

export default function UseReducerPage() {
  // 初始化state
  const initialState = {
    todos: [],
    filter: 'all' // all, active, completed
  };

  // 使用useReducer
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // 表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.todoInput;
    const value = input.value.trim();
    if (value) {
      dispatch({ type: 'ADD_TODO', payload: value });
      input.value = '';
    }
  };

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

  // 代码示例
  const basicCode = `// 1. 定义reducer函数（纯函数）
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

// 2. 在组件中使用useReducer
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0
  });

  return (
    <div>
      <p>计数: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        增加
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        减少
      </button>
      <button onClick={() => dispatch({ type: 'RESET' })}>
        重置
      </button>
    </div>
  );
}`;

  const todoCode = `// Todo应用示例
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  });

  return (
    <div>
      {/* 添加Todo */}
      <form onSubmit={(e) => {
        e.preventDefault();
        const text = e.target.elements.todo.value;
        if (text.trim()) {
          dispatch({ type: 'ADD_TODO', payload: text });
          e.target.reset();
        }
      }}>
        <input name="todo" placeholder="添加待办事项" />
        <button type="submit">添加</button>
      </form>

      {/* Todo列表 */}
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              删除
            </button>
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
            04. useReducer - 复杂状态管理
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            useReducer用于管理复杂的状态逻辑，类似于Redux。它通过reducer函数和action来管理状态，
            适合状态逻辑复杂、有多个子值或下一个状态依赖前一个状态的场景。
          </p>
        </div>

        {/* 交互式Demo */}
        <DemoContainer
          title="示例: Todo应用 - 完整的状态管理"
          description="使用useReducer管理待办事项的增删改查操作"
        >
          <div className="max-w-2xl mx-auto">
            {/* 添加Todo */}
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex gap-2">
                <input
                  name="todoInput"
                  placeholder="添加新的待办事项..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  添加
                </button>
              </div>
            </form>

            {/* 统计信息 */}
            <div className="mb-4 flex gap-4 text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                总计: {state.todos.length}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                已完成: {state.todos.filter(t => t.completed).length}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                未完成: {state.todos.filter(t => !t.completed).length}
              </span>
            </div>

            {/* Todo列表 */}
            {state.todos.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                暂无待办事项
              </div>
            ) : (
              <ul className="space-y-2">
                {state.todos.map(todo => (
                  <li
                    key={todo.id}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
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
                    <button
                      onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
                    >
                      删除
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* 清除按钮 */}
            {state.todos.length > 0 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                >
                  清除所有已完成的项目
                </button>
              </div>
            )}
          </div>
        </DemoContainer>

        {/* 基础用法 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 基础用法
          </h2>
          <CodeBlock code={basicCode} language="javascript" />
        </div>

        {/* Todo示例 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📚 Todo应用完整示例
          </h2>
          <CodeBlock code={todoCode} language="javascript" />
        </div>

        {/* 使用场景 */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            📌 useReducer 适用场景
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-400 space-y-2">
            <li>✓ 复杂的状态逻辑（如表单处理、多步骤流程）</li>
            <li>✓ 状态有多个子值（如数组、对象）</li>
            <li>✓ 下一个状态依赖前一个状态（需计算）</li>
            <li>✓ 需要统一的状态管理模式（如Todo应用、购物车）</li>
            <li>✓ 状态变化涉及多个操作（类似Redux工作流）</li>
          </ul>
        </div>

        {/* 底部导航 */}
        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-1/03-use-context"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: useContext
          </Link>
          <Link
            href="/learn/phase-1/05-use-memo"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: useMemo →
          </Link>
        </div>
      </div>
    </div>
  );
}
