# 你的第一个组件

React 官方文档「描述 UI - 你的第一个组件」章节的示例项目。

## 项目结构

```
demo/01. 描述 UI/01. 你的第一个组件/
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
    ├── App.tsx
    ├── App.css
    ├── index.css
    ├── vite-env.d.ts
    └── demos/
        ├── ProfileDemo.tsx       # 定义组件 - 3步构建组件
        ├── GalleryDemo.tsx       # 使用组件 - 组件复用与嵌套
        └── NestedWarningDemo.tsx # 嵌套定义陷阱 - 反面示例 vs 正确做法
```

## 三个 Demo 标签页

### 1. 定义组件

展示 React 组件三步构建法：导出组件、定义函数、添加 JSX 标签。渲染 Katherine Johnson 的头像。

### 2. 使用组件

展示如何在 Gallery 父组件中复用 Profile 子组件三次，演示小写 HTML 标签与大写 React 组件的区别。

### 3. 嵌套定义陷阱

用可交互的方式对比反面示例与正确做法：

- **反面**：在组件内定义组件 -> 点击「重新渲染」按钮后，子组件状态（点赞数）会丢失
- **正确**：在顶层定义组件 -> 重新渲染父组件时，子组件状态完好保留

## 运行

```bash
npm install
npm run dev
```
