# 将 UI 视为树

React 以及许多其他 UI 库，将 UI 建模为树。将应用程序视为树对于理解组件之间的关系以及调试性能和状态管理等概念非常有用。

## 项目结构

```
09. 将 UI 视为树/
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
        ├── RenderTreeDemo.tsx        -- 渲染树：展示组件组合关系
        ├── ConditionalTreeDemo.tsx   -- 条件渲染树：展示渲染树随条件变化
        └── DependencyTreeDemo.tsx    -- 模块依赖树：与渲染树对比
```

## Demo 说明

| Tab | 文件 | 内容 |
|-----|------|------|
| 渲染树 | `RenderTreeDemo.tsx` | 运行 Get Inspired App，并展示对应的渲染树结构（App → FancyText / InspirationGenerator → FancyText, Copyright） |
| 条件渲染树 | `ConditionalTreeDemo.tsx` | 添加 Color 组件后，通过条件渲染切换 quote/color，渲染树也随之变化。可交互切换查看两种渲染树，高亮变化的节点 |
| 模块依赖树 | `DependencyTreeDemo.tsx` | 对比渲染树和依赖树，用绿色标记非组件数据模块（inspirations.js），并说明关键差异：Copyright.js 在依赖树中是 App.js 的子模块，但在渲染树中是 InspirationGenerator 的子组件 |

## 启动

```bash
npm install
npm run dev
```
