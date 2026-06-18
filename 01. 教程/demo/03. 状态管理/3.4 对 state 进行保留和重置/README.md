# 对 state 进行保留和重置

各个组件的 state 是各自独立的。根据组件在 UI 树中的位置，React 可以跟踪哪些 state 属于哪个组件。你可以控制在重新渲染过程中何时对 state 进行保留和重置。

## 项目结构

```
04. 对 state 进行保留和重置/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
└── src/
    ├── main.tsx
    ├── App.tsx            # 主应用，包含 9 个示例
    ├── App.css            # 样式
    ├── index.css          # 基础样式
    └── components/
        ├── Counter.tsx     # 计数器组件
        ├── Chat.tsx        # 聊天组件
        └── ContactList.tsx # 联系人列表组件
```

## 包含的 9 个示例

| # | 示例 | 核心知识点 |
|---|------|-----------|
| 1 | 两个独立的 Counter | 各组件 state 独立 |
| 2 | 条件渲染 —— 移除时 state 消失 | 组件移除时 state 被销毁 |
| 3 | 相同位置的相同组件会保留 state | 位置相同 + 组件相同 = state 保留 |
| 4 | 相同位置的不同组件会使 state 重置 | 位置相同但组件不同 = state 重置 |
| 5 | 不同父元素导致 state 重置 | 子树结构变化导致整棵子树 state 重置 |
| 6 | 嵌套组件定义导致 state 重置 | 错误示例：组件内定义组件 |
| 7 | 方法一：将组件渲染在不同位置 | 通过不同位置重置 state |
| 8 | 方法二：使用 key 来重置 state | 通过 key 区分组件身份 |
| 9 | 使用 key 重置表单 | 聊天应用中 key 的实际应用 |

## 启动

```bash
npm install
npm run dev
```
