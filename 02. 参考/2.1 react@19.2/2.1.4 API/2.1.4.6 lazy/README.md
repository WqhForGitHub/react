# 一、什么是 `React.lazy`

👉 官方定义：
`lazy` 可以**延迟加载组件代码，直到组件第一次被渲染**

简单理解就是：

> ❌ 传统：页面一加载，所有组件 JS 一起下载
> ✅ lazy：用到哪个组件，再加载哪个组件

---

# 二、基本用法（必须掌握）

## 1️⃣ 基础写法

```jsx
import { lazy } from "react";

const MyComponent = lazy(() => import("./MyComponent"));
```

⚠️ 关键点：

- 必须用 `import()`（动态导入）
- 必须返回 Promise
- 默认导出（default export）

---

## 2️⃣ 配合 `Suspense`

```jsx
import { Suspense, lazy } from "react";

const MyComponent = lazy(() => import("./MyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
```

👉 作用：

- `lazy`：加载组件
- `Suspense`：加载过程中显示 fallback

📌 如果没有 `Suspense` → 会报错

---

# 三、执行流程（非常重要）

React.lazy 背后的运行逻辑：

1. 首次渲染 `<MyComponent />`
2. 执行 `import('./MyComponent')`
3. 返回 Promise（开始加载 JS chunk）
4. React 暂停渲染（suspend）
5. 显示 `<Suspense fallback>`
6. 加载完成 → 渲染组件

👉 并且：

- 加载结果会被 **缓存**
- 不会重复请求

---

# 四、典型使用场景

## 1️⃣ 路由级懒加载（最常见）

```jsx
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
```

```jsx
<Suspense fallback={<Spinner />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</Suspense>
```

👉 优势：

- 首屏只加载当前页面
- 减少 bundle 体积

---

## 2️⃣ 条件渲染组件

```jsx
const Chart = lazy(() => import("./Chart"));

function Dashboard({ showChart }) {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      {showChart && <Chart />}
    </Suspense>
  );
}
```

👉 只有 `showChart=true` 才加载

---

## 3️⃣ 大组件拆分（性能优化）

```jsx
const HeavyEditor = lazy(() => import("./HeavyEditor"));
```

👉 适合：

- 富文本编辑器
- 图表库（echarts、d3）
- 复杂 UI

---

# 五、进阶用法

## 1️⃣ 处理非 default 导出

```jsx
const MyComponent = lazy(() =>
  import("./module").then((module) => ({
    default: module.MyComponent,
  })),
);
```

---

## 2️⃣ 错误边界（Error Boundary）

```jsx
<ErrorBoundary>
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

👉 因为：

- `lazy` 加载失败会 throw error

---

## 3️⃣ 多个 lazy 组件

```jsx
<Suspense fallback={<Loading />}>
  <A />
  <B />
</Suspense>
```

👉 共用一个 loading UI

---

# 六、常见错误（面试高频）

## ❌ 1. 在组件内部声明 lazy

```jsx
function App() {
  const Comp = lazy(() => import("./Comp")); // ❌ 错误
}
```

👉 问题：

- 每次 render 都重新创建
- state 会丢失

✅ 正确：

```jsx
const Comp = lazy(() => import("./Comp"));
```

---

## ❌ 2. 没有 Suspense

```jsx
<LazyComponent /> // ❌ 会报错
```

---

## ❌ 3. 不是 default export

```js
export const Comp = () => {};
```

👉 会加载失败

---

# 七、性能原理

lazy 本质是：

👉 **代码分割 + 按需加载**

打包后：

```
main.js
chunk-home.js
chunk-about.js
```

加载策略：

| 阶段        | 加载内容       |
| ----------- | -------------- |
| 首屏        | main.js        |
| 访问 /about | chunk-about.js |

👉 优点：

- 减少首屏加载时间
- 降低 JS 体积 ([GeeksforGeeks][2])

---

# 八、和 Suspense 的关系

| 功能         | 作用            |
| ------------ | --------------- |
| `React.lazy` | 加载组件        |
| `Suspense`   | 控制 loading UI |

👉 必须搭配使用

---

# 九、和 import 的区别

| 写法                        | 是否懒加载 |
| --------------------------- | ---------- |
| `import A from './A'`       | ❌ 否      |
| `lazy(() => import('./A'))` | ✅ 是      |

---

# 十、最佳实践总结

✔ 推荐做法：

- 路由级别必须 lazy
- 大组件拆分
- fallback 要友好（Skeleton / Spinner）

❗ 不推荐：

- 小组件滥用 lazy（反而增加请求）
- 首屏关键组件 lazy（影响体验）

---

# 十一、一句话总结

> `React.lazy` = **组件级按需加载 + 自动缓存 + Suspense 控制加载状态**
