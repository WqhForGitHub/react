# 组件的导入与导出

组件的神奇之处在于它们的可重用性：你可以创建一个由其他组件构成的组件。但当你嵌套了越来越多的组件时，则需要将它们拆分成不同的文件。这样可以使得查找文件更加容易，并且能在更多地方复用这些组件。

## 项目结构

```
demo/01. 描述 UI/01.02. 组件的导入与导出/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── index.html
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.tsx
    ├── vite-env.d.ts
    ├── index.css
    ├── App.tsx              # Tab 切换容器
    ├── App.css
    ├── Gallery.tsx           # 独立组件文件（演示默认导出 + 具名导出）
    └── demos/
        ├── RootComponentDemo.tsx   # 根组件文件：所有组件在同一个文件中
        ├── DefaultExportDemo.tsx   # 默认导出与导入：拆分组件到独立文件
        └── NamedExportDemo.tsx     # 具名导出与导入：同一文件导出多个组件
```

## 三个 Tab 说明

1. **根组件文件** — 展示拆分前的状态，`Profile` 和 `Gallery` 都定义在同一个文件中
2. **默认导出与导入** — 演示将 `Gallery` 用 `export default` 拆分到 `Gallery.tsx`，在 App 中通过 `import Gallery from './Gallery'` 导入
3. **具名导出与导入** — 演示在同一文件中同时使用默认导出（`Gallery`）和具名导出（`Profile`），并对比两者的语法差异

## 运行

```bash
npm install
npm run dev
```
