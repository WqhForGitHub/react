# 保持组件纯粹

部分 JavaScript 函数是纯粹的，这类函数通常被称为纯函数。纯函数仅执行计算操作，不做其他操作。你可以通过将组件按纯函数严格编写，以避免一些随着代码库的增长而出现的、令人困扰的 bug 以及不可预测的行为。

## 项目结构

```
08. 保持组件纯粹/
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
        ├── PureFunctionDemo.tsx   -- 纯函数：组件作为公式
        ├── ImpureDemo.tsx        -- 副作用：预期的后果 + 修复对比
        ├── LocalMutationDemo.tsx -- 局部 mutation：组件的小秘密
        └── SideEffectDemo.tsx    -- 哪里可以引发副作用
```

## Demo 说明

| Tab | 文件 | 内容 |
|-----|------|------|
| 纯函数：组件作为公式 | `PureFunctionDemo.tsx` | Recipe 组件：给定相同 drinkers prop 总是返回相同 JSX，如同数学公式 y=2x |
| 副作用：预期的后果 | `ImpureDemo.tsx` | 不纯粹组件（读写外部 guest 变量导致编号翻倍）vs 纯粹组件（通过 prop 传入），可切换对比 |
| 局部 mutation | `LocalMutationDemo.tsx` | TeaGathering 组件：函数内创建的数组 push 是安全的局部 mutation |
| 哪里可以引发副作用 | `SideEffectDemo.tsx` | 事件处理程序（推荐）vs useEffect（最后手段）的交互演示，含更新页面标题的实际效果 |

## 启动

```bash
npm install
npm run dev
```
