/**
 * 在替换 state 后更新 state
 *
 * setNumber(number + 5) 会将 "替换为 5" 添加到队列中，
 * setNumber(n => n + 1) 是一个更新函数，React 将该函数添加到队列中。
 * 在下一次渲染期间，React 先处理替换请求得到 5，再将 5 传入更新函数得到 6。
 * 注意：setState(x) 实际上会像 setState(n => x) 一样运行，只是没有使用 n。
 */
import { useState } from 'react'

export default function ReplaceThenUpdateDemo() {
  const [number, setNumber] = useState(0)

  return (
    <div>
      <h3>替换 state 后更新 state</h3>
      <p>
        先调用 <code>setNumber(number + 5)</code> 替换 state，
        再调用 <code>setNumber(n =&gt; n + 1)</code> 更新 state。
        你认为结果是多少？
      </p>
      <div className="demo-row">
        <button onClick={() => {
          setNumber(number + 5)
          setNumber(n => n + 1)
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
        </tbody>
      </table>
      <div className="result-box">
        <p>React 保存 <code>6</code> 为最终结果。</p>
        <p><code>setState(x)</code> 实际上会像 <code>setState(n =&gt; x)</code> 一样运行，只是没有使用 <code>n</code>！</p>
      </div>
    </div>
  )
}
