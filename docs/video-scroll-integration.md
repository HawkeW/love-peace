# 视频滚动集成说明

## 功能概述

已成功集成了一个8秒视频作为屏幕内容，放置在【我们结婚啦~】区域后。使用GSAP和ScrollTrigger实现：

- **向下滚动**：正向播放视频
- **向上滚动**：逆向播放视频  
- **超出区域**：停止处理，视频保持在相应位置

## 技术实现

### 核心组件
- `src/components/VideoScrollSection.astro` - 视频滚动组件
- 集成在 `src/pages/index.astro` 主页面中

### 依赖库
- **GSAP 3.12.2** - 动画库
- **ScrollTrigger** - 滚动触发器插件
- **Lenis** - 平滑滚动库

### 关键特性

1. **视频控制**
   - 根据滚动进度精确控制视频播放位置
   - 支持正向和逆向播放
   - 自动暂停，避免自动播放

2. **性能优化**
   - IntersectionObserver 监听视口可见性
   - 延迟加载视频元数据
   - 响应式设计适配移动端

3. **用户体验**
   - 平滑的滚动效果 (scrub: 1.2)
   - 文字内容淡入淡出动画
   - 毛玻璃背景效果

## 使用方法

### 基本用法
```astro
<VideoScrollSection 
  videoSrc="/your-video.mp4"
  title="视频标题"
  subtitle="视频描述"
/>
```

### 参数说明
- `videoSrc` (必需): 视频文件路径
- `videoPoster` (可选): 视频封面图片
- `title` (可选): 覆盖层标题
- `subtitle` (可选): 覆盖层副标题

## 配置调整

### 滚动距离
在 `VideoScrollSection.astro` 中修改：
```javascript
end: '+=300%', // 滚动3个屏幕高度
```

### 滚动平滑度
```javascript
scrub: 1.2, // 数值越大越平滑
```

### 视频尺寸
```css
.video-pinned-container {
  height: 100vh;
  min-height: 600px; /* 最小高度 */
}
```

## 浏览器兼容性

- ✅ Chrome/Edge (推荐)
- ✅ Firefox  
- ✅ Safari
- ✅ 移动端浏览器

## 注意事项

1. **视频格式**: 建议使用 MP4 格式，H.264 编码
2. **文件大小**: 8秒视频建议控制在 10MB 以内
3. **网络优化**: 设置了 `preload="metadata"` 仅预加载元数据
4. **移动端**: 自动适配移动端，支持触摸滚动

## 故障排除

### 视频不播放
1. 检查视频文件路径是否正确
2. 确认视频格式兼容性
3. 查看浏览器控制台错误信息

### 滚动不流畅
1. 检查 GSAP 和 ScrollTrigger 是否正确加载
2. 确认 Lenis 平滑滚动正常工作
3. 调整 scrub 参数值

### 移动端问题
1. 确认视频设置了 `playsinline` 属性
2. 检查移动端网络连接
3. 考虑为移动端提供更小的视频文件