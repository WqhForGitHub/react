/**
 * React 会对 state 更新进行批处理
 *
 * 设置组件 state 会把一次重新渲染加入队列。React 会等到事件处理函数中的所有代码
 * 都运行完毕再处理 state 更新。即使调用了三次 setNumber(number + 1)，
 * 在当前渲染中 number 始终是固定值，所以三次调用都等同于 setNumber(1)，最终结果为 1。
 */
import { useState } from 'react'

export default function BatchingDemo() {
  const [number, setNumber] = useState(0)

  return (
    <div>
      <h3>state 更新的批处理</h3>
      <p>
        点击下方按钮调用了三次 <code>setNumber(number + 1)</code>，
        但由于每次渲染中 <code>number</code> 的值是固定的，
        React 会等到事件处理函数全部执行完毕后才处理 state 更新（批处理），
        所以结果只会 +1 而非 +3。
      </p>
      <div className="demo-row">
        <button onClick={() => {
          setNumber(number + 1)
          setNumber(number + 1)
          setNumber(number + 1)
        }}>
          +3（实际只会 +1）
        </button>
        <button onClick={() => setNumber(0)}>重置</button>
      </div>
      <div className="counter-display">{number}</div>
      <table className="queue-table">
        <caption style={{ textAlign: 'left', marginBottom: 8, fontSize: '0.9em' }}>
          假设当前 <code>number</code> 为 0，事件处理函数执行时：
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
            <td>"替换为 <code>1</code>"</td>
            <td>0（未使用）</td>
            <td>1</td>
          </tr>
          <tr>
            <td>"替换为 <code>1</code>"</td>
            <td>1（未使用）</td>
            <td>1</td>
          </tr>
          <tr>
            <td>"替换为 <code>1</code>"</td>
            <td>1（未使用）</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
      <div className="result-box">
        <p>React 保存 <code>1</code> 为最终结果。就像餐厅服务员会等你点完菜再送到厨房，React 也会等你所有代码运行完再更新 UI。</p>
      </div>
    </div>
  )
}
