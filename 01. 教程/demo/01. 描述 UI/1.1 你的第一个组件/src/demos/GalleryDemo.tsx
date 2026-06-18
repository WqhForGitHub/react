/**
 * 你的第一个组件 —— 使用组件
 *
 * 组件一旦定义，就可以在其他组件中嵌套使用。
 * 小写标签如 <section> 是 HTML 标签，大写开头如 <Profile /> 是组件。
 * 组件可以复用多次，浏览器最终看到的是渲染后的 HTML。
 */

function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  )
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  )
}
