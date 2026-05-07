# 使用 Context 深层传递参数

通常来说，你会通过 props 将信息从父组件传递到子组件。但是，如果你必须通过许多中间组件向下传递 props，或是在你应用中的许多组件需要相同的信息，传递 props 会变的十分冗长和不便。React 的 Context 功能可以让父组件为它下面的整个组件树提供数据，无需逐层传递 props。

## 项目结构

```
src/
├── LevelContext.ts   # 创建 Context，默认值为 0
├── Section.tsx       # 消费 + 提供 Context 的组件
├── Heading.tsx       # 使用 useContext 读取 Context 的组件
├── App.tsx           # 主应用，包含两个演示示例
├── App.css           # 样式
├── index.css         # 全局样式
└── main.tsx          # 入口文件
```

## 核心实现要点

- **LevelContext.ts** - 使用 `createContext<number>(0)` 创建 Context，默认值为 `0`（表示未嵌套在任何 Section 中）
- **Section.tsx** - 同时消费和提供 Context：
  - 通过 `useContext(LevelContext)` 读取当前层级
  - 通过 `<LevelContext value={level + 1}>` 向子树提供 `level + 1`，实现自动递增
- **Heading.tsx** - 纯消费者，通过 `useContext(LevelContext)` 获取最近的 Section 提供的 level，无需 props 传递
- **App.tsx** - 包含两个演示：
  - **Context 穿过中间层级**：`Post` 组件在不同嵌套深度使用，`Heading` 自动获取正确级别
  - **嵌套 Section 自动递增**：无需传递任何 `level` prop，深层嵌套自动从 h1 到 h4

## 运行

```bash
npm install
npm run dev
```
