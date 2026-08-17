# 1.1 初始前端框架

下面的公式几乎可以概括所有现代前端框架的实现原理：

UI = f(state)

其中：
- state 代表当前视图状态
- f 代表框架内部运行机制
- UI 代表宿主环境的视图

这个公司会贯穿全书的学习，即框架内部运行机制根据当前状态渲染视图。本章将以此公式为线索拆解主流前端框架，分析它们的技术特点与实现原理，目的是定义一个前端框架分类标准。接下来我们会使用该标准为主流框架分类，方便读者在深入学习 React 前对 React 在众多前端框架中的定位有初步的了解。
## 1.1.1 如何描述 UI

前端领域经过长期发展，逐渐形成以下两种主流的描述 UI 的方案：
- JSX
- 模板语言
下面从这两种方案的起源开始介绍它们的区别。
JSX 是 Meta（原 Facebook）提出的一种类 XML 语法的 ECMAScript（后文简称为 ES）语法糖（指某种对语言功能没有影响，但是方便开发者使用的语法，通常可以增加程序可读性），例如下面的变量声明语句：
```jsx
const element = <h1>Hello, world!</h1>;
```
该语句经由编译工具（通常是 babel）编译后成为：
```jsx
// React v17 之前
var element = React.createElement("h1", null, "Hello, world!");
// React v17 之后
var _jsxRuntime = require("react/jsx-runtime");
var element = _jsxRuntime.jsx("h1", { children: "Hello, world!" });
```
在框架的运行时，React.createElement（React v17 之前）或 jsxRuntime.jsx（React v17 之后）执行后会得到如下数据结构，公式 UI = f(state) 中的 f 会以该数据结构作为渲染 UI 的依据：
```json
{
	"type": "h1",
	"key": null,
	"ref": null,
	"props": {
		"children": "Hello, world!"
	},
	"_owner": null,
	"_store": {}
}
```
## 1.1.2 如何组织 UI 与逻辑

为了实现 UI 与逻辑的关注点分离（计算机术语，指将计算机程序分别为不同部分的设计原则），需要一种存放 UI 与逻辑松散耦合单元，这就是组件。关于组件，有两个很重要的问题需要解释：
（1）组件如何组织逻辑与 UI？
（2）如何在组件之间传输数据？
这里借助初中数学知识自变量与因变量回答上述两个问题。同时，自变量与因变量也可以作为学习 React Hooks、Vue Composition、Svelte 或 SolidJS 的一个虚拟视角。考虑如下等式：
2x+1 = y
x 的变化会导致 y 的变化，其中 x 被称为自变量，y 被称为因变量。
在 React Hooks 中可以如下方式定义自变量：
```jsx
// 初始值为 0 的自变量 x
const [x, setX] = useState(0);
// 取值
console.log(x);
// 赋值
setX(2);
```
在 Vue Composition 中可以如下方式定义自变量：
```jsx
// 初始值为 0 的自变量 x
const x = ref(0);
// 取值
console.log(x.value);
// 赋值
x.value = 2;
```
在 React Hooks 出现之前，为了使 React 能够定义自变量，可以使用 Mobx 状态管理库，以下是在 Mobx 中定义自变量的方式：
```jsx
// 初始化为 0 的自变量 x
const x = observable({ data: 0 });
// 取值
console.log(x.data);
// 赋值
x.data = 2;
```
Svelte、SolidJS 也遵循同样的模式，这里不展开举例。
在这些框架或状态管理库中，自变量普遍由 getter（取值）与 setter（赋值）两部分组成。自变量变化会导致依赖它的因变量变化。在前端框架中，因变量有两种类型：
（1）无副作用因变量
（2）有副作用因变量
这里的副作用是函数式编程中的概念，是指在函数执行过程中产生对外部环境的影响。如果一个函数同时满足如下条件，则称这个函数为纯函数：
（1）相同的输入始终获得相同的输出
（2）不会修改程序的状态或引起副作用
对于如下函数，如果参数 x 固定，则 calc(x) 的结果固定，并且函数执行过程中不修改程序的状态或引起副作用，所以 calc 是纯函数：
```jsx
function calc(x) {
	return 2x + 1;
}
```
对于如下函数，由于引入了随机数，对于固定的参数 x，函数 calcRandom(x) 的结果不固定，因此该函数不是纯函数：
```jsx
function calcRandom(x) {
	retun 2x + 1 + Math.random();
}
```
对于如下函数，虽然对于固定的参数 x，calc(x) 的结果是固定，但是函数执行过程中修改了函数外部的变量，引起副作用，所以该函数不是纯函数：
```jsx
function calc(x) {
	document.tilte = x;
	return 2x + 1;
}
```
除修改函数外部变量外，调用 DOM API、I/O 操作，控制台打印信息等 "函数调用过程中产生的，外部可观察的变化" 都属于副作用。
在 React Hooks 中可以用如下方式定义无副作用因变量：
```jsx
// 定义依赖 x 的因变量 y
const y = useMemo(() => x * 2 + 1, [x]);
// 取值
console.log(y);
```
在 Vue Composition 中可以用如下方式定义 "无副作用因变量"：
```jsx
// 定义依赖 x 的因变量 y
const y = computed(() => x.value * 2 + 1);
// 取值
console.log(y.value);
```
在 Mobx 中可以用如下方式定义无副作用因变量：
```jsx
// 定义依赖 x 的因变量 y
const y = computed(() -> x.data * 2 + 1);
// 取值
console.log(y.get());
```
由于因变量会根据依赖的自变量变化而变化，因此自变量不需要赋值。为了减少业务开发过程中无副作用因变量相关的潜在 bug，无副作用因变量应该设计为纯函数。
自变量变化导致的副作用可以交由有副作用因变量处理，在 React Hooks 中可以用如下方式定义：
```jsx
// 当依赖的 x 变化，修改页面标题（副作用）
useEffect()_ => document.title =x, [x]);
```
在 Vue Composition 中可以用如下方式定义有副作用因变量：
```jsx
watchEffect(() => document.title = x.value);
```
在 Mobx 中可以用如下方式定义有副作用因变量：
```jsx
autorun(() => document.title = x.data);
```
了解以上自变量与因变量的概念后，我们来看第一个问题，即组件如何组织逻辑与 UI？思考如下 React 组件（Vue 组件同样适用）：
```jsx
function Counter() {
	const [num, updateNum] = useState(0);
	return (
		<p onClick={() => updateNum(num + 1)}>
			<span>值为</span>{num}
		</p>
	)
}
```
Counter 的作用是记录点击次数，其中定义了自变量 num，初始值为 0。UI 由 P、SPAN 这两个元素构成，逻辑为：当 P 元素触发点击事件，执行 updateNum 方法时，自变量 num 更新为 num + 1，进而导致 UI 中 P 元素内容发生变化。可以发现，**逻辑中的自变量变化可以导致 UI 变化**。
由于自变量可以改变 UI，因此自变量也能通过改变因变量间接改变 UI。首先修改 Counter，增加 "依赖自变量 num 的因变量 fixesNum"，它会将整数转化为保留两位小数的格式。然后将 UI 中使用的 num 替换为 fixedNum：
```jsx
function Counter() {
	const [num, updateNum] = useState(0);
	const fixedNum = useMemo(() => num.toFixed(2), [num]);
	return (
		<p onClick={() => updateNum(num + 1) }>
			<span>值为</span>{fixedNum}
		</p>
	)
}
```
当 P 元素触发点击事件，num 变化，fixedNum 随之发生变化，会进一步导致 UI 变化。
可以发现，**逻辑中的自变量变化，会导致"无副作用因变量"变化，进一步导致 UI 变化**。
这里使用 useMemo 只是为了演示其因变量的本质，实际开发时可以用如下语句替换 fixedNum 的定义，实现同样的效果：
```jsx
const fixedNum = num.toFixed(2);
```
>注
>
>关于是否使用 useMemo 与 React 的性能优化相关，相关知识将在 6.5 节介绍。

这里我们使用 useEffect 为 Counter 增加副作用，当 num 发生变化后，修改当前页面标题，代码如下：
```jsx
function Counter() {
	const [num, updateNum] = useState(0);
	const fixedNum = useMemo(() -> num.toFixed(2), [num]);
	useEffect(() => document.title = '当前值：${fixedNum}', [fixedNum]);
	return (
		<p onClick={() => updateNum(num + 1)}>
			<span>值为</span>{fixedNum}
		</p>
	)
}
```
可以发现，逻辑中的自变量变化，会导致 "有副作用因变量"变化，执行副作用。组件内部工作流程如图 1-1 所示。
![组件内部工作流程](https://front-end-1257950569.cos.ap-guangzhou.myqcloud.com/react/react%E8%AE%BE%E8%AE%A1%E5%8E%9F%E7%90%86%EF%BC%88%E7%AC%AC%E4%BA%8C%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%80%E7%AB%A0%EF%BC%9A%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6%E5%8E%9F%E7%90%86%E6%A6%82%E8%A7%88/%E7%BB%84%E4%BB%B6%E5%86%85%E9%83%A8%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B.png)
图 1-1 组件内部工作流程

综上所述，组件通过三种方式组织逻辑与 UI：
（1）逻辑中的自变量变化，导致 UI 变化
（2）逻辑中的自变量变化，导致 "无副作用因变量"变化，导致 UI 变化
（3）逻辑中的自变量变化，导致 "有副作用因变量"变化，导致副作用
## 1.1.3 如何在组件之间传输数据

新增 Strong 组件，它会将传递给它的 text 以 "加粗" 的形式显示：
```jsx
function Strong({text}) {
	return <strong>{text}</strong>
}
```
将 Counter 中 UI 部分使用的 fixedNum 替换为 `<Strong text={fixedNum}/>`，页面中会显示 “加粗的 fixedNum”：
```jsx
// 替换前（为了便于阅读，省略 onClick 回调函数）
<p><span>值为</span>{{fixedNum}}</p>
// 替换后（为了便于阅读，省略 onClick 回调函数）
<p><span>值为</span><Strong text={{fixedNum}} /></p>
```
这里用流程图的形式表示 Counter 与 Strong 组件之间的数据传输，如图 1-2 所示。
![组件间数据传输示例](https://front-end-1257950569.cos.ap-guangzhou.myqcloud.com/react/react%E8%AE%BE%E8%AE%A1%E5%8E%9F%E7%90%86%EF%BC%88%E7%AC%AC%E4%BA%8C%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%80%E7%AB%A0%EF%BC%9A%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6%E5%8E%9F%E7%90%86%E6%A6%82%E8%A7%88/%E7%BB%84%E4%BB%B6%E9%97%B4%E6%95%B0%E6%8D%AE%E4%BC%A0%E8%BE%93%E7%A4%BA%E4%BE%8B..png) 
图 1-2 组件间数据传输示例

Counter 逻辑中因变量 fixedNum，通过 Counter 的 UI 传递给 Strong，并在 Strong 的逻辑中作为自变量传递给 Strong 的 UI。
综上所述，数据在组件之间的传输方式是，组件的自变量或因变量通过 UI 传递给另一个组件，作为其自变量。为了区分不同方式产生的自变量，在前端框架中，"组件内部定义的自变量"通常被称为 state（状态），"其他组件传递而来的自变量"被称为 props（属性）。
Strong 的例子仅仅展示了父子组件间的数据传递过程，当自变量小跨层级传递时，如图 1-3 表示，A 需要向 C 传递自变量（实际场景可能跨越许多层，为了防止表示这里只设置 ABC 三层）。除采用 "经由 B的层层传递方式"外，也可以通过 store 将自变量直接从 A 传递到 C。
![使用 store 传递自变量](https://front-end-1257950569.cos.ap-guangzhou.myqcloud.com/react/react%E8%AE%BE%E8%AE%A1%E5%8E%9F%E7%90%86%EF%BC%88%E7%AC%AC%E4%BA%8C%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%80%E7%AB%A0%EF%BC%9A%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6%E5%8E%9F%E7%90%86%E6%A6%82%E8%A7%88/%E4%BD%BF%E7%94%A8store%E4%BC%A0%E9%80%92%E8%87%AA%E5%8F%98%E9%87%8F.png)图 1-3 使用 store 传递自变量


















