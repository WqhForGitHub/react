# 更新 state 中的对象

state 中可以保存任意类型的 JavaScript 值，包括对象。但是，你不应该直接修改存放在 React state 中的对象。相反，当你想要更新一个对象时，你需要创建一个新的对象（或者将其拷贝一份），然后将 state 更新为此对象。

## 运行

```bash
npm install
npm run dev
```

## 项目结构

```
06. 更新 state 中的对象/
  .gitignore
  eslint.config.js
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  public/
    favicon.svg
  src/
    main.tsx
    App.tsx
    App.css
    index.css
    vite-env.d.ts
    demos/
      MovingDotMutationDemo.tsx   # 直接修改 state（错误示范）
      MovingDotCorrectDemo.tsx    # 创建新对象（正确方式）
      FormSpreadDemo.tsx          # 展开语法复制对象
      FormDynamicDemo.tsx         # 动态属性名
      NestedObjectDemo.tsx        # 更新嵌套对象
      ImmerDemo.tsx               # 使用 Immer
```

## Demo 列表

### 1. 直接修改 state（错误示范）

直接修改 `position.x` 和 `position.y`，React 不知道对象已被更改，因此不会触发重新渲染，红点不会跟随指针移动。这就是 **mutation**——修改了已存在于 state 中的对象。

### 2. 创建新对象（正确方式）

使用 `setPosition({ x: e.clientX, y: e.clientY })` 创建新对象并传递给 state 设置函数，React 检测到 state 变化后触发重新渲染，红点跟随指针移动。

### 3. 展开语法复制对象

使用 `...` 展开语法复制对象中其他字段，只覆盖需要修改的字段：

```jsx
setPerson({
  ...person,              // 复制上一个 person 中的所有字段
  firstName: e.target.value  // 但是覆盖 firstName 字段
});
```

### 4. 动态属性名

使用 `[e.target.name]` 动态属性名，一个事件处理函数即可更新表单中的多个字段，而不需要为每个字段单独编写处理函数：

```jsx
function handleChange(e) {
  setPerson({
    ...person,
    [e.target.name]: e.target.value
  });
}
```

### 5. 更新嵌套对象

更新嵌套对象时，需要从更新的位置开始自底向上为每一层都创建新的拷贝。展开语法是浅拷贝，只复制一层：

```jsx
setPerson({
  ...person,              // 复制 person
  artwork: {              // 替换 artwork
    ...person.artwork,    // 复制 artwork 中的字段
    city: e.target.value  // 覆盖 city
  }
});
```

### 6. 使用 Immer

`use-immer` 让你可以像直接修改对象一样编写代码，Immer 会自动处理好复制的过程。特别适合有多层嵌套的 state：

```jsx
updatePerson(draft => {
  draft.artwork.city = e.target.value;
});
```

Immer 提供的 `draft` 是一种 Proxy 对象，它会记录你的修改操作，然后根据修改创建出一个全新的对象，因此不会覆盖之前的 state。

## 摘要

- 将 React 中所有的 state 都视为不可直接修改的。
- 当你在 state 中存放对象时，直接修改对象并不会触发重渲染，并会改变前一次渲染"快照"中 state 的值。
- 不要直接修改一个对象，而要为它创建一个**新**版本，并通过把 state 设置成这个新版本来触发重新渲染。
- 你可以使用 `{...obj, something: 'newValue'}` 对象展开语法来创建对象的拷贝。
- 对象的展开语法是浅层的：它的复制深度只有一层。
- 想要更新嵌套对象，你需要从你更新的位置开始自底向上为每一层都创建新的拷贝。
- 想要减少重复的拷贝代码，可以使用 Immer。
