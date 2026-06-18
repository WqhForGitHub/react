# 一、useCallback 的基本语法

```js
const memoizedFn = useCallback(fn, deps);
```

- `fn`：你要缓存的函数
- `deps`：依赖数组（依赖变化才重新创建函数）

---

# 二、useCallback 到底做了什么？

## ❗关键理解（非常重要）

每次组件 render：

- 普通函数 👉 每次都会重新创建
- useCallback 👉 **可能复用上一次的函数引用**

```js
const handleClick = () => {
  console.log("click");
};
```

👉 每次 render 都是新的函数

---

使用 useCallback：

```js
const handleClick = useCallback(() => {
  console.log("click");
}, []);
```

👉 多次 render 之间：

- deps 没变 → 返回“同一个函数”
- deps 变了 → 才创建新函数

---

# 三、为什么要缓存函数？

## 1. 防止子组件不必要的 re-render（最重要）

### ❌ 不用 useCallback

```js
const Parent = () => {
  const [count, setCount] = useState(0);

  const onClick = () => {
    console.log("click");
  };

  return <Child onClick={onClick} />;
};
```

每次 Parent render：

- `onClick` 都是新函数
- Child 会认为 props 变了 → 重新渲染

---

### ✅ 使用 useCallback

```js
const onClick = useCallback(() => {
  console.log("click");
}, []);
```

👉 Child 收到的是同一个函数引用
👉 如果 Child 用了 `React.memo`，可以避免 re-render

---

# 四、useCallback + React.memo 的典型组合

```js
const Child = React.memo(({ onClick }) => {
  console.log("Child render");
  return <button onClick={onClick}>click</button>;
});
```

```js
const Parent = () => {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    console.log("click");
  }, []);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>

      <Child onClick={onClick} />
    </>
  );
};
```

👉 点击 +1：

- Parent re-render
- onClick 不变
- Child 不 re-render（性能优化成功）

---

# 五、deps（依赖数组）怎么理解？

## ❗原则：函数里用到什么，就写什么

```js
const onClick = useCallback(() => {
  console.log(count);
}, [count]);
```

👉 count 变化 → 函数更新

---

## ❌ 常见错误

```js
const onClick = useCallback(() => {
  console.log(count);
}, []);
```

👉 永远拿到旧 count（闭包问题）

---

# 六、useCallback 本质

可以理解为：

```js
useCallback(fn, deps);
// ≈
useMemo(() => fn, deps);
```

---

# 七、useCallback 适用场景（重点）

## ✔ 推荐使用

### 1. 传给 memo 组件

```js
<Child onClick={fn} />
```

---

### 2. 作为 useEffect 依赖

```js
const fetchData = useCallback(() => {
  ...
}, [id])

useEffect(() => {
  fetchData()
}, [fetchData])
```

---

### 3. 高频渲染列表中的 handler

---

## ❌ 不需要使用

```js
const handleClick = () => {};
```

👉 如果：

- 没传子组件
- 没做 memo
- 没作为 effect 依赖

👉 用 useCallback 反而是“过度优化”

---

# 八、一句话总结

👉 `useCallback` 的核心作用：

> **让函数在多次 render 中保持同一个引用，用于优化 React 渲染性能**

---

# 九、简单记忆法

- useMemo → 缓存“值”
- useCallback → 缓存“函数”
