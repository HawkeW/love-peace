# VideoScrollSection 组件使用说明

## 📦 组件概述

`VideoScrollSection` 是一个基于GSAP ScrollTrigger的视频滚动组件，可以根据用户滚动进度控制视频播放。

## ✨ 特性

- ✅ 滚动控制视频播放（正向/逆向）
- ✅ 使用npm导入GSAP（不依赖CDN）
- ✅ 完全响应式设计
- ✅ 可自定义滚动距离和速度
- ✅ 可选的调试信息显示
- ✅ 优雅的文字覆盖层动画
- ✅ TypeScript类型安全

## 🚀 基本使用

```astro
---
import VideoScrollSection from "../components/VideoScrollSection.astro";
---

<VideoScrollSection 
  videoSrc="/your-video.mp4"
  title="视频标题"
  subtitle="视频描述"
/>
```

## 📋 Props参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `videoSrc` | `string` | 必需 | 视频文件路径 |
| `videoPoster` | `string` | 可选 | 视频封面图片 |
| `title` | `string` | 可选 | 覆盖层标题 |
| `subtitle` | `string` | 可选 | 覆盖层副标题 |
| `scrollDistance` | `number` | `3` | 滚动距离（视口高度倍数） |
| `scrubSpeed` | `number` | `0.5` | 滚动响应速度（0-1，越小越快） |
| `showDebug` | `boolean` | `false` | 是否显示调试信息 |

## 🎯 使用示例

### 基础示例
```astro
<VideoScrollSection 
  videoSrc="/video.mp4"
  title="我们的故事"
  subtitle="美好的回忆"
/>
```

### 自定义滚动参数
```astro
<VideoScrollSection 
  videoSrc="/video.mp4"
  title="快速播放"
  subtitle="更短的滚动距离"
  scrollDistance={2}
  scrubSpeed={0.3}
/>
```

### 开启调试模式
```astro
<VideoScrollSection 
  videoSrc="/video.mp4"
  title="调试模式"
  subtitle="查看实时状态"
  showDebug={true}
/>
```

## ⚙️ 参数调优指南

### scrollDistance（滚动距离）
- **推荐值**: 2-4
- **说明**: 控制需要滚动多少个视口高度才能播放完整视频
- **效果**:
  - 值越小 = 滚动距离越短 = 视频播放越快
  - 值越大 = 滚动距离越长 = 视频播放越慢

### scrubSpeed（响应速度）
- **推荐值**: 0.3-1
- **说明**: 控制视频时间更新的平滑度
- **效果**:
  - 值越小 = 响应越快 = 更直接的控制
  - 值越大 = 响应越慢 = 更平滑的过渡
  - `true` = 自动计算（最平滑）

## 🎨 样式自定义

组件使用CSS变量，可以在父级覆盖：

```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #141414;
  --text-primary: #fafafa;
  --gold-light: #e8d5a3;
}
```

## 🔧 技术细节

### GSAP导入方式
组件使用npm包导入GSAP，不依赖CDN：
```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
```

### ScrollTrigger配置
```javascript
ScrollTrigger.create({
  trigger: videoSection,
  pin: '.video-pinned-container',
  pinSpacing: false,
  scrub: scrubSpeed,
  start: 'top top',
  end: '+=' + (vh * scrollDistance) + 'px',
  anticipatePin: 1,
  invalidateOnRefresh: true
});
```

### 视频初始化流程
1. 加载视频元数据
2. 测试播放能力
3. 创建ScrollTrigger
4. 绑定滚动事件

## 📱 响应式支持

- 自动适配移动端
- 最小高度保护（600px/500px）
- 触摸设备优化
- 减少动画偏好支持

## 🐛 故障排除

### 视频不播放
1. 检查视频文件路径是否正确
2. 确认视频格式兼容（推荐MP4 H.264）
3. 查看浏览器控制台错误信息

### 滚动不流畅
1. 调整`scrubSpeed`参数
2. 检查是否与其他滚动库冲突（如Lenis）
3. 确认视频文件大小合理

### 视频显示黑屏
1. 检查视频编码格式
2. 确认`preload="auto"`设置
3. 尝试添加`videoPoster`封面图

## 🔄 与Lenis的兼容性

如果页面使用了Lenis平滑滚动，建议：

### 方案1: 禁用视频区域的Lenis
```javascript
ScrollTrigger.create({
  trigger: '#video-scroll-section',
  start: 'top bottom',
  end: 'bottom top',
  onToggle: (self) => {
    if (self.isActive && window.lenis) {
      window.lenis.stop();
    } else if (window.lenis) {
      window.lenis.start();
    }
  }
});
```

### 方案2: 同步Lenis和ScrollTrigger
```javascript
lenis.on('scroll', ScrollTrigger.update);
```

## 📊 性能优化

- 使用`preload="auto"`预加载视频
- 视频文件建议控制在10MB以内
- 考虑为移动端提供更小的视频
- 使用IntersectionObserver优化加载

## 🎉 完整示例

```astro
---
import VideoScrollSection from "../components/VideoScrollSection.astro";
---

<!DOCTYPE html>
<html>
<head>
  <style>
    :root {
      --bg-primary: #0a0a0a;
      --bg-secondary: #141414;
      --text-primary: #fafafa;
      --gold-light: #e8d5a3;
    }
  </style>
</head>
<body>
  <div style="height: 100vh;">滚动前区域</div>
  
  <VideoScrollSection 
    videoSrc="/my-video.mp4"
    videoPoster="/poster.jpg"
    title="我们的故事"
    subtitle="美好的回忆永存"
    scrollDistance={3}
    scrubSpeed={0.5}
    showDebug={false}
  />
  
  <div style="height: 100vh;">滚动后区域</div>
</body>
</html>
```

## 📝 更新日志

### v1.0.0 (2026-01-28)
- ✅ 初始版本发布
- ✅ 使用npm导入GSAP
- ✅ 支持自定义滚动参数
- ✅ 添加调试模式
- ✅ 完整的TypeScript支持