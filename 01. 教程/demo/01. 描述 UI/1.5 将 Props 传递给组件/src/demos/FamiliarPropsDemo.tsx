/**
 * 将 Props 传递给组件 —— 熟悉的 props
 *
 * Props 是你传递给 JSX 标签的信息。
 * 例如 className、src、alt、width、height 便是一些可以传递给 <img> 的 props。
 * 你可以将任何 props 传递给你自己的组件，以便自定义它们。
 */

function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  )
}

export default function FamiliarPropsDemo() {
  return (
    <div>
      <h3>熟悉的 props</h3>
      <p>Props 是你传递给 JSX 标签的信息。例如 <code>className</code>、<code>src</code>、<code>alt</code>、<code>width</code>、<code>height</code> 便是一些可以传递给 <code>&lt;img&gt;</code> 的 props：</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '16px 0' }}>
        <Avatar />
        <span>Lin Lanying</span>
      </div>
      <div className="code-block">
{`<img
  className="avatar"
  src="https://i.imgur.com/1bX5QH6.jpg"
  alt="Lin Lanying"
  width={100}
  height={100}
/>`}
      </div>
      <p>你可以传递给 <code>&lt;img&gt;</code> 标签的 props 是预定义的（ReactDOM 符合 HTML 标准）。但是你可以将任何 props 传递给<strong>你自己的</strong>组件，例如 <code>&lt;Avatar&gt;</code>，以便自定义它们。</p>
    </div>
  )
}
