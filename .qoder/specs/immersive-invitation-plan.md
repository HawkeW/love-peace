# Immersive Digital Wedding Invitation - Technical Specification

> 现代化、沉浸式婚礼电子请帖技术方案

## 项目目标

创建一个前沿、非传统的数字婚礼邀请函，采用 Three.js、WebGL、视差滚动等现代前端技术，打造独特的视觉体验。

---

## 技术架构

### 核心技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Astro | 5.x | 框架基础 |
| Three.js | r170+ | 3D 场景渲染 |
| GSAP | 3.x | 滚动动画、补间动画 |
| Lenis | 1.x | 平滑滚动 (已有) |
| @mediapipe/selfie_segmentation | latest | 人像分割 |
| WebGL 2.0 | - | 自定义着色器 |

### 新增依赖

```bash
pnpm add three @types/three gsap @mediapipe/selfie_segmentation
```

---

## 创意概念

### 方案 A: 平行世界融合 (Parallel Worlds Merge)

**概念**: 两个独立的 3D 宇宙（代表新人双方）随着用户滚动逐渐融合为一体

**技术要点**:
- 双 Three.js 场景
- GSAP ScrollTrigger 驱动动画
- 自定义融合着色器

**适用场景**: 强调两人相遇、融合的故事

### 方案 B: 时间胶囊之旅 (Time Capsule Journey)

**概念**: 交互式时间线，照片在用户探索时转化为 3D 场景

**技术要点**:
- Three.js InstancedMesh 粒子系统
- 图片转粒子效果
- WebGL 景深效果

**适用场景**: 适合有丰富照片素材的情侣

### 方案 C: 星座爱情故事 (Constellation Love Story) ⭐ 推荐

**概念**: 婚礼照片剪影形成星星和星座，创造沉浸式星空体验

**技术要点**:
- Three.js + 自定义星空着色器
- 图像分割 → 点云转换
- 轨道控制器探索

**适用场景**: 浪漫、梦幻风格

---

## 页面流程设计

```
┌─────────────────────────────────────────────────────────────────┐
│                      邀请函旅程                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
     ┌────────────────────────┼────────────────────────┐
     ▼                        ▼                        ▼
┌─────────┐            ┌─────────────┐          ┌─────────────┐
│  开场   │            │   故事     │          │   RSVP      │
│  场景   │ ─滚动──▶  │   旅程     │ ─滚动──▶ │   确认      │
└─────────┘            └─────────────┘          └─────────────┘
     │                        │                        │
     ▼                        ▼                        ▼
┌─────────────┐        ┌─────────────┐          ┌─────────────┐
│ 3D 传送门   │        │ 照片→3D    │          │ 交互式     │
│ 开启效果    │        │ 转换效果    │          │ 确认动画   │
│ 名字漂浮    │        │ 视差滚动    │          │ 粒子庆祝   │
└─────────────┘        └─────────────┘          └─────────────┘
```

---

## 核心组件规划

### 新增目录结构

```text
src/
├── components/
│   ├── three/                    # 3D 组件
│   │   ├── ThreeCanvas.astro     # Three.js 画布容器
│   │   ├── PortalIntro.astro     # 传送门开场
│   │   ├── ParticlePhoto.astro   # 照片粒子化
│   │   └── Starfield.astro       # 星空背景
│   ├── effects/                  # 视觉效果
│   │   ├── ParallaxLayers.astro  # 视差层
│   │   ├── LiquidDistortion.astro# 液态扭曲
│   │   └── GlassCard.astro       # 毛玻璃卡片
│   └── ... (现有组件)
├── shaders/                      # GLSL 着色器
│   ├── particles.vert
│   ├── particles.frag
│   ├── starfield.frag
│   └── distortion.frag
├── utils/                        # 工具函数
│   ├── three-helpers.ts          # Three.js 辅助
│   ├── segmentation.ts           # 图像分割
│   └── performance.ts            # 性能检测
└── pages/
    └── invitation-immersive.astro # 沉浸式邀请页
```

### 组件详情

#### 1. ThreeCanvas.astro
- **职责**: Three.js 渲染器容器
- **功能**: 
  - 自动处理 resize
  - 性能监控
  - WebGL 上下文管理

#### 2. PortalIntro.astro
- **职责**: 开场传送门效果
- **功能**:
  - 金色圆环展开动画 (婚戒隐喻)
  - 3D 文字展示新人姓名
  - 点击/滚动触发进入

#### 3. ParticlePhoto.astro
- **职责**: 照片粒子化效果
- **功能**:
  - 图片采样 → 粒子位置
  - 支持粒子形态变换
  - 鼠标交互扰动

#### 4. ParallaxLayers.astro
- **职责**: 多层视差滚动
- **功能**:
  - 支持任意层数
  - 深度参数配置
  - GSAP ScrollTrigger 集成

---

## 图像分割方案

### 预处理流程 (推荐)

```text
原始照片 → MediaPipe 分割 → 输出分层资源
    │
    ▼
public/gallery/wedding/DXMJ2611.jpeg
    │
    ├── DXMJ2611_person.png   (透明背景人像)
    ├── DXMJ2611_mask.png     (Alpha 遮罩)
    └── DXMJ2611_bg.jpeg      (背景层)
```

### 构建脚本

```bash
# 新增脚本
pnpm gen:segments
```

**脚本位置**: `scripts/segment-photos.ts`

---

## 性能优化策略

### 设备分级

| 等级 | 条件 | 效果配置 |
|------|------|----------|
| High | GPU Tier ≥ 2, RAM ≥ 8GB | 完整 3D、高粒子数、全部着色器 |
| Medium | GPU Tier ≥ 1, RAM ≥ 4GB | 减少粒子、简化着色器、2.5D 效果 |
| Low | 其他 | 纯 CSS 动画、静态图片 + 微动效 |

### 加载策略

1. 展示 CSS 加载动画
2. 优先加载首屏场景
3. 滚动临近时懒加载后续场景
4. 预加载下一节内容
5. 关键纹理使用 `<link rel="preload">`

---

## 视觉风格指南

### 配色方案

```css
:root {
  /* 主色调: 金属渐变 */
  --gold-rose: linear-gradient(135deg, #B76E79, #D4AF37);
  --midnight-blue: #0D1B2A;
  --soft-lavender: #E6E6FA;
  
  /* 强调色 */
  --neon-coral: #FF6B6B;
  --electric-mint: #00D9C0;
  
  /* 背景 */
  --glass-white: rgba(255, 255, 255, 0.1);
  --glass-dark: rgba(0, 0, 0, 0.3);
}
```

### 字体

```css
/* 优雅与现代结合 */
--font-elegant: 'Cormorant Garamond', serif;  /* 姓名、标题 */
--font-modern: 'Space Grotesk', sans-serif;   /* 正文、UI */
```

---

## 实现计划

### 第一阶段: 基础搭建 (Week 1)

- [ ] 添加 Three.js、GSAP 依赖
- [ ] 创建 `ThreeCanvas.astro` 基础容器
- [ ] 实现设备性能检测
- [ ] 设置着色器编译流程

### 第二阶段: 核心效果 (Week 2)

- [ ] 照片粒子化系统
- [ ] 视差层组件
- [ ] Lenis 平滑滚动集成
- [ ] 基础传送门开场场景

### 第三阶段: 内容整合 (Week 3)

- [ ] 图像分割预处理脚本
- [ ] 故事旅程页面流程
- [ ] RSVP 庆祝动效
- [ ] 移动端降级方案

### 第四阶段: 优化上线 (Week 4)

- [ ] 性能调优
- [ ] 加载体验优化
- [ ] 跨浏览器测试
- [ ] 部署上线

---

## 效果优先级

| 效果 | 视觉冲击 | 开发难度 | 性能影响 | 优先级 |
|------|----------|----------|----------|--------|
| 传送门开场 | ⭐⭐⭐⭐⭐ | 中 | 低 | P0 |
| 照片粒子化 | ⭐⭐⭐⭐⭐ | 高 | 中 | P0 |
| 视差滚动层 | ⭐⭐⭐⭐ | 低 | 低 | P0 |
| 人像分割层 | ⭐⭐⭐⭐⭐ | 中 | 低 | P1 |
| 星座背景 | ⭐⭐⭐⭐ | 中 | 低 | P1 |
| RSVP 粒子庆祝 | ⭐⭐⭐⭐ | 中 | 中 | P1 |
| 陀螺仪视差 | ⭐⭐⭐ | 低 | 低 | P2 |
| 音频反应粒子 | ⭐⭐⭐⭐ | 中 | 中 | P2 |
| 毛玻璃 UI | ⭐⭐⭐ | 低 | 低 | P2 |

---

## 文件清单

### 需要创建的文件

```text
src/components/three/ThreeCanvas.astro
src/components/three/PortalIntro.astro
src/components/three/ParticlePhoto.astro
src/components/three/Starfield.astro
src/components/effects/ParallaxLayers.astro
src/components/effects/LiquidDistortion.astro
src/components/effects/GlassCard.astro
src/shaders/particles.vert
src/shaders/particles.frag
src/shaders/starfield.frag
src/shaders/distortion.frag
src/utils/three-helpers.ts
src/utils/segmentation.ts
src/utils/performance.ts
src/pages/invitation-immersive.astro
scripts/segment-photos.ts
```

### 需要修改的文件

```text
package.json          # 添加新依赖
astro.config.mjs      # 可能需要配置 vite 以支持 GLSL
```

---

## 备注

- 所有 3D 效果应有 CSS 降级方案
- 优先保证移动端体验流畅
- 图片资源使用现有 `public/gallery/wedding/` 目录
- 文案复用现有 `public/descs/*.md` 和 `src/data/slides.ts`
