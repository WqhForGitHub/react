/**
 * 条件渲染 -- 三目运算符（?:）
 *
 * 使用条件运算符（三目运算符）来选择性地包含 JSX，
 * 避免重复的标签结构。还可以嵌套 JSX 来实现更复杂的条件渲染。
 */

interface ItemProps {
  name: string
  isPacked: boolean
}

function Item({ name, isPacked }: ItemProps) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✅'}
        </del>
      ) : (
        name
      )}
    </li>
  )
}

export default function TernaryDemo() {
  return (
    <div>
      <h3>三目运算符（?:）</h3>
      <p>
        使用条件运算符 <code>? :</code>，可以简洁地实现条件渲染。
        当 <code>isPacked</code> 为 <code>true</code> 时，物品名称会带有删除线和勾选符号；
        否则正常显示。
      </p>
      <section>
        <h1>Sally Ride 的行李清单</h1>
        <ul>
          <Item isPacked={true} name="宇航服" />
          <Item isPacked={true} name="带金箔的头盔" />
          <Item isPacked={false} name="Tam 的照片" />
        </ul>
      </section>
      <div className="code-block">
{`function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>{name + ' ✅'}</del>
      ) : (
        name
      )}
    </li>
  );
}`}
      </div>
      <p style={{ marginTop: 16, fontSize: '0.9em', color: 'var(--text)' }}>
        你可以认为：<em>"如果 <code>isPacked</code> 为 true，则（<code>?</code>）渲染删除线版本，否则（<code>:</code>）渲染普通名称。"</em>
      </p>
    </div>
  )
}
