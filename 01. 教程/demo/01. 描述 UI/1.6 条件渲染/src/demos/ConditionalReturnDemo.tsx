/**
 * 条件渲染 -- 条件返回 JSX
 *
 * 使用 JavaScript 的 if 语句来条件性地返回不同的 JSX。
 * 当 isPacked 为 true 时，返回带有勾选符号的列表项。
 */

interface ItemProps {
  name: string
  isPacked: boolean
}

function Item({ name, isPacked }: ItemProps) {
  if (isPacked) {
    return <li className="item">{name} ✅</li>
  }
  return <li className="item">{name}</li>
}

export default function ConditionalReturnDemo() {
  return (
    <div>
      <h3>条件返回 JSX</h3>
      <p>
        使用 JavaScript 的 <code>if</code> 语句来判断条件，返回不同的 JSX。
        当 <code>isPacked</code> 为 <code>true</code> 时，物品名称后会显示勾选符号。
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
  if (isPacked) {
    return <li className="item">{name} ✅</li>;
  }
  return <li className="item">{name}</li>;
}`}
      </div>
    </div>
  )
}
