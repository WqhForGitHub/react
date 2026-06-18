/**
 * 替换数组中的元素
 *
 * 类似 arr[0] = 'bird' 的赋值会直接修改原始数组，应该使用 map。
 * 在 map 回调中，使用索引来判断是返回原始元素还是替换后的值。
 */
import { useState } from 'react'

const initialCounters = [0, 0, 0]

export default function ReplaceInArrayDemo() {
  const [counters, setCounters] = useState(initialCounters)

  function handleIncrementClick(index: number) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        return c + 1
      } else {
        return c
      }
    })
    setCounters(nextCounters)
  }

  function handleReset() {
    setCounters(initialCounters)
  }

  return (
    <div>
      <h3>替换数组中的元素</h3>
      <p>
        使用 <code>map()</code> 和索引来替换特定位置的元素，
        而不是用 <code>arr[i] = ...</code> 直接赋值。
      </p>
      <ul className="counter-list">
        {counters.map((counter, i) => (
          <li key={i}>
            <span className="counter-value">{counter}</span>
            <button
              className="increment-btn"
              onClick={() => handleIncrementClick(i)}
            >
              +1
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleReset}>重置</button>
      <pre className="code-block">{`const nextCounters = counters.map((c, i) => {
  if (i === index) {
    return `}<span className="highlight">c + 1</span>{`
  } else {
    return c
  }
})`}</pre>
    </div>
  )
}
