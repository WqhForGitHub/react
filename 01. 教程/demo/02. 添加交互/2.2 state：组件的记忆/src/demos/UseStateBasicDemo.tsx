/**
 * 添加一个 state 变量
 *
 * 使用 useState Hook 可以同时解决两个问题：
 * 1. State 变量在渲染间持久保存数据。
 * 2. State setter 函数更新变量并触发 React 重新渲染。
 */
import { useState } from 'react'
import { sculptureList } from '../data'

export default function UseStateBasicDemo() {
  const [index, setIndex] = useState(0)

  function handleClick() {
    setIndex(index + 1)
  }

  const sculpture = sculptureList[index]
  return (
    <div className="sculpture-gallery">
      <h3>使用 useState 保存渲染间的数据</h3>
      <p>
        将 <code>let index = 0</code> 替换为 <code>const [index, setIndex] = useState(0)</code>，
        点击按钮后 <code>setIndex</code> 会触发 React 重新渲染。
      </p>
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
