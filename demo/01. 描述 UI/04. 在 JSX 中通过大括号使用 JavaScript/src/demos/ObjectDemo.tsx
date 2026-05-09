/**
 * 在 JSX 中通过大括号使用 JavaScript —— JavaScript 对象和大括号的更多可能
 *
 * 你可以将多个表达式合并到一个对象中，在 JSX 的大括号内分别使用它们。
 * JSX 是一种模板语言的最小实现，因为它允许你通过 JavaScript 来组织数据和逻辑。
 */

const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink',
  },
};

export default function ObjectDemo() {
  return (
    <div>
      <h3>JavaScript 对象与大括号的更多可能</h3>
      <p>
        将数据组织到 JavaScript 对象中，然后在 JSX 中通过大括号分别引用：
      </p>
      <div style={person.theme}>
        <h1 style={{ margin: '0 0 12px' }}>{person.name}的待办事项</h1>
        <img
          className="avatar"
          src="https://i.imgur.com/7vQD0fPs.jpg"
          alt={person.name}
        />
        <ul style={{ marginTop: 12, paddingLeft: 20 }}>
          <li>优化视频电话</li>
          <li>准备航空学课程</li>
          <li>研究乙醇燃料引擎</li>
        </ul>
      </div>
      <div className="code-block" style={{ marginTop: 16 }}>
{`const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink',
  },
};

// 在 JSX 中分别引用对象的不同属性
<div style={person.theme}>
  <h1>{person.name}的待办事项</h1>
</div>`}
      </div>
      <p style={{ marginTop: 16 }}>
        JSX 是一种模板语言的最小实现，因为它允许你通过 JavaScript 来组织数据和逻辑。
        你不需要学习新的模板语法，只需使用 JavaScript 本身。
      </p>
    </div>
  )
}
