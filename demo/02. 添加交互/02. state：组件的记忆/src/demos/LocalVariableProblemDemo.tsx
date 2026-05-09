/**
 * 当普通的变量无法满足时
 *
 * 局部变量无法在多次渲染间持久保存，更改局部变量也不会触发 React 重新渲染。
 * 点击 "Next" 按钮后，虽然 index 值改变了，但组件不会重新渲染，所以界面不会更新。
 */
import { sculptureList } from '../data'

export default function LocalVariableProblemDemo() {
  let index = 0

  function handleClick() {
    index = index + 1
    // 局部变量改变了，但 React 不知道需要重新渲染！
    alert(`index 已变为 ${index}，但界面不会更新，因为局部变量的更改不会触发重新渲染。`)
  }

  const sculpture = sculptureList[index]
  return (
    <div className="sculpture-gallery">
      <h3>局部变量无法持久保存渲染间的数据</h3>
      <p>
        点击下方按钮，<code>index</code> 的值确实会改变，但 React 不会重新渲染组件，界面不会更新。
      </p>
      <div className="warning">
        局部变量有两个问题：<br />
        1. 局部变量无法在多次渲染中持久保存 —— React 重新渲染时会从头开始。<br />
        2. 更改局部变量不会触发渲染 —— React 不知道需要重新渲染。
      </div>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name}</i> by {sculpture.artist}
      </h2>
      <h3 className="counter">
        ({index + 1} of {sculptureList.length})
      </h3>
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
      <p className="description">{sculpture.description}</p>
    </div>
  )
}
