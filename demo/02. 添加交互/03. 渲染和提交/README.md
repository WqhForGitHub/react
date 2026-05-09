# 渲染和提交

组件显示到屏幕之前，其必须被 React 渲染。理解这些处理步骤将帮助你思考代码的执行过程并能解释其行为。

请求和提供 UI 的过程总共包括三个步骤：

1. **触发** 一次渲染
2. **渲染** 组件
3. **提交** 到 DOM

## 项目结构

```
03. 渲染和提交/
  .gitignore
  eslint.config.js
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  public/
    favicon.svg
  src/
    main.tsx
    App.tsx
    App.css
    index.css
    vite-env.d.ts
    demos/
      TriggerRenderDemo.tsx
      RenderProcessDemo.tsx
      CommitToDomDemo.tsx
      PureRenderDemo.tsx
```

## Demos

### 1. 触发渲染

**文件**：`src/demos/TriggerRenderDemo.tsx`

有两种原因会导致组件的渲染：

- **初次渲染** — 应用启动时，通过 `createRoot` 和 `render` 触发
- **状态更新** — 组件（或其祖先之一）的 `set` 函数被调用时触发

交互演示：点击按钮调用 `setCount` 触发状态更新，渲染日志可视化记录每次触发原因。

### 2. 渲染组件

**文件**：`src/demos/RenderProcessDemo.tsx`

在触发渲染后，React 会调用你的组件来确定要在屏幕上显示的内容。这个过程是**递归**的：如果组件返回了另一个组件，React 就会继续渲染那个组件，以此类推。

交互演示：`Gallery` 组件包含多个 `Image` 子组件，触发重渲染后可在日志中看到 React 递归调用 `Gallery()` → `Image(1)` → `Image(2)` → `Image(3)` 的完整过程。

### 3. 提交到 DOM

**文件**：`src/demos/CommitToDomDemo.tsx`

在渲染组件之后，React 将会修改 DOM：

- **初次渲染**：React 使用 `appendChild()` 将所有 DOM 节点放到屏幕上
- **重渲染**：React 仅应用**最少的必要操作**，使 DOM 与最新渲染输出匹配

交互演示：`Clock` 组件包含 `<h1>`（显示时间）和 `<input>`（用户输入）。点击"更新时间"触发重渲染后，`<h1>` 文本更新但 `<input>` 中的用户输入不会丢失 — 证明 React 仅更新存在差异的 DOM 节点。

### 4. 纯函数渲染

**文件**：`src/demos/PureRenderDemo.tsx`

渲染必须始终是一次纯计算：

- **输入相同，输出相同** — 给定相同的输入，组件应始终返回相同的 JSX
- **只做它自己的事情** — 不应更改任何存在于渲染之前的对象或变量

交互演示：对比纯函数组件与不纯函数组件。切换"显示不纯组件"后，可观察到不纯组件在渲染期间修改外部变量 `impureCounter`，导致不可预测的行为。在严格模式下，React 会调用每个组件的函数两次，帮助发现此类错误。

## 运行

```bash
npm install
npm run dev
```
