/**
 * 组件的导入与导出 —— 具名导出与导入
 *
 * 当同一文件中需要导出多个组件时，可以使用具名导出。
 * 同一文件中，有且仅有一个默认导出，但可以有多个具名导出！
 *
 * 本 Demo 从 Gallery.tsx 中同时导入：
 * - 默认导入 Gallery 组件
 * - 具名导入 Profile 组件
 */

// 从 Gallery.tsx 中使用默认导入的方式引入 Gallery 组件
import Gallery from '../Gallery'
// 从 Gallery.tsx 中使用具名导入的方式引入 Profile 组件
import { Profile } from '../Gallery'

export default function NamedExportDemo() {
  return (
    <div>
      <div className="code-block">{`// Gallery.tsx —— 同时使用默认导出和具名导出
export function Profile() {               // 具名导出
    return (
        <img src="https://i.imgur.com/QIrZWGIs.jpg"
             alt="Alan L. Hart" />
    )
}

export default function Gallery() {        // 默认导出
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

// App.tsx —— 同时使用默认导入和具名导入
import Gallery from "./Gallery.js";        // 默认导入（无大括号）
import { Profile } from "./Gallery.js";    // 具名导入（有大括号）

export default function App() {
    return <Profile />
}`}</div>

      <p>
        默认导出 vs 具名导出的区别：
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border)' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px' }}>特性</th>
            <th style={{ textAlign: 'left', padding: '8px 12px' }}>默认导出</th>
            <th style={{ textAlign: 'left', padding: '8px 12px' }}>具名导出</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '8px 12px' }}>导出语法</td>
            <td style={{ padding: '8px 12px' }}><code>export default function X</code></td>
            <td style={{ padding: '8px 12px' }}><code>export function X</code></td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '8px 12px' }}>导入语法</td>
            <td style={{ padding: '8px 12px' }}><code>import X from &quot;./file&quot;</code></td>
            <td style={{ padding: '8px 12px' }}><code>import {'{ X }'} from &quot;./file&quot;</code></td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '8px 12px' }}>同文件数量</td>
            <td style={{ padding: '8px 12px' }}>仅 1 个</td>
            <td style={{ padding: '8px 12px' }}>可以有多个</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 12px' }}>导入时重命名</td>
            <td style={{ padding: '8px 12px' }}><code>import Y from &quot;./file&quot;</code></td>
            <td style={{ padding: '8px 12px' }}><code>import {'{ X as Y }'} from &quot;./file&quot;</code></td>
          </tr>
        </tbody>
      </table>

      <div className="demo-box" style={{ marginTop: 20 }}>
        <h3>只使用 Profile（具名导入）</h3>
        <Profile />
      </div>

      <div className="demo-box">
        <h3>使用 Gallery（默认导入）</h3>
        <Gallery />
      </div>
    </div>
  )
}
