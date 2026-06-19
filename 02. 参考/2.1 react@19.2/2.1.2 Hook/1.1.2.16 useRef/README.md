# 1. 基本语法

```js
import { useRef } from "react";

const ref = useRef(initialValue);
```

返回值：

```js
{
  current: initialValue;
}
```

并且这个对象 **在组件整个生命周期中保持不变** ([React][1])

---

# 2. useRef 的两大核心用途

## ① 保存“不会触发渲染”的变量

### 示例：计时器 ID

```js
import { useRef } from "react";

function Timer() {
  const timerRef = useRef(null);

  const start = () => {
    timerRef.current = setInterval(() => {
      console.log("tick");
    }, 1000);
  };

  const stop = () => {
    clearInterval(timerRef.current);
  };

  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}
```

### 特点：

- 修改 `ref.current` ❌ 不会重新渲染
- 适合存储：定时器、缓存、临时变量、上一次值等 ([GeeksforGeeks][2])

---

## ② 获取 DOM 元素（最常见）

### 示例：自动聚焦 input

```js
import { useRef, useEffect } from "react";

function InputFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
}
```

### 作用：

- 直接操作 DOM（focus / scroll / getBoundingClientRect 等）
- 属于“命令式操作”方式 ([usereactjs.com][3])

---

# 3. useRef vs useState（核心区别）

| 对比项       | useRef             | useState    |
| ------------ | ------------------ | ----------- |
| 是否触发渲染 | ❌ 不触发          | ✅ 触发     |
| 是否持久化   | ✅ 是              | ✅ 是       |
| 用途         | 存“隐藏数据 / DOM” | 存“UI 数据” |

---

## 一个关键理解点：

### ❌ 错误理解

> useRef = useState 的替代品

### ✅ 正确理解

> useRef = “不影响 UI 的数据容器”

---

# 4. 常见使用场景总结

## ① 存 DOM

```js
const divRef = useRef();
```

## ② 存定时器

```js
const timerRef = useRef();
```

## ③ 存上一次的 state

```js
const prevValue = useRef();

useEffect(() => {
  prevValue.current = value;
}, [value]);
```

## ④ 存不想触发渲染的数据

比如：

- WebSocket 实例
- 第三方库实例
- 临时缓存

---

# 5. 重要规则（非常关键）

## ❌ 不要在 render 中依赖 ref 做 UI

```js
// ❌ 错误
return <div>{ref.current}</div>;
```

因为：

- ref 改变不会触发 render
- UI 不会更新

---

## ❌ 不要在 render 期间修改 ref

```js
ref.current = 123; // ❌ 不推荐
```

---

# 6. 一个容易忽略的点

### useRef 返回的是“同一个对象”

每次 render：

```js
const ref = useRef(0);
```

React 都会返回 **同一个 ref 对象**，不会重新创建。

---

# 7. 一句话总结

> `useRef` 就是 React 里的“隐形盒子”：
> 用来存储 **不会影响 UI 的数据**，或者 **直接操作 DOM**。
