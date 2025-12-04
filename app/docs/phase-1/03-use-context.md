# useContext - 全局状态 Hook

## 概述

`useContext` 是 React 中用于在组件树间共享数据的 Hook。它允许你在不通过 props 层层传递的情况下，让组件直接访问某个上下文中的数据。常用于管理全局状态，如用户信息、主题设置、语言偏好等。

## 问题背景

### Props Drilling（属性透传）

```javascript
// ❌ 问题：需要层层传递 props
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div>
      <Header theme={theme} />          {/* 传递 theme */}
      <Main theme={theme} />             {/* 传递 theme */}
      <Footer theme={theme} />           {/* 传递 theme */}
    </div>
  );
}

function Header({ theme }) {
  return (
    <nav>
      <Logo theme={theme} />             {/* 传递 theme */}
      <Menu theme={theme} />              {/* 传递 theme */}
    </nav>
  );
}

function Menu({ theme }) {
  return (
    <ul>
      <li>菜单项</li>                     {/* 需要 theme 但不在这里使用 */}
    </ul>
  );
}
```

## 解决方案：Context

### 1. 创建 Context

```javascript
// ThemeContext.js
import { createContext } from 'react';

const ThemeContext = createContext();

// 或者提供默认值
const ThemeContext = createContext('light');

export default ThemeContext;
```

### 2. Provider 组件

```javascript
// App.js
import ThemeContext from './ThemeContext';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    // 使用 Provider 提供数据
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <Header />
        <Main />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
```

### 3. 使用 useContext

```javascript
// Header.js
import ThemeContext from './ThemeContext';
import { useContext } from 'react';

function Header() {
  // 直接获取 Context 值
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <header className={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换主题
      </button>
    </header>
  );
}
```

## 完整示例

### 主题切换

```javascript
// ThemeContext.js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 自定义 Hook（推荐）
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme 必须在 ThemeProvider 内使用');
  }
  return context;
}

// App.js
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}

// Header.js
import { useTheme } from './ThemeContext';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={theme === 'dark' ? 'dark' : ''}>
      <button onClick={toggleTheme}>
        当前主题: {theme}
      </button>
    </nav>
  );
}
```

## 常见用例

### 1. 用户认证状态

```javascript
// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查本地存储中的用户信息
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const user = await api.login(email, password);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 内使用');
  }
  return context;
}

// 使用
function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      {user ? (
        <div>
          <span>欢迎, {user.name}</span>
          <button onClick={logout}>退出</button>
        </div>
      ) : (
        <a href="/login">登录</a>
      )}
    </header>
  );
}
```

### 2. 购物车状态

```javascript
// CartContext.js
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart 必须在 CartProvider 内使用');
  }
  return context;
}
```

### 3. 多语言支持

```javascript
// I18nContext.js
import { createContext, useContext, useState } from 'react';

const I18nContext = createContext();

const translations = {
  zh: {
    hello: '你好',
    welcome: '欢迎',
    button: '按钮'
  },
  en: {
    hello: 'Hello',
    welcome: 'Welcome',
    button: 'Button'
  }
};

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState('zh');

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n 必须在 I18nProvider 内使用');
  }
  return context;
}

// 使用
function Button() {
  const { t } = useI18n();

  return <button>{t('button')}</button>;
}
```

## 高级用法

### 1. 组合多个 Context

```javascript
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Header />
          <Main />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function Header() {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <header className={theme}>
      {user && <span>欢迎 {user.name}</span>}
    </header>
  );
}
```

### 2. 动态 Context 值

```javascript
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);

  const value = {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    // 计算属性
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function Header() {
  const { theme, isDark, fontSize } = useTheme();

  return (
    <header style={{ fontSize }}>
      主题: {theme}, 深色模式: {isDark ? '是' : '否'}
    </header>
  );
}
```

### 3. Context 选择器（性能优化）

避免不必要的重渲染：

```javascript
// ❌ 问题：任何 Context 变化都会导致重渲染
const { theme } = useContext(ThemeContext);

// ✅ 优化：使用选择器函数
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme 必须在 ThemeProvider 内使用');
  }
  // 只返回需要的值
  return { theme: context.theme, setTheme: context.setTheme };
}

// 或者使用 useMemo
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme 必须在 ThemeProvider 内使用');
  }
  return {
    theme: context.theme,
    setTheme: context.setTheme
  };
}
```

## 常见陷阱

### 1. 忘记 Provider

```javascript
function Component() {
  const value = useContext(MyContext);
  return <div>{value}</div>;
}

// ❌ 错误：没有包装 Provider
// React 会抛出错误

// ✅ 正确：使用 Provider 包装
<MyContext.Provider value={value}>
  <Component />
</MyContext.Provider>
```

### 2. Context 值变化导致所有子组件重渲染

```javascript
function Parent() {
  const [theme, setTheme] = useState('light');

  // ❌ 问题：每次渲染都创建新对象
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Child />
    </ThemeContext.Provider>
  );
}

// ✅ 正确：使用 useMemo 缓存值
function Parent() {
  const [theme, setTheme] = useState('light');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <Child />
    </ThemeContext.Provider>
  );
}
```

### 3. 不正确的默认值

```javascript
// 创建 Context 时提供默认值
const ThemeContext = createContext('light');

// ❌ 错误：Provider 的 value 是 undefined
<ThemeContext.Provider value={undefined}>
  <Component />
</ThemeContext.Provider>

// ✅ 正确：确保 value 有值
<ThemeContext.Provider value="light">
  <Component />
</ThemeContext.Provider>

// 或
<ThemeContext.Provider value={{ theme: 'light' }}>
  <Component />
</ThemeContext.Provider>
```

### 4. 在循环中创建 Context

```javascript
// ❌ 错误：在组件内部创建 Context
function MyComponent() {
  const MyContext = createContext(); // 每次渲染都创建新的 Context

  return (
    <MyContext.Provider value={value}>
      <Child />
    </MyContext.Provider>
  );
}

// ✅ 正确：在组件外部创建 Context
const MyContext = createContext();

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <MyContext.Provider value={value}>
      <Child />
    </MyContext.Provider>
  );
}
```

## Context vs 其他状态管理

### Context vs Props

| 场景 | 推荐方案 |
|------|----------|
| 简单父子组件通信 | Props |
| 深层嵌套组件需要数据 | Context |
| 兄弟组件共享数据 | Context 或状态提升 |
| 全局数据（用户、主题） | Context |

### Context vs Redux

| 特性 | Context | Redux |
|------|---------|-------|
| 学习曲线 | 简单 | 较陡峭 |
| 样板代码 | 少 | 多 |
| 中间件支持 | 无 | 有 |
| DevTools | 无 | 有 |
| 适用场景 | 小中型应用 | 大型复杂应用 |

## 性能优化

### 1. 分割 Context

```javascript
// ❌ 一个大 Context
const AppContext = createContext();

// ✅ 分割为多个 Context
const ThemeContext = createContext();
const UserContext = createContext();
const CartContext = createContext();
```

### 2. 使用 useMemo 优化 Provider 值

```javascript
function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  // 只在依赖变化时更新
  const themeValue = useMemo(() => ({ theme, setTheme }), [theme]);
  const userValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <UserContext.Provider value={userValue}>
        <AppContent />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
```

### 3. 使用 useState 而不是直接对象

```javascript
// ✅ 推荐：使用 useState
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## 最佳实践

1. **使用 Provider 包装**：确保所有使用 Context 的组件都被 Provider 包裹
2. **自定义 Hook**：创建 `useContext` 的包装函数，提供更好的错误信息
3. **分割 Context**：将不同类型的全局状态分为不同的 Context
4. **优化 Provider 值**：使用 `useMemo` 避免不必要的重渲染
5. **提供默认值**：在 `createContext` 中提供默认值
6. **避免过度使用**：只在真正需要全局共享时使用 Context

## 参考链接

- [React 官方文档 - useContext](https://react.dev/reference/react/useContext)
- [React 官方文档 - Context](https://react.dev/reference/react)
- [How to use React Context effectively](https://kentcdodds.com/blog/application-state-management-with-react)

## 相关 Hooks

- `useState` - 局部状态
- `useReducer` - 复杂状态逻辑
- `useEffect` - 副作用处理

## 学习路径

- 上一课：[useEffect - 副作用处理](02-use-effect.md)
- 下一课：[useReducer - 状态机](04-use-reducer.md)
- 返回：[React Hooks 基础](README.md)
