# Phase 1: React Hooks 基础

欢迎来到 React Hooks 基础阶段！本阶段将带你掌握 React 19 的 7 个核心 Hook。

## 📋 阶段概览

**学习目标：** 掌握 React Hooks 的基础用法和最佳实践
**预计时间：** 3-5天
**难度：** ⭐⭐ (入门到中级)

React Hooks 是 React 16.8 引入的新特性，它让我们在函数组件中使用状态和其他 React 特性。本阶段将学习 7 个最常用的 Hook，为后续的 React 开发打下坚实基础。

## 📚 学习内容

### 01. useState - 基础状态管理 ⭐

`useState` 是最基础也是最常用的 Hook，用于在函数组件中添加状态管理。

**学习重点：**
- 基础用法和语法
- 不同类型的状态（数字、字符串、布尔值、对象、数组）
- 状态更新的两种方式（直接设置、基于之前状态）
- 使用场景：计数器、表单输入、开关切换

**典型用例：**
```javascript
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [user, setUser] = useState({});
```

**👉 [开始学习 →](/learn/phase-1/01-use-state)**

---

### 02. useEffect - 副作用处理 ⭐

`useEffect` 用于处理副作用，如数据获取、设置定时器、添加事件监听器等。

**学习重点：**
- 依赖数组的 3 种用法（无依赖、空数组、有依赖）
- 清理函数的使用
- 使用场景：数据获取、定时器、事件监听器、本地存储
- 性能优化：避免内存泄漏

**典型用例：**
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prev => prev + 1);
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

**👉 [开始学习 →](/learn/phase-1/02-use-effect)**

---

### 03. useContext - 全局状态管理 ⭐⭐

`useContext` 用于在组件树中共享数据，避免 props drilling。

**学习重点：**
- Context 的创建和 Provider 的使用
- 在组件中读取 Context 数据
- 使用场景：主题切换、用户信息、语言设置
- 性能优化：避免不必要的渲染

**典型用例：**
```javascript
const ThemeContext = createContext();

<ThemeContext.Provider value={{ theme, toggleTheme }}>
  {children}
</ThemeContext.Provider>

const { theme, toggleTheme } = useContext(ThemeContext);
```

**👉 [开始学习 →](/learn/phase-1/03-use-context)**

---

### 04. useReducer - 复杂状态逻辑 ⭐⭐

`useReducer` 用于管理复杂状态逻辑，类似于 Redux。

**学习重点：**
- Reducer 函数的编写（纯函数）
- Action 的设计和命名
- 使用场景：表单状态、购物车、复杂交互
- 与 useState 的选择

**典型用例：**
```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'INCREMENT' });
```

**👉 [开始学习 →](/learn/phase-1/04-use-reducer)**

---

### 05. useMemo - 性能优化 ⭐⭐

`useMemo` 用于缓存计算结果，避免在每次渲染时重复执行昂贵计算。

**学习重点：**
- 缓存策略的使用
- 依赖数组的正确设置
- 使用场景：大数据列表过滤、复杂计算、对象缓存
- 性能测试：什么时候使用 useMemo

**典型用例：**
```javascript
const filteredItems = useMemo(() => {
  return items.filter(item => item.active);
}, [items]);

const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

**👉 [开始学习 →](/learn/phase-1/05-use-memo)**

---

### 06. useCallback - 函数缓存 ⭐⭐

`useCallback` 用于缓存函数实例，防止子组件不必要的重新渲染。

**学习重点：**
- 函数引式的稳定性
- 与 React.memo 的配合使用
- 使用场景：传递给子组件的回调函数
- 性能优化：什么时候使用 useCallback

**典型用例：**
```javascript
const handleClick = useCallback(() => {
  setCount(prev => prev + 1);
}, []);

<ChildComponent onClick={handleClick} />
```

**👉 [开始学习 →](/learn/phase-1/06-use-callback)**

---

### 07. Custom Hooks - 自定义Hook ⭐⭐⭐

Custom Hooks 允许我们将组件逻辑提取到可复用的函数中。

**学习重点：**
- 自定义 Hook 的命名约定（以 "use" 开头）
- 在 Hook 中调用其他 Hook
- 使用场景：数据获取、表单处理、本地存储
- 代码复用：抽象通用逻辑

**典型用例：**
```javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return { count, increment, decrement };
}
```

**👉 [开始学习 →](/learn/phase-1/07-custom-hooks)**

---

## 🎯 学习目标

完成 Phase 1 后，你应该能够：

✅ 熟练使用 `useState` 管理组件状态
✅ 使用 `useEffect` 处理副作用和生命周期逻辑
✅ 通过 `useContext` 实现全局状态管理
✅ 使用 `useReducer` 处理复杂状态逻辑
✅ 使用 `useMemo` 和 `useCallback` 优化性能
✅ 创建自定义 Hook 抽象和复用逻辑
✅ 理解 React Hooks 的规则和最佳实践

## 📝 最佳实践

### Hooks 规则

1. **只在最顶层调用 Hooks** - 不要在循环、条件或嵌套函数中调用
2. **只在 React 函数中调用 Hooks** - 在 React 函数组件或自定义 Hook 中调用

### 性能优化

1. **不要过早优化** - 只有在遇到性能问题时才使用 `useMemo` 和 `useCallback`
2. **合理设置依赖** - 确保依赖数组包含所有 effect 中使用的值
3. **避免闭包陷阱** - 注意依赖数组的变化

### 代码组织

1. **自定义 Hook 抽象** - 将通用逻辑提取到自定义 Hook
2. **保持 Hook 简洁** - 每个 Hook 只做一件事
3. **合理命名** - Hook 名称以 "use" 开头，清晰表达用途

## ⚠️ 常见陷阱

### 1. 依赖数组问题

**错误示例：**
```javascript
useEffect(() => {
  fetchData(id); // id 是 effect 外部的变量
}, []); // 缺少 id 依赖
```

**正确做法：**
```javascript
useEffect(() => {
  fetchData(id);
}, [id]); // 添加 id 到依赖数组
```

### 2. 闭包陷阱

**错误示例：**
```javascript
const [count, setCount] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // 这里总是打印初始值 0
  }, 1000);
}, []); // 空依赖数组，count 永远是初始值
```

**正确做法：**
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prev => prev + 1); // 使用函数式更新
  }, 1000);
}, []);
```

### 3. 状态更新时机

**注意：** `useState` 的更新是异步的，不会立即生效

```javascript
// 错误：无法立即获取最新值
setCount(count + 1);
console.log(count); // 仍为旧值

// 正确：使用函数式更新
setCount(prev => {
  const newValue = prev + 1;
  return newValue;
});
```

## 🚀 实践项目

建议完成以下实践项目巩固学习：

1. **Todo 应用** - 使用 useState 和 useReducer 管理待办事项
2. **主题切换器** - 使用 useContext 实现深色/浅色模式
3. **计数器组件** - 展示 useState、useEffect、useCallback 的使用
4. **自定义 Hook 库** - 创建 useLocalStorage、useFetch 等常用 Hook

## 📚 进阶学习

完成 Phase 1 后，建议继续学习：

- **[Phase 2: Next.js App Router](/learn/phase-2)** - 学习现代全栈开发
- **[Phase 3: React 进阶技术](/learn/phase-3)** - 深入理解高级特性

## 💬 常见问题

**Q: useState 和 useReducer 什么时候用？**
A: 简单状态用 useState，复杂状态逻辑用 useReducer。如果状态逻辑涉及多个子值或下个状态依赖上个状态，用 useReducer。

**Q: 什么时候使用 useMemo？**
A: 当计算非常昂贵，或者需要缓存对象/数组引用时。注意：不要过早优化，先确保功能正确再考虑性能。

**Q: 自定义 Hook 和普通函数有什么区别？**
A: 自定义 Hook 可以调用其他 Hook，而普通函数不能。这让 Hook 可以拥有状态和生命周期逻辑。

---

**准备好开始学习了吗？** [进入 Phase 1 →](/learn/phase-1) 🚀
