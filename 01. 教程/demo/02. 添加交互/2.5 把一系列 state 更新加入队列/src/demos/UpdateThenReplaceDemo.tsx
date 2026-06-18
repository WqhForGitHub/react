/**
 * 在更新 state 后替换 state
 *
 * setNumber(number + 5) → "替换为 5"
 * setNumber(n => n + 1) → 更新函数加入队列
 * setNumber(42) → "替换为 42"
 * 在下一次渲染期间，React 依次处理：替换为 5 → n + 1 得到 6 → 替换为 42。
 * 最终结果为 42，因为最后一个替换操作覆盖了之前的所有计算。
 */
import { useState } from 'react'

export default function UpdateThenReplaceDemo() {
  const [number, setNumber] = useState(0)

  return (
    <div>
      <h3>更新 state 后替换 state</h3>
      <p>
        依次调用 <code>setNumber(number + 5)</code>、
        <code>setNumber(n =&gt; n + 1)</code>、
        <code>setNumber(42)</code>。
        最后的替换操作会覆盖队列中之前的所有计算结果。你认为结果是多少？
      </p>
      <div className="demo-row">
        <button onClick={() => {
          setNumber(number + 5)
          setNumber(n => n + 1)
          setNumber(42)
        }}>
          增加数字
        </button>
        <button onClick={() => setNumber(0)}>重置</button>
      </div>
      <div className="counter-display">{number}</div>
      <table className="queue-table">
        <caption style={{ textAlign: 'left', marginBottom: 8, fontSize: '0.9em' }}>
          假设之前 <code>number</code> 为 0，React 遍历队列的过程：
        </caption>
        <thead>
          <tr>
            <th>更新队列</th>
            <th>n</th>
            <th>返回值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>"替换为 <code>5</code>"</td>
            <td>0（未使用）</td>
            <td>5</td>
          </tr>
          <tr>
            <td><code>n =&gt; n + 1</code></td>
            <td>5</td>
            <td>5 + 1 = 6</td>
          </tr>
          <tr>
            <td>"替换为 <code>42</code>"</td>
            <td>6（未使用）</td>
            <td>42</td>
          </tr>
        </tbody>
      </table>
      <div className="result-box">
        <p>React 保存 <code>42</code> 为最终结果。最后的 <code>setNumber(42)</code> 替换操作覆盖了之前的所有计算。</p>
        <p>
          <strong>总结：</strong>传递给 <code>setNumber</code> 的内容决定了 React 如何处理——
          <strong>更新函数</strong>（如 <code>n =&gt; n + 1</code>）会被加入队列依次执行；
          <strong>其他值</strong>（如数字 <code>42</code>）会导致"替换为该值"被加入队列。
        </p>
      </div>
    </div>
  )
}
