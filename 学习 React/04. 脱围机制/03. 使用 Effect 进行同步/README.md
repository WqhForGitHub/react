# 使用 Effect 进行同步

有些组件需要与外部系统同步。例如，你可能希望根据 React state 控制非 React 组件、建立服务器连接或当组件在页面显示时发送分析日志。Effect 允许你在渲染结束后执行一些代码，以便将组件与 React 外部的某个系统相同步。
### 你将会学习到

- 什么是 Effect
- Effect 与事件（event）有何不同
- 如何在组件中声明 Effect
- 如何避免不必要地重新运行 Effect
- 为什么 Effect 在开发环境中会运行两次以及如何解决这个问题
## 什么是 Effect，它与事件（event）有何不同？

在接触 Effect 之前，你需要熟悉 React 组件中的两种逻辑类型：

- **渲染代码**（在描述 UI 中有介绍）位于组件的顶层。你在这里处理 props 和 state，对它们进行转换，并返回希望在页面上显示的 jsx。渲染代码必须是纯粹的，就像数学公式一样，它只应该计算结果，而不做其他任何事情。
- **事件处理程序**（在添加交互性中有介绍）是组件内部的嵌套函数，它们不光进行计算，还会执行一些操作。事件处理程序可能会更新输入字段、提交 HTTP POST 请求来购买产品，或者将用户导航到另一个页面。事件处理程序包含由特定用户操作（例如按钮点击或输入）引起的副作用（它们改变了程序的状态）。

有时这还不够。考虑一个 `ChatRoom` 组件，它在页面上显示时必须连接到聊天服务器。连接到服务器并不是纯粹的计算（它是一个副作用），因此它不能在渲染期间发生。然而，并没有一个特定的事件（比如点击）能让 `ChatRoom` 被显示。
**Effect 允许你指定由渲染自身，而不是特定事件引起的副作用**。在聊天中发送消息是一个事件，因为它直接由用户点击特定按钮引起。然而，建立服务器连接是一个 Effect，因为无论哪种交互致使组件出现，它都应该发生。Effect 在提交结束后、页面更新后运行。此时是将 React 组件与外部系统（如网络或第三方库）同步的最佳时机。
注意
在本文此处和后续文本中，大写的 `Effect` 是 React 中的专有定义——由渲染引起的副作用。至于更广泛的编程概念(任何改变程序状态或外部系统的行为)，我们则使用“副作用（side effect）” 来指代。
## 你可能不需要 Effect

**不要急着在你的组件中使用 Effect**。记住，Effect 通常用于暂时跳出 React 并与一些 **外部** 系统进行同步。这包括浏览器 API、第三方小部件，以及网络等等。如果你的 Effect 只是根据其他状态来调整某些状态，那么你可能并不需要一个 Effect。
## 如何编写 Effect

要编写一个 Effect，请遵循以下三个步骤：
1. **声明 Effect**。通常 Effect 会在每次提交后运行。
2. **指定 Effect 依赖**。大多数 Effect 应该按需运行，而不是在在每次渲染后都运行。例如，淡入动画应该只在组件出现时触发。连接和断开服务器的操作只应在组件出现和消失时，或者切换聊天室时执行。你将通过指定**依赖项**来学习如何控制这一点。
3. **必要时添加清理操作**。一些 Effect 需要指定如何停止、撤销，或者清除它们所执行的操作。例如，连接需要断开，订阅需要退订，而获取数据需要取消或者忽略。你将学习如何通过返回一个**清理函数**来实现这些。
让我们详细看看每一步。
### 第一步：声明 Effect

先从 React 中导入 `useEffect` Hook：
```jsx
import { useEffect } from 'react';
```
再在组件顶部调用，并在其中加入一些代码：
```jsx
function MyComponent() {
	useEffect(() => {
		// 每次渲染后都会执行此处的代码
	});
	return <div />;
}
```
每当你的组件渲染时，React 会先更新页面，然后再运行 `useEffect` 中的代码。换句话说，`useEffect` **会延迟一段代码的运行，直到渲染结果反映在页面上**。
接下来，让我们看看如何使用 Effect 来与外部系统同步。考虑一个 `<VideoPlayer>` React 组件。我们想要通过传递一个 `isPlaying` prop 来控制它播放或者暂停：
```jsx
<VideoPlayer isPlaying={isPlaying} />;
```
这个 `VideoPlayer` 组件渲染了浏览器内置的 `<video>` 标签：
```jsx
function VideoPlayer({ src, isPlaying }) {
	// TODO：使用 isPlaying 做一些事情
	return <video src={src} />;
}
```
但是，浏览器的 `<video>` 标签没有 `isPlaying` 属性。控制它的唯一方式是在 DOM 元素上调用 `play()` 和 `pause()` 方法。因此，**你需要将 `isPlaying` prop 的值（表示视频当前是否应该播放）与 `play()` 和 `pause()` 等函数的调用进行同步**。
我们首先需要获取 `<video>` DOM 节点的对象引用。
你可能会尝试在渲染期间调用 `play()` 或 `pause()`，但这样做是不对的：
`App.js`
```jsx
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
	const ref = useRef(null);
	
	if (isPlaying) {
		ref.current.play(); // 渲染期间不能调用 play()。
	} else {
		ref.current.pause(); // 同样，调用 pause() 也不行。
	}
	
	return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
	const [isPlaying, setIsPlaying] = useState(false);
	return (
		<>
			<button onClick={() => setIsPlaying(!isPlaying)}>
				{isPlaying ? '暂停' : '播放'}
			</button>
			<VideoPlayer
				isPlaying={isPlaying}
				src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
			/>
		</>
	);
}
```
这段代码之所以不对，是因为它试图在渲染期间对 DOM 节点进行操作。在 React 中，渲染应该是纯粹的计算 JSX，不应该包含任何像修改 DOM 这样的副作用。
而且，当第一次调用 `VideoPlayer` 时，对应的 DOM 节点还不存在。因为 React 在你返回 JSX 之前不知道要创建什么样的 DOM，所以没有 DOM 节点可以调用 `play()` 或 `pause()` 方法。
解决办法是**使用 `useEffect` 包裹副作用，把它分离到渲染逻辑的计算过程之外**：
```jsx
import { useEffect, useRef } from 'react';

function VideoPlayer({ src, isPlaying }) {
	const ref = useRef(null);
	
	useEffect(() => {
		if (isPlaying) {
			ref.current.play();
		} else {
			ref.current.pause();
		}
	});
	
	return <video ref={ref} src={src} loop playsInline />;
}
```
通过将 DOM 更新封装在 Effect 中，你可以让 React 先更新页面，然后再运行 Effect。
当 `VideoPlayer` 组件渲染时（无论是否为首次渲染），会发生以下几件事：首先 React 会更新页面，确保 `<video>` 标签带着正确的 props 出现在 DOM 中，接着 React 将运行 Effect，最后 Effect 将根据 `isPlaying` 的值调用 `play()` 或 `pause()`。
试试点击几次播放和暂停按钮，观察视频播放器的行为是如何与 `isPlaying` 的值相铜同步的：
`App.js`
```jsx
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
	const ref = useRef(null);
	
	useEffect(() => {
		if (isPlaying) {
			ref.current.play();
		} else {
			ref.current.pause();
		}
	});
	
	return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
	const [isPlaying, setIsPlaying] = useState(false);
	return (
		<>
			<button onClick={() => setIsPlaying(!isPlaying)}>
				{isPlaying ? '暂停' : '播放'}
			</button>
			<VideoPlayer
				isPlaying={isPlaying}
				src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
			/>
		</>
	);
}
```
在这个示例中，你同步到 React state 的外部系统是浏览器媒体 API。你也可以使用类似的方法将传统的非 React 代码（如 jQuery 插件）封装成声明式的 React 组件。
需要注意的是，控制视频播放器在实际应用中要复杂得多：比如调用 `play()` 可能会失败、用户可能会使用内置的浏览器控件来进行播放或暂停等操作。本例子是一个非常简化且不完整的示例。
陷阱
默认情况下，Effect 会在**每次**渲染后运行。**正因如此，以下代码会陷入死循环**：
```jsx
const [count, setCount] = useState(0);
useEffect(() => {
	setCount(count + 1);
});
```
Effect 在渲染结束后运行。更新 state 会触发重新渲染。在 Effect 中直接更新 state 就像是把电源插座的插头插回自身：Effect 运行、更新 state、触发重新渲染、于是又触发 Effect 运行、再次更新 state，继而再次触发重新渲染。如此反复，从而陷入死循环。
Effect 应用用于将你的组件与一个**外部**的系统保持同步。如果没有外部系统，你只是根据其他状态调整一些状态，那么你也许不需要 Effect。
### 第二步：指定 Effect 的依赖项

默认情况下，Effect 会在**每次**渲染后运行。但往往**这并不是你想要的**：
- 有时，它可能会很慢。与外部系统的同步并不总是即时的，所以你可能希望在不必要时跳过它。例如，你不会想在每次打字时都得重新连接聊天服务器。
- 有时，它可能会出错。例如，你不会想在每次按键时都触发组件的淡入动画。动画应该只在组件首次出现时播放。
为了演示这个问题，以下是在之前的示例中加入了一些 `console.log` 调用和一个更新父组件 state 的文本输入框。注意在输入时是如何触发 Effect 重新运行的：
`App.js`
```jsx
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
	const ref = useRef(null);
	
	useEffect(() => {
		if (isPlaying) {
			console.log('调用 video.play()');
			ref.current.play();
		} else {
			console.log('调用 video.pause()');
			ref.current.pause();
		}
	});
	
	return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [text, setText] = useState('');
	return (
		<>
			<input value={text} onChange={e => setText(e.target.value)} />
			<button onClick={() => setIsPlaying(!isPlaying)}>
				{isPlaying ? '暂停' : '播放'}
			</button>
			<VideoPlayer
				isPlaying={isPlaying}
				src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
			/>
		</>
	);
}
```
通过在调用 `useEffect` 时指定一个**依赖数组**作为第二个参数，你可以让 React **跳过不必要地重新运行 Effect**。首先，在上面示例的第 14 行中传入一个空数组 `[]`：
```jsx
useEffect(() => {
}, []);
```
你会看到一个错误提示：`React Hook useEffect has a missing dependency: 'isPlaying'`：
`App.js`
```jsx
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
	const ref = useRef(null);
	
	useEffect(() => {
		if (isPlaying) {
			console.log('调用 video.play()');
			ref.current.play();
		} else {
			console.log('调用 videp.pause()');
			ref.current.pause();
		}
	}, []); // 这将产生错误
	
	return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [text, setText] = useState('');
	return (
		<>
			<input value={text} onChange={e => setText(e.target.value)} />
			<button onClick={() => setIsPlaying(!isPlaying)}>
				{isPlaying ? '暂停' : '播放'}
			</button>
			<VideoPlayer
				isPlaying={isPlaying}
				src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
			/>
		</>
	);
}
```

