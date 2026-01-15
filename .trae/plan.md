# 婚礼电子请帖实施计划 (Plan)

## Phase 1: 基础架构与资源准备 (Foundation)
**目标**: 建立稳固的项目结构，配置视觉系统，准备静态资源。

1.  **项目配置**
    *   [ ] 建立 `.trae` 目录并归档 specs/plan 文档。
    *   [ ] 配置 `src/styles/tokens.css`: 定义色彩、字体、间距、玻璃拟态 CSS 变量。
    *   [ ] 确保 `lenis` 和 `three.js` (CDN URL) 接入准备就绪。

2.  **资源管理**
    *   [ ] 创建 `public/people` 目录，用于存放人物抠图素材。
    *   [ ] 规范化 `public/gallery/wedding` 图片命名。
    *   [ ] 检查并生成缺失的 Markdown 描述文件 (`scripts/generate-wedding-descriptions.ts`)。

## Phase 2: 核心体验开发 (Core Experience)
**目标**: 实现具有视觉冲击力的首屏与流畅的滚动体验。

3.  **Hero 3D 场景 (`src/components/hero/`)**
    *   [ ] 创建 `Scene3D.astro`: 封装 Canvas 与 Three.js 初始化逻辑。
    *   [ ] 实现异步加载器: 仅在客户端且视口可见时加载 Three.js。
    *   [ ] 实现粒子/丝带效果与人物 Sprite 渲染。
    *   [ ] 添加交互: 鼠标/陀螺仪视差响应。

4.  **视差滚动框架 (`src/layouts/ParallaxLayout.astro`)**
    *   [ ] 集成 Lenis 实现平滑滚动。
    *   [ ] 封装 `ScrollObserver`: 提供基于滚动进度的回调与 CSS 变量 (`--scroll-progress`)。

## Phase 3: 内容模块实现 (Content Modules)
**目标**: 完成故事线与画廊功能的开发。

5.  **故事线整合 (`src/pages/invitation.astro` 重构)**
    *   [ ] 将页面结构重构为单页长滚动模式。
    *   [ ] 实现“时间轴”组件: 结合 `slides.ts` 数据，随滚动依次浮现图文。
    *   [ ] 应用 Web Animations API 实现高性能的进出场动画。

6.  **画廊升级 (`src/components/Gallery.astro`)**
    *   [ ] 优化 Grid 布局，支持瀑布流。
    *   [ ] 升级 `Lightbox.astro`:
        *   添加 Touch 事件监听，实现左右 Swipe 切换。
        *   添加 Pointer 事件监听，实现 Pinch-to-zoom (双指缩放)。
        *   完善 Focus Trap 与键盘导航。

## Phase 4: 互动与服务 (Interactions)
**目标**: 完成用户数据提交与实用工具功能。

7.  **RSVP 模块**
    *   [ ] 开发表单组件: 包含姓名、电话、人数、备注字段。
    *   [ ] 样式美化: 使用玻璃拟态风格，添加输入验证反馈。
    *   [ ] 对接 `/api/reservations`: 实现无刷新提交与状态提示 (Toast)。

8.  **地图与日程**
    *   [ ] 开发地图卡片: 集成外链导航按钮。
    *   [ ] 开发日程时间轴组件。

## Phase 5: 优化与交付 (Optimization & Delivery)
**目标**: 提升性能，支持离线访问，准备上线。

9.  **PWA 支持**
    *   [ ] 创建 `public/manifest.webmanifest`。
    *   [ ] 编写 `public/sw.js` (Service Worker): 缓存核心资源。
    *   [ ] 在 `Layout.astro` 中注册 Service Worker。

10. **性能调优**
    *   [ ] 图片优化: 检查所有 `img` 标签的 `loading`、`decoding` 与 `alt` 属性。
    *   [ ] 脚本优化: 确保非关键 JS (如 3D 逻辑) 不阻塞主线程。
    *   [ ] 运行 Lighthouse 审计，修复性能与无障碍问题。

11. **最终验收**
    *   [ ] 全流程测试 (浏览 -> 互动 -> 提交)。
    *   [ ] 多设备适配测试 (iOS/Android/Desktop)。
    *   [ ] SEO Meta 标签校对。

---
**执行策略**:
*   优先完成 Phase 1 & 2，确保视觉基调确立。
*   Phase 3 & 4 并行开发，快速填充内容。
*   Phase 5 穿插进行，持续关注性能指标。
