# 使用 Reducer 和 Context 拓展你的应用

Reducer 可以整合组件的状态更新逻辑，Context 可以将信息深入传递给其他组件。组合使用它们来共同管理一个复杂页面的状态。

## 项目结构

```
src/
├── main.tsx          # 入口文件
├── App.tsx           # 顶层组件，使用 TasksProvider 包裹
├── TasksContext.tsx   # 核心：Context + Reducer + Provider + 自定义 Hook
├── AddTask.tsx       # 添加任务组件
├── TaskList.tsx      # 任务列表 + 单个任务组件
├── App.css           # 组件样式
└── index.css         # 全局样式
```

## 核心架构

`TasksContext.tsx` 是整个状态管理的核心文件，包含：

- **TypeScript 类型定义** — `Task` 接口和 `TaskAction` 联合类型，确保类型安全
- **两个 Context** — `TasksContext` 提供 tasks 数据，`TasksDispatchContext` 提供 dispatch 函数
- **Reducer** — `tasksReducer` 处理 `added` / `changed` / `deleted` 三种 action
- **TasksProvider** — 将 `useReducer` 与两个 Context 连接起来，通过 `{children}` 包裹组件树
- **自定义 Hook** — `useTasks()` 和 `useTasksDispatch()`，内部做了 null 检查，若在 Provider 外使用会抛出明确错误

`App.tsx` 非常简洁，只需用 `<TasksProvider>` 包裹子组件，无需传递任何 props。

`AddTask.tsx` 和 `TaskList.tsx` 各自通过自定义 Hook 获取所需数据，不再需要 props 逐层传递。

## 关键步骤

1. **创建 Context** — 为 state 和 dispatch 分别创建独立的 Context
2. **将 state 和 dispatch 放入 Context** — 在 Provider 组件中通过 `useReducer` 获取并提供给组件树
3. **在组件树中任何地方使用 Context** — 子组件通过自定义 Hook 直接读取 `tasks` 和调用 `dispatch`

## 启动项目

```bash
npm install
npm run dev
```
