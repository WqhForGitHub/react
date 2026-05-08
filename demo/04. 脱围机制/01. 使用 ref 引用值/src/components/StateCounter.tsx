import { useState } from 'react';

/**
 * 使用 state 实现的计数器 - 与 ref 计数器对比
 *
 * 与 ref 计数器的关键区别：
 * - 设置 state 会触发重新渲染 → 页面上的数字会实时更新
 * - state 不可变，必须使用 setCount 来修改
 * - 每次渲染都有自己不变的 state 快照
 */
export default function StateCounter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="demo-card">
      <h2>3. State 计数器（对比）</h2>
      <p className="description">
        与第一个 ref 计数器对比：设置 <code>state</code> 会<strong>触发重新渲染</strong>，
        页面上的数字实时更新。
      </p>
      <button onClick={handleClick}>你点击了 {count} 次</button>
      <div className="comparison-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ref</th>
              <th>state</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>变更时</td>
              <td>不触发重新渲染</td>
              <td>触发重新渲染</td>
            </tr>
            <tr>
              <td>可变性</td>
              <td>可变（直接修改 .current）</td>
              <td>不可变（必须用 setter）</td>
            </tr>
            <tr>
              <td>渲染期间</td>
              <td>不应读取/写入</td>
              <td>可以随时读取</td>
            </tr>
            <tr>
              <td>更新时机</td>
              <td>同步（立即生效）</td>
              <td>异步（下次渲染生效）</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
