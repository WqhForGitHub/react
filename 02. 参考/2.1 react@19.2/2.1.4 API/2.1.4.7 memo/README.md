# 一、React.memo 是什么？

`React.memo` 是一个**高阶组件（HOC）**，用于**缓存函数组件的渲染结果**。

👉 核心作用一句话总结：

> **当 props 没变时，跳过组件重新渲染** ([react.dev][1])

---

# 二、为什么需要 React.memo？

默认情况下：

```txt
父组件 render → 子组件全部重新 render
```

即使子组件的 props 没变，也会重新执行函数。

👉 问题：
如果子组件很复杂，会造成性能浪费。

👉 解决：
用 `React.memo` 让它“只在 props 改变时才渲染”。

---

# 三、基础用法

## 1️⃣ 最简单用法

```jsx
import { memo } from "react";

const Child = memo(function Child({ name }) {
  console.log("render child");
  return <div>{name}</div>;
});

export default Child;
```

---

## 2️⃣ 使用效果

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <Child name="Alice" />
    </>
  );
}
```

👉 结果：

| 操作      | Child 是否重新渲染 |
| --------- | ------------------ |
| 点击按钮  | ❌ 不渲染          |
| 修改 name | ✅ 渲染            |

---

# 四、底层原理（很关键）

`React.memo` 会对 props 做**浅比较（shallow compare）**：

```js
Object.is(prevProps, nextProps);
```

👉 规则：

- 基本类型（string / number） ✅ 正常比较
- 引用类型（object / array / function） ⚠️ 每次都不同

```js
Object.is({}, {}); // false
```

👉 结论：

> **只要引用变了，就会重新渲染** ([react.dev][1])

---

# 五、常见优化组合（非常重要）

## ❗问题：memo 失效

```jsx
<Child data={{ name: "Alice" }} />
```

👉 每次 render 都是新对象 → memo 无效

---

## ✅ 解决：useMemo

```jsx
const data = useMemo(() => ({ name: "Alice" }), []);
<Child data={data} />;
```

---

## ❗函数 props 也一样

```jsx
<Child onClick={() => {}} />
```

👉 每次都是新函数

---

## ✅ 解决：useCallback

```jsx
const handleClick = useCallback(() => {}, []);
<Child onClick={handleClick} />;
```

---

# 六、自定义比较函数（高级用法）

```jsx
const Child = memo(
  function Child({ user }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.user.id === nextProps.user.id;
  },
);
```

👉 含义：

- 返回 `true` → 不渲染
- 返回 `false` → 重新渲染

---

# 七、什么时候会重新渲染？

即使使用了 memo，也会在这些情况下重新渲染：

### 1️⃣ props 变化

✔️ 会渲染

### 2️⃣ 自身 state 变化

✔️ 会渲染

### 3️⃣ context 变化

✔️ 会渲染

👉 因为 memo **只控制 props，不控制内部状态** ([react.dev][1])

---

# 八、使用场景（非常重要）

## ✅ 适合用

- 组件渲染**开销大**
- 父组件频繁更新
- props **基本不变**
- 列表项组件（List Item）

👉 典型例子：

```jsx
List → Item（上千个）
```

---

## ❌ 不适合用

- 小组件（渲染成本低）
- props 每次都变
- 不存在性能问题

👉 官方建议：

> memo 是性能优化，而不是必须使用 ([react.dev][1])

---

# 九、React.memo vs useMemo

很多人混淆，这里直接给你对比：

| 对比项   | React.memo       | useMemo      |
| -------- | ---------------- | ------------ |
| 作用对象 | 组件             | 值           |
| 用途     | 避免组件重新渲染 | 缓存计算结果 |
| 类型     | HOC              | Hook         |
| 常见搭配 | useCallback      | memo         |

👉 总结：

- **memo 控制组件**
- **useMemo 控制数据**

---

# 十、经典面试题

## ❓React.memo 能保证不渲染吗？

👉 ❌ 不能

原因：

> 它只是优化手段，不是绝对保证 ([react.dev][1])

---

## ❓为什么用了 memo 还是渲染？

👉 常见原因：

- 传了 object / array
- 传了 function
- context 变化
- key 改变

---

# 十一、最佳实践总结（重点记住）

👉 一句话原则：

> **先写功能 → 用 Profiler 找性能问题 → 再用 memo**

---

## ✅ 推荐组合

```txt
React.memo
+ useMemo
+ useCallback
```

---

## ❌ 不要这样做

```txt
所有组件都包 memo ❌
```

---

# 十二、完整实战示例

```jsx
const Item = memo(({ item, onClick }) => {
  console.log("render item");
  return <div onClick={onClick}>{item.name}</div>;
});

function List({ list }) {
  const handleClick = useCallback((id) => {
    console.log(id);
  }, []);

  return list.map((item) => (
    <Item key={item.id} item={item} onClick={() => handleClick(item.id)} />
  ));
}
```

👉 优化点：

- `Item` 用 memo
- `handleClick` 用 useCallback
- item 保持引用稳定（可用 useMemo）

---

# 最后总结

👉 React.memo 本质：

- 是**组件级缓存**
- 依赖**props 浅比较**
- 用于**减少不必要渲染**

👉 真正核心：

> **减少“无意义的 render”，而不是“避免 render”**
