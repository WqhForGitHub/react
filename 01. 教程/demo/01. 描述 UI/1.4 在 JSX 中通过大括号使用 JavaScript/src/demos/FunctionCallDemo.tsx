/**
 * 在 JSX 中通过大括号使用 JavaScript —— 调用 JavaScript 函数
 *
 * 大括号内的任何 JavaScript 表达式都能正常运行，
 * 包括像 formatDate() 这样的函数调用。
 */

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(
    'zh-CN',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  ).format(date);
}

function getCurrentTime(): string {
  return new Intl.DateTimeFormat(
    'zh-CN',
    { hour: '2-digit', minute: '2-digit', second: '2-digit' }
  ).format(new Date());
}

export default function FunctionCallDemo() {
  const today = new Date();

  return (
    <div>
      <h3>在大括号内调用 JavaScript 函数</h3>
      <p>大括号内可以调用任何返回值的 JavaScript 函数：</p>
      <div style={{
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
      }}>
        <h1 style={{ margin: 0 }}>{formatDate(today)}的待办事项</h1>
        <p style={{ margin: '8px 0 0', color: 'var(--text)' }}>
          当前时间：{getCurrentTime()}
        </p>
      </div>
      <div className="code-block">
{`const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'zh-CN',
    { weekday: 'long' }
  ).format(date);
}

// 在 JSX 中直接调用函数
<h1>{formatDate(today)}的待办事项</h1>`}
      </div>
      <div className="warning">
        <strong>注意：</strong>只有表达式可以放在大括号内。<code>if</code> 语句、<code>for</code> 循环等语句不能直接放在大括号中，但可以使用三元表达式 <code>? :</code> 等替代。
      </div>
    </div>
  )
}
