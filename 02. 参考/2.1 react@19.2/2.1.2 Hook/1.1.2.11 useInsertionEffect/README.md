# 1. 核心一句话理解

👉 `useInsertionEffect` = **在浏览器绘制之前、所有 layout effect 之前，优先插入 DOM（通常是 style）**

它的执行顺序大致是：

```
render
  ↓
useInsertionEffect   👈 最早（插入 CSS）
  ↓
useLayoutEffect      👈 读布局、测量 DOM
  ↓
paint（浏览器绘制）
  ↓
useEffect
```

---

# 2. 为什么需要它？

React 官方设计它的原因很明确：

### ❗ CSS-in-JS 的问题

如果你在这些时机插入 style：

### ❌ render 阶段插入

- 会导致 React render 被污染
- 性能极差（每次 render 都可能触发 style recalculation）

### ❌ useEffect 插入

- 太晚了（浏览器已经 paint）
- 可能出现：
  - 闪烁（FOUC）
  - 布局抖动

### ❌ useLayoutEffect 插入

- 虽然没闪烁
- 但会阻塞 paint，而且 layout 可能已经被“错误 CSS”影响

---

### ✔️ useInsertionEffect 的目标

👉 在“任何 layout effect 之前”，先把 CSS 注入进去

这样：

- layout effect 读取 DOM 时，CSS 已经生效
- 浏览器不会算错布局
- 不会闪
- 不影响 render 阶段

---

# 3. 官方定位（非常重要）

React 官方明确说：

> ⚠️ 这个 Hook 主要用于 CSS-in-JS 库作者

例如：

- styled-components
- emotion
- linaria runtime
- 自研 CSS-in-JS 引擎

普通业务代码 ❌ 不应该用它

---

# 4. 使用场景（唯一推荐）

## ✅ 1. CSS-in-JS 动态注入样式

```jsx
import { useInsertionEffect } from "react";

function useCSS(rule) {
  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.textContent = rule;
    document.head.appendChild(style);
  }, [rule]);
}
```

---

## ✅ 2. 生成 class + runtime style 注册（库级）

```jsx
const inserted = new Set();

function useStyle(rule) {
  useInsertionEffect(() => {
    if (inserted.has(rule)) return;

    const style = document.createElement("style");
    style.textContent = rule;
    document.head.appendChild(style);

    inserted.add(rule);
  }, [rule]);
}
```

---

# 5. 它和 useLayoutEffect / useEffect 的区别

| Hook               | 执行时机          | 能否影响布局    | 推荐用途         |
| ------------------ | ----------------- | --------------- | ---------------- |
| useInsertionEffect | 最早（layout 前） | ⚠️ 不建议读 DOM | 注入 CSS         |
| useLayoutEffect    | paint 前          | ✔️ 可以读 DOM   | 测量布局         |
| useEffect          | paint 后          | ❌              | 数据请求、副作用 |

---

# 6. 执行顺序（重点记这个）

一次 React commit 流程：

```
1. render
2. useInsertionEffect   ← CSS 插入
3. DOM commit
4. useLayoutEffect      ← 测量 DOM
5. browser paint
6. useEffect            ← 非阻塞副作用
```

---

# 7. 它的限制（很关键）

React 对它限制很严格：

### ❌ 不能做这些：

- 不能 setState（会导致混乱）
- 不能依赖 DOM refs（还没绑定）
- 不能做异步逻辑
- 不能做业务逻辑

---

### ⚠️ 注意点

- 只在 **client 端执行**
- SSR 不执行
- 执行顺序可能在 DOM commit 前后交错（React 保证的是“早于 layout effect”）

---

# 8. 为什么普通开发几乎不用？

因为：

👉 React 已经提供更好的方案：

- CSS 文件（最佳）
- CSS modules
- inline style
- compile-time CSS-in-JS（如 vanilla-extract）

所以 runtime injection 已经越来越少。

---

# 9. 面试级总结（一句话）

👉 `useInsertionEffect` 是 React 提供给 CSS-in-JS 库的“最早执行副作用 Hook”，用于在 layout effect 之前安全注入样式，避免样式计算错误或闪烁。
