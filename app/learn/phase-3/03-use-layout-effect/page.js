/**
 * React 进阶 Hook - useLayoutEffect 学习
 *
 * 学习 useLayoutEffect：
 * 在 DOM 更新后、同步浏览器绘制前执行副作用
 * 用于测量 DOM 元素、同步滚动位置等
 */

'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function UseLayoutEffectPage() {
  const navigationItems = [
    { label: 'Phase 3 概览', href: '/learn/phase-3' },
    { label: 'useRef', href: '/learn/phase-3/01-use-ref' },
    { label: 'useImperativeHandle', href: '/learn/phase-3/02-use-imperative-handle' },
    { label: 'useLayoutEffect', href: '/learn/phase-3/03-use-layout-effect' },
    { label: '复杂状态管理', href: '/learn/phase-3/04-complex-state' }
  ];

  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });
  const [elementPosition, setElementPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // useRef 引用要测量的元素
  const measureRef = useRef(null);

  // 使用 useLayoutEffect 测量元素
  useLayoutEffect(() => {
    const element = measureRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      setElementSize({
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      });
      setElementPosition({
        top: Math.round(rect.top),
        left: Math.round(rect.left)
      });
    }
  }, [isVisible]); // 当 isVisible 改变时重新测量

  const [scrollY, setScrollY] = useState(0);
  const [scrollInfo, setScrollInfo] = useState({ x: 0, y: 0 });

  // useLayoutEffect 监听滚动
  useLayoutEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrollInfo({
        x: window.scrollX,
        y: window.scrollY
      });
    };

    // 使用 useLayoutEffect 确保同步读取滚动位置
    const updateScroll = () => {
      setScrollY(window.scrollY);
      setScrollInfo({
        x: window.scrollX,
        y: window.scrollY
      });
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll(); // 初始读取

    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  const layoutEffectCode = `// useLayoutEffect vs useEffect
import { useEffect, useLayoutEffect } from 'react';

// useEffect - 异步执行（浏览器绘制后）
useEffect(() => {
  console.log('useEffect - 异步执行');
  // 1. 组件渲染
  // 2. 浏览器绘制
  // 3. 执行 useEffect
}, []);

// useLayoutEffect - 同步执行（浏览器绘制前）
useLayoutEffect(() => {
  console.log('useLayoutEffect - 同步执行');
  // 1. 组件渲染
  // 2. 执行 useLayoutEffect
  // 3. 浏览器绘制
}, []);

// ⚠️ 重要区别：
// useEffect: 不会阻塞浏览器绘制，性能更好
// useLayoutEffect: 会阻塞浏览器绘制，确保 DOM 测量准确性`;

// DOM 测量示例
const DomMeasurement = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    // 在 DOM 更新后立即测量
    const element = elementRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      setSize({
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      });
    }
  }, [/* 依赖数组 */]);

  return (
    <div>
      <div ref={elementRef} style={{ padding: '20px' }}>
        测量这个元素
      </div>
      <p>元素尺寸: {size.width} x {size.height}</p>
    </div>
  );
};

// 滚动同步示例
const ScrollSync = () => {
  const [scrollY, setScrollY] = useState(0);
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    const handleScroll = () => {
      // 同步读取滚动位置
      const y = window.scrollY;
      setScrollY(y);

      // 同步更新 header 位置（无闪烁）
      if (headerRef.current) {
        headerRef.current.style.transform = \`translateY(\${Math.min(y, 100)}px)\`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div ref={headerRef} style={{ position: 'sticky', top: 0 }}>
        滚动位置: {scrollY}px
      </div>
      <div style={{ height: '2000px' }}></div>
    </div>
  );
};`;

  const resizeObserverCode = `// ResizeObserver API 示例
import { useLayoutEffect, useRef, useState } from 'react';

const ResponsiveComponent = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // 创建 ResizeObserver
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: Math.round(width),
          height: Math.round(height)
        });
      }
    });

    // 开始观察
    observer.observe(element);

    return () => {
      // 清理 observer
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ border: '2px solid #0070f3', padding: '20px' }}
    >
      <p>容器尺寸: {dimensions.width} x {dimensions.height} px</p>
      <p>调整浏览器窗口大小查看变化</p>
    </div>
  );
};

// 自动调整 textarea 高度
const AutoResizeTextarea = () => {
  const textareaRef = useRef(null);
  const [value, setValue] = useState('');

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // 自动调整高度
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="自动调整高度的输入框"
      style={{
        width: '100%',
        minHeight: '40px',
        padding: '10px',
        resize: 'none',
        overflow: 'hidden'
      }}
    />
  );
};`;

  const scrollPositionCode = `// 滚动位置管理
import { useLayoutEffect, useRef } from 'react';

const ScrollManager = () => {
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // 保存滚动位置
    const savedScroll = sessionStorage.getItem('scrollPosition');

    if (savedScroll) {
      // 恢复滚动位置
      container.scrollTop = parseInt(savedScroll);
    }

    // 监听滚动并保存
    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={scrollRef}
      style={{
        height: '300px',
        overflowY: 'auto',
        border: '1px solid #ccc'
      }}
    >
      {/* 大量内容 */}
      {Array.from({ length: 100 }).map((_, i) => (
        <div key={i} style={{ padding: '10px' }}>
          第 {i + 1} 行
        </div>
      ))}
    </div>
  );
};

// 固定元素跟随滚动
const StickyFollower = () => {
  const [offset, setOffset] = useState(0);
  const followerRef = useRef(null);

  useLayoutEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;

    const handleScroll = () => {
      // 根据滚动位置计算偏移量
      const y = window.scrollY;
      setOffset(Math.min(y, 200));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始计算

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          padding: '20px',
          backgroundColor: '#0070f3',
          color: 'white',
          borderRadius: '8px',
          transform: \`translateX(\${offset / 2}px)\`,
          transition: 'transform 0s' // 无过渡，更平滑
        }}
      >
        滚动偏移: {offset}px
      </div>
      <div style={{ height: '2000px' }}></div>
    </div>
  );
};`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            03. useLayoutEffect - 同步副作用
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">useLayoutEffect</code> 在
            DOM 更新完成后、浏览器绘制前同步执行。它会阻塞浏览器绘制，
            因此适合用于需要准确测量 DOM 或同步布局的场景。
          </p>
        </div>

        {/* 对比演示 */}
        <DemoContainer
          title="DOM 元素测量演示"
          description={`当前元素尺寸: ${elementSize.width} x ${elementSize.height}px，位置: (${elementPosition.left}, ${elementPosition.top})`}
        >
          <div className="space-y-4">
            <div
              ref={measureRef}
              className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded border border-purple-200 dark:border-purple-700 transition-all"
              style={{
                width: isVisible ? '100%' : '50%',
                height: isVisible ? '150px' : '100px'
              }}
            >
              <p className="text-gray-800 dark:text-gray-200">
                这个元素的尺寸会动态变化，点击下方按钮查看测量结果
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {isVisible ? '缩小元素' : '扩大元素'}
              </button>
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded">
                尺寸: {elementSize.width} x {elementSize.height} px
              </div>
            </div>
          </div>
        </DemoContainer>

        {/* 滚动演示 */}
        <DemoContainer
          title="滚动位置同步演示"
          description={`当前滚动位置: X=${scrollInfo.x}px, Y=${scrollInfo.y}px`}
        >
          <div className="space-y-4">
            <div
              className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800"
              style={{
                position: 'sticky',
                top: '10px',
                zIndex: 10
              }}
            >
              <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                滚动位置: Y={scrollInfo.y}px
              </p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                使用 useLayoutEffect 确保滚动位置同步，无闪烁
              </p>
            </div>

            <div className="h-[1500px] bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded p-8">
              <p className="text-gray-600 dark:text-gray-300 mb-4">向下滚动查看效果 ↓</p>
              <div className="space-y-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                    第 {i + 1} 个区块
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DemoContainer>

        {/* 基础对比 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ⚡ useEffect vs useLayoutEffect
          </h2>
          <div className="mb-4 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">useEffect（推荐）</h4>
              <ul className="text-sm text-green-800 dark:text-green-400 space-y-1">
                <li>✓ 异步执行，不阻塞绘制</li>
                <li>✓ 性能更好</li>
                <li>✓ 适用于大多数场景</li>
                <li>✓ 数据获取、事件监听等</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">useLayoutEffect（特殊场景）</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                <li>✓ 同步执行，阻塞绘制</li>
                <li>✓ 确保 DOM 测量准确性</li>
                <li>✓ 避免闪烁问题</li>
                <li>✓ DOM 测量、同步布局</li>
              </ul>
            </div>
          </div>
          <CodeBlock code={layoutEffectCode} language="javascript" />
        </div>

        {/* DOM 测量 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📏 DOM 元素测量实例
          </h2>
          <CodeBlock code={domMeasurementCode} language="javascript" />
        </div>

        {/* ResizeObserver */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📐 ResizeObserver 和动态调整
          </h2>
          <CodeBlock code={resizeObserverCode} language="javascript" />
        </div>

        {/* 滚动位置 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📜 滚动位置管理
          </h2>
          <CodeBlock code={scrollPositionCode} language="javascript" />
        </div>

        {/* 重要提示 */}
        <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-3">
            ⚠️ 重要提示与最佳实践
          </h3>
          <ul className="text-sm text-yellow-800 dark:text-yellow-400 space-y-2">
            <li>• <strong>优先使用 useEffect</strong> - 只有在需要测量 DOM 或避免闪烁时才使用 useLayoutEffect</li>
            <li>• <strong>会阻塞渲染</strong> - useLayoutEffect 同步执行，会阻塞浏览器绘制</li>
            <li>• <strong>SSR 兼容性</strong> - 在服务器端渲染时可能警告，可考虑切换到 useEffect</li>
            <li>• <strong>性能考虑</strong> - 避免在 useLayoutEffect 中执行耗时操作</li>
            <li>• <strong>依赖数组</strong> - 确保包含所有在 effect 中使用的响应式值</li>
            <li>• <strong>清理工作</strong> - 在返回函数中清理定时器、事件监听器等</li>
          </ul>
        </div>

        {/* 使用场景 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            📌 useLayoutEffect 适用场景
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
            <li>✅ 需要准确测量 DOM 元素尺寸或位置</li>
            <li>✅ 同步滚动位置或元素位置（避免闪烁）</li>
            <li>✅ ResizeObserver 监听元素大小变化</li>
            <li>✅ 自动调整输入框高度</li>
            <li>✅ 实现拖拽功能（需要精确坐标）</li>
            <li>✅ 动态计算布局</li>
            <li>❌ 数据获取（使用 useEffect）</li>
            <li>❌ 简单的状态更新（使用 useEffect）</li>
          </ul>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-3/02-use-imperative-handle"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: useImperativeHandle
          </Link>
          <Link
            href="/learn/phase-3/04-complex-state"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: 复杂状态管理 →
          </Link>
        </div>
      </div>
    </div>
  );
}
