# 婚礼电子请帖系统技术规格书 (Specs)

## 1. 项目概述
设计并开发一个基于现代 Web 技术的创新电子请帖系统，旨在提供沉浸式的用户体验。项目以 Astro 5 为核心，结合 WebGL 3D 互动、视差滚动与原生 Web 动画，打造兼具视觉冲击力与高性能的移动端优先应用。

## 2. 技术架构

### 2.1 核心技术栈
*   **框架**: Astro 5.0 (服务端渲染 + 静态生成混合模式)
*   **语言**: TypeScript (Strict Mode)
*   **样式**: CSS Variables (Design Tokens) + Scoped CSS
*   **动画**: 
    *   **3D**: Three.js (通过 CDN 引入 ESM 模块，不打包进 Bundle，版本: 0.160.0)
    *   **滚动**: Lenis (平滑滚动) + IntersectionObserver + CSS Custom Properties
    *   **过渡**: Web Animations API (原生高性能动画)
*   **构建**: Vite (Astro 内置)
*   **包管理**: pnpm

### 2.2 目录结构扩展
```text
/
├── public/
│   ├── gallery/wedding/   # 婚礼照片 (WebP/JPG)
│   ├── people/           # 人物抠图 (WebP/PNG Transparent)
│   ├── manifest.webmanifest # PWA Manifest
│   └── sw.js             # Service Worker
├── src/
│   ├── components/
│   │   ├── hero/         # 3D 场景组件 (Scene3D.astro)
│   │   ├── story/        # 故事线组件 (StoryItem.astro)
│   │   └── interactive/  # 互动组件 (RSVPForm.astro, Schedule.astro)
│   ├── layouts/
│   │   └── ParallaxLayout.astro # 视差滚动布局
│   ├── scripts/
│   │   └── three-loader.ts # Three.js 异步加载器
```

## 3. 功能模块规格

### 3.1 首屏 3D 互动 (Hero Scene)
*   **渲染目标**: 全屏 Canvas，位于内容底层。
*   **视觉元素**:
    *   **人物**: 使用抠图素材作为 2.5D Sprite 或 Plane，具备微小的呼吸动效。
    *   **环境**: 柔光粒子系统 (Particles) 或丝带轨迹 (Ribbons)，随鼠标/陀螺仪轻微移动。
    *   **文字**: 3D 悬浮标题或 HTML 叠加层。
*   **交互**:
    *   **视差**: 随滚动深度改变摄像机角度 (Camera Pan/Zoom)。
    *   **触控**: 点击触发光晕扩散或场景切换。
*   **降级策略**: 
    *   检测 `prefers-reduced-motion` 或 WebGL 不可用时，回退为高质量静态封面图 + CSS 简单淡入动画。

### 3.2 沉浸式故事线 (Storyline)
*   **布局**: 单页长滚动 (One-page Scroll)。
*   **视差滚动**: 
    *   背景层、前景人物、文案层以不同速度滚动。
    *   基于 Scroll Progress (0-1) 控制动画时间轴，而非单纯监听 scroll 事件，确保流畅度。
*   **内容**: 复用 `slides.ts` 数据结构，将图片与文案串联为时间轴节点。

### 3.3 画廊系统 (Gallery)
*   **展示**: 瀑布流或网格布局。
*   **Lightbox**:
    *   支持 **双指缩放 (Pinch-to-zoom)**。
    *   支持 **左右滑动切换 (Swipe)**。
    *   支持 **键盘导航** (Arrow Keys, ESC)。
    *   无障碍支持 (Focus Trap, aria-modal)。

### 3.4 互动与服务 (Interactive)
*   **RSVP 表单**:
    *   字段: 姓名、电话、人数、备注。
    *   提交: AJAX 提交至 `/api/reservations`，前端处理 Loading/Success/Error 状态。
*   **地图导航**:
    *   集成高德/百度/Apple Maps URL Scheme，根据 UA 自动适配或提供选择。
*   **祝福墙**: 
    *   (可选 Phase 2) 实时滚动的祝福弹幕或列表。

### 3.5 离线访问 (PWA)
*   **Manifest**: 配置 `manifest.webmanifest` (名称、图标、主题色)。
*   **Service Worker**: 缓存 App Shell (HTML/CSS/JS) 及首屏关键资源，支持离线打开查看已加载内容。

## 4. 视觉设计系统 (Design Tokens)

### 4.1 色彩 (CSS Variables)
*   **主色**: `soft-pink` (#E94E77 - 现有) -> 调整为更柔和的婚礼色调。
*   **背景**: 
    *   Light: `champagne-mist` (#FDFBF7)
    *   Dark: `midnight-blue` (#0A0F1C)
*   **玻璃拟态**:
    *   `--glass-bg`: `rgba(255, 255, 255, 0.08)`
    *   `--glass-border`: `rgba(255, 255, 255, 0.12)`
    *   `--glass-blur`: `blur(16px)`

### 4.2 排版
*   **字体**: 系统字体栈 (San Francisco, PingFang SC)，标题增加 `letter-spacing`。
*   **动效**: 
    *   `--ease-out-expo`: `cubic-bezier(0.19, 1, 0.22, 1)` (用于入场)
    *   `--ease-in-out-sine`: `cubic-bezier(0.45, 0.05, 0.55, 0.95)` (用于呼吸)

## 5. 性能与质量标准

### 5.1 性能指标
*   **LCP (Largest Contentful Paint)**: < 2.5s (移动端 4G)。
*   **CLS (Cumulative Layout Shift)**: < 0.1。
*   **FPS**: 滚动与动画保持 60fps。

### 5.2 优化策略
*   **资源加载**:
    *   Three.js 引擎延迟加载 (Defer/Dynamic Import)。
    *   首屏图片 `fetchpriority="high"`，非首屏 `loading="lazy"`。
    *   图片资源提供 WebP 格式及 srcset 适配。
*   **渲染优化**:
    *   WebGL 上下文管理，离开视口时暂停渲染循环。
    *   使用 `will-change` 提示关键动画层。

### 5.3 无障碍 (Accessibility)
*   全键盘可访问性。
*   所有非装饰性图片提供 `alt` 文本。
*   表单控件关联 `<label>`。
*   支持系统级字体缩放与深色模式。

## 6. 数据接口约定 (Mock)
*   `POST /api/reservations`: 提交出席信息。
*   `GET /api/config`: 获取婚礼配置 (时间、地点、坐标)。
*   `GET /api/gallery`: 获取画廊图片列表 (支持分页)。
