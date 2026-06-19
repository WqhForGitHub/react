# 一、核心概念（必须搞懂）

👉 一句话总结：

> `<Suspense>` = “如果子组件在渲染时需要等待，就显示 fallback” ([React][1])

### 关键点

- `children`：真实内容
- `fallback`：加载中 UI（loading / skeleton）
- “suspend（挂起）”：组件在渲染时**触发异步等待**

⚠️ 注意：
Suspense **不会自动监听 fetch / useEffect**
它只对这些情况生效：

- `React.lazy`（代码分割）
- `use()`（React 18+）
- Suspense-enabled 数据源（Next.js / Relay 等） ([React][1])

---

# 二、最基础用法（必须会）

## 1️⃣ 懒加载组件（最常见）

```jsx
import { Suspense, lazy } from "react";

const UserPage = lazy(() => import("./UserPage"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserPage />
    </Suspense>
  );
}
```

👉 过程：

1. 组件代码还没加载 → “挂起”
2. 显示 fallback
3. 加载完成 → 自动替换成真实 UI

---

## 2️⃣ 数据加载（框架支持）

```jsx
<Suspense fallback={<Spinner />}>
  <UserList />
</Suspense>
```

👉 当 `UserList` 内部“挂起”（例如用 `use()` 读取 Promise）：

- 自动显示 Spinner
- 数据 ready 后再渲染

---

# 三、核心设计模式（重点）

## 1️⃣ 整体加载（一起显示）

```jsx
<Suspense fallback={<Loading />}>
  <Profile />
  <Posts />
</Suspense>
```

👉 行为：

- 只要一个没加载完 → 全部显示 loading
- 全部完成 → 一起显示 ([React][1])

适用：

- 页面首屏

---

## 2️⃣ 嵌套 Suspense（推荐）

```jsx
<Suspense fallback={<PageLoading />}>
  <Profile />

  <Suspense fallback={<PostsSkeleton />}>
    <Posts />
  </Suspense>
</Suspense>
```

👉 行为：

- Profile 先显示
- Posts 单独 loading ([React][1])

适用：

- 提升用户体验（渐进加载）

---

## 3️⃣ 保留旧内容（避免闪屏）

```jsx
import { useDeferredValue } from "react";

const deferredQuery = useDeferredValue(query);

<Suspense fallback={<Loading />}>
  <SearchResults query={deferredQuery} />
</Suspense>;
```

👉 效果：

- 新数据加载时，旧数据继续显示
- 不会闪 loading

---

## 4️⃣ 配合 Transition（高级）

```jsx
import { startTransition } from "react";

startTransition(() => {
  setPage("/about");
});
```

👉 作用：

- 标记为“非紧急更新”
- 防止 UI 被 fallback 覆盖 ([React][1])

---

# 四、底层原理（简单理解版）

Suspense 的核心机制其实是：

👉 **组件在 render 时“抛出 Promise”**

```js
throw promise;
```

React 捕获后：

1. 找最近的 `<Suspense>`
2. 渲染 fallback
3. Promise resolve → 重新渲染

---

# 五、常见误区（很重要）

## ❌ 误区 1：Suspense = loading 组件

错。

👉 它是“调度机制”，不是 UI 组件

---

## ❌ 误区 2：可以包 useEffect 请求

错。

```jsx
useEffect(() => {
  fetch(...)
}, [])
```

👉 Suspense **不会触发**

---

## ❌ 误区 3：任何 Promise 都能用

错。

👉 必须：

- `use()`
- 或框架支持

---

## ❌ 误区 4：会保留组件状态

错。

👉 初次挂起：

- state 会丢失（重新渲染） ([React][1])

---

# 六、实际应用场景

### ✅ 1. 代码分割（最成熟）

- lazy + Suspense

### ✅ 2. SSR / Streaming（Next.js）

- 分块加载 HTML

### ✅ 3. 数据加载（未来主流）

- React Server Components

---

# 七、最佳实践总结

👉 推荐组合：

- 组件懒加载：`lazy + Suspense`
- 页面加载：外层 Suspense
- 局部 loading：嵌套 Suspense
- 防闪屏：`useDeferredValue` / `startTransition`

---

# 八、一句话理解

> Suspense = “让 UI 可以像数据一样等待，而不是手动管理 loading”
