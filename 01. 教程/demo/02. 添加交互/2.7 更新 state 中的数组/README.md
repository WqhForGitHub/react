# 更新 state 中的数组

数组是另外一种可以存储在 state 中的 JavaScript 对象，它虽然是可变的，但却应该被视为不可变。同对象一样，当你想要更新存储于 state 中的数组时，你需要创建一个新的数组（或者创建一份已有数组的拷贝值），并使用新数组设置 state。

## 启动

```bash
npm install
npm run dev
```

## Demo 说明

### 添加元素

`push()` 和 `unshift()` 会直接修改原始数组，在 React 中不应该这样做。应该使用展开语法 `[...arr, newItem]` 创建一个新数组来添加元素：

```jsx
// 添加到末尾
setArtists([...artists, { id: nextId++, name }]);

// 添加到开头
setArtists([{ id: nextId++, name }, ...artists]);
```

### 删除元素

从数组中删除一个元素最简单的方法就是将它**过滤出去**。`filter()` 不会改变原始数组，而是返回一个全新的数组：

```jsx
setArtists(artists.filter(a => a.id !== artist.id));
```

### 转换数组

如果你想改变数组中的某些或全部元素，可以用 `map()` 创建一个新数组。传入 `map` 的函数决定了要根据每个元素的值或索引对元素做何处理：

```jsx
const nextShapes = shapes.map(shape => {
  if (shape.type === 'square') {
    return shape;
  } else {
    return { ...shape, y: shape.y + 50 };
  }
});
setShapes(nextShapes);
```

### 替换元素

类似 `arr[0] = 'bird'` 这样的赋值会直接修改原始数组，应该使用 `map`。在 `map` 回调中，使用索引来判断是返回原始元素还是替换后的值：

```jsx
const nextCounters = counters.map((c, i) => {
  if (i === index) {
    return c + 1;
  } else {
    return c;
  }
});
setCounters(nextCounters);
```

### 插入元素

使用展开运算符 `...` 和 `slice()` 将元素插入到特定位置：先展开插入点之前的切片，然后插入新元素，最后展开剩余部分：

```jsx
const insertAt = 1;
const nextArtists = [
  ...artists.slice(0, insertAt),
  { id: nextId++, name },
  ...artists.slice(insertAt),
];
setArtists(nextArtists);
```

### 排序与翻转

`reverse()` 和 `sort()` 会改变原数组，不能直接使用。但可以先拷贝数组，再改变拷贝后的值：

```jsx
const nextList = [...list];
nextList.reverse();
setList(nextList);
```

> **注意：** 即使拷贝了数组，你还是不能直接修改其内部的元素。数组的拷贝是浅拷贝——新的数组中依然保留了与原始数组相同的元素。修改 `nextList[0].seen` 会直接修改原始 state 中的对象。

### 更新内部对象

对象并不是"位于"数组内部，数组只是指向它们。浅拷贝数组后，内部元素仍然与原数组共享。正确做法是使用 `map` 创建新数组，同时用对象展开语法拷贝要修改的对象：

```jsx
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    return { ...artwork, seen: nextSeen };
  } else {
    return artwork;
  }
}));
```

这样两个清单的 state 互不影响，勾选一个清单中的事项不会影响另一个。

## 摘要

- 你可以把数组放入 state 中，但你不应该直接修改它
- 不要直接修改数组，而是创建它的一份**新的**拷贝，然后使用新的数组来更新它的状态
- 你可以使用 `[...arr, newItem]` 这样的数组展开语法来向数组中添加元素
- 你可以使用 `filter()` 和 `map()` 来创建一个经过过滤或者变换的数组
- 你可以使用 `slice()` 和展开语法向数组特定位置插入元素
- 需要排序或翻转时，先拷贝数组再操作
- 更新数组内部的对象时，必须同时拷贝数组和要修改的对象
