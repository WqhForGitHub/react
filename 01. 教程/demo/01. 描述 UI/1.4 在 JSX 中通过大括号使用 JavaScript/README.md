# 在 JSX 中通过大括号使用 JavaScript

React 官方文档「描述 UI - 在 JSX 中通过大括号使用 JavaScript」章节的示例项目。

## 项目结构

```
demo/01. 描述 UI/01.04. 在 JSX 中通过大括号使用 JavaScript/
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
        ├── StringPropsDemo.tsx       # 引号与大括号 - 字符串属性 vs JavaScript 变量
        ├── VariableDemo.tsx          # 引用变量 - 在标签文本中嵌入变量
        ├── FunctionCallDemo.tsx      # 调用函数 - 在大括号内调用函数
        ├── DoubleCurlyBracesDemo.tsx # 双大括号 - 内联 CSS 样式与对象
        └── ObjectDemo.tsx           # 对象与大括号 - 从对象中提取多个值
```

## 五个 Demo 标签页

### 1. 引号与大括号

对比引号传字符串与大括号引用变量的区别：`className="avatar"` 传递静态字符串，`src={avatar}` 读取 JavaScript 变量。并排展示两种写法的渲染结果。

### 2. 引用变量

大括号是一扇进入 JavaScript 世界的窗户。通过 input 输入框交互修改 `name` 变量，实时观察 `<h1>{name}的待办事项</h1>` 的变化。

### 3. 调用函数

在大括号内调用 `formatDate()` 和 `getCurrentTime()` 等函数，展示大括号内可以运行任何 JavaScript 表达式。附带提示：`if` 语句不能直接放在大括号中，需使用三元表达式替代。

### 4. 双大括号

通过颜色选择器交互修改内联样式的背景色和文字色，直观理解 `style={{ backgroundColor: "black" }}` 双大括号语法（外层大括号进入 JavaScript，内层大括号定义对象）。附带驼峰命名法提示。

### 5. 对象与大括号

将 `person` 对象的 `name` 和 `theme` 属性分别用于文本内容和内联样式，展示 JSX 作为最小模板语言的思路——通过 JavaScript 本身来组织数据和逻辑。

## 运行

```bash
npm install
npm run dev
```
