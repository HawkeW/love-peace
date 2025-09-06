# WebGL 矩形背景扭动效果

一个使用 WebGL 实现的动态矩形背景扭动效果，具有舞蹈般的动感和节奏感。

## 🎯 效果特点

- **动态扭动**: 矩形左右两边以不同频率和幅度进行波动
- **彩虹渐变**: 基于位置和时间的动态色彩变化
- **实时控制**: 可调节频率、幅度、速度和相位差参数
- **边缘发光**: 矩形边缘具有发光效果增强视觉冲击
- **流畅动画**: 60FPS 流畅动画循环

## 🚀 快速开始

1. 直接在浏览器中打开 `index.html` 文件
2. 使用左上角控制面板调节各种参数
3. 观察矩形背景的动态扭动效果

## 🎛️ 控制参数

| 参数 | 范围 | 默认值 | 说明 |
|------|------|--------|------|
| **频率 (Frequency)** | 1.0 - 10.0 | 3.0 | 控制波动的密集程度 |
| **幅度 (Amplitude)** | 0.01 - 0.3 | 0.1 | 控制扭动的强度 |
| **速度 (Speed)** | 0.5 - 5.0 | 2.0 | 控制动画播放速度 |
| **相位差 (Phase)** | 0 - 6.28 | 1.5 | 控制左右两边的不同步程度 |

## 🔧 技术实现

### 核心原理

1. **顶点着色器变形**
   ```glsl
   // 左右两边使用不同的波动函数
   float leftWave = sin(position.y * u_frequency + u_time * u_speed) * u_amplitude;
   float rightWave = sin(position.y * (u_frequency * 0.8) + u_time * u_speed + u_phase) * u_amplitude * 0.7;
   
   // 根据X坐标混合两种波动
   float wave = mix(leftWave, rightWave, (position.x + 1.0) * 0.5);
   ```

2. **多层波叠加**
   - 主波动：控制左右扭动
   - 垂直波动：增加细微的上下波动
   - 相位差：创造不对称的舞蹈效果

3. **动态色彩系统**
   ```glsl
   // HSV 色彩空间动态变化
   float hue = uv.x + sin(u_time * 0.5) * 0.3;
   float sat = 0.8 + sin(uv.y * 3.14159 + u_time) * 0.2;
   float val = 0.6 + sin(uv.x * 6.28318 + u_time * 1.5) * 0.4;
   ```

### 技术栈

- **WebGL 1.0**: 硬件加速图形渲染
- **GLSL ES**: 着色器语言
- **JavaScript**: 逻辑控制和用户交互
- **HTML5 Canvas**: 渲染目标

## 📁 文件结构

```
docs/wave/
├── index.html          # 主页面文件
└── README.md          # 说明文档
```

## 🎨 自定义扩展

### 添加新的波动模式

在顶点着色器中修改波动函数：

```glsl
// 示例：添加螺旋波动
float spiralWave = sin(position.y * u_frequency + position.x * 2.0 + u_time * u_speed) * u_amplitude;
```

### 修改色彩方案

在片段着色器中调整颜色计算：

```glsl
// 示例：单色调变化
vec3 rgb = vec3(0.5 + sin(u_time) * 0.5, 0.3, 0.8);
```

### 添加音频响应

可以集成 Web Audio API 来实现音频驱动的视觉效果：

```javascript
// 获取音频频谱数据
const audioData = analyser.getFrequencyData();
this.params.amplitude = audioData[0] / 255 * 0.3;
```

## 🌟 应用场景

- **网站背景**: 为网站添加动态背景效果
- **音乐可视化**: 结合音频数据创建音乐可视化
- **艺术展示**: 数字艺术和创意展示
- **游戏界面**: 游戏菜单或加载界面
- **演示文稿**: 增强演示的视觉效果

## 🔍 性能优化

- 使用 `requestAnimationFrame` 确保流畅动画
- 顶点数据预计算减少 GPU 负担
- 着色器代码优化避免复杂计算
- 响应式设计适配不同屏幕尺寸

## 📱 兼容性

- **现代浏览器**: Chrome 9+, Firefox 4+, Safari 5.1+, Edge 12+
- **移动设备**: iOS Safari 8+, Android Chrome 25+
- **WebGL 支持**: 需要硬件加速支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License - 可自由使用和修改。