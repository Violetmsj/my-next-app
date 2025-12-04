# useEffect - 副作用处理 Hook

## 概述

`useEffect` 是 React 函数组件中处理副作用的 Hook。它允许你在函数组件中执行副作用操作，如数据获取、订阅、手动 DOM 修改等。相当于类组件中的生命周期方法 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 的组合。

## 基础语法

```javascript
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // 副作用代码

    // 可选：清理函数
    return () => {
      // 清理代码
    };
  }, [依赖数组]); // 可选

  return <div>组件内容</div>;
}
```

### 参数

1. **effect 函数**：包含副作用代码的函数
2. **依赖数组**（可选）：包含effect依赖值的数组

## 使用场景

### 1. 数据获取

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 组件挂载后获取数据
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('获取用户失败');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // userId 改变时重新获取

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!user) return <div>用户不存在</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### 2. 订阅事件

```javascript
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // 订阅窗口大小变化事件
    window.addEventListener('resize', handleResize);

    // 清理：取消订阅
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 只运行一次

  return (
    <p>窗口宽度: {width}px</p>
  );
}
```

### 3. 定时器

```javascript
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // 清理：清除定时器
    return () => {
      clearInterval(interval);
    };
  }, []); // 只运行一次

  return (
    <div>
      <p>计时器: {count} 秒</p>
    </div>
  );
}
```

### 4. 操作 DOM

```javascript
function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // 组件挂载后聚焦输入框
    inputRef.current?.focus();
  }, []); // 只运行一次

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="自动聚焦"
    />
  );
}
```

### 5. 本地存储

```javascript
function LocalStorageDemo() {
  const [name, setName] = useState('');

  // 从 localStorage 读取
  useEffect(() => {
    const savedName = localStorage.getItem('name');
    if (savedName) {
      setName(savedName);
    }
  }, []);

  // 保存到 localStorage
  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="输入姓名"
    />
  );
}
```

## 依赖数组

依赖数组控制 effect 的执行时机：

### 无依赖数组（每次渲染都执行）

```javascript
useEffect(() => {
  console.log('组件渲染了');
});
// 等价于 componentDidUpdate
```

### 空依赖数组（仅首次渲染执行）

```javascript
useEffect(() => {
  console.log('组件首次挂载');
}, []);
// 等价于 componentDidMount
```

### 有依赖（依赖变化时执行）

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]); // userId 变化时执行

  // ...
}
```

### 依赖数组的工作原理

```javascript
function Example({ count }) {
  useEffect(() => {
    console.log('count 改变了:', count);
  }, [count]); // 只有 count 变化时才执行

  return <div>{count}</div>;
}

// 示例
<Example count={1} /> // 执行 effect
<Example count={2} /> // 重新执行 effect
<Example count={2} /> // 不执行 effect（count 没变）
```

## 清理函数

effect 可以返回一个清理函数，在组件卸载或下次 effect 执行前执行：

### 事件订阅清理

```javascript
useEffect(() => {
  const handleClick = () => {
    console.log('点击了');
  };

  window.addEventListener('click', handleClick);

  // 清理函数：移除事件监听器
  return () => {
    window.removeEventListener('click', handleClick);
  };
}, []);
```

### 定时器清理

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prev => prev + 1);
  }, 1000);

  // 清理函数：清除定时器
  return () => {
    clearInterval(timer);
  };
}, []);
```

### 取消异步请求

```javascript
useEffect(() => {
  let isCancelled = false;

  const fetchData = async () => {
    try {
      const data = await fetch('/api/data');
      if (!isCancelled) {
        setData(data);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error);
      }
    }
  };

  fetchData();

  // 清理函数：标记为已取消
  return () => {
    isCancelled = true;
  };
}, []);
```

## 条件执行 Effect

### 在特定条件下执行 effect

```javascript
useEffect(() => {
  if (userId) {
    fetchUser(userId);
  }
}, [userId]);
```

### 多个条件组合

```javascript
useEffect(() => {
  if (userId && isOnline) {
    fetchUser(userId);
  }
}, [userId, isOnline]);
```

## 常见陷阱

### 1. 忘记清理副作用

```javascript
function BadExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    // ❌ 错误：没有清理定时器
    // 会导致内存泄漏
  }, []);

  return <div>{count}</div>;
}

function GoodExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // ✅ 正确：清理定时器
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>{count}</div>;
}
```

### 2. 依赖数组使用错误

```javascript
function BadExample({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId);
  }, []); // ❌ 错误：userId 变化时不会重新获取

  return <div>{user?.name}</div>;
}

function GoodExample({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]); // ✅ 正确：userId 变化时重新获取

  return <div>{user?.name}</div>;
}
```

### 3. 无限循环

```javascript
function BadExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // ❌ 错误：每次渲染都更新，导致无限循环
  }, [count]); // count 变化时会再次执行

  return <div>{count}</div>;
}

function GoodExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 仅在特定条件下更新
    if (count > 10) {
      console.log('达到上限');
    }
  }, [count]); // 只读取，不修改

  return <div>{count}</div>;
}
```

### 4. 依赖数组中使用对象/数组

```javascript
function BadExample() {
  const [options, setOptions] = useState({ timeout: 1000 });

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('超时');
    }, options.timeout);
    return () => clearTimeout(timer);
  }, [options]); // ❌ 问题：每次渲染都是新对象，effect 会一直执行
}

function GoodExample() {
  const [timeout, setTimeout] = useState(1000);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('超时');
    }, timeout);
    return () => clearTimeout(timer);
  }, [timeout]); // ✅ 正确：使用基本类型的值
}
```

## 高级用法

### 1. 多个 Effect

一个组件可以使用多个 useEffect，按顺序执行：

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // effect 1：获取用户信息
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  // effect 2：获取用户文章
  useEffect(() => {
    fetchUserPosts(userId).then(setPosts);
  }, [userId]);

  // effect 3：设置页面标题
  useEffect(() => {
    document.title = user ? `${user.name} 的个人资料` : '加载中...';
    return () => {
      document.title = '应用';
    };
  }, [user]);

  return <div>{/* 组件内容 */}</div>;
}
```

### 2. Effect 中的异步函数

```javascript
useEffect(() => {
  // ❌ 错误：async 函数不能直接作为 effect
  const fetchData = async () => {
    const data = await fetch('/api/data');
    setData(data);
  };

  fetchData();
}, []);

// ✅ 正确：在内部定义异步函数
useEffect(() => {
  const fetchData = async () => {
    const data = await fetch('/api/data');
    setData(data);
  };

  fetchData();
}, []);

// ✅ 或者使用立即执行函数表达式（IIFE）
useEffect(() => {
  (async () => {
    const data = await fetch('/api/data');
    setData(data);
  })();
}, []);
```

## 性能优化

### 1. 使用 useCallback 和 useMemo

```javascript
function SearchResults({ query, apiKey }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 缓存回调函数
  const fetchResults = useCallback(async () => {
    setLoading(true);
    const data = await searchAPI(query, apiKey);
    setResults(data);
    setLoading(false);
  }, [query, apiKey]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <div>
      {loading && <div>加载中...</div>}
      {results.map(result => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  );
}
```

### 2. 条件执行 Effect

```javascript
useEffect(() => {
  if (userId) {
    fetchUser(userId);
  }
}, [userId]);
```

### 3. 清理不必要的订阅

```javascript
useEffect(() => {
  const subscription = someAPI.subscribe();

  return () => {
    subscription.unsubscribe(); // 及时清理
  };
}, []);
```

## useEffect vs useLayoutEffect

### useEffect（推荐）

- 异步执行，不会阻塞浏览器绘制
- 适用于大部分场景（数据获取、事件监听等）
- 性能更好

```javascript
useEffect(() => {
  // 异步执行
  fetchData();
}, []);
```

### useLayoutEffect

- 同步执行，在 DOM 更新后、浏览器绘制前执行
- 用于需要同步测量 DOM 或避免闪烁的场景
- 会阻塞浏览器绘制

```javascript
import { useLayoutEffect } from 'react';

useLayoutEffect(() => {
  // 同步执行
  const rect = elementRef.current.getBoundingClientRect();
  console.log(rect);
}, []);
```

## 最佳实践

1. **总是清理副作用**：防止内存泄漏
2. **正确设置依赖数组**：确保 effect 在需要时执行
3. **避免过度使用 useEffect**：不要把所有逻辑都放在 effect 中
4. **使用函数式更新**：当新状态依赖之前状态时
5. **分离不同逻辑**：使用多个 useEffect 分别处理不同副作用
6. **避免在 effect 中写入频繁变化的依赖**：可能导致无限循环

## 常见用例

### 页面标题

```javascript
useEffect(() => {
  document.title = `页面标题 - ${count}`;
}, [count]);
```

### 滚动监听

```javascript
useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 表单自动保存

```javascript
useEffect(() => {
  const timeoutId = setTimeout(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, 1000);

  return () => clearTimeout(timeoutId);
}, [formData]);
```

## 参考链接

- [React 官方文档 - useEffect](https://react.dev/reference/react/useEffect)
- [React 官方文档 - useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)

## 相关 Hooks

- `useState` - 状态管理
- `useLayoutEffect` - 同步副作用
- `useCallback` - 缓存函数
- `useMemo` - 缓存计算结果

## 学习路径

- 上一课：[useState - 基础状态管理](01-use-state.md)
- 下一课：[useContext - 全局状态](03-use-context.md)
- 返回：[React Hooks 基础](README.md)
