/**
 * 组件的导入与导出 —— 默认导出与导入
 *
 * 将组件拆分到独立文件的第一种方式：默认导出。
 * 拆分步骤：
 * 1. 创建一个新的 JS 文件来存放该组件
 * 2. 使用 export default 导出该文件中的函数组件
 * 3. 在需要使用该组件的文件中 import 导入
 */

// 从 Gallery.tsx 中使用默认导入的方式引入 Gallery 组件
import Gallery from '../Gallery'

export default function DefaultExportDemo() {
  return (
    <div>
      <div className="code-block">{`// Gallery.tsx —— 默认导出
function Profile() {
    return (
        <img src="https://i.imgur.com/QIrZWGIs.jpg"
             alt="Alan L. Hart" />
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
}

// ────────────────────────────────

// App.tsx —— 默认导入
import Gallery from "./Gallery.js";

export default function App() {
    return <Gallery />
}`}</div>

      <p>
        默认导出的关键点：
      </p>
      <ul style={{ lineHeight: 1.8 }}>
        <li>使用 <code>export default</code> 关键字导出组件</li>
        <li>导入时<strong>不需要大括号</strong>：<code>import Gallery from &quot;./Gallery&quot;</code></li>
        <li>同一文件中<strong>只能有一个</strong>默认导出</li>
        <li>导入时可以使用任意名称：<code>import MyGallery from &quot;./Gallery&quot;</code>（但建议保持一致）</li>
      </ul>

      <div className="demo-box">
        <h3>运行效果</h3>
        <Gallery />
      </div>
    </div>
  )
}
