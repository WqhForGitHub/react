/**
 * 条件渲染 -- 选择性地返回 null
 *
 * 在一些情况下，你不想有任何东西进行渲染。此时可以返回 null。
 * 但返回 null 并不常见，通常可以在父组件里选择是否要渲染该组件。
 */

interface ItemProps {
  name: string
  isPacked: boolean
}

function Item({ name, isPacked }: ItemProps) {
  if (isPacked) {
    return null
  }
  return <li className="item">{name}</li>
}

export default function ReturnNullDemo() {
  return (
    <div>
      <h3>选择性地返回 null</h3>
      <p>
        如果组件不需要渲染任何内容，可以直接返回 <code>null</code>。
        下面已打包的物品不会被显示。
      </p>
      <section>
        <h1>Sally Ride 的行李清单</h1>
        <ul>
          <Item isPacked={true} name="宇航服" />
          <Item isPacked={true} name="带金箔的头盔" />
          <Item isPacked={false} name="Tam 的照片" />
        </ul>
      </section>
      <div className="warning">
        <strong>注意：</strong>在组件里返回 <code>null</code> 并不常见，因为这样会让想使用它的开发者感觉奇怪。通常情况下，你可以在父组件里选择是否要渲染该组件。
      </div>
      <div className="code-block">
{`function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}`}
      </div>
    </div>
  )
}
