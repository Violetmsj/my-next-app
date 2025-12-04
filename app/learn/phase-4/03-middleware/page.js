/**
 * Next.js 进阶 - Middleware 学习
 *
 * 学习 Middleware：请求拦截、认证、国际化、A/B 测试
 */

import Link from 'next/link';
import CodeBlock from '../../../components/CodeBlock';
import Navigation from '../../../components/Navigation';

export default function MiddlewarePage() {
  const navigationItems = [
    { label: 'Phase 4 概览', href: '/learn/phase-4' },
    { label: 'API Routes', href: '/learn/phase-4/01-api-routes' },
    { label: 'Server Actions', href: '/learn/phase-4/02-server-actions' },
    { label: 'Middleware', href: '/learn/phase-4/03-middleware' },
    { label: 'Caching', href: '/learn/phase-4/04-caching' },
    { label: 'Streaming', href: '/learn/phase-4/05-streaming' }
  ];

  const basicMiddlewareCode = `// Middleware 在请求到达页面之前执行
// middleware.js - 项目根目录

import { NextResponse } from 'next/server';

export function middleware(request) {
  // 检查请求路径
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // 检查用户是否已认证
    const isAuthenticated = request.cookies.get('auth_token');

    if (!isAuthenticated) {
      // 重定向到登录页
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 记录访问日志
  console.log(\`访问: \${request.nextUrl.pathname}\`);

  // 可以修改请求
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-custom-header', 'middleware-value');

  // 返回修改后的响应
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// 配置 Middleware 匹配的路径
export const config = {
  matcher: [
    // 所有路径
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};`;

  const authMiddlewareCode = `// 用户认证 Middleware
// middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 需要认证的路径
  const protectedPaths = ['/dashboard', '/profile', '/settings'];
  const isProtectedPath = protectedPaths.some(path =>
    pathname.startsWith(path)
  );

  if (isProtectedPath) {
    // 获取 token
    const token = request.cookies.get('token')?.value;

    // 验证 token（实际项目中需要验证 JWT）
    if (!token || !isValidToken(token)) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 添加用户信息到请求头
    const requestHeaders = new Headers(request.headers);
    const user = getUserFromToken(token);
    requestHeaders.set('x-user-id', user.id);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

function isValidToken(token) {
  // 验证 token 的逻辑
  return token.length > 10;
}

function getUserFromToken(token) {
  // 从 token 中解析用户信息
  return { id: '123', name: '用户' };
}`;

  const i18nMiddlewareCode = `// 国际化 Middleware
// middleware.js

import { NextResponse } from 'next/server';

// 支持的语言
const locales = ['en', 'zh', 'ja'];
const defaultLocale = 'en';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 检查路径是否已经包含语言前缀
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(\`/\${locale}/\`) && pathname !== \`/\${locale}\`
  );

  // 如果没有语言前缀，添加默认语言
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(\`/\${defaultLocale}\${pathname}\`, request.url)
    );
  }

  // 根据 Accept-Language 头自动选择语言
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage && !pathname.startsWith(\`/\${defaultLocale}\`)) {
    const preferredLanguage = acceptLanguage.split(',')[0].split('-')[0];
    if (locales.includes(preferredLanguage) && preferredLanguage !== defaultLocale) {
      return NextResponse.redirect(
        new URL(\`/\${preferredLanguage}\${pathname}\`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\\\.).*)',
  ],
};`;

  const abTestingCode = `// A/B 测试 Middleware
// middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // A/B 测试配置
  const abTests = {
    'homepage-design': {
      variants: ['A', 'B'],
      path: '/',
    },
    'cta-button-color': {
      variants: ['blue', 'green'],
      path: '/pricing',
    },
  };

  // 检查路径是否需要 A/B 测试
  for (const [testName, testConfig] of Object.entries(abTests)) {
    if (pathname === testConfig.path) {
      // 获取或创建测试分组
      let variant = request.cookies.get(\`ab-test-\${testName}\`)?.value;

      if (!variant) {
        // 随机分配分组
        const randomIndex = Math.floor(Math.random() * testConfig.variants.length);
        variant = testConfig.variants[randomIndex];

        // 设置 Cookie
        const response = NextResponse.next();
        response.cookies.set(\`ab-test-\${testName}\`, variant, {
          maxAge: 60 * 60 * 24 * 30, // 30 天
        });

        // 添加变体信息到请求头
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-ab-test', \`\${testName}:\${variant}\`);

        response.request = {
          headers: requestHeaders,
        };

        return response;
      }

      // 添加变体信息到请求头
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-ab-test', \`\${testName}:\${variant}\`);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  return NextResponse.next();
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation items={navigationItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            03. Middleware - 中间件
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Middleware 允许在请求到达页面之前进行拦截和处理。可以实现认证、
            国际化、A/B 测试、日志记录等功能。
          </p>
        </div>

        {/* 基础 Middleware */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 基础 Middleware
          </h2>
          <CodeBlock code={basicMiddlewareCode} language="javascript" />
        </div>

        {/* 认证 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔐 认证中间件
          </h2>
          <CodeBlock code={authMiddlewareCode} language="javascript" />
        </div>

        {/* 国际化 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🌐 国际化中间件
          </h2>
          <CodeBlock code={i18nMiddlewareCode} language="javascript" />
        </div>

        {/* A/B 测试 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🧪 A/B 测试
          </h2>
          <CodeBlock code={abTestingCode} language="javascript" />
        </div>

        {/* 使用场景 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            📌 Middleware 适用场景
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
            <li>✅ 用户认证和访问控制</li>
            <li>✅ 国际化语言切换</li>
            <li>✅ A/B 测试分组</li>
            <li>✅ 请求日志和监控</li>
            <li>✅ 重定向和 URL 重写</li>
            <li>✅ 请求限流和防爬虫</li>
            <li>✅ 特性开关（Feature Flags）</li>
          </ul>
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            href="/learn/phase-4/02-server-actions"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← 上一课: Server Actions
          </Link>
          <Link
            href="/learn/phase-4/04-caching"
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
          >
            下一课: Caching →
          </Link>
        </div>
      </div>
    </div>
  );
}
