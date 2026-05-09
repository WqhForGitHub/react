/**
 * 赋予一个组件多个 state 变量
 *
 * 一个组件中可以拥有任意多种类型的 state 变量。
 * 此组件有两个 state：数字 index 和布尔值 showMore。
 * 如果多个 state 经常同时更改，最好将它们合并为一个。
 */
import { useState } from 'react'
import { sculptureList } from '../data'

export default function MultipleStateDemo() {
  const [index, setIndex] = useState(0)
  const [showMore, setShowMore] = useState(false)

  function handleNextClick() {
    setIndex(index + 1)
  }

  function handleMoreClick() {
    setShowMore(!showMore)
  }

  const sculpture = sculptureList[index]
  return (
    <div className="sculpture-gallery">
      <h3>多个 state 变量</h3>
      <p>
        此组件拥有 <code>index</code>（数字）和 <code>showMore</code>（布尔值）两个 state 变量。
        如果它们不相关，分开声明是好主意；如果经常同时更改，最好合并为一个。
      </p>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name}</i> by {sculpture.artist}
      </h2>
      <h3 className="counter">
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p className="description">{sculpture.description}</p>}
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
    </div>
  )
}
