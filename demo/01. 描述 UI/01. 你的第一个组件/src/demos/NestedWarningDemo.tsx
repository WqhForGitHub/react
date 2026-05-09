/**
 * 你的第一个组件 —— 嵌套和组织组件（反面示例 vs 正确做法）
 *
 * 绝对不要在组件内部定义另一个组件！
 * 这会导致性能问题（每次渲染都重新创建子组件函数）和 bug。
 * 正确做法：在顶层定义每个组件，通过 props 传递数据。
 */
import { useState } from 'react'

// ============================================================
// 反面示例：在组件中定义组件 —— 永远不要这样做！
// ============================================================
function WrongWay() {
  const [count, setCount] = useState(0)

  // 永远不要在组件中定义组件！
  // 每次父组件重新渲染时，这个函数都会被重新创建，
  // 导致 React 认为这是一个全新的组件，从而卸载并重新挂载，
  // 丢失所有内部状态。
  function InnerProfile() {
    const [likes, setLikes] = useState(0)
    return (
      <div style={{ borderLeft: '3px solid #ef4444', paddingLeft: 12, marginBottom: 12 }}>
        <h3>InnerProfile（错误嵌套定义）</h3>
        <img
          src="https://i.imgur.com/MK3eW3As.jpg"
          alt="Katherine Johnson"
          style={{ height: 80, borderRadius: 8 }}
        />
        <p style={{ marginTop: 8 }}>
          点赞数：{likes}{' '}
          <button onClick={() => setLikes(l => l + 1)}>赞</button>
        </p>
        <p style={{ color: '#ef4444', fontSize: '0.85em' }}>
          点击下方「重新渲染」按钮后，内部状态（点赞数）会丢失！
        </p>
      </div>
    )
  }

  return (
    <div style={{ borderLeft: '3px solid #ef4444', paddingLeft: 12, marginBottom: 16 }}>
      <h3>反面示例：在组件中定义组件</h3>
      <div className="code-block">{`export default function WrongWay() {
  // 永远不要在组件中定义组件！
  function InnerProfile() {
    // ...
  }
  return <InnerProfile />
}`}</div>
      <p>
        父组件重新渲染次数：{count}{' '}
        <button onClick={() => setCount(c => c + 1)}>重新渲染</button>
      </p>
      <InnerProfile />
    </div>
  )
}

// ============================================================
// 正确做法：在顶层定义每个组件，通过 props 传递数据
// ============================================================

// 在顶层声明组件
function OuterProfile({ name }: { name: string }) {
  const [likes, setLikes] = useState(0)
  return (
    <div style={{ borderLeft: '3px solid #22c55e', paddingLeft: 12 }}>
      <h3>OuterProfile（正确的顶层定义）</h3>
      <img
        src="https://i.imgur.com/MK3eW3As.jpg"
        alt={name}
        style={{ height: 80, borderRadius: 8 }}
      />
      <p style={{ marginTop: 8 }}>
        点赞数：{likes}{' '}
        <button onClick={() => setLikes(l => l + 1)}>赞</button>
      </p>
      <p style={{ color: '#22c55e', fontSize: '0.85em' }}>
        点击下方「重新渲染」按钮后，内部状态（点赞数）不会丢失！
      </p>
    </div>
  )
}

function RightWay() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ borderLeft: '3px solid #22c55e', paddingLeft: 12 }}>
      <h3>正确做法：在顶层定义每个组件</h3>
      <div className="code-block">{`// 在顶层声明组件
function OuterProfile({ name }) {
  // ...
}

export default function RightWay() {
  return <OuterProfile name="Katherine" />
}`}</div>
      <p>
        父组件重新渲染次数：{count}{' '}
        <button onClick={() => setCount(c => c + 1)}>重新渲染</button>
      </p>
      <OuterProfile name="Katherine Johnson" />
    </div>
  )
}

// 默认导出：组合反面示例与正确做法
export default function NestedWarningDemo() {
  return (
    <div>
      <div className="warning">
        <strong>陷阱：</strong>组件可以渲染其他组件，但是请不要嵌套他们的定义！
        这会导致性能问题（每次渲染都重新创建子组件函数）和 bug。
      </div>
      <WrongWay />
      <RightWay />
    </div>
  )
}
