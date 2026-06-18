# 迁移状态逻辑至 Reducer 中

对于拥有许多状态更新逻辑的组件来说，过于分散的事件处理程序可能会令人不知所措。对于这种情况，你可以将组件的所有状态更新逻辑整合到一个外部函数中，这个函数叫作 **reducer**。

## 项目结构

```
05. 迁移状态逻辑至 Reducer 中/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AddTask.tsx        # 添加任务表单
│   │   └── TaskList.tsx       # 任务列表（含编辑、删除、勾选）
│   ├── demos/
│   │   ├── UseStateDemo.tsx   # useState 版本演示
│   │   └── UseReducerDemo.tsx # useReducer 版本演示
│   ├── types.ts               # Task 类型、TaskAction 类型、initialTasks
│   ├── tasksReducer.ts        # reducer 函数（added/changed/deleted）
│   ├── App.tsx                # 主应用，tab 切换两个 demo
│   ├── App.css                # 组件样式
│   ├── index.css              # 全局样式（含暗色模式）
│   ├── main.tsx               # 入口
│   └── vite-env.d.ts
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── eslint.config.js
```

## 关键演示对比

- **useState 版本** (`UseStateDemo.tsx`)：三个事件处理函数 `handleAddTask`、`handleChangeTask`、`handleDeleteTask` 各自包含 `setTasks` 状态更新逻辑
- **useReducer 版本** (`UseReducerDemo.tsx`)：事件处理函数只 `dispatch` action，状态更新逻辑集中在 `tasksReducer.ts` 中

## 运行

```bash
npm install
npm run dev
```

## 参考

- [React 官方文档 - 迁移状态逻辑至 Reducer 中](https://zh-hans.react.dev/learn/extracting-state-logic-into-a-reducer)
