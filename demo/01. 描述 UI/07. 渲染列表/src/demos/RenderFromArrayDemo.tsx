/**
 * 渲染列表 -- 从数组中渲染数据
 *
 * 使用 map() 方法将数组转换为 JSX 元素列表。
 * 注意：缺少 key 时 React 会在控制台输出警告。
 */

const people = [
  '凯瑟琳·约翰逊: 数学家',
  '马里奥·莫利纳: 化学家',
  '穆罕默德·阿卜杜勒·萨拉姆: 物理学家',
  '珀西·莱温·朱利亚: 化学家',
  '苏布拉马尼扬·钱德拉塞卡: 天体物理学家',
]

export default function RenderFromArrayDemo() {
  const listItems = people.map(person =>
    <li>{person}</li>
  )

  return (
    <div>
      <h3>从数组中渲染数据</h3>
      <p>
        将数据存储在数组中，使用 <code>map()</code> 遍历每一项，
        生成新的 JSX 节点数组，然后用 <code>&lt;ul&gt;</code> 包裹返回。
      </p>
      <section>
        <ul>{listItems}</ul>
      </section>
      <div className="code-block">
{`const people = [
  '凯瑟琳·约翰逊: 数学家',
  '马里奥·莫利纳: 化学家',
  '穆罕默德·阿卜杜勒·萨拉姆: 物理学家',
  '珀西·莱温·朱利亚: 化学家',
  '苏布拉马尼扬·钱德拉塞卡: 天体物理学家',
];

const listItems = people.map(person =>
  <li>{person}</li>
);

return <ul>{listItems}</ul>`}
      </div>

      <div className="warning" style={{ marginTop: 20 }}>
        <strong>注意：</strong>上面的示例缺少 <code>key</code> 属性，
        React 会在控制台输出警告。稍后我们将学习如何修复这个问题。
      </div>
    </div>
  )
}
