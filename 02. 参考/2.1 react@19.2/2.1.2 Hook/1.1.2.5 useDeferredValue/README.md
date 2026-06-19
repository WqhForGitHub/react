# 一、核心作用（一句话理解）

👉 `useDeferredValue(value)` 会返回一个“延迟版本的 value”，让 React **优先更新紧急 UI（比如输入框）**，而把“非紧急 UI”（比如列表、图表）延后更新。

---

# 二、基本语法

```js
import { useDeferredValue } from "react";

const deferredValue = useDeferredValue(value);
```

- `value`：你当前的状态/props
- `deferredValue`：被“延迟更新”的值

---

# 三、最典型场景（搜索过滤）

## ❌ 没优化的问题

```js
function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <SlowList query={query} />
    </>
  );
}
```

问题：

- 每次输入都会触发 `SlowList` 重渲染
- 如果列表很大 → 输入卡顿

---

## ✅ 使用 useDeferredValue 优化

```js
import { useState, useDeferredValue } from "react";

function App() {
  const [query, setQuery] = useState("");

  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <SlowList query={deferredQuery} />
    </>
  );
}
```

---

# 四、发生了什么（关键理解）

React 内部做了两件事：

### 1️⃣ 立即更新 input（高优先级）

- `query` 立刻更新
- 输入框不卡

### 2️⃣ 延迟更新列表（低优先级）

- `deferredQuery` 会“晚一点更新”
- React 在后台慢慢更新 `SlowList`

👉 结果：

- 输入流畅
- 列表稍微“跟随滞后”

---

# 五、一个直观比喻

可以理解为：

| 部分      | 优先级 | 行为     |
| --------- | ------ | -------- |
| 输入框    | 高     | 立刻响应 |
| 列表/图表 | 低     | 排队更新 |

👉 就像：

- 你先接电话（重要）
- 再回微信（不重要）

---

# 六、和 debounce / throttle 的区别（很重要）

## ❌ debounce / throttle

- 你**人为控制时间**
- 比如 300ms 后更新
- ❗可能造成延迟过大或过小

---

## ✅ useDeferredValue

- React 自动根据性能决定延迟
- **不需要你设时间**
- 可被中断（React 并发特性）

👉 本质区别：

| 技术             | 控制方式       |
| ---------------- | -------------- |
| debounce         | 时间驱动       |
| throttle         | 时间驱动       |
| useDeferredValue | React 调度驱动 |

---

# 七、进阶用法（加“加载状态”）

可以判断是否“旧数据”

```js
const isStale = query !== deferredQuery;
```

然后做 UI 提示：

```js
<div style={{ opacity: isStale ? 0.5 : 1 }}>
  <SlowList query={deferredQuery} />
</div>
```

👉 用户体验更清晰：

- 当前输入 ≠ 展示内容 → 变灰

---

# 八、什么时候用（非常重要）

## 👍 推荐使用

- 搜索列表
- 大数据渲染（table / list）
- 图表（chart）
- markdown 渲染
- 复杂 UI（树结构 / 编辑器）

---

## 👎 不要用

- 输入框本身
- 简单状态（toggle / modal）
- 轻量 UI

---

# 九、和 useTransition 的区别（常考）

| Hook             | 用途               |
| ---------------- | ------------------ |
| useDeferredValue | “值”延迟           |
| useTransition    | “状态更新动作”延迟 |

一句话：

- `useDeferredValue` → 延迟**数据**
- `useTransition` → 延迟**更新行为**

---

# 十、总结一句话

👉 `useDeferredValue` = **让 React 帮你把“非关键 UI 更新”放到后面做，从而保持页面流畅**
