IDE 提示词 · love-peace

— 项目要点（具体与可执行）
- 入口：/invitation 为主入口，同页承载图片故事、滑屏与 RSVP 表单
- 技术：Astro 5 + TypeScript 严格模式，包管理用 pnpm
- 依赖：仅使用现有依赖（astro、@astrojs/sitemap、lenis），Swiper 通过 CDN
- 页面与组件：统一使用 .astro，样式优先内联或组件内 style，移动端优先，支持明暗色
- 路由即文件：页面位于 src/pages，API 位于 src/pages/api
- 数据来源：图片在 public/gallery/wedding，文案在 public/descs（md 首行为标题、正文摘要≤120 字）；文件名一一对应
- 可访问性与性能：img alt 必填、图片懒加载/占位、语义化按钮与链接、避免阻塞脚本
⚠️ 严禁新增第三方依赖（含 UI/状态库）；必要轮播仅用 CDN Swiper 与原生能力

— 开发命令（直接可运行）

```bash
# 安装依赖
pnpm install

# 开发启动（默认 http://localhost:4321）
pnpm dev

# 生产构建与本地预览
pnpm build
pnpm preview

# 类型与模板检查（Astro + TS）
pnpm astro check

# 生成婚礼图片描述（缺失才生成）
pnpm run gen:wedding
```

— 目录与关键文件

```text
/
├── public/
│   ├── gallery/wedding/          # 图片源（文件名作为 key）
│   └── descs/                    # md 文案（首行标题，正文摘取 ≤120 字）
├── src/
│   ├── components/
│   │   ├── Carousel.astro        # 图片轮播（CDN Swiper）
│   │   └── SlidePage.astro       # 滑屏/故事组件
│   ├── layouts/
│   │   └── Layout.astro          # 站点布局（明暗色、移动端优先）
│   └── pages/
│       ├── invitation.astro      # 主入口（融合轮播、故事、RSVP 表单）
│       ├── invitation-swiper.astro
│       ├── invitation-story.astro
│       └── api/
│           ├── reservations.ts   # RSVP 提交占位 API
│           ├── invitations/[id].ts
│           ├── albums.ts
│           ├── photos.ts
│           └── metrics.ts
├── scripts/
│   └── generate-wedding-descriptions.ts
├── astro.config.mjs              # 站点配置（site）
└── package.json                  # 脚本与依赖
```

— 约定与代码规范（项目特有）
- 命名约定：
  - 页面与路由：kebab-case（如 invitation-story.astro）
  - 组件：PascalCase（如 Carousel.astro、SlidePage.astro）
  - API 路由：小写复数（reservations、albums、photos）
- 样式约定：样式优先内联或组件内 style；移动端优先；支持 prefers-color-scheme；避免全局覆盖
- 资源约定：img 必填 alt；默认懒加载；必要时添加 LQIP 占位；避免未经处理的超大图
- 依赖约束：不新增库；动画与滚动优先使用原生/CSS 与 lenis
**关键** 所有新增页面与组件使用 .astro，遵循路由即文件模式

— API 契约（占位实现）
- POST /api/reservations
  - 请求体：{ clientName, phone, date, packageId, note }
  - 返回：201，形如 { id, clientName, phone, date, packageId, status: "pending", note }
- GET /api/reservations 返回 { data: [], meta: { count } }
- GET /api/invitations/:id 返回 { id, title, status }
- GET /api/albums 返回列表；GET /api/photos?albumId=&page= 支持分页
- POST/GET /api/metrics 接收 Web Vitals 指标
**关键** 目前为无持久化的占位接口，前端仅做提交与成功/失败反馈

— 可访问性与性能
- 语义化：交互使用 button/link；表单具备 label 与可达性
- 图片优化：lazy、占位、合理尺寸与类型；首屏关键图可使用 fetchpriority
- 交互反馈：提交状态、错误提示与可恢复操作；避免不可达 UI
- SEO：完善标题/描述/OpenGraph；sitemap 校对；更新 astro.config.mjs 的 site（默认 wedding.example.com）

— 当前状态
- 展示样式具备：卡片网格（invitation）、纵向滑屏（invitation-swiper）、滚动故事（invitation-story）
- 图片与配套 md 文案就绪；轮播与滑屏可用
- API 为占位与临时返回；尚无持久化
- 站点配置为占位域名（astro.config.mjs site: wedding.example.com）

— 近期目标（执行优先级与验收标准）
1) 统一主入口：以 invitation.astro 为主，融合滑屏与故事模块（移动端优先）
   - 验收：单页完成轮播与故事区块串联，滚动与滑屏体验流畅
2) 增加 RSVP 表单（姓名/电话/人数/备注），调用 /api/reservations
   - 验收：前端提交成功/失败可见反馈；数据暂存（内存或本地 JSON）可替换实现
3) 增加地图与日程模块；优化 CTA 与反馈流程
   - 验收：地图可点击跳转与导航；日程信息清晰可达
4) 图片灯箱与懒加载优化，必要时增加 LQIP
   - 验收：灯箱可键盘操作；图片加载无累积布局偏移
5) SEO 与分享完善：标题/描述/OpenGraph、sitemap 校对，更新 site
   - 验收：关键页面具备完整 meta；sitemap 输出正确
6) 构建与上线：本地预览验证，静态托管部署流程打通
   - 验收：pnpm build 成功；pnpm preview 无 404 与资源错误

— 验证与检查
- 本地预览：pnpm preview
- 类型与模板检查：pnpm astro check
⚠️ 暂无测试框架，当前阶段不引入额外测试依赖

— 给 IDE 的工作提示词（精要）
- 使用 Astro 5 + TS 严格，不新增库；仅用现有依赖与 CDN Swiper
- 以 src/pages/invitation.astro 为主入口，整合图片轮播、故事滑屏与 RSVP 表单
- 图片与文案来源 public/gallery/wedding 与 public/descs（同名配对；md 首行标题、正文摘要 ≤120）
- 新增内容遵循路由与命名约定（.astro、kebab-case 页面、PascalCase 组件、复数 API）
- 确保可访问性与性能优化：img alt、懒加载/占位、语义化控件、移动端优先与明暗色支持
- 提交走 /api/reservations，占位后端；前端完成完整反馈与错误处理

