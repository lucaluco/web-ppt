# Web PPT 演示系统

基于 Next.js 16 + React 19 + Tailwind CSS 4 开发的在线 PPT 演示系统，支持键盘/鼠标导航、平滑过渡动画和 D3.js 知识图谱可视化。

## 功能特性

- 📊 **多种幻灯片类型**：标题页、目录页、内容页、卡片页、知识图谱
- 🎨 **美观的 UI 设计**：渐变背景、阴影效果、响应式布局
- 🎬 **流畅的动画效果**：淡入淡出过渡动画
- 🕸️ **D3.js 知识图谱**：力导向图展示技术栈，支持拖拽和缩放
- ⌨️ **多种导航方式**：键盘方向键、空格键、鼠标点击
- 📱 **响应式设计**：适配不同屏幕尺寸

## 技术栈

- **框架**: Next.js 16.1.6 (App Router)
- **UI 库**: React 19.2.3
- **样式**: Tailwind CSS 4
- **数据可视化**: D3.js 7.9.0
- **语言**: TypeScript 5
- **包管理**: pnpm

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 运行开发服务器

```bash
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 幻灯片导航

- **键盘**: ← → 方向键切换幻灯片
- **空格键**: 下一张幻灯片
- **鼠标**: 点击屏幕左/右侧区域切换
- **按钮**: 点击左右箭头按钮
- **指示器**: 点击底部圆点跳转到指定页面

## D3.js 知识图谱

知识图谱支持以下交互：
- 🖱️ **拖拽节点**: 调整节点位置
- 🔍 **滚轮缩放**: 放大/缩小视图
- 💬 **悬停提示**: 查看节点详情

## 项目结构

```
web-ppt/
├── app/
│   ├── globals.css      # 全局样式和 Tailwind 配置
│   ├── layout.tsx       # 根布局
│   └── page.tsx         # 主页面组件
├── components/
│   └── D3Graph.tsx      # D3.js 知识图谱组件
├── public/              # 静态资源
├── package.json
└── tsconfig.json
```

## 自定义内容

编辑 `app/page.tsx` 中的 `slides` 数组来自定义幻灯片内容：

```typescript
const slides: Slide[] = [
  {
    id: "1",
    type: "title",
    title: "你的标题",
    subtitle: "副标题",
    backgroundColor: "from-blue-600 to-purple-700",
  },
  // ... 更多幻灯片
];
```

## 部署

### Vercel 部署 (推荐)

最简单的部署方式是使用 [Vercel Platform](https://vercel.com/new)：

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 自动部署完成

### 其他平台

也可以部署到 Netlify、Railway、Cloudflare Pages 等支持 Next.js 的平台。

## 开发建议

- 使用 TypeScript 类型检查
- 遵循 ESLint 代码规范
- 组件化开发，便于维护
- 使用 Tailwind CSS 原子类快速构建 UI

## License

MIT
