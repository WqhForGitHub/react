/**
 * Gallery.tsx —— 独立的组件文件
 *
 * 这个文件演示了如何在同一个文件中使用：
 * - 具名导出（export function Profile）
 * - 默认导出（export default function Gallery）
 *
 * 同一文件中，有且仅有一个默认导出，但可以有多个具名导出！
 */

// 具名导出：Profile 组件
// 其他文件通过 import { Profile } from "./Gallery" 来导入
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
      style={{
        height: 100,
        borderRadius: 8,
        margin: 4,
      }}
    />
  )
}

// 默认导出：Gallery 组件
// 其他文件通过 import Gallery from "./Gallery" 来导入
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
