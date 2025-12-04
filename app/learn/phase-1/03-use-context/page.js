/**
 * useContext Hook 学习页面
 *
 * useContext用于在组件树中共享数据，避免props drilling
 * 相当于React的"全局状态"解决方案
 */

'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

// 创建Context
const ThemeContext = createContext();
const UserContext = createContext();

// Theme Provider组件
function ThemeProvider({ children }) {
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
}

// User Provider组件
function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 模拟用户登录
    setTimeout(() => {
      setUser({
        name: '张三',
        email: 'zhangsan@example.com',
        avatar: 'https://i.pravatar.cc/100?img=1'
      });
    }, 1000);
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default function UseContextPage() {
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
  const createContextCode = `// 1. 创建Context
import { createContext, useContext } from 'react';

// 创建主题Context
const ThemeContext = createContext();

// 创建用户Context
const UserContext = createContext();`;

  const providerCode = `// 2. 创建Provider组件
function ThemeProvider({ children }) {
  // 在Provider内部管理状态
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // 通过value属性暴露数据和方法
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 在根组件中使用
<ThemeProvider>
  <App />
</ThemeProvider>`;

  const consumerCode = `// 3. 在子组件中使用Context
function Header() {
  // 使用useContext Hook读取Context
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
      <button onClick={toggleTheme}>
        切换为{theme === 'light' ? '深色' : '浅色'}主题
      </button>
    </header>
  );
}

function UserProfile() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <p>请登录</p>;
  }

  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <p>{user.name}</p>
    </div>
  );
}

// 完整的组件树
<ThemeProvider>
  <UserProvider>
    <Header />
    <UserProfile />
    <Content />
  </UserProvider>
</ThemeProvider>`;

  const bestPracticeCode = `// 最佳实践：创建Context的辅助函数
function createContextWithDefault(defaultValue) {
  const context = createContext(defaultValue);

  context.displayName = 'MyContext';

  return context;
}

// 导出Context和Provider
const MyContext = createContext({
  value: 'default',
  method: () => {}
});

export { MyContext };

// 在组件中使用
export function MyProvider({ children }) {
  const [value, setValue] = useState('hello');

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}`;

  return (
    <ThemeProvider>
      <UserProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {/* 导航 */}
            <Navigation items={navigationItems} />

            {/* 页面标题 */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                03. useContext - 全局状态管理
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                useContext用于在组件树中共享数据，避免层层传递props（props drilling）。
                它是React提供的"全局状态"解决方案，适用于主题、用户信息、语言等跨组件数据。
              </p>
            </div>

            {/* 示例1: 主题切换 */}
            <DemoContainer
              title="示例 1: 主题切换系统"
              description="整个页面共享主题状态，所有组件都可以访问和修改"
            >
              <ThemeContextDemo />
            </DemoContainer>

            {/* 示例2: 用户信息 */}
            <DemoContainer
              title="示例 2: 用户信息管理"
              description="在组件树中共享用户登录状态"
            >
              <UserContextDemo />
            </DemoContainer>

            {/* 创建Context */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                步骤 1: 创建Context
              </h2>
              <CodeBlock code={createContextCode} language="javascript" />
            </div>

            {/* Provider */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                步骤 2: 创建Provider组件
              </h2>
              <CodeBlock code={providerCode} language="javascript" />
            </div>

            {/* Consumer */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                步骤 3: 在组件中使用Context
              </h2>
              <CodeBlock code={consumerCode} language="javascript" />
            </div>

            {/* 最佳实践 */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                💡 最佳实践
              </h2>
              <CodeBlock code={bestPracticeCode} language="javascript" />
            </div>

            {/* 使用场景 */}
            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
                📌 useContext 典型使用场景
              </h3>
              <ul className="text-sm text-green-800 dark:text-green-400 space-y-2">
                <li>✓ 主题系统（深色/浅色模式）</li>
                <li>✓ 用户认证信息（登录状态、用户资料）</li>
                <li>✓ 国际化/多语言设置</li>
                <li>✓ 购物车状态（电商应用）</li>
                <li>✓ 应用的全局配置（如API地址、功能开关）</li>
                <li>✓ 需要在多个嵌套组件中共享的数据</li>
              </ul>
            </div>

            {/* 注意事项 */}
            <div className="mt-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-3">
                ⚠️ 注意事项
              </h3>
              <ul className="text-sm text-yellow-800 dark:text-yellow-400 space-y-2">
                <li>• Context会导致组件重新渲染，即使使用值的引用不变</li>
                <li>• 只在真正需要全局共享的数据上使用Context</li>
                <li>• 可以结合useState和useReducer在Provider中管理复杂状态</li>
                <li>• 避免在Provider中传递大型对象，可能影响性能</li>
                <li>• 可以使用React.memo优化Context消费者的性能</li>
              </ul>
            </div>

            {/* 底部导航 */}
            <div className="mt-12 flex justify-between">
              <Link
                href="/learn/phase-1/02-use-effect"
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                ← 上一课: useEffect
              </Link>
              <Link
                href="/learn/phase-1/04-use-reducer"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                下一课: useReducer →
              </Link>
            </div>
          </div>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

// 主题Context演示组件
function ThemeContextDemo() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">
            当前主题: {theme === 'light' ? '浅色 🌞' : '深色 🌙'}
          </h4>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            切换主题
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          这个主题状态在整个页面中共享，所有组件都可以访问它。
        </p>
      </div>
    </div>
  );
}

// 用户Context演示组件
function UserContextDemo() {
  const { user, login, logout } = useContext(UserContext);

  return (
    <div className="space-y-4">
      {user ? (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {user.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 text-center">
          <p className="text-yellow-800 dark:text-yellow-300 mb-4">
            用户未登录
          </p>
          <button
            onClick={() => login({
              name: '演示用户',
              email: 'demo@example.com',
              avatar: 'https://i.pravatar.cc/100?img=5'
            })}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            模拟登录
          </button>
        </div>
      )}
    </div>
  );
}
