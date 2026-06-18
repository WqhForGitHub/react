# 一、核心作用（一句话）

👉 **把 React 组件“连接”到外部 store，并保证并发渲染下数据一致**

---

# 二、基本用法

```js
const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

三个参数：

## 1️⃣ subscribe（订阅函数）

告诉 React：“数据变化时请通知我”

```js
const subscribe = (callback) => {
  store.subscribe(callback);
  return () => store.unsubscribe(callback);
};
```

---

## 2️⃣ getSnapshot（读取当前状态）

👉 React 每次渲染都会调用它

```js
const getSnapshot = () => {
  return store.getState();
};
```

⚠️ 要求：

- 必须是**纯函数**
- 同一时刻返回结果必须一致
- 不能每次返回新对象（否则会死循环）

---

## 3️⃣ getServerSnapshot（SSR用，可选）

服务端渲染时用：

```js
const getServerSnapshot = () => {
  return initialState;
};
```

---

# 三、完整示例（自定义 store）

## 1️⃣ 外部 store

```js
let state = { count: 0 };
const listeners = new Set();

export const store = {
  getState: () => state,

  setState: (next) => {
    state = next;
    listeners.forEach((l) => l());
  },

  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
```

---

## 2️⃣ React 组件使用

```js
import { useSyncExternalStore } from "react";
import { store } from "./store";

function Counter() {
  const count = useSyncExternalStore(
    store.subscribe,
    () => store.getState().count,
  );

  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => store.setState({ count: store.getState().count + 1 })}
      >
        +1
      </button>
    </div>
  );
}
```

---

# 四、为什么不用 useState？

因为 `useState` 只适用于：

- React 内部状态

而 `useSyncExternalStore` 适用于：

- Redux
- Zustand
- WebSocket
- localStorage
- window size / navigator API
- 自己实现的 store

---

# 五、它解决的关键问题（非常重要）

## 1️⃣ tearing（撕裂问题）

并发渲染下可能出现：

- 组件 A 读到旧值
- 组件 B 读到新值

👉 UI 不一致

`useSyncExternalStore` 保证：

> 所有组件读取的是**同一个快照（snapshot）**

---

## 2️⃣ 并发安全（React 18）

React 可能：

- 暂停渲染
- 重试渲染
- 并发执行

这个 Hook 保证：
👉 外部 store 在任何渲染模式下都一致

---

# 六、React 官方建议（重点）

React 官方明确说：

> 这个 API 主要给 **state library / 框架作者使用**

例如：

- Redux（react-redux v8 内部用它）
- Zustand
- Jotai
- 自定义 store 系统

---

# 七、常见使用场景

## 1️⃣ 订阅浏览器 API

```js
function useOnlineStatus() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("online", cb);
      window.addEventListener("offline", cb);
      return () => {
        window.removeEventListener("online", cb);
        window.removeEventListener("offline", cb);
      };
    },
    () => navigator.onLine,
  );
}
```

---

## 2️⃣ window size

```js
function useWindowWidth() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => window.innerWidth,
  );
}
```

---

## 3️⃣ Redux / Zustand 内部原理

Redux：

```js
useSyncExternalStore(store.subscribe, store.getState);
```

👉 这就是 react-redux v8 的核心实现方式

---

# 八、注意事项（很关键）

## ❌ 1. getSnapshot 不能返回新对象

```js
// ❌ 错误
() => ({ count: store.count });
```

会导致无限更新

---

## ❌ 2. subscribe 必须稳定

不要写在组件内部：

```js
function Comp() {
  const subscribe = () => {};
  useSyncExternalStore(subscribe, getSnapshot);
}
```

👉 每次 render 都变 → 重复订阅

---

## ❌ 3. 不适合普通组件 state

不要用它替代：

```js
useState / useReducer;
```

---

# 九、总结

`useSyncExternalStore` 的本质是：

> 🔥 React 官方“外部状态连接器”，用于保证外部 store 在并发模式下安全一致
