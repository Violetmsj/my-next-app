/**
 * useMemo Hook 学习页面
 *
 * useMemo用于缓存计算结果，避免昂贵的计算在每次渲染时重复执行
 * 性能优化工具
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function UseMemoPage() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', price: 1.5 },
    { id: 2, name: 'Banana', price: 0.8 },
    { id: 3, name: 'Cherry', price: 2.0 },
    { id: 4, name: 'Date', price: 1.2 },
    { id: 5, name: 'Elderberry', price: 3.5 }
  ]);
  const [filter, setFilter] = useState('');

  // 模拟昂贵计算
  const expensiveCalculation = (num) => {
    console.log('执行昂贵计算...');
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += Math.sqrt(num);
    }
    return result;
  };

  // 使用useMemo缓存计算结果
  const [renderCount, setRenderCount] = useState(0);
  const memoizedValue = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);

  // 过滤和计算总价
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  const totalPrice = useMemo(() => {
    return filteredItems.reduce((sum, item) => sum + item.price, 0);
  }, [filteredItems]);

  const addRenderCount = () => setRenderCount(prev => prev + 1);

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

  const basicCode = `import { useMemo } from 'react';

function MyComponent({ data, filter }) {
  // 缓存昂贵的计算
  const expensiveValue = useMemo(() => {
    return data.filter(item => item.active)
               .map(item => item.value * 2)
               .reduce((sum, val) => sum + val, 0);
  }, [data]); // 只有data变化时才重新计算

  // 缓存对象
  const memoizedObject = useMemo(() => ({
    type: 'data',
    count: data.length,
    timestamp: Date.now()
  }), [data.length]);

  return (
    <div>
      <p>计算结果: {expensiveValue}</p>
      <ChildComponent data={memoizedObject} />
    </div>
  );
}`;

  const exampleCode = `function ListComponent({ items, filter }) {
  // 缓存过滤结果
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  // 缓存计算结果
  const totalPrice = useMemo(() => {
    return filteredItems.reduce((sum, item) => sum + item.price, 0);
  }, [filteredItems]);

  return (
    <div>
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}: \${item.price}</li>
        ))}
      </ul>
      <p>总价: \${totalPrice.toFixed(2)}</p>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            05. useMemo - 性能优化
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            useMemo用于缓存计算结果，在组件重新渲染时避免重复执行昂贵的计算。
            它接收一个创建函数和依赖数组，只有依赖项变化时才重新计算。
          </p>
        </div>

        {/* 昂贵计算示例 */}
        <DemoContainer
          title="示例 1: 缓存昂贵计算"
          description="避免在每次渲染时重复执行耗时计算"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="text-center">
              <button
                onClick={() => setCount(count + 1)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                增加计数 (当前: {count})
              </button>
            </div>

            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                计算结果: {memoizedValue.toFixed(2)}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                只有点击按钮（改变count）时才会重新计算
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={addRenderCount}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
              >
                触发重新渲染 (不改变依赖)
              </button>
            </div>
          </div>
        </DemoContainer>

        {/* 列表过滤示例 */}
        <DemoContainer
          title="示例 2: 缓存过滤和计算"
          description="使用useMemo优化大数据列表的处理"
        >
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="过滤商品..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />

            <div className="space-y-2 mb-4">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <span className="text-gray-900 dark:text-white">{item.name}</span>
                  <span className="text-gray-600 dark:text-gray-400">\${item.price}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="font-medium text-green-900 dark:text-green-300">
                总价: \${totalPrice.toFixed(2)}
              </p>
              <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                共 {filteredItems.length} 件商品
              </p>
            </div>
          </div>
        </DemoContainer>

        {/* 基础用法 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 基础用法
          </h2>
          <CodeBlock code={basicCode} language="javascript" />
        </div>

        {/* 实际示例 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📚 实际应用示例
          </h2>
          <CodeBlock code={exampleCode} language="javascript" />
        </div>

        {/* 使用场景 */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            📌 useMemo 适用场景
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-400 space-y-2">
            <li>✓ 大型数据列表的过滤、排序、转换</li>
            <li>✓ 昂贵的计算（如复杂数学计算、大数据处理）</li>
            <li>✓ 缓存对象、数组等引用类型</li>
            <li>✓ 避免子组件不必要的重新渲染</li>
            <li>✓ 防止组件状态更新时重复计算</li>
          </ul>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-1/04-use-reducer"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: useReducer
          </Link>
          <Link
            href="/learn/phase-1/06-use-callback"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: useCallback →
          </Link>
        </div>
      </div>
    </div>
  );
}
