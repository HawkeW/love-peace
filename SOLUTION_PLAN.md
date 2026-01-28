# 视频滚动问题解决方案

## 🔍 问题根源

### 1. Lenis冲突
- **问题**: Lenis的平滑滚动会修改滚动行为，导致ScrollTrigger计算不准确
- **解决**: 在视频区域禁用Lenis，或使用ScrollSmoother替代

### 2. HTML结构问题
- **问题**: 当前结构中trigger和pin是同一个元素
- **参考代码**: trigger和pin是分开的
  ```html
  <div id="video_scrub_01">  <!-- trigger -->
    <div class="pinned-container">  <!-- pin -->
      <video />
    </div>
    <div class="overlay-container"></div>  <!-- 额外的滚动空间 -->
  </div>
  ```

### 3. end配置错误
- **问题**: 使用`+=200%`或`+=300vh`不准确
- **正确方式**: 
  ```javascript
  end: function() {
    const vh = window.innerHeight;
    const duration = 5; // 滚动倍数
    return '+=' + (duration * vh) + 'px';
  }
  ```

### 4. 视频初始化时机
- **问题**: ScrollTrigger在视频准备好之前就创建了
- **解决**: 必须等待视频完全加载后再创建ScrollTrigger

## ✅ 完整解决方案

### 方案A: 禁用Lenis（推荐）
```javascript
// 在视频区域禁用Lenis
ScrollTrigger.create({
  trigger: videoSection,
  start: 'top bottom',
  end: 'bottom top',
  onEnter: () => lenis.stop(),
  onLeave: () => lenis.start(),
  onEnterBack: () => lenis.stop(),
  onLeaveBack: () => lenis.start()
});
```

### 方案B: 使用原生滚动
- 移除Lenis
- 使用浏览器原生滚动
- ScrollTrigger工作最稳定

### 方案C: 使用ScrollSmoother
- 替换Lenis为GSAP的ScrollSmoother
- 完美兼容ScrollTrigger
- 需要GSAP会员（或使用试用版）

## 🎯 推荐实现步骤

### 1. 修复HTML结构
```html
<section id="video-scroll-section">
  <div class="pinned-container">
    <video />
    <div class="overlay"></div>
  </div>
  <div class="overlay-container">
    <!-- 提供滚动空间 -->
  </div>
</section>
```

### 2. 正确的ScrollTrigger配置
```javascript
ScrollTrigger.create({
  trigger: '#video-scroll-section',
  pin: '.pinned-container',
  pinSpacing: false,
  scrub: true,  // 不要用数字，用true
  start: 'top top',
  end: () => {
    const vh = window.innerHeight;
    return '+=' + (vh * 4) + 'px'; // 4个视口高度
  },
  onUpdate: (self) => {
    video.currentTime = self.progress * video.duration;
  }
});
```

### 3. 视频初始化流程
```javascript
// 1. 加载视频
video.load();

// 2. 播放并暂停（确保准备就绪）
await video.play();
video.pause();
video.currentTime = 0;

// 3. 等待元数据
await new Promise(resolve => {
  if (video.readyState >= 1) resolve();
  else video.addEventListener('loadedmetadata', resolve);
});

// 4. 创建ScrollTrigger
setupScrollTrigger();
```

### 4. 处理Lenis冲突
```javascript
// 选项1: 禁用Lenis
const lenis = window.lenis; // 获取Lenis实例
if (lenis) {
  ScrollTrigger.create({
    trigger: videoSection,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => {
      if (self.isActive) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  });
}

// 选项2: 同步Lenis和ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
```

## 🚀 最简单的测试方案

创建一个**不使用Lenis**的纯净测试页面：

```html
<!DOCTYPE html>
<html>
<head>
  <script src="gsap.min.js"></script>
  <script src="ScrollTrigger.min.js"></script>
</head>
<body>
  <div style="height: 100vh;">滚动前</div>
  
  <section id="video-section">
    <div class="pin-container" style="height: 100vh;">
      <video id="video" src="video.mp4" muted></video>
    </div>
  </section>
  
  <div style="height: 100vh;">滚动后</div>
  
  <script>
    const video = document.getElementById('video');
    
    video.addEventListener('loadedmetadata', () => {
      ScrollTrigger.create({
        trigger: '#video-section',
        pin: '.pin-container',
        start: 'top top',
        end: '+=' + (window.innerHeight * 3) + 'px',
        scrub: true,
        onUpdate: (self) => {
          video.currentTime = self.progress * video.duration;
        }
      });
    });
    
    video.load();
  </script>
</body>
</html>
```

## 📋 检查清单

- [ ] 视频是否完全加载？
- [ ] ScrollTrigger是否在视频加载后创建？
- [ ] end值是否使用像素而非百分比？
- [ ] 是否禁用了Lenis或正确同步？
- [ ] HTML结构是否正确（trigger和pin分开）？
- [ ] scrub是否设置为true或合理的数字？
- [ ] 是否有足够的滚动空间？

## 🎬 下一步

1. 创建一个**不使用Lenis**的纯净测试版本
2. 验证基本功能是否正常
3. 如果正常，再逐步添加Lenis并处理冲突
4. 最后添加样式和动画效果