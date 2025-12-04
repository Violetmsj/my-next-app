# Custom Hooks - 自定义 Hook

## 概述

自定义 Hook 是以 `use` 开头的 JavaScript 函数，它可以在函数组件中调用其他 Hook。自定义 Hook 是一种提取组件逻辑的机制，允许你在多个组件之间共享状态逻辑，而无需使用高阶组件或渲染 props。

## 创建自定义 Hook 的规则

1. **函数名必须以 `use` 开头**：这是 Hook 的标识
2. **可以在内部调用其他 Hook**：如 useState、useEffect、useContext 等
3. **可以传递参数和返回值**：可以是任何类型
4. **共享逻辑而非共享状态**：每个调用自定义 Hook 的组件都有独立的 Hook 状态

## 基础示例

### 1. 自定义计数器 Hook

```javascript
// hooks/useCounter.js
import { useState, useCallback } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount
  };
}

// 使用
function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
```

### 2. 自定义本地存储 Hook

```javascript
// hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // 获取初始值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  // 更新本地存储和状态
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

// 使用
function ProfileForm() {
  const [name, setName] = useLocalStorage('name', '');
  const [email, setEmail] = useLocalStorage('email', '');

  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="姓名"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="邮箱"
      />
    </form>
  );
}
```

### 3. 自定义窗口大小 Hook

```javascript
// hooks/useWindowSize.js
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);

    // 立即执行一次以获取初始值
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

// 使用
function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>窗口宽度: {width}px</p>
      <p>窗口高度: {height}px</p>
      <p>
        {width < 768 ? '移动端' : width < 1024 ? '平板' : '桌面端'}
      </p>
    </div>
  );
}
```

## 常见自定义 Hook 示例

### 1. API 数据获取 Hook

```javascript
// hooks/useFetch.js
import { useState, useEffect, useCallback } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// 使用
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

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

### 2. 表单处理 Hook

```javascript
// hooks/useForm.js
import { useState, useCallback } from 'react';

function useForm(initialValues, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // 清除错误（如果设置了验证规则）
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  }, [errors]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // 执行验证
    const rule = validationRules[name];
    if (rule) {
      const error = rule(values[name]);
      if (error) {
        setErrors(prev => ({
          ...prev,
          [name]: error
        }));
      }
    }
  }, [values, validationRules]);

  const handleSubmit = useCallback((onSubmit) => {
    return (e) => {
      e.preventDefault();

      // 验证所有字段
      const newErrors = {};
      Object.keys(validationRules).forEach(name => {
        const error = validationRules[name](values[name]);
        if (error) {
          newErrors[name] = error;
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setTouched(Object.keys(newErrors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {}));
        return;
      }

      onSubmit(values);
    };
  }, [values, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues
  };
}

// 使用
function RegistrationForm() {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  } = useForm(
    {
      username: '',
      email: '',
      password: ''
    },
    {
      username: (value) => value.length < 3 ? '用户名至少3个字符' : null,
      email: (value) => !/\S+@\S+\.\S+/.test(value) ? '邮箱格式无效' : null,
      password: (value) => value.length < 8 ? '密码至少8个字符' : null
    }
  );

  const onSubmit = (formData) => {
    console.log('表单数据:', formData);
    // 提交逻辑
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>用户名</label>
        <input
          type="text"
          value={values.username}
          onChange={(e) => handleChange('username', e.target.value)}
          onBlur={() => handleBlur('username')}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>

      <div>
        <label>邮箱</label>
        <input
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label>密码</label>
        <input
          type="password"
          value={values.password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>

      <button type="submit">注册</button>
      <button type="button" onClick={reset}>重置</button>
    </form>
  );
}
```

### 3. 异步操作 Hook

```javascript
// hooks/useAsync.js
import { useState, useEffect, useRef, useCallback } from 'react';

function useAsync(asyncFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);

      const result = await asyncFunction(...args);

      if (mountedRef.current) {
        setData(result);
      }

      return result;
    } catch (err) {
      if (mountedRef.current) {
        setError(err);
      }
      throw err;
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, dependencies);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    data,
    loading,
    error,
    execute
  };
}

// 使用
function SearchBox() {
  const [query, setQuery] = useState('');
  const { data, loading, error, execute } = useAsync(
    async (searchQuery) => {
      if (!searchQuery) return [];
      const response = await fetch(`/api/search?q=${searchQuery}`);
      return response.json();
    },
    [query]
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    // 自动搜索
    execute(e.target.value);
  };

  return (
    <div>
      <input
        value={query}
        onChange={handleSearch}
        placeholder="搜索..."
      />

      {loading && <div>搜索中...</div>}
      {error && <div>搜索出错: {error.message}</div>}

      <ul>
        {data?.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 4. 设备检测 Hook

```javascript
// hooks/useDevice.js
import { useState, useEffect } from 'react';

function useDevice() {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isTouchDevice: false
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      setDevice({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isTouchDevice: isTouch
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  return device;
}

// 使用
function DeviceComponent() {
  const { isMobile, isTablet, isDesktop } = useDevice();

  return (
    <div>
      {isMobile && <p>这是移动端视图</p>}
      {isTablet && <p>这是平板视图</p>}
      {isDesktop && <p>这是桌面端视图</p>}
    </div>
  );
}
```

### 5. 倒计时 Hook

```javascript
// hooks/useCountdown.js
import { useState, useEffect, useRef } from 'react';

function useCountdown(initialSeconds) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
  };

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset
  };
}

// 使用
function CountdownTimer() {
  const { timeLeft, isRunning, start, pause, reset } = useCountdown(60);

  return (
    <div>
      <h2>倒计时: {timeLeft} 秒</h2>
      <div>
        <button onClick={start} disabled={isRunning || timeLeft === 0}>
          开始
        </button>
        <button onClick={pause} disabled={!isRunning}>
          暂停
        </button>
        <button onClick={reset}>
          重置
        </button>
      </div>
    </div>
  );
}
```

## 自定义 Hook 的最佳实践

### 1. 命名规范

```javascript
// ✅ 正确：以 use 开头
function useCounter() { }
function useLocalStorage() { }
function useFetch() { }

// ❌ 错误：没有以 use 开头
function counter() { }
function getLocalStorage() { }
```

### 2. 分离关注点

```javascript
// ✅ 好的做法：单一职责
function useCounter(initialValue = 0) {
  // 只管理计数逻辑
}

function useLocalStorage(key, initialValue) {
  // 只管理本地存储逻辑
}

// ❌ 不好的做法：混合多个逻辑
function useCounterAndStorage(initialValue, key) {
  // 既管理计数又管理本地存储
  // 应该分成两个独立的 Hook
}
```

### 3. 使用回调优化

```javascript
// ✅ 优化：返回的函数使用 useCallback
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  return { count, increment, decrement };
}
```

### 4. 处理副作用清理

```javascript
function useWindowEvent(eventName, handler, options = {}) {
  useEffect(() => {
    window.addEventListener(eventName, handler, options);

    // 清理函数
    return () => {
      window.removeEventListener(eventName, handler, options);
    };
  }, [eventName, handler, options]);
}
```

### 5. 错误处理

```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, error, execute };
}
```

## 自定义 Hook vs 高阶组件 vs 渲染 Props

### 自定义 Hook（推荐）

```javascript
function useCounter() {
  const [count, setCount] = useState(0);
  return { count, setCount, increment: () => setCount(c => c + 1) };
}

function MyComponent() {
  const { count, increment } = useCounter();
  return <button onClick={increment}>{count}</button>;
}
```

### 高阶组件（HOC）

```javascript
function withCounter(Component) {
  return function WrappedComponent(props) {
    const [count, setCount] = useState(0);
    return (
      <Component
        {...props}
        count={count}
        increment={() => setCount(c => c + 1)}
      />
    );
  };
}

function MyComponent({ count, increment }) {
  return <button onClick={increment}>{count}</button>;
}

export default withCounter(MyComponent);
```

### 渲染 Props

```javascript
function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CounterContext.Provider value={{ count, increment: () => setCount(c => c + 1) }}>
      {children}
    </CounterContext.Provider>
  );
}

function MyComponent() {
  return (
    <CounterProvider>
      {({ count, increment }) => (
        <button onClick={increment}>{count}</button>
      )}
    </CounterProvider>
  );
}
```

### 对比总结

| 方案 | 优点 | 缺点 |
|------|------|------|
| 自定义 Hook | 简单直观、无额外嵌套、性能好 | 需要调用 Hook |
| 高阶组件 | 逻辑封装好 | 产生额外组件层级、性能影响 |
| 渲染 Props | 灵活、可组合 | 代码冗余、性能影响 |

## 参考链接

- [React 官方文档 - 自定义 Hook](https://react.dev/reference/react)
- [自定义 Hook 指南](https://react.dev/learn/reusing-logic-with-custom-hooks)

## 相关 Hooks

- `useState` - 状态管理
- `useEffect` - 副作用
- `useCallback` - 函数缓存

## 学习路径

- 上一课：[useCallback - 缓存函数](06-use-callback.md)
- 下一课：[Next.js App Router - 基础路由](phase-2/01-routing.md)
- 返回：[React Hooks 基础](README.md)

## 🎉 Phase 1 完成

恭喜！你已经完成了 React Hooks 基础的学习：

✅ [useState](01-use-state.md) - 基础状态管理
✅ [useEffect](02-use-effect.md) - 副作用处理
✅ [useContext](03-use-context.md) - 全局状态
✅ [useReducer](04-use-reducer.md) - 状态机
✅ [useMemo](05-use-memo.md) - 性能优化
✅ [useCallback](06-use-callback.md) - 缓存函数
✅ [Custom Hooks](07-custom-hooks.md) - 自定义 Hook

现在可以进入 [Phase 2: Next.js App Router](phase-2/README.md) 学习！
