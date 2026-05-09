/**
 * 保持组件纯粹 -- 副作用：（不符合）预期的后果
 *
 * 在渲染过程中改变预先存在的变量会使组件变得不纯粹。
 * 多次调用该组件会产生不同的 JSX，结果取决于何时被渲染。
 * 修复方法：将外部变量作为 prop 传入。
 */

import { useState } from 'react'

/** 不纯粹的组件：读写外部变量 */
let guest = 0

function ImpureCup() {
  guest = guest + 1
  return <h2>Tea cup for guest #{guest}</h2>
}

function ImpureTeaSet() {
  return (
    <>
      <ImpureCup />
      <ImpureCup />
      <ImpureCup />
    </>
  )
}

/** 纯粹的组件：通过 prop 传入 guest */
interface CupProps {
  guest: number
}

function PureCup({ guest }: CupProps) {
  return <h2>Tea cup for guest #{guest}</h2>
}

function PureTeaSet() {
  return (
    <>
      <PureCup guest={1} />
      <PureCup guest={2} />
      <PureCup guest={3} />
    </>
  )
}

export default function ImpureDemo() {
  const [showPure, setShowPure] = useState(false)

  // 每次渲染前重置 guest，让不纯粹演示效果更直观
  guest = 0

  return (
    <div>
      <h3>副作用：（不符合）预期的后果</h3>
      <p>
        React 的渲染过程必须自始至终是纯粹的。组件应该只 <strong>返回</strong> 它们的 JSX，
        而不 <strong>改变</strong> 在渲染前就已存在的任何对象或变量。
      </p>

      <div className="warning">
        <strong>不纯粹的组件</strong>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          下方组件读写其外部声明的 <code>guest</code> 变量。在严格模式下，React 会调用组件函数两次，
          导致编号翻倍（2、4、6 而非 1、2、3）。
        </p>
      </div>

      <section>
        <h2>ImpureTeaSet（不纯粹）</h2>
        <ImpureTeaSet />
      </section>

      <div className="code-block">
{`let guest = 0;

function Cup() {
  // Bad: 正在更改预先存在的变量
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}`}
      </div>

      <button
        className="pitfall-toggle"
        onClick={() => setShowPure(s => !s)}
      >
        {showPure ? '隐藏' : '展示'}修复后的纯函数版本
      </button>

      {showPure && (
        <div className="demo-box" style={{ marginTop: 12 }}>
          <h3>PureTeaSet（纯粹）</h3>
          <p>
            将 <code>guest</code> 作为 prop 传入，组件只依赖于 props，返回的 JSX 只依赖于输入。
          </p>
          <section>
            <PureTeaSet />
          </section>
          <div className="code-block">
{`function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}`}
          </div>
        </div>
      )}
    </div>
  )
}
