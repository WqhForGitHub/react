/**
 * 条件渲染 -- 选择性地将 JSX 赋值给变量
 *
 * 当快捷方式妨碍写普通代码时，可以使用 if 语句和变量。
 * 用 let 声明变量存储默认值，然后在 if 语句中重新赋值，
 * 最后在 JSX 中通过大括号嵌入该变量。
 */

interface ItemProps {
  name: string
  isPacked: boolean
}

function Item({ name, isPacked }: ItemProps) {
  let itemContent: React.ReactNode = name
  if (isPacked) {
    itemContent = (
      <del>
        {name + ' ✅'}
      </del>
    )
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  )
}

export default function VariableAssignmentDemo() {
  return (
    <div>
      <h3>将 JSX 赋值给变量</h3>
      <p>
        使用 <code>if</code> 语句和变量来选择性地包含 JSX。
        先将默认内容赋值给变量，然后在条件成立时重新赋值，最后在 JSX 中用大括号嵌入。
        这种方式最冗长，但也最灵活，不仅仅适用于文本，任意的 JSX 均适用。
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
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>{name + " ✅"}</del>
    );
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}`}
      </div>
    </div>
  )
}
