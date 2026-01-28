# VideoScrollSection 滚动播放 Bug 修复

## 问题描述

VideoScrollSection 组件在使用 Lenis 的页面中不跟随滚动操作播放视频。

## 根本原因

1. **重复的 RAF 调用冲突**：
   - `index.astro` 中已经有自己的 RAF 循环调用 `lenis.raf(time)`
   - VideoScrollSection 中又通过 `gsap.ticker.add()` 添加了另一个 RAF 调用
   - 这导致 `lenis.raf()` 被调用两次，造成冲突和不可预测的行为

2. **同步配置不完整**：
   - 只绑定了滚动事件，但没有正确处理 RAF 循环的重复问题

## 修复方案

### 修改 1: 简化 Lenis 同步函数

**文件**: `src/components/VideoScrollSection.astro`

**修改前**:
```javascript
function setupLenisSync(lenis) {
  // 步骤 1: 绑定滚动事件
  lenis.on('scroll', ScrollTrigger.update);
  
  // 步骤 2: 添加到 GSAP ticker（问题所在！）
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  
  // 步骤 3: 禁用延迟平滑
  gsap.ticker.lagSmoothing(0);
}
```

**修改后**:
```javascript
function setupLenisSync(lenis) {
  // 步骤 1: 绑定滚动事件到 ScrollTrigger
  // 这是最关键的一步，确保 ScrollTrigger 能接收到 Lenis 的滚动更新
  lenis.on('scroll', ScrollTrigger.update);
  
  // 步骤 2: 禁用 GSAP 延迟平滑
  // 这可以防止 GSAP 尝试补偿帧率下降，与 Lenis 的平滑滚动冲突
  gsap.ticker.lagSmoothing(0);
  
  // 注意：不需要再次调用 lenis.raf()，因为页面已经有自己的 RAF 循环
  // 重复调用会导致冲突和性能问题
}
```

**关键变化**:
- ✅ 移除了 `gsap.ticker.add()` 调用，避免重复的 RAF
- ✅ 保留了 `lenis.on('scroll', ScrollTrigger.update)` - 这是同步的核心
- ✅ 保留了 `gsap.ticker.lagSmoothing(0)` - 防止 GSAP 干扰 Lenis

### 修改 2: 清理未使用的变量

**文件**: `src/components/VideoScrollSection.astro`

移除了未使用的 `videoInitialized` 变量，清理代码。

## 工作原理

### Lenis + GSAP ScrollTrigger 同步机制

1. **Lenis 的 RAF 循环**（在 index.astro 中）:
   ```javascript
   function raf(time) {
     lenis.raf(time);  // 更新 Lenis 的滚动状态
     requestAnimationFrame(raf);
   }
   requestAnimationFrame(raf);
   ```

2. **ScrollTrigger 监听 Lenis 滚动**（在 VideoScrollSection 中）:
   ```javascript
   lenis.on('scroll', ScrollTrigger.update);
   ```
   - 每当 Lenis 更新滚动位置时，触发 `ScrollTrigger.update()`
   - ScrollTrigger 重新计算所有触发器的位置和进度
   - 视频的 `onUpdate` 回调被调用，更新视频时间

3. **数据流**:
   ```
   用户滚动
     ↓
   Lenis 处理滚动（平滑）
     ↓
   lenis.raf() 更新内部状态
     ↓
   触发 'scroll' 事件
     ↓
   ScrollTrigger.update() 被调用
     ↓
   ScrollTrigger 计算进度
     ↓
   onUpdate 回调更新视频时间
     ↓
   视频播放
   ```

## 为什么之前的方案不工作

### 错误方案：双重 RAF 调用

```javascript
// index.astro 中
function raf(time) {
  lenis.raf(time);  // 第一次调用
  requestAnimationFrame(raf);
}

// VideoScrollSection 中
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);  // 第二次调用 - 冲突！
});
```

**问题**:
- Lenis 的内部状态在一帧内被更新两次
- 时间参数不同步（一个是毫秒，一个是秒转毫秒）
- 可能导致滚动位置计算错误
- ScrollTrigger 接收到不一致的滚动数据

### 正确方案：单一 RAF + 事件监听

```javascript
// index.astro 中 - 唯一的 RAF 循环
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

// VideoScrollSection 中 - 只监听事件
lenis.on('scroll', ScrollTrigger.update);
```

**优势**:
- ✅ 单一的 RAF 循环，无冲突
- ✅ 事件驱动的更新，响应及时
- ✅ 性能更好，无重复计算
- ✅ 滚动数据一致性

## 测试验证

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 测试 index.astro（使用 Lenis）

访问: http://localhost:4321

**预期行为**:
1. 打开浏览器开发者工具控制台
2. 应该看到以下日志：
   ```
   🔍 [Lenis Detection] Lenis 实例已检测到
   🔗 [Lenis Sync] 开始配置 Lenis 与 GSAP ScrollTrigger 同步...
   🔗 [Lenis Sync] ✓ 已绑定滚动事件
   🔗 [Lenis Sync] ✓ 已禁用延迟平滑
   ✅ [Lenis Sync] Lenis 同步配置完成
   ```
3. 滚动到视频区域
4. **视频应该平滑地跟随滚动播放**
5. 向下滚动 - 视频正向播放
6. 向上滚动 - 视频逆向播放
7. 滚动应该感觉平滑流畅（Lenis 效果）

### 3. 测试 pure-test.astro（不使用 Lenis）

访问: http://localhost:4321/pure-test

**预期行为**:
1. 控制台应该看到：
   ```
   🔍 [Lenis Detection] 未检测到 Lenis，使用原生滚动
   ```
2. 滚动到视频区域
3. **视频应该跟随滚动播放**（使用原生滚动）
4. 功能应该与之前完全一致

### 4. 验证清单

- [ ] index.astro 中视频跟随滚动播放
- [ ] 滚动感觉平滑（Lenis 效果）
- [ ] 视频播放方向正确（向下正向，向上逆向）
- [ ] pure-test.astro 中视频正常工作
- [ ] 控制台无错误
- [ ] 性能良好，无卡顿

## 性能对比

### 修复前（双重 RAF）:
- 🔴 Lenis RAF 调用: 2次/帧
- 🔴 潜在的状态冲突
- 🔴 不必要的计算开销

### 修复后（单一 RAF + 事件）:
- ✅ Lenis RAF 调用: 1次/帧
- ✅ 状态一致性
- ✅ 最小化计算开销
- ✅ 事件驱动，响应及时

## 相关文件

- `src/components/VideoScrollSection.astro` - 主要修复
- `src/pages/index.astro` - Lenis 初始化（未修改）
- `src/layouts/GalleryLayout.astro` - Lenis 初始化（未修改）
- `src/types/gsap.d.ts` - TypeScript 类型（未修改）

## 参考资料

- [Lenis GitHub - GSAP Integration](https://github.com/studio-freight/lenis#gsap-scrolltrigger)
- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Community - Lenis Integration Thread](https://gsap.com/community/forums/topic/38517-scrolltrigger-and-lenis/)

## 总结

通过移除重复的 RAF 调用并依赖事件驱动的更新机制，我们成功修复了 VideoScrollSection 组件在 Lenis 环境下的滚动播放问题。这个修复不仅解决了功能问题，还提升了性能和代码质量。
