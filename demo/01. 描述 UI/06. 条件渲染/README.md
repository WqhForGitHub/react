# 条件渲染

通常你的组件会需要根据不同的情况显示不同的内容。在 React 中，你可以通过使用 JavaScript 的 `if` 语句、`&&` 和 `? :` 运算符来选择性地渲染 JSX。

## 项目结构

```
06. 条件渲染/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── index.html
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── App.css
    ├── index.css
    ├── vite-env.d.ts
    └── demos/
        ├── ConditionalReturnDemo.tsx   -- 条件返回 JSX (if 语句)
        ├── ReturnNullDemo.tsx         -- 选择性地返回 null
        ├── TernaryDemo.tsx            -- 三目运算符 (?:)
        ├── AndOperatorDemo.tsx        -- 与运算符 (&&) + 数字0陷阱演示
        └── VariableAssignmentDemo.tsx -- JSX 赋值给变量
```

## Demo 说明

| Tab | 文件 | 内容 |
|-----|------|------|
| 条件返回 JSX | `ConditionalReturnDemo.tsx` | 使用 `if` 语句条件性返回不同 JSX |
| 返回 null | `ReturnNullDemo.tsx` | 不需要渲染时返回 `null`，附注意事项 |
| 三目运算符 ?: | `TernaryDemo.tsx` | 使用 `? :` 简洁实现条件渲染，用 `<del>` 标签展示删除线效果 |
| 与运算符 && | `AndOperatorDemo.tsx` | 条件成立时渲染 JSX，附带可展开的"数字 0 陷阱"交互演示 |
| JSX 赋值给变量 | `VariableAssignmentDemo.tsx` | 使用 `let` + `if` + 大括号嵌入，最灵活的方式 |

## 启动

```bash
npm install
npm run dev
```
