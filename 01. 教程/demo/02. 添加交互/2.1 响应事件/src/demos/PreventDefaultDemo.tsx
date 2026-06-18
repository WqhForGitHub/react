/**
 * 阻止默认行为
 *
 * 某些浏览器事件具有默认行为（如表单提交会重新加载页面）。
 * 调用 e.preventDefault() 可以阻止默认浏览器行为。
 *
 * 不要混淆 e.stopPropagation() 和 e.preventDefault()：
 * - e.stopPropagation() 阻止触发绑定在外层标签上的事件处理函数
 * - e.preventDefault() 阻止少数事件的默认浏览器行为
 */
export default function PreventDefaultDemo() {
  return (
    <div>
      <h3>未阻止默认行为</h3>
      <p>点击"发送"按钮会触发表单提交，页面将重新加载：</p>
      <form onSubmit={() => alert('提交表单！（页面将重新加载）')}>
        <input placeholder="输入内容..." />
        <button type="submit" style={{ marginLeft: 8 }}>发送</button>
      </form>

      <h3 style={{ marginTop: 24 }}>使用 e.preventDefault() 阻止默认行为</h3>
      <p>调用 e.preventDefault() 后，表单提交不会重新加载页面：</p>
      <form onSubmit={e => {
        e.preventDefault()
        alert('提交表单！（页面不会重新加载）')
      }}>
        <input placeholder="输入内容..." />
        <button type="submit" style={{ marginLeft: 8 }}>发送</button>
      </form>

      <div style={{
        marginTop: 24,
        borderLeft: '3px solid #f59e0b',
        background: 'rgba(245, 158, 11, 0.08)',
        padding: '12px 16px',
        borderRadius: '0 8px 8px 0',
        fontSize: '0.9em',
      }}>
        <strong style={{ color: '#f59e0b' }}>注意</strong>：不要混淆 <code>e.stopPropagation()</code> 和 <code>e.preventDefault()</code>，它们都很有用，但二者并不相关。
      </div>
    </div>
  )
}
