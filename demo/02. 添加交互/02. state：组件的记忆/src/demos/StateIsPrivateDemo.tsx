/**
 * State 是隔离且私有的
 *
 * 如果你渲染同一个组件两次，每个副本都会有完全隔离的 state！
 * 改变其中一个不会影响另一个。State 完全私有于声明它的组件，父组件无法更改。
 */
import { useState } from 'react'
import { sculptureList } from '../data'

function Gallery() {
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
    <section className="sculpture-gallery">
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
    </section>
  )
}

export default function StateIsPrivateDemo() {
  return (
    <div>
      <h3>State 是隔离且私有的</h3>
      <p>
        两个 <code>&lt;Gallery /&gt;</code> 组件的 state 完全独立，互不影响。
        尝试分别点击各自按钮查看效果。
      </p>
      <div className="gallery-row">
        <Gallery />
        <Gallery />
      </div>
    </div>
  )
}
