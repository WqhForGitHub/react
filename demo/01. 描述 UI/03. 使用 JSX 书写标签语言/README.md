# 使用 JSX 书写标签语言

JSX 是 JavaScript 语法扩展，可以让你在 JavaScript 文件中书写类似 HTML 的标签。虽然还有其他方式可以编写组件，但大部分 React 开发者更喜欢 JSX 的简洁性。

## 项目结构

```
├── package.json
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── index.html
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.tsx
    ├── vite-env.d.ts
    ├── index.css
    ├── App.css
    ├── App.tsx                    ← Tab 切换器
    └── demos/
        ├── HtmlToJsxDemo.tsx      ← HTML 转 JSX（完整示例）
        ├── SingleRootDemo.tsx     ← 规则1：单一根元素
        ├── ClosedTagsDemo.tsx     ← 规则2：标签必须闭合
        └── CamelCaseDemo.tsx      ← 规则3：驼峰式属性命名
```

## 四个 Tab

1. **HTML 转 JSX** — 展示将 HTML 直接放入组件的问题及修正后的完整 JSX 写法，并运行渲染海蒂·拉玛的待办事项
2. **单一根元素** — 展示 `<div>` 包裹和 `Fragment` 两种方式，解释为什么需要单一根元素
3. **标签必须闭合** — 对比 HTML 与 JSX 写法（`<img>` → `<img />`，`<li>` → `<li></li>`），包含常见自闭合标签清单
4. **驼峰式属性** — 展示 `class` → `className`、`for` → `htmlFor` 等转换，附属性对照表和 `aria-*`/`data-*` 例外说明

## 运行

```bash
npm install
npm run dev
```
