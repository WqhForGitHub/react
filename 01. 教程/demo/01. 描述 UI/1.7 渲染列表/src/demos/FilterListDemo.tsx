/**
 * 渲染列表 -- 对数组项进行过滤
 *
 * 使用 filter() 筛选出满足条件的数据项，再用 map() 转换为组件列表。
 * 这里演示了只显示"化学家"的列表。
 */

import { people } from '../data'
import { getImageUrl } from '../utils'

export default function FilterListDemo() {
  const chemists = people.filter(person =>
    person.profession === '化学家'
  )

  const listItems = chemists.map(person =>
    <li>
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
      <h3>对数组项进行过滤</h3>
      <p>
        使用 <code>filter()</code> 筛选满足条件的项（如职业为"化学家"），
        再用 <code>map()</code> 将过滤后的数组转换为组件列表。
      </p>
      <section>
        <h4>化学家列表</h4>
        <ul className="person-list">{listItems}</ul>
      </section>
      <div className="code-block">
{`const chemists = people.filter(person =>
  person.profession === '化学家'
);

const listItems = chemists.map(person =>
  <li>
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
        <strong>陷阱：</strong>箭头函数中，如果 <code>=&gt;</code> 后面跟了花括号 <code>{'{}'}</code>，
        必须使用 <code>return</code> 语句来指定返回值。如果忘了写 <code>return</code>，函数什么都不会返回！
      </div>

      <div className="code-block" style={{ marginTop: 12 }}>
{`// 隐式返回 —— 省略 return
const list = items.map(item => <li>{item}</li>);

// 块函数体 —— 必须 return
const list = items.map(item => {
  return <li>{item}</li>;
});`}
      </div>
    </div>
  )
}
