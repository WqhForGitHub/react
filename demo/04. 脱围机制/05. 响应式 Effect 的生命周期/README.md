# 响应式 Effect 的生命周期

Effect 与组件有不同的生命周期。组件可以挂载、更新或卸载。Effect 只能做两件事：开始同步某些东西，然后停止同步它。

## 项目结构

```
src/
├── chat.ts                     # 聊天连接工具函数
├── Demo1RoomId.tsx             # Demo 1: Effect 依赖于 roomId
├── Demo2ReSync.tsx             # Demo 2: React 如何重新同步 Effect
├── Demo3ReactiveValues.tsx     # Demo 3: Effect 响应于响应式值
├── Demo4EmptyDeps.tsx          # Demo 4: 空依赖数组
├── Demo5IndependentEffects.tsx # Demo 5: 每个 Effect 表示独立的同步过程
├── App.tsx                     # 主应用，Tab 导航切换 Demo
├── App.css                     # 样式
├── index.css                   # 全局样式
└── main.tsx                    # 入口（含 StrictMode）
```

## 5 个 Demo 对应文档核心概念

| Demo | 概念 | 说明 |
|------|------|------|
| Demo 1 | Effect 依赖于 roomId | 当 `roomId` 变化时，Effect 重新同步 |
| Demo 2 | React 重新同步 Effect | 下拉切换聊天室 + 挂载/卸载，开发环境下 StrictMode 额外执行一次验证 |
| Demo 3 | 响应式值 | `serverUrl`（state）和 `roomId`（prop）都是响应式值，必须作为依赖项 |
| Demo 4 | 空依赖数组 | 当值不依赖渲染时，依赖数组为 `[]`，Effect 仅在挂载/卸载时执行 |
| Demo 5 | 独立同步过程 | 访问记录和聊天连接是两个独立过程，拆分为两个 Effect |

## 启动

```bash
npm install
npm run dev
```

打开浏览器控制台（F12）查看 Effect 的连接/断开日志。
