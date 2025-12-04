# useReducer - 状态机 Hook

## 概述

`useReducer` 是 React 中用于管理复杂状态逻辑的 Hook。它通过 reducer 函数和当前状态来管理状态，类似于 Redux 的模式。当状态逻辑涉及多个子值或下一个状态依赖于之前的状态时，`useReducer` 比 `useState` 更合适。

## 基础语法

```javascript
import { useReducer } from 'react';

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>状态: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
    </div>
  );
}

// Reducer 函数
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
```

### 参数

1. **reducer 函数**：接收当前状态和 action，返回新状态
2. **initialState**：初始状态

### 返回值

一个包含两个元素的数组：

1. **state**：当前状态
2. **dispatch**：分发 action 的函数

## Reducer 函数模式

```javascript
// Reducer 接收当前状态和 action
function reducer(state, action) {
  // 根据 action.type 处理不同操作
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      };

    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      };

    case 'RESET':
      return {
        ...state,
        count: 0
      };

    // 默认情况返回当前状态
    default:
      return state;
  }
}
```

## 完整示例

### 1. 计数器

```javascript
import { useReducer } from 'react';

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0
  });

  return (
    <div>
      <p>计数: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'RESET' })}>
        重置
      </button>
    </div>
  );
}

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'RESET':
      return { ...state, count: 0 };
    default:
      return state;
  }
}
```

### 2. Todo 应用

```javascript
import { useReducer } from 'react';

const initialState = {
  todos: [],
  filter: 'all' // 'all', 'active', 'completed'
};

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

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="添加待办事项"
        />
        <button type="submit">添加</button>
      </form>

      <div className="filter-buttons">
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
          disabled={state.filter === 'all'}
        >
          全部
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
          disabled={state.filter === 'active'}
        >
          进行中
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
          disabled={state.filter === 'completed'}
        >
          已完成
        </button>
        <button
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
        >
          清除已完成
        </button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
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
}
```

### 3. 表单状态管理

```javascript
const initialFormState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: {},
  isSubmitting: false
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: undefined // 清除该字段的错误
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

    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload
      };

    case 'RESET':
      return initialFormState;

    default:
      return state;
  }
}

function RegistrationForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const handleChange = (field) => (e) => {
    dispatch({
      type: 'SET_FIELD',
      field,
      value: e.target.value
    });
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'username':
        if (!value) return '用户名不能为空';
        if (value.length < 3) return '用户名至少3个字符';
        return null;

      case 'email':
        if (!value) return '邮箱不能为空';
        if (!/\S+@\S+\.\S+/.test(value)) return '邮箱格式无效';
        return null;

      case 'password':
        if (!value) return '密码不能为空';
        if (value.length < 8) return '密码至少8个字符';
        return null;

      case 'confirmPassword':
        if (value !== state.password) return '密码不匹配';
        return null;

      default:
        return null;
    }
  };

  const handleBlur = (field) => (e) => {
    const error = validateField(field, e.target.value);
    if (error) {
      dispatch({
        type: 'SET_ERROR',
        field,
        error
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 验证所有字段
    const fields = ['username', 'email', 'password', 'confirmPassword'];
    let hasErrors = false;

    fields.forEach(field => {
      const error = validateField(field, state[field]);
      if (error) {
        dispatch({ type: 'SET_ERROR', field, error });
        hasErrors = true;
      }
    });

    if (hasErrors) return;

    dispatch({ type: 'SET_SUBMITTING', payload: true });

    try {
      // 提交表单
      await registerUser({
        username: state.username,
        email: state.email,
        password: state.password
      });
      // 成功处理
    } catch (error) {
      // 错误处理
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>用户名</label>
        <input
          value={state.username}
          onChange={handleChange('username')}
          onBlur={handleBlur('username')}
        />
        {state.errors.username && <span>{state.errors.username}</span>}
      </div>

      <div>
        <label>邮箱</label>
        <input
          type="email"
          value={state.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
        />
        {state.errors.email && <span>{state.errors.email}</span>}
      </div>

      <div>
        <label>密码</label>
        <input
          type="password"
          value={state.password}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
        />
        {state.errors.password && <span>{state.errors.password}</span>}
      </div>

      <div>
        <label>确认密码</label>
        <input
          type="password"
          value={state.confirmPassword}
          onChange={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
        />
        {state.errors.confirmPassword && <span>{state.errors.confirmPassword}</span>}
      </div>

      <button type="submit" disabled={state.isSubmitting}>
        {state.isSubmitting ? '提交中...' : '注册'}
      </button>
    </form>
  );
}
```

## useState vs useReducer

| 场景 | useState | useReducer |
|------|----------|------------|
| 简单状态 | ✅ 适合 | ❌ 过度 |
| 复杂状态逻辑 | ❌ 代码冗余 | ✅ 适合 |
| 多个相关子值 | ❌ 容易出错 | ✅ 适合 |
| 状态转换逻辑清晰 | ❌ 难以追踪 | ✅ 易于调试 |
| 类似 Redux 的模式 | ❌ 不支持 | ✅ 原生支持 |

### 选择 useReducer 当：

1. 状态有多个子值
2. 下一个状态依赖于之前的状态
3. 状态转换逻辑复杂
4. 需要以可预测的方式管理状态

## 惰性初始化

使用函数形式初始状态，避免每次渲染都重新计算：

```javascript
function todoReducer(state, action) {
  // ...
}

// ✅ 惰性初始化：只执行一次
function TodoApp() {
  const [state, dispatch] = useReducer(
    todoReducer,
    // 初始状态计算函数
    () => {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : { todos: [], filter: 'all' };
    }
  );

  // 保存到本地存储
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  // ...
}

// ❌ 每次渲染都重新计算
function BadExample() {
  const [state, dispatch] = useReducer(
    todoReducer,
    {
      todos: JSON.parse(localStorage.getItem('todos') || '[]'),
      filter: 'all'
    }
  );
}
```

## Dispatch 函数

### 基础 Dispatch

```javascript
const [state, dispatch] = useReducer(reducer, initialState);

// 简单 action
dispatch({ type: 'INCREMENT' });
```

### 带参数的 Action

```javascript
// 通过 payload 传递数据
dispatch({ type: 'ADD_TODO', payload: '学习 React' });

dispatch({ type: 'DELETE_TODO', payload: todoId });

dispatch({ type: 'UPDATE_QUANTITY', payload: { id: 10, quantity: 5 } });
```

### Action Creators（推荐）

```javascript
// 定义 action 创建函数
const actions = {
  addTodo: (text) => ({ type: 'ADD_TODO', payload: text }),
  toggleTodo: (id) => ({ type: 'TOGGLE_TODO', payload: id }),
  deleteTodo: (id) => ({ type: 'DELETE_TODO', payload: id })
};

// 使用
dispatch(actions.addTodo('学习 React'));
dispatch(actions.toggleTodo(todoId));
```

## 性能优化

### 1. 使用 useMemo 优化计算

```javascript
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // 只在 todos 变化时重新计算
  const activeTodos = useMemo(
    () => state.todos.filter(todo => !todo.completed),
    [state.todos]
  );

  const completedTodos = useMemo(
    () => state.todos.filter(todo => todo.completed),
    [state.todos]
  );
}
```

### 2. 使用 useCallback 优化 Dispatch

```javascript
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // 缓存回调函数
  const handleAddTodo = useCallback((text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  }, []);

  const handleToggleTodo = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);
}
```

### 3. 分割 Reducer

```javascript
// 分别管理不同部分的状态
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    // todos 相关 action

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    // filter 相关 action

    default:
      return state;
  }
}
```

## 常见陷阱

### 1. 忘记返回新状态

```javascript
// ❌ 错误：直接修改状态
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      state.count += 1; // 直接修改
      return state; // 仍然返回同一个对象
  }
}

// ✅ 正确：返回新对象
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      };
  }
}
```

### 2. 不正确的状态更新

```javascript
// ❌ 错误：依赖外部变量
let globalCounter = 0;

function reducer(state, action) {
  if (action.type === 'INCREMENT') {
    globalCounter += 1; // 使用外部变量
    return { count: globalCounter };
  }
  return state;
}

// ✅ 正确：基于当前状态
function reducer(state, action) {
  if (action.type === 'INCREMENT') {
    return { count: state.count + 1 };
  }
  return state;
}
```

### 3. 不返回默认情况

```javascript
// ✅ 始终包含 default 返回
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    default:
      return state; // 必须返回当前状态
  }
}
```

## 高级用法

### 1. 嵌套状态

```javascript
const initialState = {
  user: {
    profile: {
      name: '',
      email: ''
    },
    preferences: {
      theme: 'light',
      language: 'zh'
    }
  }
};

function userReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PROFILE_NAME':
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            name: action.payload
          }
        }
      };
    // ...
  }
}
```

### 2. Middleware（中间件）

```javascript
function logger(reducer) {
  return (state, action) => {
    const nextState = reducer(state, action);
    console.log('prev state:', state);
    console.log('action:', action);
    console.log('next state:', nextState);
    return nextState;
  };
}

const enhancedReducer = logger(todoReducer);

function TodoApp() {
  const [state, dispatch] = useReducer(
    enhancedReducer,
    initialState
  );
}
```

## 最佳实践

1. **保持 Reducer 纯函数**：不产生副作用，基于 action 返回新状态
2. **使用有意义的 action 类型**：使用常量而不是字符串
3. **action creators**：创建函数返回 action，避免硬编码
4. **分割状态**：将复杂状态分成多个独立的部分
5. **惰性初始化**：对于复杂初始值使用函数形式
6. **文档化状态转换**：确保团队理解状态转换逻辑

## 参考链接

- [React 官方文档 - useReducer](https://react.dev/reference/react/useReducer)
- [Reducer 模式](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)

## 相关 Hooks

- `useState` - 简单状态
- `useContext` - 全局状态
- `useEffect` - 副作用

## 学习路径

- 上一课：[useContext - 全局状态](03-use-context.md)
- 下一课：[useMemo - 性能优化](05-use-memo.md)
- 返回：[React Hooks 基础](README.md)
