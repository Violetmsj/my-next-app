# useState - 基础状态管理 Hook

## 概述

`useState` 是 React 函数组件中添加状态管理的 Hook，允许你在不编写 class 组件的情况下使用 state 和其他 React 特性。它是 React 中最基础和最常用的 Hook。

## 基础语法

```javascript
import { useState } from 'react';

function MyComponent() {
  const [state, setState] = useState(initialValue);

  // 使用 state
  // 使用 setState 更新 state
}
```

### 参数

- `initialValue`：状态的初始值。可以是任何类型（数字、字符串、对象、数组等）

### 返回值

返回一个包含两个元素的数组：

1. **state**：当前状态值
2. **setState**：更新状态的函数

## 使用示例

### 基础计数器

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        点击 +1
      </button>
    </div>
  );
}
```

### 字符串状态

```javascript
function TextInput() {
  const [text, setText] = useState('');

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入一些文字"
      />
      <p>你输入了: {text}</p>
    </div>
  );
}
```

### 对象状态

```javascript
function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: ''
  });

  const updateName = (name) => {
    setUser({
      ...user,
      name
    });
  };

  return (
    <div>
      <input
        type="text"
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
        placeholder="姓名"
      />
      <p>姓名: {user.name}</p>
    </div>
  );
}
```

### 数组状态

```javascript
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false
        }
      ]);
      setInputValue('');
    }
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="添加待办事项"
      />
      <button onClick={addTodo}>添加</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 函数式更新

当新的状态依赖于之前的状态时，应该使用函数式更新：

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  // ❌ 不推荐：可能依赖外部变量
  const incrementBy5 = () => {
    setCount(count + 5);
  };

  // ✅ 推荐：函数式更新
  const incrementBy5 = () => {
    setCount(prevCount => prevCount + 5);
  };

  return (
    <button onClick={incrementBy5}>
      +5
    </button>
  );
}

// 多步更新示例
function ComplexCounter() {
  const [count, setCount] = useState(0);

  const incrementTwice = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // 结果：count 增加 2
  };

  return <button onClick={incrementTwice}>+2</button>;
}
```

## 惰性初始状态

对于复杂的初始计算，使用函数形式避免每次渲染都重新计算：

```javascript
function HeavyComponent() {
  // ❌ 每次渲染都执行 expensiveCalculation()
  const [data, setData] = useState(expensiveCalculation());

  // ✅ 只在首次渲染时执行
  const [data, setData] = useState(() => expensiveCalculation());

  // 对于对象
  const [user, setUser] = useState(() => ({
    name: '张三',
    age: 25,
    // ... 其他复杂计算
  }));
}

function expensiveCalculation() {
  console.log('执行复杂计算...');
  return 123;
}
```

## useState vs 类组件的 this.state

### 类组件

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>计数: {this.state.count}</p>
        <button onClick={this.increment}>+1</button>
      </div>
    );
  }
}
```

### 函数组件（useState）

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}
```

## 多个 useState

一个组件可以使用多个 useState：

```javascript
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  return (
    <form>
      <input
        type="text"
        placeholder="姓名"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </form>
  );
}
```

## 常见陷阱

### 1. 直接修改状态

```javascript
function TodoList() {
  const [todos, setTodos] = useState([]);

  // ❌ 错误：直接修改状态
  const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    setTodos(todos); // 不会触发重新渲染
  };

  // ✅ 正确：创建新数组
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  // 或者使用函数式更新
  const addTodo = (text) => {
    setTodos(prevTodos => [...prevTodos, { id: Date.now(), text }]);
  };
}
```

### 2. 对象状态更新

```javascript
function UserProfile() {
  const [user, setUser] = useState({ name: '', age: 0 });

  const updateAge = (age) => {
    // ❌ 错误：只更新部分属性
    setUser({ age });

    // ✅ 正确：展开所有属性
    setUser(prevUser => ({
      ...prevUser,
      age
    }));
  };

  return (
    <div>
      <p>{user.name} - {user.age}岁</p>
      <button onClick={() => updateAge(30)}>更新年龄</button>
    </div>
  );
}
```

### 3. 异步问题

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    console.log(count); // 仍是旧值

    setTimeout(() => {
      console.log(count); // 仍然是旧值
    }, 1000);
  };

  // 如果需要获取最新值，使用函数式更新
  const handleClick = () => {
    setCount(prev => {
      console.log(prev); // 最新值
      return prev + 1;
    });
  };

  return <button onClick={handleClick}>{count}</button>;
}
```

## 性能优化

### 1. 使用 useReducer 替代多个 useState

当状态逻辑复杂时，使用 useReducer 更合适：

```javascript
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    currentId: null
  });

  // 代替多个 setState
  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };
}
```

### 2. 惰性初始化

对于复杂初始值，使用函数形式：

```javascript
function ExpensiveComponent() {
  const [data, setData] = useState(() => {
    return expensiveComputation();
  });
}
```

## 最佳实践

1. **使用函数式更新**：当新状态依赖之前状态时，使用 `setState(prev => newValue)`
2. **避免直接修改状态**：总是创建新对象/数组
3. **合理拆分状态**：相关状态放一起，不相关的分成多个 useState
4. **使用惰性初始化**：复杂初始计算使用函数形式
5. **不要过度使用 useState**：如果状态逻辑复杂，考虑 useReducer

## 常见用例

### 表单处理

```javascript
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 提交表单数据
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
      />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 切换状态

```javascript
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      style={{
        backgroundColor: isOn ? 'green' : 'gray',
        color: 'white'
      }}
    >
      {isOn ? '开启' : '关闭'}
    </button>
  );
}
```

## 参考链接

- [React 官方文档 - useState](https://react.dev/reference/react/useState)
- [React Hooks 规则](https://react.dev/reference/rules)
- [useState 详解](https://react.dev/learn/state-a-components-memory)

## 相关 Hooks

- `useReducer` - 复杂状态逻辑
- `useEffect` - 副作用处理
- `useContext` - 全局状态
- `useRef` - DOM 引用和可变值

## 学习路径

- 下一课：[useEffect - 副作用处理](02-use-effect.md)
- 返回：[React Hooks 基础](README.md)
