---
trigger: always_on
---
# Love-Peace Wedding Invitation Site

> Astro 5 + TypeScript 静态站点，用于婚礼电子请帖与婚纱摄影展示

## 项目概述

**项目类型**: Web 应用 (静态站点生成)  
**核心功能**: 婚礼电子请帖、婚纱摄影画廊、RSVP 预约、AI 图片描述生成  
**技术栈**: Astro 5, TypeScript, Lenis (平滑滚动), LangChain/OpenAI (AI 描述生成)

---

## 开发命令

⚠️ **包管理器**: 本项目使用 `pnpm`，请勿使用 npm 或 yarn

```bash
# 安装依赖
pnpm install

# 启动开发服务器 (http://localhost:4321)
pnpm dev

# 构建生产版本
pnpm build

# 本地预览构建结果
pnpm preview

# 生成婚礼照片 AI 描述 (需配置 OPENAI_API_KEY)
pnpm gen:wedding

# Astro CLI 工具
pnpm astro add <integration>   # 添加集成
pnpm astro check               # 类型检查
```

---

## 项目结构

```text
love-peace-qoder/
├── public/                    # 静态资源 (直接复制到输出)
│   ├── descs/                 # 婚礼照片文案 (*.md)
│   └── gallery/wedding/       # 婚礼照片 (*.jpeg)
├── scripts/
│   └── generate-wedding-descriptions.ts  # AI 描述生成脚本
├── src/
│   ├── components/            # 可复用组件
│   │   ├── Carousel.astro     # 图片轮播
│   │   ├── SlidePage.astro    # 故事页滑块
│   │   ├── LazyImage.astro    # 懒加载图片
│   │   ├── Lightbox.astro     # 图片灯箱
│   │   └── *Effect.astro      # 视觉特效组件
│   ├── data/
│   │   └── slides.ts          # 婚礼故事数据 (SlideItem)
│   ├── layouts/
│   │   ├── Layout.astro       # 基础布局
│   │   └── GalleryLayout.astro
│   └── pages/
│       ├── api/               # API 端点
│       │   ├── reservations.ts      # RSVP 预约
│       │   ├── albums.ts            # 相册
│       │   ├── photos.ts            # 照片
│       │   └── invitations/[id].ts  # 动态邀请
│       ├── gallery/           # 画廊页面
│       ├── invitation.astro   # 婚礼请帖 (主页面)
│       ├── invitation-story.astro   # 故事版请帖
│       └── invitation-swiper.astro  # Swiper 版请帖
├── astro.config.mjs           # Astro 配置
├── tsconfig.json              # TypeScript 配置
└── package.json
```

### 核心目录职责

| 目录 | 职责 |
|------|------|
| `src/pages/` | 页面路由，文件即路由 |
| `src/components/` | 可复用 UI 组件 |
| `src/layouts/` | 页面布局模板 |
| `src/data/` | 静态数据文件 |
| `public/descs/` | 照片文案 Markdown |
| `public/gallery/` | 图片资源 |
| `scripts/` | 构建脚本、工具脚本 |

---

## 代码规范

### 命名约定

- **组件**: PascalCase，语义化命名 (如 `Carousel.astro`, `SlidePage.astro`)
- **页面**: kebab-case (如 `invitation-story.astro`)
- **数据文件**: camelCase (如 `slides.ts`)
- **图片/文案 ID**: 与文件名保持一致 (如 `DXMJ2611.jpeg` 对应 `DXMJ2611.md`)

### 样式规范

- 优先使用页面内 `<style>` 标签，遵循**移动端优先**设计
- 支持 `prefers-color-scheme` 暗色模式
- 响应式断点: 480px (平板), 768px (桌面)

### 组件拆分原则

- 复用能力强的交互与展示优先做成组件
- 页面只做布局与数据组织
- 特效组件独立 (`*Effect.astro`)

### UI 文案风格

- 语言: 简体中文为主，支持中英混排
- 风格: 温暖、仪式感、婚礼氛围

---

## 数据流与文件关联

### 图片与文案匹配

```text
public/gallery/wedding/DXMJ2611.jpeg  ←→  public/descs/DXMJ2611.md
```

- 图片和文案通过**文件名 (ID)** 关联
- `invitation.astro` 在构建时通过 Node `fs` 读取并匹配

### SlideItem 数据结构

```typescript
interface SlideItem {
  src: string    // 图片路径
  title: string  // 标题
  copy: string   // 文案
}
```

---

## API 端点

| 端点 | 功能 |
|------|------|
| `/api/reservations` | RSVP 确认出席 |
| `/api/albums` | 相册管理 |
| `/api/photos` | 照片管理 |
| `/api/metrics` | 埋点统计 |
| `/api/invitations/[id]` | 动态邀请信息 |
| `/api/auth/wechat/init` | 微信登录初始化 |

---

## 环境配置

### 环境变量

创建 `.env` 文件:

```bash
# AI 描述生成 (pnpm gen:wedding)
OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=your_base_url  # 可选，自定义端点
```

### 站点配置

`astro.config.mjs` 中配置:

```javascript
export default defineConfig({
  site: "https://wedding.example.com",  // 生产站点 URL
  integrations: [sitemap()]
});
```

---

## 关键页面说明

### 婚礼请帖系列 (当前重点)

| 页面 | 特点 |
|------|------|
| `invitation.astro` | 手机优先布局，封面 + 轮播 + 故事卡片 + 网格画廊 + RSVP |
| `invitation-story.astro` | 纵向 scroll-snap 故事页，使用 `SlidePage` + `slides.ts` |
| `invitation-swiper.astro` | 基于 Swiper Web Component 的竖向全屏轮播 |

### 目标路径

打开链接 → 浏览内容 → RSVP 确认出席

---

## 特效组件

| 组件 | 用途 |
|------|------|
| `MetalStretchEffect.astro` | 金属拉伸视觉效果 |
| `CSSWaveEffect.astro` | CSS 波浪效果 |
| `WaveDistortion.astro` | WebGL 波纹扭曲 |
| `CurvedImageRenderer.astro` | 曲面图片渲染 |

---

## 项目特有约定

### ⚠️ 重要注意事项

1. **图片 ID 一致性**: 图片文件名与文案 Markdown 文件名必须完全一致
2. **构建时读取**: `invitation.astro` 使用 Node `fs` 在构建时读取文件，非运行时
3. **平滑滚动**: Gallery 和特效页面使用 `lenis` 实现平滑滚动
4. **RSVP 入口**: 统一使用 `/api/reservations` 作为确认出席链接

### AI 描述生成

```bash
# 为 public/gallery/wedding/ 下的新图片生成描述
pnpm gen:wedding
```

- 跳过已有描述的图片
- 输出到 `public/descs/*.md`
- 需要配置 `OPENAI_API_KEY`

---

## 部署

```bash
# 构建静态站点
pnpm build

# 输出目录
./dist/
```

支持部署到: Vercel, Netlify, Cloudflare Pages, 或任何静态托管服务

---

## 后续扩展计划

- 时间线页面
- 伴手礼介绍
- 席位表
- FAQ 页面

新功能以**新组件 + 新页面**方式添加，挂接到站点导航或邀请页内链接。
