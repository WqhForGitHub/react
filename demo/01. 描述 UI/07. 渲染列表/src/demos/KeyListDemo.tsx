/**
 * 渲染列表 -- 用 key 保持列表项的顺序
 *
 * 为列表中的每一项指定唯一的 key，帮助 React 识别各个组件对应数组中的哪一项。
 * key 值在兄弟节点之间必须唯一且不能改变。
 */

import { people } from '../data'
import { getImageUrl } from '../utils'

export default function KeyListDemo() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}</b>
        {' ' + person.profession + ' '}
        因{person.accomplishment}而闻名世界
      </p>
    </li>
  )

  return (
    <div>
      <h3>用 key 保持列表项的顺序</h3>
      <p>
        为数组中的每一项指定 <code>key</code> —— 它可以是字符串或数字，
        只要能唯一标识出各个数组项即可。直接放在 <code>map()</code> 方法里的
        JSX 元素一般都需要指定 <code>key</code> 值。
      </p>
      <section>
        <h4>全部人员列表</h4>
        <ul className="person-list">{listItems}</ul>
      </section>
      <div className="code-block">
{`const listItems = people.map(person =>
  <li key={person.id}>
    <img src={getImageUrl(person)} alt={person.name} />
    <p>
      <b>{person.name}</b>
      {' ' + person.profession + ' '}
      因{person.accomplishment}而闻名世界
    </p>
  </li>
);

return <ul>{listItems}</ul>`}
      </div>

      <div className="warning" style={{ marginTop: 20 }}>
        <strong>key 需要满足的条件：</strong>
        <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
          <li><strong>key 值在兄弟节点之间必须唯一。</strong>不过不要求全局唯一，在不同的数组中可以使用相同的 key。</li>
          <li><strong>key 值不能改变</strong>，否则就失去了使用 key 的意义！所以千万不要在渲染时动态地生成 key。</li>
        </ul>
      </div>

      <h4 style={{ marginTop: 20 }}>如何设定 key 值</h4>
      <ul className="key-sources">
        <li>
          <strong>来自数据库的数据：</strong>
          直接使用数据表中的主键，因为它们天然具有唯一性。
        </li>
        <li>
          <strong>本地产生数据：</strong>
          使用自增计数器、<code>crypto.randomUUID()</code> 或类似 <code>uuid</code> 的库来生成 key。
        </li>
      </ul>

      <div className="warning" style={{ marginTop: 16 }}>
        <strong>陷阱：</strong>
        <p style={{ marginTop: 8 }}>
          不要把数组项的索引当作 key 值。如果数组项的顺序在插入、删除或重新排序时发生改变，
          把索引用作 key 会产生微妙且令人困惑的 bug。
        </p>
        <p>
          也不要在运行过程中动态地产生 key，如 <code>key={'{Math.random()}'}</code>。
          这会导致每次重新渲染后 key 值都不一样，使所有组件和 DOM 元素每次都要重新创建，
          不仅运行变慢，还可能导致用户输入丢失。
        </p>
      </div>

      <div className="code-block" style={{ marginTop: 12 }}>
{`// 错误：使用索引作为 key
items.map((item, index) => <li key={index}>{item}</li>);

// 错误：动态生成 key
items.map(item => <li key={Math.random()}>{item}</li>);

// 正确：使用数据中稳定的唯一标识
items.map(item => <li key={item.id}>{item}</li>);

// 注意：组件不会把 key 当作 props 的一部分
// 如果需要 ID，请作为单独的 prop 传入：
<Profile key={id} userId={id} />`}
      </div>
    </div>
  )
}
