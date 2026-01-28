# Requirements Document

## Introduction

本规范旨在修复 VideoScrollSection.astro 组件与 Lenis 平滑滚动库的集成问题。当前组件在不使用 Lenis 的页面（pure-test.astro）中工作正常，但在使用 Lenis 的页面（index.astro）中无法正常工作。根据 Lenis 官方文档和 GSAP ScrollTrigger 最佳实践，需要正确同步两者的 ticker 系统以确保滚动事件的准确传递。

## Glossary

- **VideoScrollSection**: 基于 GSAP ScrollTrigger 的视频滚动组件，根据用户滚动进度控制视频播放
- **Lenis**: 第三方平滑滚动库，提供流畅的滚动体验
- **GSAP**: GreenSock Animation Platform，专业的动画库
- **ScrollTrigger**: GSAP 的滚动触发插件，用于创建滚动驱动的动画
- **Ticker**: 动画帧更新系统，用于同步动画和滚动事件
- **RAF**: RequestAnimationFrame，浏览器的动画帧回调机制
- **Scrub**: ScrollTrigger 的平滑跟随模式，使动画与滚动进度同步

## Requirements

### Requirement 1: Lenis 检测与同步

**User Story:** 作为开发者，我希望组件能够自动检测页面是否使用 Lenis，以便在需要时正确同步 Lenis 和 GSAP ScrollTrigger。

#### Acceptance Criteria

1. WHEN VideoScrollSection 组件初始化时，THE Component SHALL 检测全局 window.lenis 实例是否存在
2. WHEN Lenis 实例存在时，THE Component SHALL 将 Lenis 的滚动事件与 ScrollTrigger 同步
3. WHEN Lenis 实例存在时，THE Component SHALL 将 Lenis 的 raf 方法添加到 GSAP 的 ticker 中
4. WHEN Lenis 实例存在时，THE Component SHALL 禁用 GSAP 的延迟平滑（lagSmoothing）
5. WHEN Lenis 实例不存在时，THE Component SHALL 使用原生滚动行为正常工作

### Requirement 2: 向后兼容性

**User Story:** 作为开发者，我希望修复后的组件能够在不使用 Lenis 的页面中继续正常工作，以保持现有功能不受影响。

#### Acceptance Criteria

1. WHEN VideoScrollSection 在不使用 Lenis 的页面中使用时，THE Component SHALL 正常初始化并工作
2. WHEN 页面不包含 Lenis 时，THE Component SHALL 使用原生浏览器滚动
3. WHEN 组件在 pure-test.astro 页面中使用时，THE Component SHALL 保持当前的工作状态
4. WHEN Lenis 检测失败或未定义时，THE Component SHALL 不抛出错误并继续执行

### Requirement 3: ScrollTrigger 配置保持

**User Story:** 作为用户，我希望视频滚动的核心功能（固定、scrub、进度控制）在修复后保持不变，以确保用户体验一致。

#### Acceptance Criteria

1. WHEN 用户滚动到视频区域时，THE Component SHALL 固定视频容器在视口中
2. WHEN 用户滚动时，THE Component SHALL 根据滚动进度更新视频播放时间
3. WHEN 用户向下滚动时，THE Component SHALL 正向播放视频
4. WHEN 用户向上滚动时，THE Component SHALL 逆向播放视频
5. WHEN 用户离开视频区域时，THE Component SHALL 取消固定并恢复正常滚动

### Requirement 4: 配置参数支持

**User Story:** 作为开发者，我希望组件继续支持现有的配置参数（scrollDistance、scrubSpeed、showDebug），以保持 API 的一致性。

#### Acceptance Criteria

1. THE Component SHALL 接受 scrollDistance 参数来控制滚动距离
2. THE Component SHALL 接受 scrubSpeed 参数来控制响应速度
3. THE Component SHALL 接受 showDebug 参数来控制调试信息显示
4. WHEN 参数未提供时，THE Component SHALL 使用默认值（scrollDistance=3, scrubSpeed=0.5, showDebug=false）
5. WHEN showDebug 为 true 时，THE Component SHALL 显示实时的滚动进度和视频时间信息

### Requirement 5: 错误处理与日志

**User Story:** 作为开发者，我希望组件在初始化和运行过程中提供清晰的日志信息，以便调试和排查问题。

#### Acceptance Criteria

1. WHEN 组件初始化时，THE Component SHALL 记录 Lenis 检测结果
2. WHEN Lenis 同步配置时，THE Component SHALL 记录同步状态
3. WHEN 视频加载失败时，THE Component SHALL 记录错误信息并优雅降级
4. WHEN ScrollTrigger 创建失败时，THE Component SHALL 记录错误信息
5. IF 初始化过程中发生错误，THEN THE Component SHALL 不阻止页面其他部分的正常运行

### Requirement 6: 性能优化

**User Story:** 作为用户，我希望视频滚动功能流畅且不影响页面性能，以获得良好的浏览体验。

#### Acceptance Criteria

1. WHEN Lenis 和 GSAP ticker 同步时，THE Component SHALL 避免重复的 RAF 调用
2. WHEN 视频播放时，THE Component SHALL 使用 currentTime 直接设置而非 play/pause
3. WHEN 窗口大小改变时，THE Component SHALL 刷新 ScrollTrigger 以重新计算位置
4. THE Component SHALL 在组件卸载时清理事件监听器和 ScrollTrigger 实例
5. WHEN 用户设备性能较低时，THE Component SHALL 保持基本功能可用

### Requirement 7: 测试验证

**User Story:** 作为开发者，我希望能够在不同场景下验证组件功能，以确保修复的有效性。

#### Acceptance Criteria

1. WHEN 组件在 index.astro（使用 Lenis）中使用时，THE Component SHALL 正常工作
2. WHEN 组件在 pure-test.astro（不使用 Lenis）中使用时，THE Component SHALL 正常工作
3. WHEN 用户快速滚动时，THE Component SHALL 准确跟踪滚动进度
4. WHEN 用户缓慢滚动时，THE Component SHALL 平滑更新视频时间
5. WHEN 页面包含多个滚动区域时，THE Component SHALL 不干扰其他区域的滚动行为
