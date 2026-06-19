# 一、什么是 Fragment？

在 React 中，一个组件必须返回**一个根节点**。

❌ 错误写法：

```jsx
function App() {
  return (
    <h1>Hello</h1>
    <p>World</p>
  )
}
```

✔ 正确（用 Fragment）：

```jsx
function App() {
  return (
    <>
      <h1>Hello</h1>
      <p>World</p>
    </>
  );
}
```

👉 Fragment 的作用就是：
**把多个 JSX 元素“打包”，但不会渲染成真实 DOM 节点**

---

# 二、两种写法（必须掌握）

## 1️⃣ 简写（最常用）

```jsx
<>
  <Child1 />
  <Child2 />
</>
```

👉 等价于：

```jsx
<React.Fragment>
  <Child1 />
  <Child2 />
</React.Fragment>
```

---

## 2️⃣ 完整写法（需要 import）

```jsx
import { Fragment } from "react";

<Fragment>
  <Child1 />
  <Child2 />
</Fragment>;
```

---

# 三、为什么要用 Fragment？

## ✅ 1. 避免多余 DOM

不用 Fragment：

```jsx
<div>
  <li>1</li>
  <li>2</li>
</div>
```

用 Fragment：

```jsx
<>
  <li>1</li>
  <li>2</li>
</>
```

👉 渲染结果：

```html
<li>1</li>
<li>2</li>
```

✔ DOM 更干净
✔ 避免布局问题（比如 flex/grid）
✔ 减少嵌套层级

---

## ✅ 2. 语义更正确

比如在 table 里：

❌ 错误：

```jsx
<tr>
  <div>
    <td>1</td>
    <td>2</td>
  </div>
</tr>
```

✔ 正确：

```jsx
<tr>
  <>
    <td>1</td>
    <td>2</td>
  </>
</tr>
```

---

## ✅ 3. 组件必须返回一个“整体”

Fragment 让你返回多个元素但仍满足 React 规则。

---

# 四、核心使用场景

## 1️⃣ 组件返回多个节点

```jsx
function Post() {
  return (
    <>
      <h1>Title</h1>
      <p>Content</p>
    </>
  );
}
```

---

## 2️⃣ JSX 变量

```jsx
const buttons = (
  <>
    <button>OK</button>
    <button>Cancel</button>
  </>
);
```

---

## 3️⃣ 条件渲染

```jsx
{
  isLogin && (
    <>
      <Header />
      <Dashboard />
    </>
  );
}
```

---

## 4️⃣ 列表渲染（重点）

❗ 这里必须用完整写法：

```jsx
import { Fragment } from "react";

list.map((item) => (
  <Fragment key={item.id}>
    <h1>{item.title}</h1>
    <p>{item.content}</p>
  </Fragment>
));
```

👉 原因：

- 简写 `<>` **不能写 key**
- key 是列表必须的

---

# 五、Fragment vs div（面试高频）

| 对比点       | Fragment                | div         |
| ------------ | ----------------------- | ----------- |
| 是否产生 DOM | ❌ 不产生               | ✅ 会产生   |
| 是否影响布局 | ❌ 不影响               | ✅ 可能影响 |
| 是否可加属性 | ⚠️ 只能 key（简写不行） | ✅ 任意属性 |
| 使用场景     | 结构包装                | 布局/样式   |

👉 一句话总结：
**Fragment = “逻辑分组”，div = “真实结构”**

---

# 六、注意事项（很容易踩坑）

## ⚠️ 1. 简写不能加 key

```jsx
<>...</> ❌ 不支持 key
```

必须：

```jsx
<Fragment key="id">...</Fragment>
```

---

## ⚠️ 2. 不能加 className / style

```jsx
<> ❌ className="box" </> // 错误
```

👉 因为它不会变成 DOM

---

## ⚠️ 3. ref 只能用于完整写法（新特性）

```jsx
<Fragment ref={ref}>...</Fragment>
```

👉 简写不支持

---

## ⚠️ 4. Fragment 只是语法糖

最终不会出现在 DOM 中：

```jsx
<>
  <h1>Hello</h1>
</>
```

👉 实际 DOM：

```html
<h1>Hello</h1>
```

---

# 七、进阶（很多人不知道）

## 🔥 Fragment + ref（React 新能力）

可以操作多个子节点：

```jsx
const ref = useRef(null);

<Fragment ref={ref}>
  <input />
  <button>Submit</button>
</Fragment>;
```

👉 可以：

- 批量绑定事件
- 控制 focus
- 做可见性监听

---

# 八、一句话总结

👉 Fragment 的本质就是：

**“不产生 DOM 的虚拟容器，用来包裹多个元素”**

---

# 九、什么时候必须用？

你可以记一个简单规则：

👉 **只要你写了 `<div>` 但不想让它出现在 DOM 里 → 用 Fragment**
