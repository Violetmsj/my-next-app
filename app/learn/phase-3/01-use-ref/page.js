/**
 * React 进阶 Hook - useRef 学习
 *
 * 学习 useRef 的三种用途：
 * 1. 访问 DOM 元素
 * 2. 保存可变值（不触发重新渲染）
 * 3. 保存实例变量
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function UseRefPage() {
  const navigationItems = [
    { label: 'Phase 3 概览', href: '/learn/phase-3' },
    { label: 'useRef', href: '/learn/phase-3/01-use-ref' },
    { label: 'useImperativeHandle', href: '/learn/phase-3/02-use-imperative-handle' },
    { label: 'useLayoutEffect', href: '/learn/phase-3/03-use-layout-effect' },
    { label: '复杂状态管理', href: '/learn/phase-3/04-complex-state' }
  ];

  // useState 演示
  const [renderCount, setRenderCount] = useState(0);

  // useRef 保存可变值
  const mutableValueRef = useRef(0);
  const [displayValue, setDisplayValue] = useState(0);

  // useRef 访问 DOM
  const inputRef = useRef(null);
  const divRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleMeasure = () => {
    const div = divRef.current;
    if (div) {
      const rect = div.getBoundingClientRect();
      alert(`元素尺寸：宽 ${Math.round(rect.width)}px，高 ${Math.round(rect.height)}px`);
    }
  };

  const handleIncrement = () => {
    // useRef 的值改变不会触发重新渲染
    mutableValueRef.current += 1;
    // 使用 useState 更新显示值
    setDisplayValue(mutableValueRef.current);
    console.log('Ref 实际值:', mutableValueRef.current);
    console.log('State 显示值:', displayValue);
  };

  const basicRefCode = `// 1. 基础 useRef 用法
import { useRef } from 'react';

export default function BasicRefExample() {
  // 创建 ref
  const myRef = useRef(null);

  return (
    <div>
      {/* 关联到 DOM 元素 */}
      <input ref={myRef} type="text" />
      <button onClick={() => myRef.current?.focus()}>
        聚焦输入框
      </button>
    </div>
  );
}

// 2. 访问 DOM 属性和方法
function VideoPlayer() {
  const videoRef = useRef(null);

  const play = () => {
    videoRef.current?.play();
  };

  const pause = () => {
    videoRef.current?.pause();
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current?.requestFullscreen();
    }
  };

  return (
    <div>
      <video ref={videoRef} src="/video.mp4" />
      <button onClick={play}>播放</button>
      <button onClick={pause}>暂停</button>
      <button onClick={toggleFullscreen}>全屏</button>
    </div>
  );
}

// 3. 聚焦到指定元素
function AutoFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    // 组件加载后自动聚焦
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} placeholder="自动聚焦的输入框" />;
}`;

  const mutableValueCode = `// 4. 保存可变值（不触发重新渲染）
import { useState, useRef } from 'react';

export default function CounterExample() {
  const [count, setCount] = useState(0);
  // ref 用于保存不触发渲染的值
  const renderCount = useRef(0);

  const increment = () => {
    setCount(count + 1);
    // 改变 ref 不会触发重新渲染
    renderCount.current += 1;
    console.log('渲染次数:', renderCount.current);
  };

  return (
    <div>
      <p>计数: {count}</p>
      <p>组件已渲染 {renderCount.current} 次</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}

// 5. 存储上一次的 props/state
import { useRef, useEffect } from 'react';

function PreviousValueExample({ value }) {
  const prevValueRef = useRef();

  useEffect(() => {
    // 保存上一次的 value
    prevValueRef.current = value;
  }, [value]);

  return (
    <div>
      <p>当前值: {value}</p>
      <p>上一次的值: {prevValueRef.current}</p>
    </div>
  );
}

// 6. 防止闭包陷阱
function TimerWithRef() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // 将 interval ID 存储在 ref 中
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      // 清理时使用 ref 中的值
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <p>计时器: {seconds} 秒</p>
    </div>
  );
}`;

  const domExamplesCode = `// 7. Canvas 绘图示例
function CanvasDrawing() {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  const handleMouseDown = (e) => {
    isDrawingRef.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ border: '1px solid #000', cursor: 'crosshair' }}
    />
  );
}

// 8. 获取元素尺寸
function ElementSize() {
  const elementRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const measureElement = () => {
    const element = elementRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      setSize({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
    }
  };

  useEffect(() => {
    // 初始测量
    measureElement();
    // 窗口大小改变时重新测量
    const handleResize = () => measureElement();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div
        ref={elementRef}
        style={{
          width: '300px',
          height: '150px',
          backgroundColor: '#f0f0f0',
          padding: '20px',
        }}
      >
        这个元素的尺寸是 {size.width} x {size.height} 像素
      </div>
      <button onClick={measureElement}>重新测量</button>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            01. useRef - DOM 引用与可变值
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">useRef</code> 是 React 的重要 Hook，
            主要用于三个场景：<strong>访问 DOM 元素</strong>、<strong>保存可变值</strong>、
            <strong>保存实例变量</strong>。与 useState 不同，ref 的改变不会触发组件重新渲染。
          </p>
        </div>

        {/* useState vs useRef */}
        <DemoContainer
          title="useState vs useRef - 对比演示"
          description="观察两种 Hook 的区别"
        >
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                useState（触发重新渲染）：
              </h4>
              <p className="text-blue-800 dark:text-blue-400 text-sm">
                计数：{renderCount}
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">
                useRef（不触发重新渲染）：
              </h4>
              <p className="text-green-800 dark:text-green-400 text-sm">
                内部值：{mutableValueRef.current}
              </p>
              <p className="text-green-600 dark:text-green-500 text-xs mt-1">
                （通过 State 显示：{displayValue}）
              </p>
            </div>

            <button
              onClick={handleIncrement}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              点击查看区别
            </button>
          </div>
        </DemoContainer>

        {/* DOM 访问演示 */}
        <DemoContainer
          title="DOM 元素访问演示"
          description="使用 ref 聚焦输入框和测量元素尺寸"
        >
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                1. 自动聚焦：
              </h4>
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="点击按钮自动聚焦"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                />
                <button
                  onClick={handleFocus}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  聚焦
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                2. 测量元素尺寸：
              </h4>
              <div
                ref={divRef}
                className="px-4 py-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded border border-purple-200 dark:border-purple-700"
              >
                点击下方按钮测量这个元素的尺寸
              </div>
              <button
                onClick={handleMeasure}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                测量尺寸
              </button>
            </div>
          </div>
        </DemoContainer>

        {/* 基础 ref 用法 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 基础 useRef 用法
          </h2>
          <CodeBlock code={basicRefCode} language="javascript" />
        </div>

        {/* 保存可变值 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔄 保存可变值
          </h2>
          <CodeBlock code={mutableValueCode} language="javascript" />
        </div>

        {/* DOM 操作示例 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🎨 DOM 操作实例
          </h2>
          <CodeBlock code={domExamplesCode} language="javascript" />
        </div>

        {/* 重要提示 */}
        <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-3">
            ⚠️ 重要提示
          </h3>
          <ul className="text-sm text-yellow-800 dark:text-yellow-400 space-y-2">
            <li>• <strong>不要滥用 useRef</strong> - 优先使用 state 管理需要渲染的数据</li>
            <li>• <strong>ref.current</strong> 可能在首次渲染时为 null（DOM 还未创建）</li>
            <li>• <strong>改变 ref 不会触发重新渲染</strong> - 只适合存储不需要展示的值</li>
            <li>• <strong>函数组件</strong> 中每次渲染都会返回同一个 ref 对象</li>
            <li>• <strong>避免在 render 周期中读取 ref.current</strong> - 可能导致不一致</li>
            <li>• <strong>清空 ref</strong> - 在组件卸载时可以设置为 null</li>
          </ul>
        </div>

        {/* 使用场景 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            📌 useRef 最佳使用场景
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
            <li>✅ 聚焦、测量 DOM 元素尺寸</li>
            <li>✅ 播放、暂停媒体元素（视频、音频）</li>
            <li>✅ Canvas 绘图、SVG 操作</li>
            <li>✅ 存储定时器 ID</li>
            <li>✅ 保存上一次的 props/state 值</li>
            <li>✅ 避免闭包陷阱（存储最新值）</li>
            <li>✅ 存储渲染次数、临时状态等不需要显示的数据</li>
          </ul>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-3"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 返回 Phase 3
          </Link>
          <Link
            href="/learn/phase-3/02-use-imperative-handle"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: useImperativeHandle →
          </Link>
        </div>
      </div>
    </div>
  );
}
