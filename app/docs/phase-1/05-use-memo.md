# useMemo - 性能优化 Hook

## 概述

`useMemo` 是 React 中用于性能优化的 Hook。它可以"记住"一个计算的结果，只有当其依赖项发生变化时才重新计算。这可以避免在每次渲染时都进行昂贵的计算，从而提升应用性能。

## 基础语法

```javascript
import { useMemo } from 'react';

const memoizedValue = useMemo(() => {
  // 昂贵的计算
  return computeExpensiveValue(a, b);
}, [依赖项]);
```

### 参数

1. **计算函数**：包含昂贵计算逻辑的函数，返回缓存的值
2. **依赖数组**：包含计算函数依赖的值的数组

### 返回值

- 缓存的计算结果

## 使用场景

### 1. 避免重复计算

```javascript
function ExpensiveCalculation({ a, b }) {
  // ❌ 问题：每次渲染都执行昂贵计算
  const result = expensiveCalculation(a, b);

  return <div>{result}</div>;
}

function OptimizedComponent({ a, b }) {
  // ✅ 优化：只有 a 或 b 变化时才重新计算
  const result = useMemo(() => {
    return expensiveCalculation(a, b);
  }, [a, b]);

  return <div>{result}</div>;
}

function expensiveCalculation(a, b) {
  // 模拟昂贵计算
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i);
  }
  return a + b + result;
}
```

### 2. 过滤和排序列表

```javascript
function UserList({ users, filter }) {
  // ❌ 问题：每次渲染都重新过滤和排序
  const filteredUsers = users
    .filter(user => user.name.includes(filter))
    .sort((a, b) => a.name.localeCompare(b.name));

  // ✅ 优化：只有 users 或 filter 变化时重新计算
  const filteredUsers = useMemo(() => {
    return users
      .filter(user => user.name.includes(filter))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [users, filter]);

  return (
    <ul>
      {filteredUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 3. 复杂对象创建

```javascript
function Profile({ userId, theme }) {
  // ❌ 问题：每次渲染都创建新对象
  const config = {
    theme,
    locale: 'zh-CN',
    notifications: true
  };

  // ✅ 优化：缓存对象
  const config = useMemo(() => ({
    theme,
    locale: 'zh-CN',
    notifications: true
  }), [theme]);

  return <UserProfile config={config} />;
}
```

### 4. 依赖其他 Hook 的值

```javascript
function TodoList({ todos, filter }) {
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ 优化：缓存计算结果
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);

  // ✅ 优化：缓存搜索结果
  const searchResults = useMemo(() => {
    return filteredTodos.filter(todo =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [filteredTodos, searchTerm]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="搜索待办事项"
      />
      <ul>
        {searchResults.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 依赖数组

### 无依赖（不推荐）

```javascript
// ❌ 错误：没有依赖数组
const value = useMemo(() => expensiveCalculation());
// 等价于每次渲染都执行
```

### 空依赖数组（仅首次执行）

```javascript
// ✅ 正确：只执行一次
const value = useMemo(() => {
  return expensiveCalculation();
}, []);
// 相当于 componentDidMount 时的计算
```

### 有依赖（正常用法）

```javascript
// ✅ 正确：依赖变化时重新计算
const result = useMemo(() => {
  return a + b;
}, [a, b]);
```

## 实际应用示例

### 1. 数据表格

```javascript
function DataTable({ data, sortBy, sortOrder }) {
  // ✅ 优化：缓存排序后的数据
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return sortOrder === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  }, [data, sortBy, sortOrder]);

  // ✅ 优化：缓存计算列
  const totalValue = useMemo(() => {
    return sortedData.reduce((sum, item) => sum + item.value, 0);
  }, [sortedData]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0] || {}).map(key => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map(row => (
            <tr key={row.id}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>总计: {totalValue}</p>
    </div>
  );
}
```

### 2. 复杂计算（斐波那契数列）

```javascript
function Fibonacci({ n }) {
  // ✅ 优化：缓存计算结果
  const result = useMemo(() => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }, [n]);

  return <div>第 {n} 项: {result}</div>;
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 使用 useCallback 和 useMemo 组合优化
function FibonacciComponent({ n }) {
  // 使用 useCallback 缓存函数
  const fibonacci = useCallback((num) => {
    if (num <= 1) return num;
    return fibonacci(num - 1) + fibonacci(num - 2);
  }, []);

  // 使用 useMemo 缓存结果
  const result = useMemo(() => fibonacci(n), [n, fibonacci]);

  return <div>第 {n} 项: {result}</div>;
}
```

### 3. 派生状态

```javascript
function ShoppingCart({ items }) {
  // ✅ 优化：缓存派生状态
  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const shipping = useMemo(() => {
    return totalPrice > 100 ? 0 : 10;
  }, [totalPrice]);

  const tax = useMemo(() => {
    return totalPrice * 0.1;
  }, [totalPrice]);

  const finalTotal = useMemo(() => {
    return totalPrice + shipping + tax;
  }, [totalPrice, shipping, tax]);

  return (
    <div>
      <p>商品数量: {totalItems}</p>
      <p>商品总价: ${totalPrice}</p>
      <p>运费: ${shipping}</p>
      <p>税费: ${tax}</p>
      <p>总计: ${finalTotal}</p>
    </div>
  );
}
```

## useMemo vs useCallback

### useMemo

- 缓存**计算结果**
- 返回值是缓存的结果

```javascript
const memoizedValue = useMemo(() => compute(a, b), [a, b]);
```

### useCallback

- 缓存**函数本身**
- 返回值是缓存的函数

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 使用场景对比

```javascript
function Example({ data }) {
  const [count, setCount] = useState(0);

  // ✅ useMemo：缓存计算结果
  const expensiveValue = useMemo(() => {
    return data.filter(item => item.active).length;
  }, [data]);

  // ✅ useCallback：缓存函数（传递给子组件）
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>过滤后的数量: {expensiveValue}</p>
      <button onClick={handleClick}>点击 {count} 次</button>
      <Child onClick={handleClick} />
    </div>
  );
}
```

## 性能优化的最佳时机

### 应该使用 useMemo 当：

1. **昂贵的计算**：复杂计算、排序、大数据过滤
2. **大量数据处理**：大列表、复杂对象操作
3. **多次引用**：一个值被多个地方使用
4. **避免不必要渲染**：子组件依赖复杂计算

### 不需要 useMemo 当：

1. **简单计算**：简单的加法、字符串拼接
2. **原生操作**：基本类型的操作
3. **计算成本低**：不涉及大量数据或复杂逻辑
4. **依赖经常变化**：计算结果会频繁更新

```javascript
// ❌ 不需要：简单计算
const fullName = useMemo(() => firstName + ' ' + lastName, [firstName, lastName]);
// 直接使用即可
const fullName = firstName + ' ' + lastName;

// ✅ 需要：复杂计算
const filteredList = useMemo(() => {
  return largeList.filter(item => complexCondition(item));
}, [largeList]);
```

## 常见陷阱

### 1. 过度使用 useMemo

```javascript
// ❌ 错误：过度优化
function SimpleComponent({ a, b }) {
  const sum = useMemo(() => a + b, [a, b]);
  const product = useMemo(() => a * b, [a, b]);
  // ...

  return <div>{sum} {product}</div>;
}

// ✅ 正确：只对真正昂贵的计算使用
function SimpleComponent({ a, b }) {
  const sum = a + b; // 简单计算不需要 useMemo

  const product = useMemo(() => {
    // 真正昂贵的计算
    return performExpensiveCalculation(a, b);
  }, [a, b]);

  return <div>{sum} {product}</div>;
}
```

### 2. 错误依赖数组

```javascript
// ❌ 错误：缺少依赖
function BadExample({ data }) {
  const filtered = useMemo(() => {
    return data.filter(item => item.active);
  }, []); // 错误：data 应该在依赖数组中

  return <ul>{filtered.map(...)}</ul>;
}

// ✅ 正确：包含所有依赖
function GoodExample({ data }) {
  const filtered = useMemo(() => {
    return data.filter(item => item.active);
  }, [data]); // 正确：包含 data 依赖

  return <ul>{filtered.map(...)}</ul>;
}
```

### 3. 在依赖中使用对象/数组

```javascript
// ❌ 问题：每次渲染都是新对象
function BadExample({ options }) {
  const result = useMemo(() => {
    return processData(options);
  }, [options]); // options 对象每次渲染都是新的

  return <div>{result}</div>;
}

// ✅ 解决：使用 useMemo 优化 options
function GoodExample({ options }) {
  const stableOptions = useMemo(() => ({
    threshold: options.threshold,
    multiplier: options.multiplier
  }), [options.threshold, options.multiplier]);

  const result = useMemo(() => {
    return processData(stableOptions);
  }, [stableOptions]);

  return <div>{result}</div>;
}
```

### 4. 使用 useMemo 修复闭包问题

```javascript
// ❌ 问题：闭包中的值可能是旧的
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1); // count 始终是 0
    }, 1000);

    return () => clearInterval(timer);
  }, []); // 问题：count 不会更新

  return <div>{count}</div>;
}

// ✅ 解决：使用 useMemo 或函数式更新
function Counter() {
  const [count, setCount] = useState(0);

  const increment = useMemo(() => () => {
    setCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(increment, 1000);
    return () => clearInterval(timer);
  }, [increment]);

  return <div>{count}</div>;
}

// 或者使用函数式状态更新
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1); // 使用函数式更新
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>{count}</div>;
}
```

## 性能监控

### 测量 useMemo 效果

```javascript
function ExpensiveComponent({ data }) {
  const startTime = performance.now();

  const result = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);

  const endTime = performance.now();

  console.log(`计算耗时: ${endTime - startTime}ms`);

  return <div>{result}</div>;
}
```

## 调试 useMemo

```javascript
function DebugComponent({ data }) {
  const result = useMemo(() => {
    console.log('useMemo 执行了');
    return processData(data);
  }, [data]);

  return <div>{result}</div>;
}
```

## 最佳实践

1. **有选择地使用**：只对真正昂贵的计算使用 useMemo
2. **正确设置依赖**：确保包含所有在计算函数中使用的值
3. **避免在依赖中使用对象/数组**：可能导致频繁重新计算
4. **与 useCallback 区分使用**：
   - useMemo：缓存值
   - useCallback：缓存函数
5. **不要过度优化**：简单的计算不需要 useMemo
6. **测量性能**：使用 React DevTools 分析性能

## 参考链接

- [React 官方文档 - useMemo](https://react.dev/reference/react/useMemo)
- [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)

## 相关 Hooks

- `useCallback` - 缓存函数
- `useState` - 状态管理
- `useEffect` - 副作用

## 学习路径

- 上一课：[useReducer - 状态机](04-use-reducer.md)
- 下一课：[useCallback - 缓存函数](06-use-callback.md)
- 返回：[React Hooks 基础](README.md)
