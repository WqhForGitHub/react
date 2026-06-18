# 1. 它解决什么问题？

默认情况下：

```jsx
const inputRef = useRef();

<input ref={inputRef} />;
```

父组件可以直接拿到 DOM：

```js
inputRef.current.focus();
inputRef.current.value;
inputRef.current.style;
```

👉 问题：**暴露太多能力，不安全、也不符合组件封装**

---

# 2. useImperativeHandle 的作用

它可以让你“定制 ref 暴露出去的内容”。

👉 只暴露你想让父组件用的方法：

```js
{
  (focus, clear, scrollTo);
}
```

而不是整个 DOM。

---

# 3. 标准写法（必须 + forwardRef）

### 子组件：

```jsx
import { forwardRef, useRef, useImperativeHandle } from "react";

const MyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      clear() {
        inputRef.current.value = "";
      },
    };
  });

  return <input ref={inputRef} {...props} />;
});

export default MyInput;
```

---

### 父组件：

```jsx
import { useRef } from "react";
import MyInput from "./MyInput";

export default function App() {
  const ref = useRef(null);

  return (
    <>
      <MyInput ref={ref} />

      <button onClick={() => ref.current.focus()}>focus</button>

      <button onClick={() => ref.current.clear()}>clear</button>
    </>
  );
}
```

---

# 4. 执行流程（很重要）

```
父组件 ref
   ↓
forwardRef 把 ref 传给子组件
   ↓
useImperativeHandle 定义 ref.current 的内容
   ↓
父组件只能访问你暴露的方法
```

---

# 5. dependencies 参数（容易忽略）

```js
useImperativeHandle(ref, () => {
  return {
    focus() {
      inputRef.current.focus();
    },
  };
}, []);
```

👉 和 `useEffect` 一样：

- 依赖变化 → 重新生成 handle
- 一般很少需要写复杂依赖

---

# 6. 常见使用场景（重点）

## ✔ 表单组件（Input / SearchBox）

- focus
- clear
- selectText

---

## ✔ Modal 弹窗

```js
ref.current.open();
ref.current.close();
```

---

## ✔ Canvas / 图表库

```js
ref.current.zoomIn();
ref.current.zoomOut();
ref.current.export();
```

---

## ✔ 动画控制

```js
ref.current.play();
ref.current.pause();
```

---

# 7. ❌ 不推荐的用法（React 官方也提醒）

不要用它来代替 props：

### ❌ 错误：

```js
ref.current.open();
```

### ✔ 推荐：

```jsx
<Modal isOpen={isOpen} />
```

👉 原因：

- props = 声明式（React 推荐）
- ref = 命令式（只用于特殊情况）

---

# 8. useImperativeHandle vs ref 默认行为

| 场景       | ref 默认行为 | useImperativeHandle      |
| ---------- | ------------ | ------------------------ |
| DOM input  | 暴露整个 DOM | 可限制只暴露 focus/clear |
| 自定义组件 | 无法直接控制 | 可暴露自定义方法         |
| 推荐程度   | 一般         | 仅特殊场景               |

---

# 9. 一句话总结

👉 `useImperativeHandle` 的本质：

> 让你“控制父组件通过 ref 能调用什么方法”，避免直接暴露内部实现。
