# 一、什么是 `<Activity>`？

👉 官方定义（来自 React 文档）：

> `<Activity>` 可以**隐藏 UI，同时保留组件状态，并在后台低优先级更新** ([react.dev][1])

---

## 🔥 核心能力总结（非常重要）

`<Activity>` 做了 4 件关键事情：

1. **隐藏 UI（display: none）**
2. **保留组件 state（不会销毁）**
3. **清理副作用（useEffect 会被清理）**
4. **后台低优先级渲染**

👉 可以理解为：

```text
比 unmount 更“轻” → 保留状态
比 CSS 隐藏更“智能” → 自动处理副作用
```

---

# 二、基本用法

## 1️⃣ 基础示例

```jsx
import { Activity } from "react";

function App({ isVisible }) {
  return (
    <Activity mode={isVisible ? "visible" : "hidden"}>
      <Sidebar />
    </Activity>
  );
}
```

---

## 2️⃣ props 说明

| 属性     | 类型                    | 说明        |
| -------- | ----------------------- | ----------- |
| children | ReactNode               | 要控制的 UI |
| mode     | `'visible' \| 'hidden'` | 是否显示    |

默认：

```jsx
<Activity>  // 默认 visible
```

---

# 三、和传统写法对比（重点）

## ❌ 传统方式：条件渲染

```jsx
{
  isVisible && <Sidebar />;
}
```

问题：

- ❌ 组件卸载（state 丢失）
- ❌ 每次重新创建
- ❌ DOM 重新构建

---

## ❌ CSS 隐藏

```jsx
<div style={{ display: isVisible ? "block" : "none" }}>
  <Sidebar />
</div>
```

问题：

- ❌ state 保留 ✔
- ❌ 但副作用仍然运行（如订阅、计时器）

---

## ✅ Activity

```jsx
<Activity mode={isVisible ? "visible" : "hidden"}>
  <Sidebar />
</Activity>
```

效果：

- ✅ state 保留
- ✅ 副作用清理
- ✅ 后台低优先级更新

---

# 四、核心使用场景

## 1️⃣ Tab 切换（最经典）

```jsx
<Activity mode={tab === 'home' ? 'visible' : 'hidden'}>
  <Home />
</Activity>

<Activity mode={tab === 'profile' ? 'visible' : 'hidden'}>
  <Profile />
</Activity>
```

👉 优点：

- 切换回来不会重置输入框
- 不会重新请求数据
- UI 更流畅

---

## 2️⃣ 保留表单状态

```jsx
<Activity mode={showForm ? "visible" : "hidden"}>
  <Form />
</Activity>
```

👉 用户填写内容不会丢失

---

## 3️⃣ 预渲染（性能优化）

```jsx
<Activity mode="hidden">
  <NextPage />
</Activity>
```

👉 提前渲染未来页面：

- 切换更快
- 减少白屏

---

## 4️⃣ Sidebar / Drawer

```jsx
<Activity mode={open ? "visible" : "hidden"}>
  <Sidebar />
</Activity>
```

👉 打开时瞬间恢复状态

---

# 五、生命周期变化（非常关键）

当 `mode = hidden` 时：

| 行为      | 是否发生                |
| --------- | ----------------------- |
| DOM       | ❌ 隐藏（display:none） |
| state     | ✅ 保留                 |
| useEffect | ❌ 清理                 |
| 重新渲染  | ✅（低优先级）          |

当重新 `visible`：

- state 恢复
- effect 重新执行 ([react.dev][1])

---

# 六、一个完整示例（推荐掌握）

```jsx
import { Activity, useState } from "react";

function App() {
  const [tab, setTab] = useState("home");

  return (
    <>
      <button onClick={() => setTab("home")}>Home</button>
      <button onClick={() => setTab("contact")}>Contact</button>

      <Activity mode={tab === "home" ? "visible" : "hidden"}>
        <Home />
      </Activity>

      <Activity mode={tab === "contact" ? "visible" : "hidden"}>
        <Contact />
      </Activity>
    </>
  );
}
```

👉 效果：

- 输入内容不会丢
- 切换无闪烁

---

# 七、⚠️ 注意事项（踩坑重点）

## 1️⃣ 视频 / 音频不会自动停止

```jsx
<video autoPlay />
```

👉 hidden 时仍然播放 ❗

✔ 解决：

```jsx
useEffect(() => {
  return () => video.pause();
}, []);
```

---

## 2️⃣ 不等于完全 unmount

虽然 effect 被清理，但：

- DOM 仍在（只是隐藏）
- 某些副作用仍可能存在

---

## 3️⃣ 内存占用更高

👉 因为：

- 组件没有销毁
- 状态一直保留

---

## 4️⃣ 不适合大量列表

例如：

```jsx
1000 个 Activity
```

👉 会导致：

- 内存暴涨
- 渲染压力增加

---

# 八、和 `<Suspense>` 的关系

| 特性         | Activity | Suspense |
| ------------ | -------- | -------- |
| 控制可见性   | ✅       | ❌       |
| 保留状态     | ✅       | ❌       |
| 处理 loading | ❌       | ✅       |
| 预渲染       | ✅       | ✅       |

👉 可以一起用：

```jsx
<Activity>
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
</Activity>
```

---

# 九、一句话总结

👉 `<Activity>` 本质是：

> **“带状态缓存 + 副作用管理 + 优先级调度”的 UI 隐藏机制**

---

# 十、什么时候用？（经验总结）

✅ 适合：

- Tab 切换
- 表单缓存
- 页面预加载
- Sidebar / Modal

❌ 不适合：

- 大规模列表
- 内存敏感场景
- 完全不需要保留状态的组件
