# 一、Profiler 是什么？

`<Profiler>` 是 React 提供的一个内置组件，用于：

- 统计组件渲染耗时
- 判断是否发生了不必要的 re-render
- 分析性能瓶颈

👉 本质：**给某一段组件树打点埋点**

官方定义：它可以“以编程方式测量 React 树的渲染性能” ([React][1])

---

# 二、基本用法（核心）

## 1️⃣ 最简单示例

```jsx
import { Profiler } from "react";

function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
) {
  console.log({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
}

export default function App() {
  return (
    <Profiler id="App" onRender={onRender}>
      <Child />
    </Profiler>
  );
}
```

---

## 2️⃣ 两个核心 props

### ✅ `id`

- 字符串
- 标识当前监控区域

```jsx
<Profiler id="Sidebar" ...>
```

👉 用于区分多个 Profiler

---

### ✅ `onRender`

- 回调函数
- 每次“提交更新（commit）”都会触发

```jsx
function onRender(...) {}
```

👉 核心：**所有性能数据都从这里拿**

---

# 三、onRender 参数详解（重点）

```js
function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
)
```

---

## 1️⃣ id

- 当前 Profiler 的标识

👉 用于区分不同模块

---

## 2️⃣ phase（渲染阶段）

| 值            | 含义     |
| ------------- | -------- |
| mount         | 初次渲染 |
| update        | 更新渲染 |
| nested-update | 嵌套更新 |

👉 判断是不是首次加载 or 更新

---

## 3️⃣ actualDuration（真实耗时 ⭐）

👉 当前更新实际花了多久（毫秒）

```js
actualDuration = 8.5;
```

意义：

- 越小越好
- 受 memo / useMemo 影响

👉 **判断优化是否生效的关键指标**

---

## 4️⃣ baseDuration（理论最差耗时）

👉 如果没有任何优化（memo等），完整渲染需要多久

```js
baseDuration = 25;
```

---

### 🔥 对比技巧

```js
actualDuration << baseDuration;
```

说明：

✅ 优化有效（memo 生效）

---

## 5️⃣ startTime

👉 React 开始渲染时间戳

---

## 6️⃣ commitTime

👉 React 提交 DOM 的时间

👉 同一批更新（commit）共享这个时间 ([React][1])

---

# 四、使用场景（非常重要）

## 1️⃣ 找性能瓶颈

```jsx
<Profiler id="List" onRender={onRender}>
  <BigList />
</Profiler>
```

👉 如果：

```js
actualDuration 很大
```

说明：

❌ 组件很慢

---

## 2️⃣ 判断是否重复渲染

```js
phase === "update";
```

但你没有改 props/state：

👉 ❌ 说明不必要 re-render

---

## 3️⃣ 验证优化是否有效

比如用了：

- `React.memo`
- `useMemo`
- `useCallback`

👉 对比：

```js
优化前: actualDuration = 20ms
优化后: actualDuration = 5ms
```

---

## 4️⃣ 分模块分析

```jsx
<Profiler id="Sidebar" onRender={onRender}>
  <Sidebar />
</Profiler>

<Profiler id="Content" onRender={onRender}>
  <Content />
</Profiler>
```

👉 精确定位慢的模块 ([React][1])

---

## 5️⃣ 嵌套分析（高级）

```jsx
<Profiler id="Page">
  <Content>
    <Profiler id="Editor">
      <Editor />
    </Profiler>
  </Content>
</Profiler>
```

👉 分层分析性能

---

# 五、实战示例（优化前后对比）

## ❌ 未优化

```jsx
function List({ items }) {
  return items.map((item) => <Item key={item.id} data={item} />);
}
```

👉 每次父组件更新 → 全部重新渲染

---

## ✅ 优化后

```jsx
const Item = React.memo(function Item({ data }) {
  return <div>{data.name}</div>;
});
```

👉 Profiler 变化：

| 指标           | 变化 |
| -------------- | ---- |
| actualDuration | ↓    |
| baseDuration   | 不变 |
| re-render 次数 | ↓    |

---

# 六、常见误区（踩坑点）

## ❌ 1. 生产环境默认无效

👉 Profiler 默认只在开发环境启用

✔ 生产需要特殊 build ([React][1])

---

## ❌ 2. 有性能开销

👉 Profiler 本身会影响性能

✔ 不要长期挂在生产代码

---

## ❌ 3. 不等于 DevTools Profiler

区别：

| 类型           | 用法   |
| -------------- | ------ |
| `<Profiler>`   | 代码级 |
| React DevTools | 可视化 |

👉 推荐组合使用

---

## ❌ 4. 只能看到“区域”，不是具体组件

👉 Profiler 粒度是“包裹的树”

不是单个组件级别（不像 DevTools）

---

# 七、进阶用法

## 1️⃣ 数据上报（监控系统）

```js
function onRender(...args) {
  sendToAnalytics(args);
}
```

👉 用于：

- 性能监控
- 用户真实数据（RUM）

---

## 2️⃣ 打印慢渲染

```js
function onRender(id, phase, actualDuration) {
  if (actualDuration > 16) {
    console.warn("Slow render:", id);
  }
}
```

👉 16ms = 一帧

---

## 3️⃣ 性能统计聚合

```js
let total = 0;

function onRender(id, phase, actualDuration) {
  total += actualDuration;
}
```

---

# 八、总结（核心记忆点）

👉 `<Profiler>` 本质：

> **给 React 组件打性能埋点**

---

## 最关键 3 个指标

1. `actualDuration` → 实际耗时 ⭐
2. `baseDuration` → 理论最差
3. `phase` → mount / update
