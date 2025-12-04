# CLAUDE.md

本文档为在代码仓库中工作的 Claude Code (claude.ai/code) 提供指导。

## 项目概述

这是一个使用 [Next.js 15.5.4](https://nextjs.org) 的应用程序，基于 React 19.1.0 构建，采用 **App Router** 架构。该项目使用 **pnpm** 作为包管理器，**Tailwind CSS 4** 用于样式设计。这是一个用来学习nextjs的项目。

## 核心技术栈

- **框架**: Next.js 15.5.4 与 App Router
- **React**: 19.1.0
- **样式**: Tailwind CSS 4 (PostCSS)
- **包管理器**: pnpm
- **字体**: Geist 和 Geist_Mono (通过 next/font/google)
- **构建工具**: Turbopack 默认启用

## 开发命令

### 核心命令

```bash
# 启动开发服务器 (使用 Turbopack)
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

开发服务器默认运行在 http://localhost:3000

## 代码架构与结构

### 目录结构

- **app/** - Next.js App Router 页面和布局
  - **layout.js** - 根布局，包含字体、元数据和全局结构
  - **page.js** - 首页 (/) 包含 Next.js 介绍和链接
  - **globals.css** - 全局样式和 Tailwind CSS 配置
  - **about/** - 关于页面部分
    - **page.js** - 关于页面 (/about) 包含客户端功能
    - **[projectId]/** - 动态路由段
      - **page.js** - 项目详情页面 (/about/[projectId])

- **public/** - 静态资源 (SVG 图标、favicon)

### 应用架构

该应用使用 **Next.js App Router**，具有以下模式：

1. **布局**: `app/layout.js` 定义根 HTML 结构、字体 (Geist) 和全局样式
2. **页面**: `app/` 目录中的基于文件的路由
3. **动态路由**: 方括号表示动态段（例如 `[projectId]`）
4. **客户端组件**: 带有 `"use client"` 指令的组件（见 `app/about/page.js:1`）
5. **服务器组件**: App Router 中默认为服务器组件；只有客户端组件需要该指令

### 关键代码位置

- **首页**: `app/page.js` - 着陆页面，包含中文文本 ("现在开始") 和导航链接
- **关于页面**: `app/about/page.js` - 带有输入字段和导航的客户端组件
- **动态路由**: `app/about/[projectId]/page.js` - 显示 URL 参数中的项目 ID
- **全局样式**: `app/globals.css` - Tailwind CSS 4 配置和内联主题
- **字体配置**: `app/layout.js:4-12` - 使用 CSS 变量的 Geist 字体设置

### 路由结构

- `/` - 首页，包含 Next.js 品牌
- `/about` - 关于页面，包含交互元素
- `/about/[projectId]` - 动态路由，显示特定项目详情

## 样式方案

- **Tailwind CSS 4**: 使用新的 `@import "tailwindcss"` 语法（见 `app/globals.css:1`）
- **内联主题配置**: 在 `@theme inline` 块中定义的 CSS 变量（`app/globals.css:8-13`）
- **CSS 变量**: 背景、前景和字体的自定义属性
- **深色模式**: 遵循 `prefers-color-scheme` 媒体查询
- **响应式设计**: Tailwind 响应式类 (sm:、md: 前缀)

## 配置文件

- **next.config.mjs** - 最小的 Next.js 配置（目前为空）
- **postcss.config.mjs** - 带有 Tailwind CSS 插件的 PostCSS 配置
- **jsconfig.json** - 路径别名的 JavaScript 配置
- **package.json** - 依赖项和脚本（见上文）

## 重要说明

1. **Turbopack**: 开发构建和构建脚本都使用 `--turbopack` 标志以实现更快的构建
2. **中文文本**: 某些 UI 元素使用中文文本 ("现在开始", "这是about关于页", "请输入项目ID", "提交")
3. **客户端导航**: 关于页面使用 `window.location.href` 进行导航 (`app/about/page.js:21`)
4. **最小配置**: 未配置 ESLint、TypeScript 或测试框架
5. **静态资源**: `/public` 中的所有资源都作为静态文件提供

## 构建与部署

该项目遵循标准 Next.js 部署模式，可以部署到 Vercel（推荐）或任何 Node.js 托管平台。`next.config.mjs` 目前为最小配置，没有自定义配置。