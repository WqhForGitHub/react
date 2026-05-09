/**
 * 在 JSX 中通过大括号使用 JavaScript —— 使用引号传递字符串
 *
 * 当你想把一个字符串属性传递给 JSX 时，把它放到引号中。
 * 如果想要动态指定值，则用大括号替代引号来引用 JavaScript 变量。
 */
export default function StringPropsDemo() {
  // 使用大括号引用 JavaScript 变量
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';

  return (
    <div>
      <h3>引号 vs 大括号</h3>
      <p>
        <code>className=&quot;avatar&quot;</code> 传递的是字符串 &quot;avatar&quot;，
        而 <code>src={'{avatar}'}</code> 会读取 JavaScript 变量 <code>avatar</code> 的值。
      </p>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginTop: 12 }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: '0.85em', color: 'var(--text)' }}>使用引号（静态字符串）：</p>
          <img
            className="avatar"
            src="https://i.imgur.com/7vQD0fPs.jpg"
            alt="Gregorio Y. Zara"
          />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: '0.85em', color: 'var(--text)' }}>使用大括号（引用变量）：</p>
          <img
            className="avatar"
            src={avatar}
            alt={description}
          />
        </div>
      </div>
      <div className="code-block">
{`// 引号：传递字符串
<img className="avatar" src="https://i.imgur.com/7vQD0fPs.jpg" />

// 大括号：引用 JavaScript 变量
const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
<img src={avatar} />`}
      </div>
    </div>
  )
}
