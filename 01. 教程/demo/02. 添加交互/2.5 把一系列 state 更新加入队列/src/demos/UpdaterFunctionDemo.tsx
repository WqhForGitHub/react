/**
 * 在下次渲染前多次更新同一个 state
 *
 * 如果想在下次渲染之前多次更新同一个 state，可以传入一个更新函数
 * （如 n => n + 1），而不是传入下一个 state 值。React 会将更新函数
 * 加入队列，在下一次渲染期间依次执行，前一个的返回值作为下一个的参数。
 */
import { useState } from 'react'

export default function UpdaterFunctionDemo() {
  const [number, setNumber] = useState(0)

  return (
    <div>
      <h3>使用更新函数</h3>
      <p>
        使用更新函数 <code>n =&gt; n + 1</code> 代替 <code>number + 1</code>，
        React 会将每个更新函数加入队列，依次执行，前一个的返回值作为下一个的参数。
      </p>
      <div className="demo-row">
        <button onClick={() => {
          setNumber(n => n + 1)
          setNumber(n => n + 1)
          setNumber(n => n + 1)
        }}>
          +3（使用更新函数）
        </button>
        <button onClick={() => setNumber(0)}>重置</button>
      </div>
      <div className="counter-display">{number}</div>
      <table className="queue-table">
        <caption style={{ textAlign: 'left', marginBottom: 8, fontSize: '0.9em' }}>
          假设之前的 state 值为 <code>0</code>，React 遍历队列的过程：
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
            <td><code>n =&gt; n + 1</code></td>
            <td>0</td>
            <td>0 + 1 = 1</td>
          </tr>
          <tr>
            <td><code>n =&gt; n + 1</code></td>
            <td>1</td>
            <td>1 + 1 = 2</td>
          </tr>
          <tr>
            <td><code>n =&gt; n + 1</code></td>
            <td>2</td>
            <td>2 + 1 = 3</td>
          </tr>
        </tbody>
      </table>
      <div className="result-box">
        React 保存 <code>3</code> 为最终结果并从 <code>useState</code> 中返回。点击"+3"按钮试试看！
      </div>
    </div>
  )
}
