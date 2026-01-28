# VideoScrollSection 测试 - 快速启动

## 🚀 一分钟快速测试

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 打开测试页面

在浏览器中访问：
```
http://localhost:4321/test-video-scroll
```

### 3. 打开开发者工具

按 `F12` 打开控制台

### 4. 验证日志

你应该看到：
```
✅ [Test Page] Lenis 实例已暴露到 window.lenis
🔍 [Lenis Detection] Lenis 实例已检测到
✅ [Lenis Sync] Lenis 同步配置完成
✅ ScrollTrigger创建完成
```

### 5. 测试滚动

- 向下滚动 → 视频应该正向播放 ✅
- 向上滚动 → 视频应该逆向播放 ✅
- 滚动应该平滑流畅 ✅

## ✅ 成功标志

如果你看到以下情况，说明一切正常：

1. **控制台日志**：
   - ✅ Lenis 检测成功
   - ✅ 同步配置完成
   - ✅ 无错误信息

2. **视频行为**：
   - ✅ 视频跟随滚动播放
   - ✅ 播放方向正确
   - ✅ 无卡顿或跳帧

3. **调试信息**（显示在视频上方）：
   - ✅ 状态更新正确
   - ✅ 进度显示正确
   - ✅ 时间显示正确

## 🔧 快速排查

### 问题：视频不播放

**检查**：
```javascript
// 在控制台输入
console.log(window.lenis);
```

- 如果返回 `undefined` → Lenis 未正确初始化
- 如果返回对象 → Lenis 正常，检查同步日志

### 问题：控制台有错误

**常见错误**：
1. `Cannot find module 'lenis'` → 运行 `npm install`
2. `window.lenis is undefined` → 检查 Lenis 初始化顺序
3. `ScrollTrigger is not defined` → 检查 GSAP 安装

## 📊 测试页面对比

| 页面 | URL | Lenis | 用途 |
|------|-----|-------|------|
| 测试页面 | `/test-video-scroll` | ✅ 是 | 专门测试组件 |
| 纯净测试 | `/pure-test` | ❌ 否 | 测试原生滚动 |
| 生产页面 | `/` | ✅ 是 | 完整体验 |

## 📖 详细文档

- 完整测试指南：`.kiro/specs/lenis-gsap-sync/TESTING_GUIDE.md`
- Bug 修复总结：`.kiro/specs/lenis-gsap-sync/BUG_FIX_SUMMARY.md`
- 实现总结：`.kiro/specs/lenis-gsap-sync/IMPLEMENTATION_SUMMARY.md`

## 🎯 下一步

测试通过后，你可以：
1. 在其他页面中使用 VideoScrollSection 组件
2. 调整配置参数（scrollDistance、scrubSpeed）
3. 自定义样式和内容
4. 添加更多视频

## 💡 提示

- 使用 `showDebug={true}` 查看实时调试信息
- 调整 `scrollDistance` 改变滚动距离
- 调整 `scrubSpeed` 改变响应速度
- 视频文件应该放在 `public/` 目录下
