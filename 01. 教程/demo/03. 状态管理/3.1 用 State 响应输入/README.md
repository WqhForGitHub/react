# 用 State 响应输入

React 控制 UI 的方式是声明式的。你不必直接控制 UI，只需声明组件可以处于的不同状态，并根据用户的输入在它们之间切换。

## 项目结构

```
01. 用 State 响应输入/
├── src/
│   ├── components/
│   │   ├── ImperativeForm.tsx    # 命令式 UI（直接操作 DOM）
│   │   ├── DeclarativeForm.tsx   # 声明式 UI（React state 驱动）
│   │   └── FormStates.tsx        # 视图状态一览（Living Styleguide）
│   ├── App.tsx                   # 主应用，Tab 导航切换三个 Demo
│   ├── App.css                   # 全部样式
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 三个 Demo 说明

| Tab | 内容 | 核心概念 |
|-----|------|---------|
| **命令式 UI** | 用 `useRef` + 原生 DOM 操作（`hide`/`show`/`enable`/`disable`）控制表单 | 逐步命令式：告诉计算机**如何**更新 UI |
| **声明式 UI** | 用 `useState` 管理 `answer`、`error`、`status` 三个状态变量 | 声明式：只需声明**想要显示什么**，React 自动更新 |
| **视图状态一览** | 同时展示 empty/typing/submitting/success/error 五种视图状态 | Living Styleguide，方便快速迭代和调试 |

## 运行方式

```bash
npm run dev
```

- 命令式表单答案：`istanbul`
- 声明式表单答案：`lima`

## 声明式 UI 开发步骤

页面底部附有以下 5 个步骤摘要，对应文档中的核心方法论：

1. **定位**你的组件中不同的视图状态
2. **确定**是什么触发了这些 state 的改变
3. **表示**内存中的 state（使用 `useState`）
4. **删除**任何不必要的 state 变量
5. **连接**事件处理函数去设置 state
