/**
 * React 进阶 Hook - useImperativeHandle 学习
 *
 * 学习 useImperativeHandle：
 * 向父组件暴露自定义方法接口，配合 forwardRef 使用
 */

'use client';

import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import Link from 'next/link';
import DemoContainer from '../../../components/DemoContainer';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

// 创建子组件，使用 forwardRef 和 useImperativeHandle
const CustomInput = forwardRef(function CustomInput(props, ref) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  // 向父组件暴露自定义方法
  useImperativeHandle(ref, () => ({
    // 暴露的方法列表
    focus: () => {
      inputRef.current?.focus();
    },
    clear: () => {
      setValue('');
    },
    getValue: () => {
      return value;
    },
    setValue: (newValue) => {
      setValue(newValue);
    }
  }), [value]); // 依赖数组

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="自定义输入框"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
      />
    </div>
  );
});

// 自定义按钮组件
const CustomButton = forwardRef(function CustomButton(props, ref) {
  const buttonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    press: () => {
      buttonRef.current?.click();
    },
    getStatus: () => {
      return {
        disabled: buttonRef.current?.disabled,
        text: buttonRef.current?.textContent
      };
    }
  }), []);

  return (
    <button
      ref={buttonRef}
      onClick={() => alert('按钮被点击了！')}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
    >
      点击我
    </button>
  );
});

export default function UseImperativeHandlePage() {
  const navigationItems = [
    { label: 'Phase 3 概览', href: '/learn/phase-3' },
    { label: 'useRef', href: '/learn/phase-3/01-use-ref' },
    { label: 'useImperativeHandle', href: '/learn/phase-3/02-use-imperative-handle' },
    { label: 'useLayoutEffect', href: '/learn/phase-3/03-use-layout-effect' },
    { label: '复杂状态管理', href: '/learn/phase-3/04-complex-state' }
  ];

  // 创建 ref 引用子组件
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const [inputValue, setInputValue] = useState('');

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleClear = () => {
    inputRef.current?.clear();
  };

  const handleGetValue = () => {
    const value = inputRef.current?.getValue();
    alert(`输入框的值：${value}`);
  };

  const handleSetValue = () => {
    const newValue = prompt('请输入新值：');
    if (newValue !== null) {
      inputRef.current?.setValue(newValue);
    }
  };

  const handlePressButton = () => {
    buttonRef.current?.press();
  };

  const handleGetButtonStatus = () => {
    const status = buttonRef.current?.getStatus();
    alert(`按钮状态：${JSON.stringify(status)}`);
  };

  const imperativeHandleCode = `// 1. 基础 useImperativeHandle 用法
import { useRef, useImperativeHandle, forwardRef } from 'react';

// 子组件：暴露方法给父组件
const ChildComponent = forwardRef(function ChildComponent(props, ref) {
  const [count, setCount] = useState(0);

  // 使用 useImperativeHandle 暴露方法
  useImperativeHandle(ref, () => ({
    // 暴露的方法列表
    increment: () => {
      setCount(prev => prev + 1);
    },
    decrement: () => {
      setCount(prev => prev - 1);
    },
    getCount: () => {
      return count;
    },
    reset: () => {
      setCount(0);
    }
  }), [count]); // 依赖数组 - count 改变时更新暴露的方法

  return (
    <div>
      <p>计数: {count}</p>
    </div>
  );
});

// 父组件：使用 ref 调用子组件方法
function ParentComponent() {
  const childRef = useRef(null);

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={() => childRef.current?.increment()}>
        +1
      </button>
      <button onClick={() => childRef.current?.decrement()}>
        -1
      </button>
      <button onClick={() => alert(childRef.current?.getCount())}>
        获取值
      </button>
      <button onClick={() => childRef.current?.reset()}>
        重置
      </button>
    </div>
  );
}`;

  const mediaPlayerCode = `// 2. 媒体播放器示例
const VideoPlayer = forwardRef(function VideoPlayer(props, ref) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      videoRef.current?.play();
      setIsPlaying(true);
    },
    pause: () => {
      videoRef.current?.pause();
      setIsPlaying(false);
    },
    toggle: () => {
      if (isPlaying) {
        videoRef.current?.pause();
        setIsPlaying(false);
      } else {
        videoRef.current?.play();
        setIsPlaying(true);
      }
    },
    seek: (time) => {
      videoRef.current.currentTime = time;
    },
    setVolume: (volume) => {
      videoRef.current.volume = volume;
    },
    getCurrentTime: () => {
      return videoRef.current?.currentTime;
    },
    getDuration: () => {
      return videoRef.current?.duration;
    }
  }), [isPlaying]);

  return (
    <div>
      <video
        ref={videoRef}
        src={props.src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <p>状态: {isPlaying ? '播放中' : '已暂停'}</p>
    </div>
  );
});

// 父组件控制播放器
function MediaControlPanel() {
  const playerRef = useRef(null);

  return (
    <div>
      <VideoPlayer ref={playerRef} src="/video.mp4" />
      <div className="flex gap-2 mt-4">
        <button onClick={() => playerRef.current?.play()}>播放</button>
        <button onClick={() => playerRef.current?.pause()}>暂停</button>
        <button onClick={() => playerRef.current?.toggle()}>切换</button>
        <button onClick={() => playerRef.current?.seek(30)}>跳到 30 秒</button>
        <button onClick={() => {
          const time = playerRef.current?.getCurrentTime();
          alert(\`当前时间: \${time}秒\`);
        }}>
          获取当前时间
        </button>
      </div>
    </div>
  );
}`;

  const formValidationCode = `// 3. 表单验证组件
const FormField = forwardRef(function FormField(props, ref) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const validate = (val) => {
    if (!val) {
      setError('此字段不能为空');
      return false;
    }
    if (val.length < props.minLength) {
      setError(\`至少需要 \${props.minLength} 个字符\`);
      return false;
    }
    setError('');
    return true;
  };

  useImperativeHandle(ref, () => ({
    validate: () => validate(value),
    getValue: () => value,
    clear: () => {
      setValue('');
      setError('');
    },
    focus: () => inputRef.current?.focus(),
    getError: () => error
  }), [value, error, props.minLength]);

  return (
    <div className="mb-4">
      <label>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type || 'text'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => validate(value)}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
});

// 父组件管理整个表单
function RegistrationForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 验证所有字段
    const isNameValid = nameRef.current?.validate();
    const isEmailValid = emailRef.current?.validate();
    const isPasswordValid = passwordRef.current?.validate();

    if (isNameValid && isEmailValid && isPasswordValid) {
      const formData = {
        name: nameRef.current?.getValue(),
        email: emailRef.current?.getValue(),
        password: passwordRef.current?.getValue()
      };
      console.log('表单数据:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        ref={nameRef}
        label="姓名"
        type="text"
        minLength={2}
      />
      <FormField
        ref={emailRef}
        label="邮箱"
        type="email"
        minLength={5}
      />
      <FormField
        ref={passwordRef}
        label="密码"
        type="password"
        minLength={8}
      />
      <button type="submit">注册</button>
    </form>
  );
}`;

  const animationCode = `// 4. 动画控制组件
const AnimationBox = forwardRef(function AnimationBox(props, ref) {
  const boxRef = useRef(null);
  const animationRef = useRef(null);

  useImperativeHandle(ref, () => ({
    startAnimation: () => {
      if (boxRef.current) {
        boxRef.current.style.animationPlayState = 'running';
      }
    },
    pauseAnimation: () => {
      if (boxRef.current) {
        boxRef.current.style.animationPlayState = 'paused';
      }
    },
    resetAnimation: () => {
      if (boxRef.current) {
        boxRef.current.style.animation = 'none';
        // 强制重新渲染
        boxRef.current.offsetHeight; // 触发 reflow
        boxRef.current.style.animation = 'spin 2s linear infinite';
      }
    },
    changeSpeed: (multiplier) => {
      if (boxRef.current) {
        const duration = 2 / multiplier; // 速度加倍，时长减半
        boxRef.current.style.animationDuration = \`\${duration}s\`;
      }
    }
  }), []);

  return (
    <div
      ref={boxRef}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: 'blue',
        animation: 'spin 2s linear infinite'
      }}
    />
  );
});`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            02. useImperativeHandle - 暴露方法接口
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">useImperativeHandle</code> 配合
            <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">forwardRef</code> ，
            允许子组件向父组件暴露自定义的方法接口，实现 imperative handling（命令式处理）。
          </p>
        </div>

        {/* 演示 */}
        <DemoContainer
          title="自定义输入框演示"
          description="点击按钮调用子组件暴露的方法"
        >
          <div className="space-y-4">
            <CustomInput ref={inputRef} />
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleFocus}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                聚焦
              </button>
              <button
                onClick={handleClear}
                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                清空
              </button>
              <button
                onClick={handleGetValue}
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                获取值
              </button>
              <button
                onClick={handleSetValue}
                className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                设置值
              </button>
            </div>
          </div>
        </DemoContainer>

        {/* 自定义按钮演示 */}
        <DemoContainer
          title="自定义按钮演示"
          description="通过 ref 控制按钮"
        >
          <div className="space-y-4">
            <CustomButton ref={buttonRef} />
            <div className="flex gap-2">
              <button
                onClick={handlePressButton}
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                模拟点击
              </button>
              <button
                onClick={handleGetButtonStatus}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                获取状态
              </button>
            </div>
          </div>
        </DemoContainer>

        {/* 基础用法 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 基础 useImperativeHandle 用法
          </h2>
          <CodeBlock code={imperativeHandleCode} language="javascript" />
        </div>

        {/* 媒体播放器 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🎬 媒体播放器实例
          </h2>
          <CodeBlock code={mediaPlayerCode} language="javascript" />
        </div>

        {/* 表单验证 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📝 表单验证组件
          </h2>
          <CodeBlock code={formValidationCode} language="javascript" />
        </div>

        {/* 动画控制 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ✨ 动画控制组件
          </h2>
          <CodeBlock code={animationCode} language="javascript" />
        </div>

        {/* 重要提示 */}
        <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-3">
            ⚠️ 重要提示与最佳实践
          </h3>
          <ul className="text-sm text-yellow-800 dark:text-yellow-400 space-y-2">
            <li>• <strong>必须配合 forwardRef 使用</strong> - 没有 ref 就无法使用 useImperativeHandle</li>
            <li>• <strong>暴露接口而非 DOM</strong> - 让父组件通过 API 操作子组件，而非直接操作 DOM</li>
            <li>• <strong>谨慎使用</strong> - 优先使用 props 和 state，只有必要时才使用 imperative handle</li>
            <li>• <strong>避免暴露过多方法</strong> - 只暴露必要的公共 API，保持接口简洁</li>
            <li>• <strong>依赖数组</strong> - 确保依赖数组包含所有在 useImperativeHandle 中使用的值</li>
            <li>• <strong>TypeScript 支持</strong> - 可以定义接口来规范暴露的方法</li>
          </ul>
        </div>

        {/* 使用场景 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            📌 useImperativeHandle 适用场景
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
            <li>✅ 需要父组件控制子组件行为的场景</li>
            <li>✅ 媒体播放器（播放、暂停、音量控制）</li>
            <li>✅ 表单组件（验证、聚焦、清空）</li>
            <li>✅ 动画组件（播放、暂停、重置）</li>
            <li>✅ 第三方组件库的封装</li>
            <li>❌ 不适合通过 props 传递就能解决的情况</li>
            <li>❌ 不适合简单的 UI 组件（优先使用 state 和 props）</li>
          </ul>
        </div>

        {/* 对比其他方案 */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
            🎯 命令式 vs 声明式
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">声明式（推荐）：</h4>
              <ul className="text-green-800 dark:text-green-400 space-y-1">
                <li>• 使用 props 控制组件行为</li>
                <li>• 通过 state 管理组件状态</li>
                <li>• 更易于测试和维护</li>
                <li>• React 推荐的方式</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">命令式（必要时使用）：</h4>
              <ul className="text-green-800 dark:text-green-400 space-y-1">
                <li>• 使用 useImperativeHandle 暴露方法</li>
                <li>• 父组件直接调用子组件方法</li>
                <li>• 用于特殊场景（如媒体控制）</li>
                <li>• 保持最小化使用</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-3/01-use-ref"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: useRef
          </Link>
          <Link
            href="/learn/phase-3/03-use-layout-effect"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: useLayoutEffect →
          </Link>
        </div>
      </div>
    </div>
  );
}
