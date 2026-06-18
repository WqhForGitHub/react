/**
 * 组件的导入与导出 —— 根组件文件
 *
 * 在项目初期，所有组件可能都定义在同一个根组件文件中。
 * 当组件越来越多时，就需要将它们拆分到不同文件中。
 *
 * 此 Demo 展示的是「拆分之前」的状态：
 * Profile 和 Gallery 都定义在同一个文件里。
 */

// Profile 组件：仅在本文件内使用，没有导出
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
      style={{
        height: 100,
        borderRadius: 8,
        margin: 4,
      }}
    />
  )
}

// Gallery 组件：使用 Profile 组件
function Gallery() {
  return (
    <section>
      <h1>了不起的科学家们</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  )
}

export default function RootComponentDemo() {
  return (
    <div>
      <div className="code-block">{`// App.js —— 所有组件都在根组件文件中

function Profile() {
    return (
        <img src="https://i.imgur.com/MK3eW3As.jpg"
             alt="Katherine Johnson" />
    )
}

export default function Gallery() {
    return (
        <section>
            <h1>了不起的科学家们</h1>
            <Profile />
            <Profile />
            <Profile />
        </section>
    )
}`}</div>

      <p>当组件越来越多时，将它们全部放在根组件文件中会难以维护。我们需要将组件拆分到独立文件中。</p>

      <div className="demo-box">
        <h3>运行效果</h3>
        <Gallery />
      </div>

      <div className="warning">
        <strong>提示：</strong>目前 Profile 组件没有被导出，所以只能在当前文件内使用。
        如果其他文件也需要使用 Profile，就需要将其导出。
      </div>
    </div>
  )
}
