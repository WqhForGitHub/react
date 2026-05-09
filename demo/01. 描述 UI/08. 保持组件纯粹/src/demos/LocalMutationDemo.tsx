/**
 * 保持组件纯粹 -- 局部 mutation：组件的小秘密
 *
 * 纯函数不会改变函数作用域外的变量。但你完全可以在渲染时
 * 更改你刚刚创建的变量和对象——这被称为"局部 mutation"。
 */

interface CupProps {
  guest: number
}

function Cup({ guest }: CupProps) {
  return <h2>Tea cup for guest #{guest}</h2>
}

export default function LocalMutationDemo() {
  // 局部 mutation：cups 数组是在函数内部创建的，push 不会影响外部
  const cups = []
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />)
  }

  return (
    <div>
      <h3>局部 mutation：组件的小秘密</h3>
      <p>
        纯函数不会改变函数作用域外的变量，或在函数调用前创建的对象。
        但你完全可以在渲染时更改你 <em>刚刚</em> 创建的变量和对象——这被称为<strong>局部 mutation</strong>。
      </p>
      <p>
        在本示例中，<code>cups</code> 数组是在 <code>TeaGathering</code> 函数内部创建的，
        因此 <code>push</code> 操作不会影响任何外部代码。如同藏在组件里的小秘密。
      </p>
      <section>
        <h1>Tea Gathering</h1>
        {cups}
      </section>
      <div className="code-block">
{`function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  const cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}`}
      </div>

      <div className="warning">
        <strong>注意：</strong>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          如果 <code>cups</code> 变量或 <code>[]</code> 数组是在 <code>TeaGathering</code> 函数之外创建的，
          这将是一个很大的问题！因为那样的话，当你调用数组的 <code>push</code> 方法时，
          就会更改预先存在的对象。
        </p>
      </div>
    </div>
  )
}
