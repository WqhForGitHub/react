# 1. useMemo 是什么？

`useMemo` 的作用一句话：

> **缓存计算结果，避免每次组件渲染都重新计算。**

语法：

```js
const memoValue = useMemo(() => {
  return computeSomething(a, b);
}, [a, b]);
```

👉 只有当依赖 `[a, b]` 发生变化时，才会重新计算。

否则直接返回“缓存结果”。([ja.react.dev][1])

---

# 2. useMemo 做了什么（核心原理）

React 每次 re-render：

- 组件函数会重新执行
- 所有普通计算都会重新跑一遍

比如：

```js
const filtered = items.filter((x) => x.active);
```

每次 render 都会重新 filter。

👉 用 useMemo 后：

```js
const filtered = useMemo(() => {
  return items.filter((x) => x.active);
}, [items]);
```

只有 `items` 变化才重新计算，否则复用旧结果。([Hack Frontend][2])

---

# 3. useMemo 适合的场景（重点）

## ✅ 1）高开销计算

比如：

- filter 大数组
- sort 大列表
- 复杂计算（统计、递归、转换）

```js
const sortedList = useMemo(() => {
  return bigList.sort(compareFn);
}, [bigList]);
```

---

## ✅ 2）保持引用稳定（非常重要）

React 判断变化靠 **引用（reference）**

```js
const config = { theme: "dark" };
```

每次 render 都是新对象 → 子组件会认为“变了”

用 useMemo：

```js
const config = useMemo(
  () => ({
    theme: "dark",
  }),
  [],
);
```

👉 保持引用不变，避免子组件重复渲染

---

## ✅ 3）作为 useEffect / useCallback 依赖

避免依赖“每次都变”的值：

```js
const data = useMemo(() => transform(rawData), [rawData]);

useEffect(() => {
  fetch(data);
}, [data]);
```

---

## ✅ 4）配合 React.memo 使用

```js
const Child = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

如果 `data` 不稳定 → memo 失效
👉 useMemo 用来稳定 data

---

# 4. useMemo vs useCallback（一定要懂）

| Hook        | 作用       |
| ----------- | ---------- |
| useMemo     | 缓存“值”   |
| useCallback | 缓存“函数” |

本质关系：

```js
useCallback(fn, deps)
≈
useMemo(() => fn, deps)
```

---

# 5. useMemo 的正确使用原则（非常重要）

## ❗原则 1：不要为了“看起来优化”就用

> 不是所有地方都需要 useMemo

React 官方思想：

- 默认不需要优化
- 先写对，再优化

---

## ❗原则 2：只用于“真的贵”的计算

如果计算很简单：

```js
const x = a + b;
```

👉 用 useMemo 是“反优化”（有额外成本）

---

## ❗原则 3：避免滥用

滥用会导致：

- 代码复杂
- 内存占用增加
- 反而变慢（memo 本身也有开销）

---

# 6. 常见误区

## ❌ 误区 1：useMemo = 防止组件重渲染

不是！

👉 它只是缓存“值”，不会阻止 render

---

## ❌ 误区 2：所有 state 都要 memo

错的。

只有：

- 重计算
- 大对象
- 依赖稳定性问题

才需要。

---

## ❌ 误区 3：useMemo 提升所有性能

实际上：

> 小计算 + useMemo ≠ 更快，可能更慢

---

# 7. 一个完整例子（实战）

```js
function App({ users, keyword }) {
  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.name.includes(keyword));
  }, [users, keyword]);

  return <UserList data={filteredUsers} />;
}
```

👉 优化点：

- keyword 不变时不重复 filter
- users 不变时复用结果
- 避免 UserList 无意义重渲染

---

# 8. 一句话总结

👉 `useMemo` 的核心价值：

> **用“空间（缓存）”换“时间（避免重复计算）”，并保持引用稳定性**
