# 将 Props 传递给组件

React 组件使用 *props* 来互相通信。每个父组件都可以提供 props 给它的子组件，从而将一些信息传递给它。

## 你将会学习到

- 如何向组件传递 props
- 如何从组件读取 props
- 如何为 props 指定默认值
- 如何给组件传递 JSX
- Props 如何随时间变化

## 快速开始

```bash
npm install
npm run dev
```

## Demo 导览

### 熟悉的 props

Props 是你传递给 JSX 标签的信息。例如 `className`、`src`、`alt`、`width`、`height` 便是一些可以传递给 `<img>` 的 props。你可以将任何 props 传递给你自己的组件，以便自定义它们。

### 向组件传递 props

分两步给组件传递 props：

1. **将 props 传递给子组件**：在 JSX 标签上添加属性，如 `person={{ name: "Lin Lanying", imageId: "1bX5QH6" }}` 和 `size={100}`
2. **在子组件中读取 props**：通过解构参数 `function Avatar({ person, size })` 来读取

Props 正是组件的唯一参数，`function Avatar(props)` 中的 `props` 是一个对象，通常使用解构语法来提取需要的属性。

### 给 prop 指定默认值

通过在参数后面写 `=` 和默认值来给 prop 指定默认值：

```tsx
function Avatar({ person, size = 100 }) {}
```

默认值仅在缺少该 prop 或传入 `undefined` 时生效。传入 `null` 或 `0` 时默认值不会被使用。

### 使用 JSX 展开语法传递 props

当组件将所有 props 转发给子组件时，可以使用展开语法：

```tsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  )
}
```

请克制地使用展开语法。如果你在所有其他组件中都使用它，通常表示你应该拆分组件，并将子组件作为 JSX 传递。

### 将 JSX 作为子组件传递

当你将内容嵌套在 JSX 标签中时，父组件将在名为 `children` 的 prop 中接收到该内容：

```tsx
<Card>
  <Avatar size={100} person={{ name: "Katsuko Saruhashi", imageId: "YfeOqp2" }} />
</Card>
```

`Card` 组件通过 `{ children }` 接收并渲染嵌套内容。

### Props 如何随时间变化

一个组件可能会随着时间的推移收到不同的 props。Props 反映了组件在任何时间点的数据，并不仅仅是在开始时。

**Props 是不可变的（immutable）。** 当一个组件需要改变它的 props 时，它不得不"请求"它的父组件传递不同的 props —— 一个新对象。不要尝试"更改 props"，当你需要响应用户输入时，你可以"设置 state"。
