/**
 * 其他改变数组的情况（排序、翻转）
 *
 * reverse() 和 sort() 会改变原数组，不能直接使用。
 * 但可以先拷贝数组，再改变拷贝后的值。
 * 注意：数组的拷贝是浅拷贝，内部元素仍然是共享的。
 */
import { useState } from 'react'

interface Artwork {
  id: number
  title: string
}

const initialList: Artwork[] = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
]

export default function ReverseArrayDemo() {
  const [list, setList] = useState(initialList)

  function handleReverse() {
    const nextList = [...list]
    nextList.reverse()
    setList(nextList)
  }

  function handleReset() {
    setList(initialList)
  }

  return (
    <div>
      <h3>排序与翻转数组</h3>
      <p>
        <code>reverse()</code> 和 <code>sort()</code> 会改变原数组。
        先用 <code>[...list]</code> 拷贝数组，再对拷贝进行操作。
      </p>
      <div className="demo-row">
        <button onClick={handleReverse}>翻转</button>
        <button onClick={handleReset}>重置</button>
      </div>
      <ul className="artist-list">
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
      <pre className="code-block">{`const nextList = `}<span className="highlight">[...list]</span>{`
nextList.reverse()
setList(nextList)

// 注意：浅拷贝只复制了数组本身
// 内部元素仍然是共享的，修改内部对象会出问题`}</pre>
      <div className="tip-box">
        <strong>注意：</strong>即使拷贝了数组，你还是不能直接修改其内部的元素。
        <code>nextList[0].seen = true</code> 会直接修改原始 state 中的对象，
        因为浅拷贝的内部元素与原数组指向同一个对象。
      </div>
    </div>
  )
}
