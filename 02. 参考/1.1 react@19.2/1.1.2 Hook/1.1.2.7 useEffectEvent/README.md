# 1. 为什么需要 useEffectEvent？

先看一个经典问题：Effect 依赖导致“重复订阅”

```jsx
useEffect(() => {
  const onMove = (e) => {
    if (canMove) {
      console.log(e.clientX);
    }
  };

  window.addEventListener("pointermove", onMove);
  return () => window.removeEventListener("pointermove", onMove);
}, [canMove]);
```

### 问题：

- `canMove` 一变
- Effect 就会重新执行
- 事件监听被卸载 + 重新绑定（性能 + 逻辑复杂）

---

# 2. useEffectEvent 的解决方案

```jsx
import { useEffect, useEffectEvent } from "react";

function App() {
  const [canMove, setCanMove] = useState(true);

  const onMove = useEffectEvent((e) => {
    if (canMove) {
      console.log(e.clientX, e.clientY);
    }
  });

  useEffect(() => {
    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []); // ❗依赖可以保持空
}
```

---

# 3. 它到底做了什么？

`useEffectEvent` 做了三件关键事情：

### ✅ (1) 返回一个“稳定函数”

- 函数引用不会变（可以安全放在 Effect 里）

### ✅ (2) 但内部读取的是“最新值”

- 每次调用时读取最新 props/state

### ✅ (3) 不参与依赖系统

- 不需要放进 dependency array
- 不会触发 Effect 重跑

---

# 4. 它和 useCallback 的区别（非常关键）

| 特性                     | useCallback   | useEffectEvent |
| ------------------------ | ------------- | -------------- |
| 是否稳定引用             | ✔️            | ✔️             |
| 是否需要依赖             | ✔️ 必须写     | ❌ 不需要      |
| 是否捕获旧值             | ❌ 可能 stale | ❌ 不会 stale  |
| 是否用于渲染逻辑         | ✔️ 可以       | ❌ 不建议      |
| 是否用于 Effect 内部逻辑 | ⚠️ 不优雅     | ✔️ 设计用途    |

---

# 5. 正确使用场景（重点）

## ✅ 1. Effect 内部的事件回调

```jsx
const onMessage = useEffectEvent((msg) => {
  console.log(roomId, msg);
});

useEffect(() => {
  socket.on("message", onMessage);
  return () => socket.off("message", onMessage);
}, []);
```

👉 socket 只绑定一次，但回调永远拿到最新 roomId

---

## ✅ 2. timer / interval

```jsx
const onTick = useEffectEvent(() => {
  console.log(count);
});

useEffect(() => {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}, []);
```

---

## ✅ 3. 避免 Effect 反复重连

比如 websocket / subscription：

```jsx
useEffect(() => {
  connect(onEvent);
}, []); // 不因 state 变化重新连接
```

---

# 6. 重要限制（非常容易踩坑）

## ❌ 1. 不能在 render 里调用

```jsx
onMove(); // ❌ 错误
```

只能在：

- useEffect
- 其他 useEffectEvent

---

## ❌ 2. 不能传给子组件

```jsx
<Child onMove={onMove} /> // ❌ 不建议
```

因为它不是“普通 callback API”

---

## ❌ 3. 不要用它“逃避依赖”

❌ 错误用法：

```jsx
useEffect(() => {
  log(userId);
}, []); // 用 useEffectEvent 逃掉依赖
```

👉 React 官方明确：这是反模式

---

# 7. 什么时候“不该用”

不要用在：

- 表单 onClick / onChange
- React 组件 props callback
- 纯 UI 事件处理

👉 这些用：

- `useCallback`
- 或直接函数

---

# 8. 一句话总结

> `useEffectEvent` = “Effect 专用的永远最新回调函数”，用于解决 Effect 依赖导致的重复连接问题。
