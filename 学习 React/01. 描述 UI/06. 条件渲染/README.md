# 概览

通常你的组件会需要根据不同的情况显示不同的内容。在 React 中，你可以通过使用 JavaScript 的 `if` 语句、`&&` 和 `? :` 运算符来选择性地渲染 JSX。

<br>

## 条件返回 JSX

假设有一个 `PackingList` 组件，里面渲染多个 `Item` 组件，每个物品可标记为打包与否：

App.js

```jsx
function Item({ name, isPacked }) {
	return <li className="item">{name}</li>;
}

export default function PackingList() {
	return (
		<section>
			<h1>Sally Ride 的行李清单</h1>
            <ul>
				<Item 
					isPacked={true}
                    name="宇航服"
                />
                <Item
					isPacked={true}
                    name="带金箔的头盔" 
                />
                <Item 
					isPacked={false}
                    name="Tam 的照片"
                />
            </ul>
        </section>
    )
}
```

需要注意的是，有些 `Item` 组件的 `isPacked` 属性是被设为 `true` 而不是 `false`。你可以在那些满足 `isPacked={true}` 条件的物品旁加上一个勾选符号（✅）。

你可以用 [if/else 语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/if...else) 去判断：

```jsx
if (isPacked) {
    return <li className="item">{name} ✅</li>
}
return <li className="item">{name}</li>
```

如果 `isPacked` 属性是 `true`，这段代码会**返回一个不一样的 JSX**。通过这样的改动，一些物品的名字后面会出现一个勾选符号：

App.js

```jsx
function Item({ name, isPacked }) {
    if (isPacked) {
        return <li className="item">{name} ✅</li>
    }
    return <li className="item">{name}</li>
}

export default function PackingList() {
    return (
        <section>
			<h1>Sally Ride 的行李清单</h1>
            <ul>
				<Item
                    isPacked={true}
                    name="宇航服"
                />
                <Item
                    isPacked={true}
                    name="带金箔的头盔" 
                />
                <Item
                    isPacked={false}
                    name="Tam 的照片"
                />
            </ul>
        </section>
    )
}
```

动手尝试一下，看看各种情况会出现什么不同的结果！

留意这里你是怎么使用 JavaScript 的 `if` 和 `return` 语句来写分支逻辑。在 React 中，是由 JavaScript 来处理控制流的（比如条件）。

<br>

### 选择性地返回 `null`

在一些情况下，你不想有任何东西进行渲染。比如，你不想显示已经打包好的物品。但一个组件必须返回一些东西。这种情况下，你可以直接返回 `null`。

```jsx
if (isPacked) {
    return null;
}
return <li className="item">{name}</li>
```

如果组件的 `isPacked` 属性为 `true`，那么它将只返回 `null`。否则，它将返回相应的 JSX 用来渲染。

App.js

```jsx
function Item({ name, isPacked }) {
    if (isPacked) {
        return null;
    }
    return <li className="item">{name}</li>
}

export default function PackingList() {
    return (
        <section>
			<h1>Sally Ride 地行李清单</h1>
            <ul>
                <Item
                    isPacked={true}
                    name="宇航服"
                />
                <Item
                    isPacked={true}
                    name="带金箔的头盔" 
 				/>
                <Item
                    isPacked={false}
                    name="Tam 的照片"
				/>
            </ul>
        </section>
    )
}
```

实际上，在组件里返回 `null` 并不常见，因为这样会让想使用它的开发者感觉奇怪。通常情况下，你可以在父组件里选择是否要渲染该组件。让我们接着往下看吧。

<br>

# 选择性地包含 JSX

在之前的例子里，你在组件内部控制哪些 JSX 树（如果有的话！）会返回。你可能已经发现了在渲染输出里会有一些重复的内容：

```jsx
<li className="item">{name} ✅</li>
```

和下面的写法很像：

```jsx
<li className="item">{name}</li>
```

两个条件分支都会返回 `<li className="item">...</li>`：

```jsx
if (isPacked) {
    return <li className="item">{name} ✅</li>
}
return <li className="item">{name}</li>
```

虽然这些重复的内容没什么害处，但这样可能会导致你的代码更难维护。比如你想更改 `className`？你就需要修改两个地方！针对这种情况，你可以通过选择性地包含一小段 JSX 来让你的代码更加 [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself)。

<br>

## 三目运算符（`?:`）

JavaScript 有一种紧凑型语法来实现条件判断表达式——[条件运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) 又称“三目运算符”。

除了这样：

```jsx
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```

你还可以这样实现：

```jsx
return (
	<li className="item">
        {isPacked ? name + ' ✅' : name}
    </li>
)
```

你可以认为，*“如果 `isPacked` 为 true 时，则（`?`）渲染 `name + ' ✅'`，否则（`:`）渲染 `name`。”*

现在，假如你想将对应物品的文本放到另一个 HTML 标签里，比如用 `<del>` 来显示删除线。你可以添加更多的换行和括号，以便在各种情况下更好地去嵌套 JSX：

App.js

```jsx
function Item({ name, isPacked }) {
    return (
        <li className="item">
            {isPacked ? (
                <del>
                    {name + ' ✅'}
                </del>
            ): (
                name
            )}
        </li>
    )
}

export default function PackingList() {
    return (
        <section>
            <h1>Sally Ride 的行李清单</h1>
            <ul>
                <Item
                    isPacked={true}
                    name="宇航服"
                />
                <Item
                    isPacked={true}
					name="带金箔的头盔" 
				/>
                <Item
                    isPacked={false}
                    name="Tam 的照片"
                />
            </ul>
        </section>
    )
}
```

对于简单的条件判断，这样的风格可以很好地实现，但需要适量使用。如果你的组件里有很多的嵌套式条件表达式，则需要考虑通过提取为子组件来简化这些嵌套表达式。在 React 里，标签也是你代码中的一部分，所以你可以使用变量和函数来整理一些复杂的表达式。

<br>

## 与运算符（`&&`）

你会遇到的另一个常见的快捷表达式是 [JavaScript 逻辑与（`&&`）运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The logical AND ( %26%26 ) operator,it returns a Boolean value.)。在 React 组件里，通常用在当条件成立时，你想渲染一些 JSX，**或者不做任何渲染**。使用 `&&`，你也可以实现仅当 `isPacked` 为 `true` 时，渲染勾选符号。

```jsx
return (
    <li className="item">
        {name} {isPacked && '✅'}
    </li>
);
```

你可以认为，*“当 `isPacked` 为真值时，则（`&&`）渲染勾选符号，否则，不渲染。”*

下面为具体的例子：

App.js

```jsx
function Item({ name, isPacked }) {
    return (
        <li className="item">
            {name} {isPacked && '✅'}
        </li>
    );
}

export default function PackingList() {
    return (
        <section>
			<h1>Sally Ride 的行李清单</h1>
            <ul>
                <Item 
                    isPacked={true} 
                    name="宇航服" 
                />
                <Item 
                    isPacked={true} 
                    name="带金箔的头盔" 
                />
                <Item 
                    isPacked={false} 
                    name="Tam 的照片" 
                />
            </ul>
        </section>
    );
}
```

当 [JavaScript && 表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_AND) 的左侧（我们的条件）为 `true` 时，它则返回其右侧的值（在我们的例子里是勾选符号）。但条件的结果是 `false`，则整个表达式会变成 `false`。在 JSX 里，React 会将 `false` 视为一个“空值”，就像 `null` 或者 `undefined`，这样 React 就不会在这里进行任何渲染。

>陷阱
>
>**切勿将数字放在 `&&` 左侧.**
>
>JavaScript 会自动将左侧的值转换成布尔类型以判断条件成立与否。然而，如果左侧是 `0`，整个表达式将变成左侧的值（`0`），React 此时则会渲染 `0` 而不是不进行渲染。
>
>例如，一个常见的错误是 `messageCount && <p>New messages</p>`。其原本是想当 `messageCount` 为 0 的时候不进行渲染，但实际上却渲染了 `0`。
>
>为了更正，可以将左侧的值改成布尔类型：`messageCount > 0 && <p>New messages</p>`。

<br>

## 选择性地将 JSX 赋值给变量

当这些快捷方式妨碍写普通代码时，可以考虑使用 `if` 语句和变量。因为你可以使用 [`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 进行重复赋值，所以一开始你可以将你想展示的（这里指的是物品的名字）作为默认值赋予给该变量。

```jsx
let itemContent = name;
```

结合 `if` 语句，当 `isPacked` 为 `true` 时，将 JSX 表达式的值重新赋值给 `itemContent`：

```jsx
if (isPacked) {
    itemContent = name + " ✅"
}
```

[在 JSX 中通过大括号使用 JavaScript](https://zh-hans.react.dev/learn/javascript-in-jsx-with-curly-braces#using-curly-braces-a-window-into-the-javascript-world)。将变量用大括号嵌入在返回的 JSX 树中，来嵌套计算好的表达式与 JSX：

```jsx
<li className="item">
	{itemContent}
</li>
```

这种方式是最冗长的，但也是最灵活的。下面是相关的例子：

App.js

```jsx
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✅";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}
```

跟之前的一样，这个方式不仅仅适用于文本，任意的 JSX 均适用：

App.js

```jsx
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✅"}
      </del>
    );
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}
```

如果对 JavaScript 不熟悉，这些不同的风格一开始可能会让你感到不知所措。但是，学习这些将有助于你理解和写任何的 JavaScript 代码，而不仅仅是 React 组件。一开始可以选择一个你喜欢的来用，然后当你忘记其他的怎么用时，可以再翻阅这份参考资料。

