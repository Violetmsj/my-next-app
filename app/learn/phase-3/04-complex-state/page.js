/**
 * React 进阶 - 复杂状态管理模式
 *
 * 学习处理复杂业务逻辑的多种状态管理策略：
 * 1. 状态提升（Lifting State Up）
 * 2. Context 模式
 * 3. useReducer 状态机
 * 4. 自定义 Hook
 */

'use client';

import { useState, useReducer, createContext, useContext } from 'react';
import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

// ===== 1. 状态提升示例 =====
const ChildA = ({ value, onChange }) => {
  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
      <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">组件 A（子组件）</h4>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded dark:bg-gray-700"
        placeholder="输入内容会同步到组件 B"
      />
    </div>
  );
};

const ChildB = ({ value }) => {
  return (
    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
      <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">组件 B（子组件）</h4>
      <p className="text-green-800 dark:text-green-400">接收到的值：{value || '（无）'}</p>
    </div>
  );
};

const LiftingStateUp = () => {
  const [sharedValue, setSharedValue] = useState('');

  return (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
        <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-2">父组件（状态管理）</h4>
        <p className="text-yellow-800 dark:text-yellow-400 text-sm">
          状态在父组件中，传递给两个子组件共享
        </p>
      </div>
      <ChildA value={sharedValue} onChange={setSharedValue} />
      <ChildB value={sharedValue} />
    </div>
  );
};

// ===== 2. Context 模式示例 =====
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'dark' ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const UseThemeContext = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
      <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2">
        主题：{theme === 'light' ? '浅色' : '深色'}
      </h4>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
      >
        切换主题
      </button>
    </div>
  );
};

// ===== 3. useReducer 状态机示例 =====
const initialState = {
  count: 0,
  step: 1,
  history: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history, `+${state.step} = ${state.count + state.step}`]
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - state.step,
        history: [...state.history, `-${state.step} = ${state.count - state.step}`]
      };
    case 'SET_STEP':
      return {
        ...state,
        step: action.payload
      };
    case 'RESET':
      return {
        ...state,
        count: 0,
        history: []
      };
    case 'UNDO':
      const newHistory = [...state.history];
      newHistory.pop();
      return {
        ...state,
        history: newHistory,
        count: state.count === 0 ? 0 : state.count - (newHistory.length > 0 ? parseInt(newHistory[newHistory.length - 1].split(' = ')[1]) : 0)
      };
    default:
      return state;
  }
};

const UseReducerDemo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded border border-indigo-200 dark:border-indigo-800">
        <h4 className="font-medium text-indigo-900 dark:text-indigo-300 mb-2">
          计数器：{state.count}
        </h4>
        <p className="text-sm text-indigo-700 dark:text-indigo-400">
          步长：{state.step}
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => dispatch({ type: 'INCREMENT' })}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          +{state.step}
        </button>
        <button
          onClick={() => dispatch({ type: 'DECREMENT' })}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          -{state.step}
        </button>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          重置
        </button>
        <button
          onClick={() => dispatch({ type: 'UNDO' })}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
        >
          撤销
        </button>
      </div>

      <div className="flex gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400 self-center">设置步长：</span>
        {[1, 5, 10].map(step => (
          <button
            key={step}
            onClick={() => dispatch({ type: 'SET_STEP', payload: step })}
            className={`px-3 py-1 rounded text-sm ${
              state.step === step
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            } hover:bg-blue-500 transition-colors`}
          >
            {step}
          </button>
        ))}
      </div>

      {state.history.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
          <h5 className="font-medium text-gray-900 dark:text-gray-300 mb-2">操作历史：</h5>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {state.history.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function ComplexStatePage() {
  const navigationItems = [
    { label: 'Phase 3 概览', href: '/learn/phase-3' },
    { label: 'useRef', href: '/learn/phase-3/01-use-ref' },
    { label: 'useImperativeHandle', href: '/learn/phase-3/02-use-imperative-handle' },
    { label: 'useLayoutEffect', href: '/learn/phase-3/03-use-layout-effect' },
    { label: '复杂状态管理', href: '/learn/phase-3/04-complex-state' }
  ];

  const liftingStateCode = `// 1. 状态提升（Lifting State Up）
// 当多个组件需要共享状态时，将状态提升到它们的最近共同父组件

// 子组件 A
function ChildA({ value, onChange }) {
  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="输入内容"
      />
    </div>
  );
}

// 子组件 B
function ChildB({ value }) {
  return (
    <div>
      <p>接收到的值：{value}</p>
    </div>
  );
}

// 父组件管理状态
function ParentComponent() {
  // 状态在父组件中
  const [sharedValue, setSharedValue] = useState('');

  return (
    <div>
      <h3>状态提升示例</h3>
      {/* 将状态和方法传递给子组件 */}
      <ChildA value={sharedValue} onChange={setSharedValue} />
      <ChildB value={sharedValue} />
    </div>
  );
}

// 应用场景：
// - 兄弟组件间数据共享
// - 父子组件协作
// - 表单验证（子组件校验，父组件管理）

// 优缺点：
// ✅ 状态逻辑清晰，易于理解
// ❌ 深层嵌套时需要层层传递（"props drilling"）`;

const contextPatternCode = `// 2. Context 模式 - 避免 props drilling
// import { createContext, useContext, useState } from 'react';

// // 创建 Context
// const UserContext = createContext();
// const ThemeContext = createContext();

// // Provider 组件
// function UserProvider({ children }) {
//   const [user, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState('light');

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// // 在根组件中提供 Context
// function App() {
//   return (
//     <UserProvider>
//       <ThemeProvider>
//         <Page />
//       </ThemeProvider>
//     </UserProvider>
//   );
// }

// // 子组件直接使用 Context
// function UserProfile() {
//   // 使用 useContext 获取 Context 值
//   const { user } = useContext(UserContext);

//   return (
//     <div>
//       {user ? <p>欢迎, {user.name}</p> : <p>请登录</p>}
//     </div>
//   );
// }

// // 多层嵌套的组件也能直接访问 Context
// function DeepNestedComponent() {
//   const { theme } = useContext(ThemeContext);

//   return (
//     <div className={theme === 'dark' ? 'dark' : ''}>
//       {/* 直接访问 theme，无需层层传递 */}
//     </div>
//   );
// }

// // 使用 useContext 的简化版本
// function useTheme() {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within ThemeProvider');
//   }
//   return context;
// }

// // 现在可以直接调用 Hook
// function MyComponent() {
//   const { theme, setTheme } = useTheme();

//   return (
//     <button onClick={() => setTheme('dark')}>
//       当前主题：{theme}
//     </button>
//   );
// }`;

  const reducerPatternCode = `// 3. useReducer 状态机 - 管理复杂状态逻辑
import { useReducer } from 'react';

// 定义状态初始值
const initialState = {
  todos: [],
  filter: 'all',
  nextId: 1
};

// 定义 reducer 函数（纯函数）
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.nextId,
            text: action.payload,
            completed: false
          }
        ],
        nextId: state.nextId + 1
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

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
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

// 使用 useReducer
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <div>
      {/* UI 部分 */}
      {state.todos.map(todo => (
        <div key={todo.id}>
          <span
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>删除</button>
        </div>
      ))}
    </div>
  );
}

// 复杂表单状态管理
const initialFormState = {
  username: '',
  email: '',
  password: '',
  errors: {}
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: undefined
        }
      };

    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      };

    case 'RESET':
      return initialFormState;

    default:
      return state;
  }
}

function FormComponent() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 验证
    const errors = {};
    if (!state.username) errors.username = '用户名不能为空';
    if (!state.email) errors.email = '邮箱不能为空';

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, error]) => {
        dispatch({ type: 'SET_ERROR', field, error });
      });
      return;
    }

    // 提交表单
    console.log('表单数据:', state);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={state.username}
        onChange={(e) => dispatch({
          type: 'SET_FIELD',
          field: 'username',
          value: e.target.value
        })}
      />
      {state.errors.username && <span>{state.errors.username}</span>}

      <input
        value={state.email}
        onChange={(e) => dispatch({
          type: 'SET_FIELD',
          field: 'email',
          value: e.target.value
        })}
      />
      {state.errors.email && <span>{state.errors.email}</span>}

      <button type="submit">提交</button>
    </form>
  );
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            04. 复杂状态管理模式
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            学习处理复杂业务逻辑的多种状态管理策略：<strong>状态提升</strong>、
            <strong>Context 模式</strong>、<strong>useReducer 状态机</strong>、
            <strong>自定义 Hook</strong>。根据场景选择合适的状态管理方案。
          </p>
        </div>

        {/* 状态提升演示 */}
        <DemoContainer
          title="1. 状态提升（Lifting State Up）"
          description="父组件管理状态，子组件通过 props 共享"
        >
          <LiftingStateUp />
        </DemoContainer>

        {/* Context 模式演示 */}
        <DemoContainer
          title="2. Context 模式"
          description="在组件树中全局共享数据，避免 props drilling"
        >
          <ThemeProvider>
            <UseThemeContext />
          </ThemeProvider>
        </DemoContainer>

        {/* useReducer 演示 */}
        <DemoContainer
          title="3. useReducer 状态机"
          description="管理复杂状态逻辑，支持多种操作"
        >
          <UseReducerDemo />
        </DemoContainer>

        {/* 状态提升代码 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 状态提升（Lifting State Up）
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            当多个组件需要共享同一状态时，将状态提升到它们的最近共同父组件。
          </p>
          <CodeBlock code={liftingStateCode} language="javascript" />
        </div>

        {/* Context 模式代码 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🌐 Context 模式
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            使用 React Context API 在组件树中全局共享数据，避免层层传递 props。
          </p>
          <CodeBlock code={contextPatternCode} language="javascript" />
        </div>

        {/* useReducer 模式代码 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ⚙️ useReducer 状态机
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            当状态逻辑复杂（多个子值、相互依赖的状态转换）时，使用 useReducer 管理状态。
          </p>
          <CodeBlock code={reducerPatternCode} language="javascript" />
        </div>

        {/* 选择指南 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            🎯 状态管理方案选择指南
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">状态提升：</h4>
              <ul className="text-blue-800 dark:text-blue-400 space-y-1">
                <li>• 适用于兄弟组件共享状态</li>
                <li>• 状态逻辑简单明了</li>
                <li>• 避免深层嵌套传递</li>
                <li>• 注意组件层级深度</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Context 模式：</h4>
              <ul className="text-blue-800 dark:text-blue-400 space-y-1">
                <li>• 适用于全局数据共享</li>
                <li>• 主题、用户信息、语言</li>
                <li>• 避免 props drilling</li>
                <li>• 注意性能优化</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">useReducer：</h4>
              <ul className="text-blue-800 dark:text-blue-400 space-y-1">
                <li>• 复杂状态逻辑</li>
                <li>• 多个相关子值</li>
                <li>• 状态转换逻辑清晰</li>
                <li>• 类似 Redux 的模式</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 对比表格 */}
        <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-3">
            📊 状态管理方案对比
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-yellow-300 dark:border-yellow-700">
                <th className="text-left py-2 text-yellow-900 dark:text-yellow-300">方案</th>
                <th className="text-left py-2 text-yellow-900 dark:text-yellow-300">适用场景</th>
                <th className="text-left py-2 text-yellow-900 dark:text-yellow-300">优点</th>
                <th className="text-left py-2 text-yellow-900 dark:text-yellow-300">缺点</th>
              </tr>
            </thead>
            <tbody className="text-yellow-800 dark:text-yellow-400">
              <tr className="border-b border-yellow-200 dark:border-yellow-800">
                <td className="py-2 font-medium">useState</td>
                <td className="py-2">简单状态</td>
                <td className="py-2">简单、直接</td>
                <td className="py-2">复杂逻辑时代码冗余</td>
              </tr>
              <tr className="border-b border-yellow-200 dark:border-yellow-800">
                <td className="py-2 font-medium">状态提升</td>
                <td className="py-2">兄弟组件共享</td>
                <td className="py-2">清晰、易理解</td>
                <td className="py-2">深层嵌套时复杂</td>
              </tr>
              <tr className="border-b border-yellow-200 dark:border-yellow-800">
                <td className="py-2 font-medium">Context</td>
                <td className="py-2">全局状态</td>
                <td className="py-2">避免 props drilling</td>
                <td className="py-2">性能需要注意</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">useReducer</td>
                <td className="py-2">复杂状态逻辑</td>
                <td className="py-2">逻辑清晰、易测试</td>
                <td className="py-2">学习成本稍高</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-3/03-use-layout-effect"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: useLayoutEffect
          </Link>
          <Link
            href="/learn/phase-4"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            下一阶段: Next.js 进阶 →
          </Link>
        </div>
      </div>
    </div>
  );
}
