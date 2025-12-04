# useCallback - 缓存函数 Hook

## 概述

`useCallback` 是 React 中用于性能优化的 Hook。它可以"记住"一个函数，只有当其依赖项发生变化时才重新创建这个函数。这在将函数作为 props 传递给子组件时特别有用，可以避免子组件因接收到新函数而进行不必要的重新渲染。

## 基础语法

```javascript
import { useCallback } from 'react';

const memoizedCallback = useCallback(() => {
  // 函数逻辑
  doSomething(a, b);
}, [依赖项]);
```

### 参数

1. **函数**：需要缓存的函数
2. **依赖数组**：包含函数依赖的值的数组

### 返回值

- 缓存的函数

## 为什么需要 useCallback

### 问题：每次渲染都创建新函数

```javascript
function Parent({ data }) {
  const [count, setCount] = useState(0);

  // ❌ 问题：每次渲染都创建新函数
  const handleClick = () => {
    console.log('Clicked with data:', data);
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <Child onClick={handleClick} />
    </div>
  );
}

function Child({ onClick }) {
  // ❌ Child 每次都会重新渲染，因为 onClick 是新函数
  console.log('Child rendered');
  return <button onClick={onClick}>Child Button</button>;
}
```

### 解决方案：使用 useCallback

```javascript
function Parent({ data }) {
  const [count, setCount] = useState(0);

  // ✅ 优化：缓存函数，只有依赖变化时才重新创建
  const handleClick = useCallback(() => {
    console.log('Clicked with data:', data);
  }, [data]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <Child onClick={handleClick} />
    </div>
  );
}

function Child({ onClick }) {
  // ✅ 只有 props 变化时才重新渲染
  console.log('Child rendered');
  return <button onClick={onClick}>Child Button</button>;
}
```

## 实际应用示例

### 1. 事件处理函数

```javascript
function TodoList({ todos }) {
  const [filter, setFilter] = useState('all');

  // ✅ 缓存过滤器函数
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  return (
    <div>
      <FilterButtons onFilterChange={handleFilterChange} />
      <TodoItems todos={todos} filter={filter} />
    </div>
  );
}

function FilterButtons({ onFilterChange }) {
  return (
    <div>
      <button onClick={() => onFilterChange('all')}>全部</button>
      <button onClick={() => onFilterChange('active')}>进行中</button>
      <button onClick={() => onFilterChange('completed')}>已完成</button>
    </div>
  );
}
```

### 2. 列表项操作

```javascript
function TodoApp() {
  const [todos, setTodos] = useState([]);

  // ✅ 缓存添加函数
  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, {
      id: Date.now(),
      text,
      completed: false
    }]);
  }, []);

  // ✅ 缓存删除函数
  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // ✅ 缓存切换函数
  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  return (
    <div>
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
      />
    </div>
  );
}

function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  }, [text, onAdd]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="添加待办事项"
      />
      <button type="submit">添加</button>
    </form>
  );
}
```

### 3. 表单提交

```javascript
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ 缓存提交函数
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitForm(formData);
      alert('提交成功!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('提交失败: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="姓名"
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="邮箱"
      />
      <textarea
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        placeholder="消息"
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '提交中...' : '提交'}
      </button>
    </form>
  );
}
```

### 4. 传递给自定义 Hook

```javascript
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

  return { count, increment, decrement, reset };
}

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

## useCallback vs useMemo

### 对比表

| 特性 | useCallback | useMemo |
|------|-------------|---------|
| 作用 | 缓存函数 | 缓存值 |
| 返回 | 函数本身 | 计算结果 |
| 适用场景 | 传递给子组件的函数 | 昂贵计算 |
| 主要目的 | 避免不必要渲染 | 避免重复计算 |

### 使用选择

```javascript
function Example({ data, config }) {
  // ✅ useCallback：缓存函数（传递给子组件）
  const handleClick = useCallback(() => {
    processData(data);
  }, [data]);

  // ✅ useMemo：缓存计算结果
  const processedData = useMemo(() => {
    return expensiveOperation(data);
  }, [data]);

  // ✅ 组合使用
  const processAndHandle = useCallback(() => {
    const result = expensiveOperation(data); // 计算
    handleResult(result, config); // 处理
  }, [data, config]);

  return (
    <Child
      onClick={handleClick}
      data={processedData}
      onProcess={processAndHandle}
    />
  );
}
```

## 依赖数组

### 无依赖（不推荐）

```javascript
// ❌ 错误：没有依赖数组
const callback = useCallback(() => {
  doSomething();
});
// 等价于每次渲染都创建新函数
```

### 空依赖数组（仅创建一次）

```javascript
// ✅ 正确：只创建一次
const callback = useCallback(() => {
  console.log('函数创建一次');
}, []);
// 相当于 constructor 中的绑定
```

### 有依赖（正常用法）

```javascript// ✅ 正确：依赖变化时重新创建
const callback = useCallback(() => {
  doSomething(value);
}, [value]);
```

### 多个依赖

```javascript
const callback = useCallback((a, b) => {
  doSomething(a, b, config);
}, [config]); // 依赖 config
```

## 常见陷阱

### 1. 过度使用 useCallback

```javascript
// ❌ 错误：过度优化
function SimpleComponent() {
  const [count, setCount] = useState(0);

  // 不需要 useCallback 的函数
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return <button onClick={handleClick}>Count: {count}</button>;
}

// ✅ 正确：只对需要优化的场景使用
function OptimizedComponent({ onExternalEvent }) {
  const [data, setData] = useState([]);

  // 需要传递给子组件的函数，使用 useCallback
  const handleDataChange = useCallback((newData) => {
    setData(newData);
    onExternalEvent(newData);
  }, [onExternalEvent]);

  return <DataComponent onChange={handleDataChange} />;
}
```

### 2. 错误依赖

```javascript
// ❌ 错误：缺少依赖
function BadExample({ data }) {
  const [filter, setFilter] = useState('');

  const handleFilter = useCallback((value) => {
    setFilter(value);
    console.log(data); // 使用了 data 但没在依赖中
  }, []); // 错误：缺少 data 依赖

  return <FilterComponent onFilter={handleFilter} />;
}

// ✅ 正确：包含所有依赖
function GoodExample({ data }) {
  const [filter, setFilter] = useState('');

  const handleFilter = useCallback((value) => {
    setFilter(value);
    console.log(data); // 使用了 data
  }, [data]); // 正确：包含 data 依赖

  return <FilterComponent onFilter={handleFilter} />;
}
```

### 3. 在 useCallback 中使用 useState 的函数式更新

```javascript
// ✅ 推荐：使用函数式更新，避免闭包问题
function Counter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(prev => prev + 1); // 使用函数式更新
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1); // 使用函数式更新
  }, []);

  return (
    <div>
      <button onClick={increment}>+</button>
      <span>{count}</span>
      <button onClick={decrement}>-</button>
    </div>
  );
}

// ❌ 问题：闭包中的值可能是旧的
function BadCounter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(count + 1); // count 可能是旧值
  }, [count]);

  return (
    <div>
      <button onClick={increment}>+</button>
      <span>{count}</span>
    </div>
  );
}
```

### 4. 在依赖中使用对象/数组

```javascript
// ❌ 问题：每次渲染都是新对象
function BadExample({ options }) {
  const handleClick = useCallback(() => {
    processOptions(options);
  }, [options]); // options 对象每次渲染都是新的

  return <button onClick={handleClick}>Click</button>;
}

// ✅ 解决：提取需要的值
function GoodExample({ options }) {
  const { threshold, multiplier } = options;

  const handleClick = useCallback(() => {
    processOptions(threshold, multiplier);
  }, [threshold, multiplier]); // 使用基本类型值

  return <button onClick={handleClick}>Click</button>;
}
```

## 与 React.memo 配合使用

```javascript
// 子组件使用 React.memo 优化
const ChildComponent = memo(({ onClick, data }) => {
  console.log('Child rendered');
  return <button onClick={() => onClick(data)}>Child Button</button>;
});

// 父组件
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({ value: 0 });

  // ✅ 缓存函数，避免 Child 不必要渲染
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Parent: {count}</button>
      <ChildComponent onClick={handleClick} data={data} />
    </div>
  );
}
```

## 性能优化场景

### 1. 大列表渲染

```javascript
function LargeList({ items }) {
  const [selectedId, setSelectedId] = useState(null);

  // ✅ 缓存选择处理函数
  const handleSelect = useCallback((id) => {
    setSelectedId(id);
  }, []);

  return (
    <div>
      {items.map(item => (
        <ListItem
          key={item.id}
          item={item}
          isSelected={selectedId === item.id}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}

const ListItem = memo(({ item, isSelected, onSelect }) => {
  return (
    <div
      className={isSelected ? 'selected' : ''}
      onClick={() => onSelect(item.id)}
    >
      {item.name}
    </div>
  );
});
```

### 2. 复杂表单

```javascript
function ComplexForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // ✅ 缓存各个字段更新函数
  const updateField = useCallback((field) => (value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // 提交逻辑
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.username}
        onChange={(e) => updateField('username')(e.target.value)}
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => updateField('email')(e.target.value)}
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => updateField('password')(e.target.value)}
      />
      <button type="submit">提交</button>
    </form>
  );
}
```

## 调试 useCallback

```javascript
function DebugExample({ data }) {
  const handleClick = useCallback(() => {
    console.log('useCallback function called');
    processData(data);
  }, [data]);

  console.log('Component rendered');

  return <button onClick={handleClick}>Click me</button>;
}
```

## 最佳实践

1. **有选择地使用**：只对传递给子组件的函数使用 useCallback
2. **正确设置依赖**：确保依赖数组包含所有在函数中使用的值
3. **与 React.memo 配合**：优化子组件渲染
4. **避免闭包陷阱**：使用函数式状态更新
5. **测量性能**：使用 React DevTools 分析是否真的需要优化
6. **简单函数不需要**：简单的内联函数通常不需要 useCallback

## 性能监控

```javascript
function PerformanceExample({ data }) {
  const handleClick = useCallback(() => {
    console.time('handleClick');
    expensiveOperation(data);
    console.timeEnd('handleClick');
  }, [data]);

  return <button onClick={handleClick}>Click</button>;
}
```

## 参考链接

- [React 官方文档 - useCallback](https://react.dev/reference/react/useCallback)
- [React.memo 和 useCallback 最佳实践](https://kentcdodds.com/blog/usememo-and-usecallback)

## 相关 Hooks

- `useMemo` - 缓存值
- `React.memo` - 组件优化
- `useState` - 状态管理

## 学习路径

- 上一课：[useMemo - 性能优化](05-use-memo.md)
- 下一课：[Custom Hooks - 自定义 Hook](07-custom-hooks.md)
- 返回：[React Hooks 基础](README.md)
